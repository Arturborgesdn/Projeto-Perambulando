const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const movies = [
  {
    title: 'Devoradores De Estrelas 🚀',
    category: 'Cinema',
    genre: 'Ficção Científica',
    date: new Date('2026-04-26T13:10:00'),
    location: 'Cinemark RioMar Recife',
    price: 'R$ 35',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200',
    description: 'Baseado no best-seller de Andy Weir. Horários: 13:10, 16:50, 20:10 (Convencional) | 21:40 (VIP). Sessão: Legendado. Faixa Etária: 14 anos.',
    status: 'APROVADO'
  },
  {
    title: 'Michael 🕺',
    category: 'Cinema',
    genre: 'Cinebiografia, Musical',
    date: new Date('2026-04-26T12:20:00'),
    location: 'Cinemark RioMar / UCI Shopping Recife',
    price: 'R$ 32',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200',
    description: 'A história do Rei do Pop. Horários: 12:20, 12:40, 13:00, 13:30, 15:20, 15:40, 18:20, 18:40, 21:20, 21:40. Sessão: Dublado, Legendado, VIP e XD. Faixa Etária: 12 anos.',
    status: 'APROVADO'
  },
  {
    title: 'O Drama 🎭',
    category: 'Cinema',
    genre: 'Drama',
    date: new Date('2026-04-26T12:50:00'),
    location: 'Cinemark RioMar / UCI Shopping Recife',
    price: 'R$ 30',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200',
    description: 'Uma história emocionante sobre escolhas e destinos. Horários: 12:50 (Dub), 15:30, 18:00, 20:40 (Leg) | 19:10 (VIP). Faixa Etária: 16 anos.',
    status: 'APROVADO'
  },
  {
    title: 'Super Mario Galaxy - O Filme 🌟',
    category: 'Cinema',
    genre: 'Animação, Aventura',
    date: new Date('2026-04-26T12:10:00'),
    location: 'Cinemark RioMar / UCI Shopping Recife',
    price: 'R$ 28',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1200',
    description: 'Mario e Luigi partem para uma aventura intergalática. Horários: 12:10, 13:00, 13:20 (VIP), 14:50, 15:50, 16:40 (VIP), 17:20, 19:50. Sessão: Dublado. Faixa Etária: 6 anos.',
    status: 'APROVADO'
  },
  {
    title: 'Maldição Da Múmia 🧟‍♂️',
    category: 'Cinema',
    genre: 'Terror, Suspense',
    date: new Date('2026-04-26T16:30:00'),
    location: 'Cinemark RioMar / UCI Shopping Recife',
    price: 'R$ 32',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200',
    description: 'O despertar de um mal antigo. Horários: 16:30, 19:20, 22:10. Sessão: Dublado. Faixa Etária: 18 anos.',
    status: 'APROVADO'
  },
  {
    title: 'Velhos Bandidos 💰',
    category: 'Cinema',
    genre: 'Ação, Comédia',
    date: new Date('2026-04-26T12:00:00'),
    location: 'Cinemark RioMar Recife',
    price: 'R$ 25',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200',
    description: 'Um grupo de veteranos planeja o último grande assalto. Horários: 12:00, 14:20. Sessão: Nacional. Faixa Etária: 14 anos.',
    status: 'APROVADO'
  },
  {
    title: 'Um Pai Em Apuros 👨‍👧',
    category: 'Cinema',
    genre: 'Comédia Familiar',
    date: new Date('2026-04-26T18:50:00'),
    location: 'Cinemark RioMar / UCI Shopping Recife',
    price: 'R$ 25',
    image: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1200',
    description: 'As confusões de um pai tentando reconectar com sua filha. Horário: 18:50. Sessão: Nacional. Faixa Etária: 12 anos.',
    status: 'APROVADO'
  }
];

async function main() {
  console.log('Inserindo filmes no banco de dados...');
  for (const movie of movies) {
    await prisma.evento.create({
      data: movie,
    });
  }
  console.log('Todos os filmes foram inseridos com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
