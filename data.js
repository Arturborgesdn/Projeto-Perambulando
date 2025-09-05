// data.js

// =======================================================
// DADOS PARA A PÁGINA INICIAL (INDEX.HTML)
// =======================================================
const mockEventsData = [
    {   id: 1, 
        title: 'Show de Lenine e Orquestra', 
        category: 'Shows', 
        genre: 'MPB, Rock',
        date: '2025-09-26T21:00:00',
        location: 'Classic Hall, Olinda', 
        price: 'R$ 80', 
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop', 
        description: 'Uma noite inesquecível com o mestre Lenine acompanhado pela Orquestra Sinfônica do Recife...' },
    
    {   id: 2, 
        title: 'Noite do Brega Romântico', 
        category: 'Shows', 
        genre: 'Brega, Romântico',
        date: '2025-09-19T22:00:00', 
        location: 'Clube das Pás, Encruzilhada', 
        price: 'R$ 40', 
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop', 
        description: 'Prepare o coração para uma noite de muito romance...' 
    },
    { 
        id: 3, 
        title: 'Exposição "Luz e Sombra" de Abelardo da Hora', 
        category: 'Exposições', 
        genre: 'Artes Visuais',
        date: '2025-10-01T10:00:00', 
        location: 'Instituto Ricardo Brennand, Várzea', 
        price: 'R$ 30', 
        image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop', 
        description: 'Uma retrospectiva completa da obra de Abelardo da Hora...' 
    },
    { 
        id: 4, 
        title: 'Passeio de Catamarã pelo Rio Capibaribe', 
        category: 'Lazer', 
        genre: 'Passeio', 
        date: '2025-09-28T16:00:00', 
        location: 'Cais das Cinco Pontas, Recife Antigo', 
        price: 'R$ 45', 
        image: 'https://images.unsplash.com/photo-1620021313245-8c792f3e8b0a?q=80&w=800&auto=format&fit=crop', 
        description: 'Descubra as pontes e histórias do Recife de uma perspectiva única...' 
    },
    { 
        id: 5, 
        title: 'Contação de Histórias com Tapete Voador', 
        category: 'Infantil', 
        genre: 'Contação de histórias',
        date: '2025-09-27T15:00:00', 
        location: 'Livraria Jaqueira, Jaqueira', 
        price: 'Gratuito', 
        image: 'https://images.unsplash.com/photo-1521714161819-15534968fc5f?q=80&w=800&auto=format&fit=crop', 
        description: 'Uma tarde mágica para a criançada...' 
    },
    { 
        id: 6, 
        title: 'Happy Hour com Música ao Vivo', 
        category: 'Shows', 
        genre: 'Rock',
        date: '2025-09-02T19:00:00', 
        location: 'Bar Central, Santo Amaro', 
        price: 'Couvert R$ 10', 
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop', 
        description: 'Relaxe após o trabalho...' 
    },

    {
        id: 7, // Certifique-se de que o ID seja único
        title: 'Recife em Foco: Um Olhar Fotográfico',
        category: 'Exposições',
        genre: 'Fotografia', // <-- ADICIONADO
        date: '2025-09-15T09:00:00',
        location: 'Caixa Cultural Recife, Recife Antigo',
        price: 'Gratuito',
        image: 'https://images.unsplash.com/photo-1516900557549-4155312b3e5c?q=80&w=800&auto=format&fit=crop',
        description: 'Uma coleção de fotografias que capturam a alma e a arquitetura do Recife através das lentes de artistas locais.'
    },

    {
        id: 8, // Certifique-se de que o ID seja único
        title: 'Visita à Oficina Cerâmica Francisco Brennand',
        category: 'Lazer',
        genre: 'Arte e Cultura', // <-- ADICIONADO
        date: '2025-09-10T14:00:00',
        location: 'Várzea, Recife',
        price: 'R$ 40',
        image: 'https://i.imgur.com/8QW5z2b.jpg',
        description: 'Explore o universo místico e monumental de Francisco Brennand, com suas esculturas e jardins exuberantes.'
    },
    {
        id: 9, // Certifique-se de que o ID seja único
        title: 'Piquenique no Parque da Jaqueira',
        category: 'Lazer',
        genre: 'Parque e Ar Livre', // <-- ADICIONADO
        date: '2025-09-06T15:00:00',
        location: 'Parque da Jaqueira, Jaqueira',
        price: 'Gratuito',
        image: 'https://i.imgur.com/0fW5aK2.jpg',
        description: 'Aproveite a vasta área verde do Parque da Jaqueira para um piquenique relaxante com a família e amigos.'
    },

    {
        id: 10, // Certifique-se de que o ID seja único
        title: 'Oficina de Argila para Crianças',
        category: 'Infantil',
        genre: 'Oficina Criativa', // <-- ADICIONADO
        date: '2025-09-07T10:00:00', // Domingo
        location: 'Oficina Brennand, Várzea',
        price: 'R$ 50',
        image: 'https://images.unsplash.com/photo-1596420267212-352112a14c63?q=80&w=800&auto=format&fit=crop',
        description: 'Uma manhã divertida onde as crianças podem colocar a mão na massa e criar suas próprias peças de argila.'
    },
    {
        id: 11, // Certifique-se de que o ID seja único
        title: 'Teatrinho: Os Três Porquinhos',
        category: 'Infantil',
        genre: 'Teatro Infantil', // <-- ADICIONADO
        date: '2025-09-07T16:00:00', // Domingo
        location: 'Teatro do Parque, Boa Vista',
        price: 'R$ 30',
        image: 'https://images.unsplash.com/photo-1616463530799-51a4a40875c7?q=80&w=800&auto=format&fit=crop',
        description: 'Uma adaptação divertida e musical do clássico conto dos Três Porquinhos, com muita interação com a plateia.'
    }
];


