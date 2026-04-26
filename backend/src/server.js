const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- ROTAS DE EVENTOS ---

// Listar todos os eventos
app.get('/api/eventos', async (req, res) => {
  try {
    const eventos = await prisma.evento.findMany();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
});

// Criar novo evento
app.post('/api/eventos', async (req, res) => {
  try {
    const novoEvento = await prisma.evento.create({
      data: req.body,
    });
    res.status(201).json(novoEvento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
});

// --- ROTAS DE CLIENTES ---

// Listar clientes (apenas para teste)
app.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      select: { id: true, nome: true, email: true, createdAt: true }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Cadastro de Cliente
app.post('/api/clientes', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novoCliente = await prisma.cliente.create({
      data: { nome, email, senha },
    });
    res.status(201).json({ id: novoCliente.id, nome: novoCliente.nome, email: novoCliente.email });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
