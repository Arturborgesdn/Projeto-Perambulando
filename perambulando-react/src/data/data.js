// data.js — todos os dados do projeto convertidos para ES Modules

// =======================================================
// DADOS DE CINEMA
// =======================================================
export const cinemaData = [
  {
    name: 'Cinemark RioMar',
    location: 'Shopping RioMar, Pina',
    ticketLink: 'https://www.cinemark.com.br/recife/shopping-riomar',
    instagramLink: 'https://www.instagram.com/cinemarkoficial',
    movies: [
      { title: 'Duna: Parte Dois', genre: 'Ficção Científica, Aventura', rating: '12 anos', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800', synopsis: 'Paul Atreides se une a Chani e aos Fremen em uma guerra de vingança.', sessions: [{ date: '2026-09-05', time: '17:45', type: 'Legendado' }, { date: '2026-09-06', time: '21:00', type: 'Legendado - IMAX' }] },
      { title: 'Divertida Mente 2', genre: 'Animação, Família', rating: 'Livre', poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800', synopsis: 'Novas emoções chegam à mente de Riley.', sessions: [{ date: '2026-09-05', time: '14:00', type: 'Dublado - 3D' }, { date: '2026-09-07', time: '16:15', type: 'Dublado' }] },
    ],
  },
]

// =======================================================
// DADOS DE TEATRO
// =======================================================
export const teatroData = [
  {
    name: 'Teatro de Santa Isabel',
    location: 'Praça da República, Santo Antônio',
    ticketLink: 'https://www.teatrodesantaisabel.com.br',
    instagramLink: 'https://www.instagram.com/teatrodesantaisabel',
    shows: [
      { title: 'O Auto da Compadecida', genre: 'Comédia, Clássico', rating: '12 anos', poster: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800', synopsis: 'As aventuras de João Grilo e Chicó.', sessions: [{ date: '2026-09-05', time: '20:00', price: 'R$ 60' }, { date: '2026-09-06', time: '17:00', price: 'R$ 60' }] },
    ],
  },
]

// =======================================================
// DADOS DE RESTAURANTES
// =======================================================
export const foodData = [
  { id: 1, name: 'Leite', category: 'Restaurante', cuisine: 'Regional Sofisticado', location: 'Praça Joaquim Nabuco, Santo Antônio', priceRange: '$$$$', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800', specialty: 'O restaurante mais antigo do Brasil.' },
]

// =======================================================
// DADOS DE FEIRAS
// =======================================================
export const feirasData = [
  { 
    id: 1, 
    name: 'Feira de Boa Viagem', 
    zone: 'Sul', 
    address: 'Praça de Boa Viagem, Recife', 
    days: 'Diariamente', 
    time: '16:00 às 22:00',
    type: 'Artesanato e Gastronomia', 
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800' 
  },
  { 
    id: 2, 
    name: 'Mercado do Bom Jesus', 
    zone: 'Centro', 
    address: 'Rua do Bom Jesus, Recife Antigo', 
    days: 'Domingos', 
    time: '14:00 às 20:00',
    type: 'Antiguidades e Arte', 
    image: 'https://visit.recife.pe.gov.br/sites/default/files/styles/large/public/2023-05/feira_bom_jesus_0.jpg' 
  },
  { 
    id: 3, 
    name: 'Feirinha de Casa Forte', 
    zone: 'Norte', 
    address: 'Praça de Casa Forte, Recife', 
    days: 'Sábados e Domingos', 
    time: '15:00 às 21:00',
    type: 'Artesanato Local', 
    image: 'https://visit.recife.pe.gov.br/sites/default/files/styles/large/public/2023-05/praca_casa_forte_0.jpg' 
  }
]

// =======================================================
// DADOS DE ROTEIROS
// =======================================================
export const roteirosData = [
  {
    id: 1,
    title: 'Clássico Recife Antigo',
    duration: '6 horas',
    category: 'Cultura',
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=800',
    description: 'O roteiro essencial para quem quer conhecer o coração histórico da cidade.',
    stops: [
      { time: '09:00', place: 'Marco Zero', details: 'Início com vista para o mar' },
      { time: '10:30', place: 'Paço do Frevo', details: 'Imersão na dança pernambucana' },
      { time: '12:30', place: 'Almoço na Rua da Moeda', details: 'Gastronomia local' },
      { time: '14:30', place: 'Sinagoga Kahal Zur Israel', details: 'História e herança cultural' }
    ],
  },
  {
    id: 2,
    title: 'Expresso Olinda & Arte',
    duration: '5 horas',
    category: 'Arte e Vista',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=800',
    description: 'Suba as ladeiras e descubra os ateliês mais charmosos da cidade alta.',
    stops: [
      { time: '15:00', place: 'Alto da Sé', details: 'Tapioca e vista panorâmica' },
      { time: '16:30', place: 'Mercado da Ribeira', details: 'Artesanato e lembranças' },
      { time: '18:00', place: 'Pôr do Sol no Bonfim', details: 'Momento contemplativo' }
    ],
  },
  {
    id: 3,
    title: 'Rota dos Sabores Pernambucanos',
    duration: '4 horas',
    category: 'Gastronomia',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800',
    description: 'Uma jornada culinária pelos pratos mais icônicos da nossa terra.',
    stops: [
      { time: '11:00', place: 'Mercado de São José', details: 'Ingredientes e cores' },
      { time: '13:00', place: 'Restaurante Parraxaxá', details: 'Buffet regional completo' },
      { time: '15:00', place: 'Casa dos Frios', details: 'Degustação do Bolo de Rolo original' }
    ],
  }
]

export const mockEventsData = [
  {
    id: 101,
    title: 'Alceu Valença - Turnê Mágica',
    category: 'Palcos',
    date: '2026-09-12T21:00:00',
    location: 'Marco Zero, Recife Antigo',
    description: 'O mestre Alceu Valença traz seus grandes sucessos em um show gratuito no coração do Recife.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Alceu_Valen%C3%A7a_-_Recife_-_PE.jpg',
    price: 'Gratuito',
    instagramLink: 'https://www.instagram.com/alceuvalenca',
    ticketLink: ''
  },
  {
    id: 102,
    title: 'Cine PE - Festival do Audiovisual',
    category: 'Telas',
    date: '2026-10-05T19:30:00',
    location: 'Cinema São Luiz, Recife',
    description: 'A 30ª edição do maior festival de cinema de Pernambuco, com mostras competitivas e debates.',
    image: 'https://visit.recife.pe.gov.br/sites/default/files/styles/large/public/2023-05/cine_sao_luiz_0.jpg',
    price: 'R$ 10',
    instagramLink: 'https://www.instagram.com/festivalcinepe',
    ticketLink: 'https://www.cinepe.com.br'
  },
  {
    id: 103,
    title: 'Brennand: A Arte da Terra',
    category: 'Artes',
    date: '2026-09-20T10:00:00',
    location: 'Oficina Cerâmica Francisco Brennand',
    description: 'Exposição permanente e mostras temporárias no santuário artístico da Várzea.',
    image: 'https://visit.recife.pe.gov.br/sites/default/files/styles/large/public/2023-05/oficina_brennand_0.jpg',
    price: 'R$ 30',
    instagramLink: 'https://www.instagram.com/oficinabrennand',
    ticketLink: 'https://www.oficinabrennand.org.br'
  },
  {
    id: 104,
    title: 'Domingo na Arena',
    category: 'Rua',
    date: '2026-09-13T09:00:00',
    location: 'Arena de Pernambuco, São Lourenço',
    description: 'Um dia de lazer com polo esportivo, brinquedos infláveis, feira e shows gratuitos.',
    image: 'https://visit.recife.pe.gov.br/sites/default/files/styles/large/public/2023-05/arena_pe_0.jpg',
    price: 'Gratuito',
    instagramLink: 'https://www.instagram.com/arenapernambuco',
    ticketLink: ''
  },
  {
    id: 105,
    title: 'Teatro Mirim: O Mágico de Oz',
    category: 'Infantil',
    date: '2026-09-19T16:00:00',
    location: 'Teatro Luiz Mendonça, Parque Dona Lindu',
    description: 'Uma adaptação encantadora do clássico para toda a família em um dos palcos mais bonitos da orla.',
    image: 'https://visit.recife.pe.gov.br/sites/default/files/styles/large/public/2023-05/parque_dona_lindu_0.jpg',
    price: 'R$ 40',
    instagramLink: 'https://www.instagram.com/parquedonalindu',
    ticketLink: ''
  }
]; 
