require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newEvents = [
  { 
    title: 'Café na Rua - Abertura do Recife Coffee 2026', 
    category: 'Rua', 
    genre: 'Gastronomia, Café', 
    date: new Date('2026-05-02T09:00:00'), 
    location: 'Avenida Rio Branco (Bairro do Recife)', 
    price: 'Acesso Livre (Degustação gratuita)', 
    image: 'https://jc.uol.com.br/receitadaboa/11o-recife-coffee-comeca-neste-domingo-e-reune-34-cafeterias-do-grande-recife-e-agreste.html', 
    description: 'O boulevard mais famoso do Recife Antigo se transforma em um laboratório de cafés especiais com degustações gratuitas e competições de arte no leite. É o despertar perfeito para o sábado, celebrando a cultura cafeeira com música e vivências culturais ao ar livre.', 
    instagramLink: 'https://www.instagram.com/recifecoffeeoficial/' 
  },
  { 
    title: 'Olha! Recife de Catamarã: Recife e Suas Pontes', 
    category: 'Rua', 
    genre: 'Turismo, História', 
    date: new Date('2026-05-02T09:00:00'), 
    location: 'Saída do Cais de Santa Rita (Recife)', 
    price: 'Gratuito', 
    image: 'https://visit.recife.pe.gov.br/olha-recife', 
    description: 'Uma perspectiva única da "Veneza Brasileira" vista das águas do Capibaribe. O passeio gratuito revela as histórias e arquiteturas das pontes que definem a geografia e a alma da capital pernambucana.', 
    instagramLink: 'https://www.instagram.com/visitrecife/',
    ticketLink: 'http://www.olharecife.com.br/'
  },
  { 
    title: 'Concerto no Parque: Orquestra Rockfônica', 
    category: 'Rua', 
    genre: 'Música, Pop/Rock', 
    date: new Date('2026-05-03T16:30:00'), 
    location: 'Parque da Tamarineira (Tamarineira, Recife)', 
    price: 'Acesso Gratuito', 
    image: 'https://www.leiaja.com/entretenimento/2026/04/29/orquestra-rockfonica-faz-concerto-ao-ar-livre-no-parque-da-tamarineira/', 
    description: 'Uma tarde sensorial que une o erudito ao rock sob as copas das árvores da Zona Norte. O repertório transita entre Vivaldi e Alceu Valença, oferecendo 60 minutos de música instrumental em harmonia com a natureza.', 
    instagramLink: 'https://www.instagram.com/prefeiturarecife/' 
  },
  { 
    title: 'Show "Cacau, Lulu e o Manguebitinho"', 
    category: 'Infantil', 
    genre: 'Música Infantil', 
    date: new Date('2026-05-03T16:00:00'), 
    location: 'Teatro do Parque (Boa Vista, Recife)', 
    price: 'A partir de R$ 20,00', 
    image: 'https://www.diariodepernambuco.com.br/viver/2025/10/11697661-manguebeat-para-criancas-anima-o-teatro-do-parque-no-dia-das-criancas.html', 
    description: 'Um presente para a garotada descobrir o movimento Manguebeat com a energia da Fada Magrinha Lulu Araújo e Cláudia Soul. O show lúdico convida as novas gerações a fincarem suas raízes na cultura recifense com muito ritmo e história.', 
    instagramLink: 'https://www.instagram.com/fadameagrinha/',
    ticketLink: 'https://www.sympla.com.br/evento/cacau-e-lulu-e-o-manguebitinho/3373485'
  },
  { 
    title: 'Oficina de Barro Infantil com Mestre Nena', 
    category: 'Infantil', 
    genre: 'Oficina, Arte', 
    date: new Date('2026-05-03T16:00:00'), 
    location: 'Jardins do Museu do Estado - MEPE (Graças, Recife)', 
    price: 'Entrada Gratuita', 
    image: 'https://www.opoder.com.br/noticias/30967/museu-do-estado-de-pernambuco-realiza-13a-feira-nafoz', 
    description: 'Uma experiência tátil nos jardins do museu onde as crianças aprendem a moldar a tradição pernambucana sob a guia de um mestre da arte popular. Atividade educativa que une lazer e valorização patrimonial para os pequenos.', 
    instagramLink: 'https://www.instagram.com/museudoestadope/' 
  },
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
