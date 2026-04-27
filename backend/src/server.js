const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- ROTAS DE EVENTOS (PÚBLICAS) ---

// Listar eventos aprovados (Home)
app.get('/api/eventos', async (req, res) => {
  try {
    const eventos = await prisma.evento.findMany({
      where: { status: 'APROVADO' },
      orderBy: { date: 'asc' }
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
});

// Criar novo evento (Vem como PENDENTE por padrão)
app.post('/api/eventos', async (req, res) => {
  try {
    const novoEvento = await prisma.evento.create({
      data: {
        ...req.body,
        status: 'PENDENTE' // Garante que comece pendente
      },
    });
    res.status(201).json(novoEvento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
});

// --- ROTAS DE ADMINISTRAÇÃO (MODERAÇÃO) ---

// Listar eventos pendentes
app.get('/api/admin/eventos/pendentes', async (req, res) => {
  try {
    const pendentes = await prisma.evento.findMany({
      where: { status: 'PENDENTE' },
      orderBy: { createdAt: 'desc' }
    });
    res.json(pendentes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pendentes' });
  }
});

// Alterar status e dados de um evento (Aprovar/Rejeitar/Editar)
app.patch('/api/admin/eventos/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, ...eventData } = req.body; 
  
  try {
    if (status === 'REJEITADO') {
      // Se for rejeitado, exclui permanentemente do banco
      await prisma.evento.delete({
        where: { id: parseInt(id) }
      });
      return res.json({ message: 'Evento excluído com sucesso' });
    }

    // Se for aprovado ou editado, atualiza normalmente
    const atualizado = await prisma.evento.update({
      where: { id: parseInt(id) },
      data: { 
        ...eventData,
        status 
      }
    });
    res.json(atualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar ação no evento' });
  }
});

// --- ROTAS DE CLIENTES ---

app.post('/api/clientes', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novoCliente = await prisma.cliente.create({
      data: { nome, email, senha },
    });
    res.status(201).json({ id: novoCliente.id, nome: novoCliente.nome, email: novoCliente.email });
  } catch (error) {
    if (error.code === 'P2002') return res.status(400).json({ error: 'Email já cadastrado' });
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await prisma.cliente.findUnique({ where: { email } });
    if (user && user.senha === senha) {
      res.json({ id: user.id, nome: user.nome, email: user.email });
    } else {
      res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

const runScraper = require('./robot');

// ... outros middlewares ...

// Rota para disparar o Robô manualmente
app.post('/api/admin/robot/run', async (req, res) => {
  try {
    // Roda em segundo plano para não travar a resposta
    runScraper();
    res.json({ message: 'Robô iniciado! Verifique o painel de moderação em alguns instantes.' });
  } catch (error) {
    res.status(500).json({ error: 'Falha ao iniciar o robô' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
