require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockEventsData = [
  { title: 'Show de Lenine e Orquestra', category: 'Shows', genre: 'MPB, Rock', date: new Date('2026-09-26T21:00:00'), location: 'Classic Hall, Olinda', price: 'R$ 80', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop', description: 'Uma noite inesquecível com o mestre Lenine acompanhado pela Orquestra Sinfônica do Recife.', ticketLink: 'https://www.eventim.com.br', instagramLink: 'https://www.instagram.com/lenine' },
  { title: 'Noite do Brega Romântico', category: 'Shows', genre: 'Brega, Romântico', date: new Date('2026-09-19T22:00:00'), location: 'Clube das Pás, Encruzilhada', price: 'R$ 40', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop', description: 'Prepare o coração para uma noite de muito romance.', ticketLink: 'https://www.sympla.com.br', instagramLink: 'https://www.instagram.com/clubedaspas' },
  { title: 'Exposição "Luz e Sombra" de Abelardo da Hora', category: 'Exposições', genre: 'Artes Visuais', date: new Date('2026-10-01T10:00:00'), location: 'Instituto Ricardo Brennand, Várzea', price: 'R$ 30', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop', description: 'Uma retrospectiva completa da obra de Abelardo da Hora.', ticketLink: 'https://www.institutoricardobrennand.org.br', instagramLink: 'https://www.instagram.com/institutorb' },
  { title: 'Passeio de Catamarã pelo Rio Capibaribe', category: 'Lazer', genre: 'Passeio', date: new Date('2026-09-28T16:00:00'), location: 'Cais das Cinco Pontas, Recife Antigo', price: 'R$ 45', image: 'https://images.unsplash.com/photo-1620021313245-8c792f3e8b0a?q=80&w=800&auto=format&fit=crop', description: 'Descubra as pontes e histórias do Recife de uma perspectiva única.', ticketLink: 'https://www.catamaratours.com.br', instagramLink: 'https://www.instagram.com/catamaratours' },
  { title: 'Contação de Histórias com Tapete Voador', category: 'Infantil', genre: 'Contação de histórias', date: new Date('2026-09-27T15:00:00'), location: 'Livraria Jaqueira, Jaqueira', price: 'Gratuito', image: 'https://images.unsplash.com/photo-1521714161819-15534968fc5f?q=80&w=800&auto=format&fit=crop', description: 'Uma tarde mágica para a criançada.', instagramLink: 'https://www.instagram.com/livrariajaqueira' },
  { title: 'Happy Hour com Música ao Vivo', category: 'Shows', genre: 'Rock', date: new Date('2026-09-02T19:00:00'), location: 'Bar Central, Santo Amaro', price: 'Couvert R$ 10', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop', description: 'Relaxe após o trabalho.', instagramLink: 'https://www.instagram.com/barcentralrecife' },
  { title: 'Recife em Foco: Um Olhar Fotográfico', category: 'Exposições', genre: 'Fotografia', date: new Date('2026-09-15T09:00:00'), location: 'Caixa Cultural Recife, Recife Antigo', price: 'Gratuito', image: 'https://images.unsplash.com/photo-1516900557549-4155312b3e5c?q=80&w=800&auto=format&fit=crop', description: 'Uma coleção de fotografias que capturam a alma e a arquitetura do Recife.', instagramLink: 'https://www.instagram.com/caixaculturalrecife' },
  { title: 'Visita à Oficina Cerâmica Francisco Brennand', category: 'Lazer', genre: 'Arte e Cultura', date: new Date('2026-09-10T14:00:00'), location: 'Várzea, Recife', price: 'R$ 40', image: 'https://i.imgur.com/8QW5z2b.jpg', description: 'Explore o universo místico e monumental de Francisco Brennand.', ticketLink: 'https://www.oficinabrennand.org.br', instagramLink: 'https://www.instagram.com/oficinabrennand' },
  { title: 'Piquenique no Parque da Jaqueira', category: 'Lazer', genre: 'Parque e Ar Livre', date: new Date('2026-09-06T15:00:00'), location: 'Parque da Jaqueira, Jaqueira', price: 'Gratuito', image: 'https://i.imgur.com/0fW5aK2.jpg', description: 'Aproveite a vasta área verde do Parque da Jaqueira.', instagramLink: 'https://www.instagram.com/parquejaqueira' },
  { title: 'Oficina de Argila para Crianças', category: 'Infantil', genre: 'Oficina Criativa', date: new Date('2026-09-07T10:00:00'), location: 'Oficina Brennand, Várzea', price: 'R$ 50', image: 'https://images.unsplash.com/photo-1596420267212-352112a14c63?q=80&w=800&auto=format&fit=crop', description: 'Uma manhã divertida onde as crianças criam suas próprias peças de argila.', ticketLink: 'https://www.oficinabrennand.org.br', instagramLink: 'https://www.instagram.com/oficinabrennand' },
  { title: 'Teatrinho: Os Três Porquinhos', category: 'Infantil', genre: 'Teatro Infantil', date: new Date('2026-09-07T16:00:00'), location: 'Teatro do Parque, Boa Vista', price: 'R$ 30', image: 'https://images.unsplash.com/photo-1616463530799-51a4a40875c7?q=80&w=800&auto=format&fit=crop', description: 'Uma adaptação divertida e musical do clássico conto dos Três Porquinhos.', ticketLink: 'https://www.sympla.com.br', instagramLink: 'https://www.instagram.com/teatrodoparque' },
];

async function main() {
  console.log('Iniciando seed...');
  for (const event of mockEventsData) {
    await prisma.evento.create({
      data: event,
    });
  }
  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
