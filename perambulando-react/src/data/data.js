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
  {
    name: 'UCI Kinoplex Tacaruna',
    location: 'Shopping Tacaruna, Santo Amaro',
    ticketLink: 'https://www.ucicinemas.com.br/cinemas/uci-kinoplex-tacaruna-12',
    instagramLink: 'https://www.instagram.com/ucicinemas',
    movies: [
      { title: 'O Auto da Compadecida 2', genre: 'Comédia, Nacional', rating: '12 anos', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800', synopsis: 'A amizade de João Grilo e Chicó é posta à prova.', sessions: [{ date: '2026-09-08', time: '15:00', type: 'Nacional' }, { date: '2026-09-09', time: '17:30', type: 'Nacional' }] },
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
  { id: 2, name: 'Parraxaxá', category: 'Restaurante', cuisine: 'Comida Regional', location: 'Casa Forte', priceRange: '$$$', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800', specialty: 'Buffet de comida nordestina.' },
]

// =======================================================
// DADOS DE FEIRAS
// =======================================================
export const feirasData = [
  { id: 1, name: 'Feira de Boa Viagem', zone: 'Sul', address: 'Praça de Boa Viagem, Recife', days: 'Domingos', type: 'Artesanato', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800' },
]

// =======================================================
// DADOS DE ROTEIROS
// =======================================================
export const roteirosData = [
  {
    id: 1,
    title: 'Recife Antigo',
    duration: '1 dia',
    category: 'Cultura',
    image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=800',
    description: 'Explore o coração histórico do Recife.',
    stops: ['Marco Zero', 'Rua do Bom Jesus'],
  },
]

// Exportar mockEventsData para manter compatibilidade se necessário em algum lugar
export const mockEventsData = []; 