// =======================================================
// DADOS PARA A PÁGINA DE CINEMA (CINEMA.HTML)
// =======================================================
const cinemaData = [
    { 
        name: "Cinemark RioMar",
        location: "Shopping RioMar, Pina",
        movies: [ { title: "Duna: Parte Dois", 
        genre: "Ficção Científica, Aventura",
        rating: "12 anos", 
        poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", 
        synopsis: "Paul Atreides se une a Chani e aos Fremen em uma guerra de vingança contra os conspiradores que destruíram sua família...", 
        sessions: [
        { date: "2025-09-05", time: "17:45", type: "Legendado" },
        { date: "2025-09-06", time: "21:00", type: "Legendado - IMAX" } ] }, 
        
        { title: "Divertida Mente 2", 
        genre: "Animação, Família", 
        rating: "Livre", 
        poster: "https://m.media-amazon.com/images/M/MV5BMGFjZDVhNTctNjU2OS00N2E1LWI3ZDMtZThiYTIzYWNhMjk3XkEyXkFqcGc@._V1_.jpg", 
        synopsis: "A sala de controle mental de Riley passa por uma demolição súbita para dar lugar a algo totalmente inesperado...", 
        sessions: [ 
        { date: "2025-09-05", time: "14:00", type: "Dublado - 3D" }, 
        { date: "2025-09-07", time: "16:15", type: "Dublado" } ] } ] },

        { name: "UCI Kinoplex Tacaruna", 
        location: "Shopping Tacaruna, Santo Amaro", 
        movies: [ { title: "O Auto da Compadecida 2", 
        genre: "Comédia, Nacional", 
        rating: "12 anos", 
        poster: "https://br.web.img3.acsta.net/c_310_420/img/e8/f2/e8f24b869f741946d906755319d1b213.jpg", 
        synopsis: "Vinte e cinco anos depois, a amizade de João Grilo e Chicó é posta à prova...", 
        sessions: [ 
        { date: "2025-09-08", time: "15:00", type: "Nacional" }, 
        { date: "2025-09-09", time: "17:30", type: "Nacional" } ] } ] }
];


