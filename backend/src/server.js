const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

const geoService = require("./services/geoService");

app.use(cors());
app.use(express.json());

// --- ROTAS DE EVENTOS (PÚBLICAS) ---

// Buscar restaurantes próximos a um evento por ID
app.get("/api/eventos/:id/proximidades", async (req, res) => {
  const { id } = req.params;
  const { radius, location } = req.query; // Raio opcional em metros, ou endereço direto como fallback

  try {
    let coords = null;
    let eventInfo = null;

    // Tenta buscar no banco primeiro
    try {
      const evento = await prisma.evento.findUnique({
        where: { id: parseInt(id) },
      });

      if (evento) {
        eventInfo = {
          id: evento.id,
          title: evento.title,
          location: evento.location,
        };
        coords = await geoService.getCoordinates(evento.location);
      }
    } catch (dbError) {
      console.warn("Evento não encontrado no banco:", dbError.message);
    }

    // Se não encontrou no banco, usa o endereço fornecido como query param
    if (!coords && location) {
      coords = await geoService.getCoordinates(location);
      eventInfo = { location };
    }

    if (!coords) {
      return res.status(404).json({
        error:
          'Não foi possível geolocalizar o endereço. Tente fornecer um endereço no parâmetro "location".',
        help: "Use: /api/eventos/:id/proximidades?location=seu+endereco",
      });
    }

    // 2. Buscar restaurantes próximos (padrão 1km)
    const restaurantes = await geoService.getNearbyRestaurants(
      coords.lat,
      coords.lon,
      parseInt(radius) || 1000,
    );

    res.json({
      sucesso: true,
      evento: eventInfo,
      coords,
      proximidades: restaurantes,
      total: restaurantes.length,
    });
  } catch (error) {
    console.error("Erro ao buscar proximidades:", error);
    res.status(500).json({
      error: "Erro interno ao buscar proximidades",
      mensagem: error.message,
    });
  }
});

// Buscar estabelecimentos por endereço direto
app.get("/api/proximidades", async (req, res) => {
  const { location, radius } = req.query;

  if (!location) {
    return res.status(400).json({
      error: "Localização é obrigatória",
      exemplo: "/api/proximidades?location=Rua+das+Flores+Recife",
    });
  }

  try {
    const coords = await geoService.getCoordinates(location);
    if (!coords) {
      return res.status(404).json({
        error: "Não foi possível geolocalizar o endereço fornecido",
        tentativa: location,
      });
    }

    const restaurantes = await geoService.getNearbyRestaurants(
      coords.lat,
      coords.lon,
      parseInt(radius) || 1000,
    );

    res.json({
      sucesso: true,
      location,
      coords,
      proximidades: restaurantes,
      total: restaurantes.length,
    });
  } catch (error) {
    console.error("Erro ao buscar proximidades:", error);
    res.status(500).json({
      error: "Erro interno ao buscar proximidades",
      mensagem: error.message,
    });
  }
});

