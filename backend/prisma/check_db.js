const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const allEvents = await prisma.evento.findMany();
  console.log('--- RELATÓRIO DE EVENTOS NO BANCO ---');
  if (allEvents.length === 0) {
    console.log('Nenhum evento encontrado no banco!');
  }
  allEvents.forEach(e => {
    console.log(`ID: ${e.id} | Título: ${e.title} | Status: ${e.status} | Data: ${e.date}`);
  });
  console.log('--------------------------------------');
}

check().catch(console.error).finally(() => prisma.$disconnect());