// =======================================================
// DADOS PARA A PÁGINA DE TEATRO (TEATRO.HTML)
// =======================================================
const teatroData = [
    { name: "Teatro de Santa Isabel", 
    location: "Praça da República, Santo Antônio", 
    shows: [ 
    
    { title: "O Auto da Compadecida", 
    genre: "Comédia, Clássico", 
    rating: "12 anos", 
    poster: "https://i.imgur.com/kS94b2W.jpg", 
    synopsis: "As aventuras de João Grilo...", 
    sessions: [
    { date: "2025-09-05", time: "20:00", price: "R$ 60" }, 
    { date: "2025-09-06", time: "17:00", price: "R$ 60" }] }, 
    
    { title: "Musical 'O Fantasma da Ópera'",
    genre: "Musical, Romance", 
    rating: "12 anos", 
    poster: "https://i.imgur.com/1vJ7E0P.jpg", 
    synopsis: "Um gênio musical desfigurado...", 
    sessions: [
    { date: "2025-09-07", time: "21:00", price: "R$ 150" }, 
    { date: "2025-09-05", time: "21:00", price: "R$ 150" }] } ] },


    { name: "Teatro do Parque", 
    location: "Rua do Hospício, Boa Vista", shows: [ 
    { title: "Macbeth", 
    genre: "Drama, Tragédia", 
    rating: "12 anos", 
    poster: "https://i.imgur.com/vHqJ9cQ.jpg", 
    synopsis: "Um ambicioso general escocês...", 
    sessions: [{ date: "2025-09-08", time: "19:30", price: "R$ 80" }] }, 
    { title: "A Vendedora de Fósforos",
     genre: "Infantil", 
     rating: "Livre", 
     poster: "https://i.imgur.com/3Yx4KxX.jpg", 
     synopsis: "Uma reinterpretação do clássico conto...", 
     sessions: [{ date: "2025-09-06", time: "16:00", price: "R$ 30" }] } ] }
];


// =======================================================
// DADOS PARA A PÁGINA DE RESTAURANTES (RESTAURANTES.HTML)
// =======================================================
const foodData = [
    { id: 1, 
    name: "Leite", 
    category: "Restaurante", 
    cuisine: "Regional Sofisticado", 
    location: "Praça Joaquim Nabuco, Santo Antônio", 
    priceRange: "$$$$", 
    image: "https://i.imgur.com/GzB0G2d.jpg", 
    specialty: "O restaurante mais antigo do Brasil em funcionamento." },
    { id: 2, 
    name: "Parraxaxá", 
    category: "Restaurante", 
    cuisine: "Comida Regional", 
    location: "Casa Forte", 
    priceRange: "$$$", 
    image: "https://i.imgur.com/yv8o2wR.jpg", 
    specialty: "Buffet self-service com grande variedade de pratos nordestinos." },
    { id: 3, 
    name: "Seu Boteco", 
    category: "Bar", 
    cuisine: "Boteco", 
    location: "Recife Antigo", 
    priceRange: "$$$", 
    image: "https://i.imgur.com/8Qh1W6d.jpg", 
    specialty: "Chopp gelado e petiscos com vista para o Marco Zero." },
    { id: 4, 
    name: "Tapioca da Guedes", 
    category: "Comida de Rua", 
    cuisine: "Tapiocaria", 
    location: "Alto da Sé, Olinda", 
    priceRange: "$", 
    image: "https://i.imgur.com/c5Bv6g5.jpg", 
    specialty: "Tapiocas tradicionais com uma vista espetacular." },
    { id: 5, 
    name: "UK Pub", 
    category: "Bar", 
    cuisine: "Pub Inglês", 
    location: "Rua Francisco da Cunha, Boa Viagem", 
    priceRange: "$$$", 
    image: "https://i.imgur.com/sS8t7hN.jpg", 
    specialty: "Rock ao vivo e grande variedade de cervejas importadas." }
];


// =======================================================
// DADOS PARA A PÁGINA DE FEIRAS (FEIRAS.HTML)
// =======================================================
const feirasData = [
    { id: 1, 
    name: "Feira de Casa Amarela", 
    zone: "Norte", 
    address: "Mercado de Casa Amarela, Recife", 
    days: "Diariamente", 
    type: "Geral" },
    { id: 2, 
    name: "Feira de Boa Viagem", 
    zone: "Sul", 
    address: "Praça de Boa Viagem, Recife", 
    days: "Domingos", 
    type: "Artesanato e Gastronomia" },
    { id: 3, 
    name: "Feira Orgânica do Parnamirim", 
    zone: "Norte", 
    address: "Praça do Parnamirim, Recife", 
    days: "Sábados", 
    type: "Orgânicos" },
    { id: 4, 
    name: "Feira do Cordeiro", 
    zone: "Oeste", 
    address: "Parque de Exposições do Cordeiro", 
    days: "Sábados", 
    type: "Animais e Geral" },
    { id: 5, 
    name: "Feira do Bom Jesus", 
    zone: "Centro", 
    address: "Rua do Bom Jesus, Recife Antigo", 
    days: "Domingos", 
    type: "Artesanato" }
];