// Listar eventos aprovados (Home)
app.get("/api/eventos", async (req, res) => {
  try {
    const eventos = await prisma.evento.findMany({
      where: { status: "APROVADO" },
      orderBy: { date: "asc" },
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }
});

// Criar novo evento (Vem como PENDENTE por padrão)
app.post("/api/eventos", async (req, res) => {
  try {
    const novoEvento = await prisma.evento.create({
      data: {
        ...req.body,
        status: "PENDENTE", // Garante que comece pendente
      },
    });
    res.status(201).json(novoEvento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar evento" });
  }
});

// --- ROTAS DE ADMINISTRAÇÃO (MODERAÇÃO) ---

// Listar eventos pendentes
app.get("/api/admin/eventos/pendentes", async (req, res) => {
  try {
    const pendentes = await prisma.evento.findMany({
      where: { status: "PENDENTE" },
      orderBy: { createdAt: "desc" },
    });
    res.json(pendentes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pendentes" });
  }
});

// Alterar status e dados de um evento (Aprovar/Rejeitar/Editar)
app.patch("/api/admin/eventos/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status, ...eventData } = req.body;

  try {
    if (status === "REJEITADO") {
      // Se for rejeitado, exclui permanentemente do banco
      await prisma.evento.delete({
        where: { id: parseInt(id) },
      });
      return res.json({ message: "Evento excluído com sucesso" });
    }

    // Se for aprovado ou editado, atualiza normalmente
    const atualizado = await prisma.evento.update({
      where: { id: parseInt(id) },
      data: {
        ...eventData,
        status,
      },
    });
    res.json(atualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar ação no evento" });
  }
});

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configuração do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Função auxiliar para tentar vários modelos da IA caso o padrão falhe (erro 404 comum em algumas regiões/chaves)
async function getAIResponse(prompt) {
  const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-pro",
  ];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.error(`Falha com modelo ${modelName}:`, err.message);
      lastError = err;
    }
  }
  throw lastError;
}

// Rota para processar texto bruto com IA e criar eventos pendentes
app.post("/api/admin/eventos/process-bulk", async (req, res) => {
  const { rawText } = req.body;
  if (!rawText)
    return res.status(400).json({ error: "Texto bruto é obrigatório" });

  // Tentar um parser manual simples caso o texto já esteja formatado (como o exemplo do Hitchcock)
  if (rawText.includes("title:") && rawText.includes("category:")) {
    try {
      const lines = rawText.split("\n");
      const event = {};
      lines.forEach((line) => {
        const index = line.indexOf(":");
        if (index !== -1) {
          const key = line.substring(0, index).trim().toLowerCase();
          const val = line.substring(index + 1).trim();
          if (key === "title") event.title = val;
          if (key === "category") event.category = val;
          if (key === "date") event.date = val;
          if (key === "location") event.location = val;
          if (key === "description") event.description = val;
          if (key === "image") event.image = val;
          if (key === "instagramlink") event.instagramLink = val;
          if (key === "ticketlink") event.ticketLink = val;
        }
      });

      if (event.title) {
        const catMap = {
          arte: "Artes",
          cinema: "Telas",
          show: "Palcos",
          teatro: "Palcos",
          rua: "Rua",
          infantil: "Infantil",
        };
        const category = catMap[event.category?.toLowerCase()] || "Artes";

        // Conversão básica de data manual (PT -> EN) para evitar Invalid Date
        let dateStr = event.date || "";
        const months = {
          janeiro: "January",
          fevereiro: "February",
          março: "March",
          abril: "April",
          maio: "May",
          junho: "June",
          julho: "July",
          agosto: "August",
          setembro: "September",
          outubro: "October",
          novembro: "November",
          dezembro: "December",
        };
        Object.keys(months).forEach((m) => {
          dateStr = dateStr.toLowerCase().replace(m, months[m]);
        });

        let finalDate = new Date(dateStr);
        if (isNaN(finalDate.getTime())) finalDate = new Date();

        const created = await prisma.evento.create({
          data: {
            title: event.title,
            category: category,
            date: finalDate,
            location: event.location || "Recife",
            description: event.description || "",
            price: "Verificar no link",
            image:
              event.image ||
              "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800",
            instagramLink: event.instagramLink || null,
            ticketLink: event.ticketLink || null,
            status: "PENDENTE",
          },
        });
        return res.json({
          message: "Evento detectado e processado via parser inteligente!",
          events: [created],
        });
      }
    } catch (e) {
      console.log("Parser manual falhou, tentando IA...", e.message);
    }
  }

  try {
    const prompt = `
      Você é um assistente do site "Perambulando", um guia cultural de Recife.
      Sua tarefa é extrair eventos do texto bruto fornecido e retornar um ARRAY de objetos JSON.

      IMPORTANTE:
      1. Converta a data para o formato ISO (ex: 2026-08-05T19:00:00Z).
      2. Se não houver uma URL de imagem clara no texto, crie um campo "imageKeywords" com 3 palavras-chave em INGLÊS que descrevam o evento (ex: "classic cinema hitchcock" ou "live music concert").
      3. Categorias permitidas: ["Palcos", "Telas", "Artes", "Rua", "Infantil"]

      Estrutura:
      [{
        "title": "...",
        "category": "...",
        "date": "...",
        "location": "...",
        "description": "...",
        "price": "...",
        "image": "URL ou null",
        "imageKeywords": "palavras em ingles para busca de foto",
        "instagramLink": "...",
        "ticketLink": "..."
      }]

      TEXTO: ${rawText}
    `;

    const responseText = await getAIResponse(prompt);
    const startIndex = responseText.indexOf("[");
    const endIndex = responseText.lastIndexOf("]") + 1;
    if (startIndex === -1 || endIndex === 0)
      throw new Error("IA não retornou JSON");

    const events = JSON.parse(responseText.substring(startIndex, endIndex));
    const createdEvents = [];

    for (const event of events) {
      let eventDate = new Date(event.date);
      if (isNaN(eventDate.getTime())) eventDate = new Date();

      // GERADOR DE IMAGEM IA (Via Unsplash Source)
      let finalImage = event.image;
      if (!finalImage || finalImage === "null" || finalImage.length < 5) {
        // Se a IA gerou keywords, usamos elas. Se não, geramos do título.
        const keywords =
          event.imageKeywords ||
          `${event.category} ${event.title}`.replace(/[^a-zA-Z ]/g, "");
        finalImage = `https://source.unsplash.com/800x600/?${encodeURIComponent(keywords)}`;
      }

      const created = await prisma.evento.create({
        data: {
          title: event.title || "Evento sem título",
          category: event.category || "Artes",
          date: eventDate,
          location: event.location || "Recife",
          description: event.description || "",
          price: event.price || "Verificar",
          image: finalImage,
          instagramLink: event.instagramLink || null,
          ticketLink: event.ticketLink || null,
          status: "PENDENTE",
        },
      });
      createdEvents.push(created);
    }

    res.json({
      message: `Sucesso! ${createdEvents.length} eventos processados.`,
      events: createdEvents,
    });
  } catch (error) {
    console.error("Erro Final:", error.message);
    res
      .status(500)
      .json({
        error:
          "A IA está temporariamente indisponível ou o texto está muito confuso. Tente simplificar.",
      });
  }
});

// --- ROTAS DE CLIENTES ---

app.post("/api/clientes", async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novoCliente = await prisma.cliente.create({
      data: { nome, email, senha },
    });
    res
      .status(201)
      .json({
        id: novoCliente.id,
        nome: novoCliente.nome,
        email: novoCliente.email,
      });
  } catch (error) {
    if (error.code === "P2002")
      return res.status(400).json({ error: "Email já cadastrado" });
    res.status(500).json({ error: "Erro ao cadastrar cliente" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await prisma.cliente.findUnique({ where: { email } });
    if (user && user.senha === senha) {
      res.json({ id: user.id, nome: user.nome, email: user.email });
    } else {
      res.status(401).json({ error: "E-mail ou senha incorretos" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar login" });
  }
});

const runScraper = require("./robot");

// ... outros middlewares ...

// Rota para disparar o Robô manualmente
app.post("/api/admin/robot/run", async (req, res) => {
  try {
    // Roda em segundo plano para não travar a resposta
    runScraper();
    res.json({
      message:
        "Robô iniciado! Verifique o painel de moderação em alguns instantes.",
    });
  } catch (error) {
    res.status(500).json({ error: "Falha ao iniciar o robô" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
