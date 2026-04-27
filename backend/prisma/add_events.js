const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newEvents = [
  {
    title: 'Festival Som na Areia',
    category: 'Shows',
    genre: 'Indie, Pop',
    date: new Date('2026-04-28T17:00:00'),
    location: 'Praia de Boa Viagem, Recife',
    price: 'Gratuito',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200',
    description: 'Um festival pé na areia celebrando a nova cena indie pernambucana. Traga sua canga e aproveite o pôr do sol com o melhor da música local. O evento conta com feirinha de economia criativa e praça de alimentação.',
    ticketLink: 'https://www.sympla.com.br',
    instagramLink: 'https://www.instagram.com/somnaareia'
  },
  {
    title: 'Recife Jazz & Blues',
    category: 'Shows',
    genre: 'Jazz, Blues',
    date: new Date('2026-04-29T20:30:00'),
    location: 'Teatro Luiz Mendonça, Dona Lindu',
    price: 'R$ 60',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1200',
    description: 'Uma noite de sofisticação e improviso. O mestre do blues regional convida artistas internacionais para um espetáculo único sob as curvas de Oscar Niemeyer. Imperdível para amantes da boa música.',
    ticketLink: 'https://www.eventim.com.br',
    instagramLink: 'https://www.instagram.com/recifejazz'
  },
  {
    title: 'Exposição "Mestres do Barro"',
    category: 'Exposições',
    genre: 'Arte Popular',
    date: new Date('2026-04-27T10:00:00'),
    location: 'Museu do Estado de Pernambuco',
    price: 'R$ 20',
    image: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?q=80&w=1200',
    description: 'Uma imersão no universo do artesanato em barro do Alto do Moura. A exposição traz peças raras de discípulos de Mestre Vitalino, revelando a história e o cotidiano do povo nordestino através da argila.',
    ticketLink: 'https://www.museudoestado.pe.gov.br',
    instagramLink: 'https://www.instagram.com/museudoestadope'
  },
  {
    title: 'Noite de Stand-up: Risada Garantida',
    category: 'Lazer',
    genre: 'Comédia',
    date: new Date('2026-05-01T21:00:00'),
    location: 'Cervejaria Babylon, Recife Antigo',
    price: 'R$ 40',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200',
    description: 'Os melhores comediantes da região se reúnem para uma noite de muita gargalhada e cerveja artesanal. Ideal para relaxar com os amigos no feriado do trabalhador.',
    ticketLink: 'https://www.sympla.com.br',
    instagramLink: 'https://www.instagram.com/babylon.beer'
  },
  {
    title: 'Oficina de Frevo para Iniciantes',
    category: 'Infantil',
    genre: 'Cultura Popular',
    date: new Date('2026-04-26T15:00:00'),
    location: 'Paço do Frevo, Recife Antigo',
    price: 'Gratuito',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200',
    description: 'Uma tarde dedicada a ensinar os primeiros passos da nossa dança patrimônio da humanidade. Traga as crianças para gastar energia e aprender sobre a história do carnaval pernambucano de forma lúdica.',
    ticketLink: 'https://www.pacodofrevo.org.br',
    instagramLink: 'https://www.instagram.com/pacodofrevo'
  }
];

async function main() {
  console.log('Adicionando novos eventos...');
  for (const event of newEvents) {
    await prisma.evento.create({
      data: event,
    });
  }
  console.log('Novos eventos adicionados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
