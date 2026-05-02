require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function test() {
  const rawText = `
title: Mostra de Cinema Clássico: O Suspense de Hitchcock
category: arte
date: 05 de Agosto, 2026
location: Cinema São Luiz, Recife - PE
description: Exibição especial de obras remasterizadas com debate técnico sobre a linguagem cinematográfica e o legado do "Mestre do Suspense".
image: https://example.com/images/hitchcock-mostra.jpg
instagramLink: https://instagram.com/cinemasaoluiz
ticketLink: https://ingresso.com/mostra-hitchcock
  `;

  console.log("--- TESTANDO IA ---");
  
  const prompt = `
      Você é um assistente do site "Perambulando", um guia cultural de Recife.
      Sua tarefa é extrair eventos do texto bruto fornecido e retornar um ARRAY de objetos JSON.
      
      IMPORTANTE: A data deve ser convertida para o formato ISO real (ex: 2026-08-05T19:00:00.000Z). 
      Se o texto diz "05 de Agosto", assuma o ano 2026 se não houver ano.
      Se não houver hora, assuma 19:00:00.

      Categorias permitidas (escolha a mais próxima): ["Palcos", "Telas", "Artes", "Rua", "Infantil"]
      Ex: Se for cinema, use "Telas". Se for exposição, use "Artes".

      Estrutura do Objeto:
      {
        "title": "Nome",
        "category": "Categoria",
        "date": "2026-08-05T19:00:00.000Z",
        "location": "Local e Bairro",
        "description": "Texto convidativo",
        "price": "Valor ou Gratuito",
        "image": "URL ou null",
        "instagramLink": "Link ou null",
        "ticketLink": "Link ou null"
      }

      TEXTO BRUTO PARA PROCESSAR:
      ${rawText}

      RETORNE APENAS O ARRAY JSON PURO. NÃO ADICIONE EXPLICAÇÕES OU MARCAÇÕES DE CÓDIGO.
  `;

  try {
    const result = await aiModel.generateContent(prompt);
    const responseText = result.response.text();
    console.log("RESPOSTA DA IA:");
    console.log(responseText);
    
    const startIndex = responseText.indexOf('[');
    const endIndex = responseText.lastIndexOf(']') + 1;
    
    if (startIndex === -1 || endIndex === 0) {
      console.error("ERRO: Não encontrou [ ou ]");
      return;
    }

    const jsonString = responseText.substring(startIndex, endIndex);
    console.log("JSON EXTRAÍDO:");
    console.log(jsonString);
    
    const json = JSON.parse(jsonString);
    console.log("JSON PARSEADO COM SUCESSO!");
    console.log(json);
  } catch (err) {
    console.error("ERRO NO TESTE:", err);
  }
}

test();
