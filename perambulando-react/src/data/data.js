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
  },
  {
    id: 201,
    title: 'Sexta Dançante',
    category: 'Palcos',
    date: '2026-05-01T17:00:00',
    location: 'Clube das Pás - Campo Grande, Recife',
    description: 'O feriado pede um passinho no salão mais tradicional da cidade ao som da Orquestra das Pás e Banda Kabaret. É a oportunidade perfeita para celebrar o Dia do Trabalhador com a elegância dos antigos bailes recifenses. Ingressos disponíveis na bilheteria física (Rua Odorico Mendes, 263).',
    image: 'https://www.clubedaspas.com.br/fotos/sexta_dancante_recife.jpg',
    price: 'R$ 30,00 (Meia para todos)',
    instagramLink: 'http://agendaculturaldorecife.blogspot.com/2026/04/o-clube-das-pas-promove-sexta-dancante.html',
    ticketLink: ''
  },
  {
    id: 202,
    title: 'Diogo Nogueira - Infinito Samba',
    category: 'Palcos',
    date: '2026-05-02T21:00:00',
    location: 'Classic Hall - Salgadinho, Olinda',
    description: 'O herdeiro do samba carioca traz o calor do Rio para o limite entre Recife e Olinda em uma noite de celebração aos clássicos do gênero. Prepare a voz para cantar do início ao fim em um dos maiores palcos do estado.',
    image: 'https://cdn.folhape.com.br/upload/dn_arquivo/2024/01/design-sem-nome_1.png',
    price: 'A partir de R$ 70,00',
    instagramLink: 'https://www.bilheteriadigital.com/infinito-samba-diogo-nogueira-recife-02-de-maio',
    ticketLink: 'https://www.bilheteriadigital.com/infinito-samba-diogo-nogueira-recife-02-de-maio'
  },
  {
    id: 203,
    title: 'Chico César - Nova Turnê "FOFO"',
    category: 'Palcos',
    date: '2026-05-02T20:00:00',
    location: 'Teatro do Parque (Boa Vista, Recife)',
    description: 'O mestre paraibano ocupa o palco-jardim mais charmoso da cidade para lançar seu novo álbum. Entre arranjos contemporâneos e a poesia afiada de sempre, Chico promete um abraço rítmico que celebra a resistência e a alegria nordestina.',
    image: 'https://diariodoestadogo.com.br/wp-content/uploads/2026/05/chico-cesar-recife.jpg',
    price: 'R$ 100,00 (meia) / R$ 200,00 (inteira)',
    instagramLink: 'https://www.instagram.com/chicocesar/',
    ticketLink: 'https://bileto.sympla.com.br/event/117858'
  },
  {
    id: 204,
    title: 'Men At Work - Turnê Brasil 2026',
    category: 'Palcos',
    date: '2026-05-08T21:00:00',
    location: 'Pavilhão do Centro de Convenções (Olinda)',
    description: 'A icônica banda australiana desembarca em solo pernambucano para uma noite de pura nostalgia oitentista. Prepare-se para cantar clássicos como "Down Under" em uma apresentação única que une gerações no pavilhão de Olinda.',
    image: 'https://cdn.folhape.com.br/upload/dn_arquivo/2025/10/men-at-work.jpg',
    price: 'A partir de R$ 90,00 (meia-entrada)',
    instagramLink: 'https://www.instagram.com/menatwork/',
    ticketLink: 'https://www.bilheteriadigital.com/men-at-work-recife-08-de-maio'
  },
  {
    id: 205,
    title: 'A Última Entrevista (Marília Gabriela e Theodoro Cochrane)',
    category: 'Palcos',
    date: '2026-05-07T19:00:00',
    location: 'Teatro RioMar (Pina, Recife)',
    description: 'Em um encontro emocionante e provocativo, mãe e filho viram o jogo: desta vez, quem responde às perguntas é a própria Marília Gabriela. Um espetáculo que mistura realidade e ficção sobre memória e laços familiares.',
    image: 'https://www.riomarrecife.com.br/fotos/marilia_gabriela_teatro.jpg',
    price: 'Verificar no link',
    instagramLink: 'https://www.instagram.com/gabi_mariliagabriela/',
    ticketLink: 'https://uhuu.com/v/teatro-riomar-recife-80'
  },
  {
    id: 206,
    title: 'Jota.pê no Projeto Seis e Meia',
    category: 'Palcos',
    date: '2026-05-08T18:30:00',
    location: 'Teatro do Parque (Boa Vista, Recife)',
    description: 'Vencedor de três Grammys Latinos, Jota.pê traz sua voz grave e envolvente para o palco do Parque. A noite começa com o gingado latino da banda Los Cubanos, garantindo um encontro musical sofisticado e vibrante.',
    image: 'https://conecta.recife.pe.gov.br/fotos/jota_pe_recife.jpg',
    price: 'Verificar no link',
    instagramLink: 'https://www.instagram.com/jota.peoficial/',
    ticketLink: 'https://www.sympla.com.br/evento/projeto-seis-e-meia-recife-jota-pe/4721'
  },
  {
    id: 207,
    title: 'Daniela Araújo - A Turnê 2026',
    category: 'Palcos',
    date: '2026-05-02T19:00:00',
    location: 'Teatro de Santa Isabel (Santo Antônio, Recife)',
    description: 'Uma noite intimista em celebração aos 15 anos de carreira de uma das vozes mais potentes da música cristã contemporânea. O cenário histórico do Santa Isabel é o convite perfeito para uma jornada de emoção e espiritualidade.',
    image: 'https://bileto.sympla.com.br/fotos/daniela_araujo_recife.jpg',
    price: 'Verificar no link',
    instagramLink: 'https://www.instagram.com/daniela_araujo/',
    ticketLink: 'https://bileto.sympla.com.br/event/118323'
  },
  {
    id: 208,
    title: 'Espetáculo "Nas Selvas do Brazyl"',
    category: 'Palcos',
    date: '2026-05-02T20:00:00',
    location: 'Teatro Luiz Mendonça (Boa Viagem, Recife)',
    description: 'A peça propõe uma reflexão profunda sobre colonização, meio ambiente e relações de poder através de uma expedição histórica. Uma montagem potente que ocupa o palco do Parque Dona Lindu com drama contemporâneo de alta qualidade.',
    image: 'https://www2.recife.pe.gov.br/fotos/nas_selvas_do_brazyl.jpg',
    price: 'Verificar no link',
    instagramLink: 'https://www.instagram.com/nasselvas.teatro/',
    ticketLink: 'https://teatroluizmendonca.byinti.com/'
  },
  {
    id: 209,
    title: 'Supertramp Experience',
    category: 'Palcos',
    date: '2026-05-02T21:00:00',
    location: 'Teatro RioMar (Pina, Recife)',
    description: 'A melhor homenagem ao Supertramp do mundo chega ao Recife para uma viagem sonora pelos grandes sucessos do rock progressivo. Uma noite para fechar os olhos e se deixar levar pelos clássicos que marcaram gerações.',
    image: 'https://www.teatroriomarrecife.com.br/fotos/supertramp_experience.jpg',
    price: 'Verificar no link',
    instagramLink: 'https://www.instagram.com/supertrampexperience/',
    ticketLink: 'https://uhuu.com/evento/pe/recife/supertramp-experience-11234'
  },
  {
    id: 210,
    title: 'Gola Rolê 20 Anos - Pabllo Vittar e Tati Quebra Barraco',
    category: 'Palcos',
    date: '2026-05-09T20:00:00',
    location: 'Pavilhão do Centro de Convenções - Salgadinho, Olinda',
    description: 'A festa mais democrática do Recife celebra duas décadas com um encontro explosivo entre a maior drag queen do mundo e a rainha do funk. Uma ocupação de brilho, resistência e muito grave para sacudir as estruturas do Cecon.',
    image: 'https://www.sympla.com.br/fotos/gola20_vittar_tati.jpg',
    price: 'A partir de R$ 120,00 (meia-entrada)',
    instagramLink: 'https://www.sympla.com.br/evento/gola20-pabllo-vittar-tati-quebra-barraco/3253639',
    ticketLink: 'https://www.sympla.com.br/evento/gola20-pabllo-vittar-tati-quebra-barraco/3253639'
  },
  {
    id: 301,
    title: '5ª Semana do Audiovisual Negro (SAN)',
    category: 'Telas',
    date: '2026-05-02T14:00:00',
    location: 'Cinema São Luiz (Boa Vista, Recife)',
    description: 'O cinema mais bonito do país abre suas portas para celebrar a identidade e a resistência negra através de 41 curtas e videoartes. É uma ocupação política e estética imperdível, com debates que pulsam no coração da Rua da Aurora.',
    image: 'https://www.pretessencias.com.br/fotos/semana_audiovisual_negro_recife.jpg',
    price: 'Entrada Gratuita',
    instagramLink: 'https://www.instagram.com/semanadoaudiovisualnegro/',
    ticketLink: ''
  },
  {
    id: 302,
    title: 'Estreia Nacional: "O Riso e a Faca"',
    category: 'Telas',
    date: '2026-05-01T20:00:00',
    location: 'Cinema da Fundação - Sala Museu (Casa Forte, Recife)',
    description: 'Um mergulho profundo nas fronteiras humanas através da jornada de um engenheiro português na África Ocidental. A Sala Museu oferece o clima acolhedor ideal para apreciar este cinema de autor que desafia os sentidos.',
    image: 'https://www.adorocinema.com/poster/o_riso_e_a_faca_brasil.jpg',
    price: 'Verificar no link',
    instagramLink: 'https://www.instagram.com/cinemadafundacao/',
    ticketLink: 'https://www.veloxtickets.com/Portal/Local/cinema/Recife/Fundacao-Joaquim-Nabuco/FJN'
  },
  {
    id: 303,
    title: 'Clássico de Terror: "Veneno para as Fadas"',
    category: 'Telas',
    date: '2026-05-01T14:00:00',
    location: 'Cinema da Fundação - Sala Museu (Casa Forte, Recife)',
    description: 'Que tal um feriado com um clássico do terror mexicano? A história de Flávia e sua amiga que acredita ser bruxa transforma a infância em um pesadelo visual inesquecível na tela da Sala Museu.',
    image: 'https://www.adorocinema.com/poster/veneno_para_las_hadas.jpg',
    price: 'Verificar no link',
    instagramLink: 'https://www.instagram.com/cinemadafundacao/',
    ticketLink: 'https://www.veloxtickets.com/Portal/Local/cinema/Recife/Fundacao-Joaquim-Nabuco/FJN'
  },
  {
    id: 401,
    title: 'Exposição "Sobre águas" - Vera Reichert',
    category: 'Artes',
    date: '2026-05-03T14:00:00',
    location: 'Museu do Estado de Pernambuco - MEPE (Graças, Recife)',
    description: 'Um mergulho sensorial e urgente sobre o elemento que define a vida na Terra e a memória do Recife. As esculturas retroiluminadas e instalações de Reichert transformam o casarão das Graças em um oceano de reflexão.',
    image: 'https://www.cultura.pe.gov.br/wp-content/uploads/2026/03/vera_reichert_mepe.jpg',
    price: 'Entrada Gratuita',
    instagramLink: 'https://www.instagram.com/museudoestadope/',
    ticketLink: ''
  },
  {
    id: 402,
    title: 'Exposição "Árvore da Palavra" - Roberta Guimarães',
    category: 'Artes',
    date: '2026-05-03T10:00:00',
    location: 'Museu do Estado de Pernambuco - MEPE (Graças, Recife)',
    description: 'A fotógrafa Roberta Guimarães captura a essência das mãos que criam e a força do verbo na cultura nordestina. Uma mostra delicada que dialoga com a ancestralidade e as tradições manuais de nossa terra.',
    image: 'https://www.opoder.com.br/fotos/roberta_guimaraes_mepe.jpg',
    price: 'Entrada Gratuita',
    instagramLink: 'https://www.instagram.com/robertaguimarafoto/',
    ticketLink: ''
  },
  {
    id: 501,
    title: 'Café na Rua - Abertura do Recife Coffee 2026',
    category: 'Rua',
    date: '2026-05-02T09:00:00',
    location: 'Avenida Rio Branco (Bairro do Recife)',
    description: 'O boulevard mais famoso do Recife Antigo se transforma em um laboratório de cafés especiais com degustações gratuitas e competições de arte no leite. É o despertar perfeito para o sábado, celebrando a cultura cafeeira com música e vivências culturais ao ar livre.',
    image: 'https://jc.uol.com.br/receitadaboa/11o-recife-coffee-comeca-neste-domingo-e-reune-34-cafeterias-do-grande-recife-e-agreste.html',
    price: 'Acesso Livre (Degustação gratuita)',
    instagramLink: 'https://www.instagram.com/recifecoffeeoficial/',
    ticketLink: ''
  },
  {
    id: 502,
    title: 'Olha! Recife de Catamarã: Recife e Suas Pontes',
    category: 'Rua',
    date: '2026-05-02T09:00:00',
    location: 'Saída do Cais de Santa Rita (Recife)',
    description: 'Uma perspectiva única da "Veneza Brasileira" vista das águas do Capibaribe. O passeio gratuito revela as histórias e arquiteturas das pontes que definem a geografia e a alma da capital pernambucana.',
    image: 'https://visit.recife.pe.gov.br/olha-recife',
    price: 'Gratuito',
    instagramLink: 'https://www.instagram.com/visitrecife/',
    ticketLink: 'http://www.olharecife.com.br/'
  },
  {
    id: 503,
    title: 'Concerto no Parque: Orquestra Rockfônica',
    category: 'Rua',
    date: '2026-05-03T16:30:00',
    location: 'Parque da Tamarineira (Tamarineira, Recife)',
    description: 'Uma tarde sensorial que une o erudito ao rock sob as copas das árvores da Zona Norte. O repertório transita entre Vivaldi e Alceu Valença, oferecendo 60 minutos de música instrumental em harmonia com a natureza.',
    image: 'https://www.leiaja.com/entretenimento/2026/04/29/orquestra-rockfonica-faz-concerto-ao-ar-livre-no-parque-da-tamarineira/',
    price: 'Acesso Gratuito',
    instagramLink: 'https://www.instagram.com/prefeiturarecife/',
    ticketLink: ''
  },
  {
    id: 601,
    title: 'Show "Cacau, Lulu e o Manguebitinho"',
    category: 'Infantil',
    date: '2026-05-03T16:00:00',
    location: 'Teatro do Parque (Boa Vista, Recife)',
    description: 'Um presente para a garotada descobrir o movimento Manguebeat com a energia da Fada Magrinha Lulu Araújo e Cláudia Soul. O show lúdico convida as novas gerações a fincarem suas raízes na cultura recifense com muito ritmo e história.',
    image: 'https://www.diariodepernambuco.com.br/viver/2025/10/11697661-manguebeat-para-criancas-anima-o-teatro-do-parque-no-dia-das-criancas.html',
    price: 'A partir de R$ 20,00',
    instagramLink: 'https://www.instagram.com/fadameagrinha/',
    ticketLink: 'https://www.sympla.com.br/evento/cacau-e-lulu-e-o-manguebitinho/3373485'
  },
  {
    id: 602,
    title: 'Oficina de Barro Infantil com Mestre Nena',
    category: 'Infantil',
    date: '2026-05-03T16:00:00',
    location: 'Jardins do Museu do Estado - MEPE (Graças, Recife)',
    description: 'Uma experiência tátil nos jardins do museu onde as crianças aprendem a moldar a tradição pernambucana sob a guia de um mestre da arte popular. Atividade educativa que une lazer e valorização patrimonial para os pequenos.',
    image: 'https://www.opoder.com.br/noticias/30967/museu-do-estado-de-pernambuco-realiza-13a-feira-nafoz',
    price: 'Entrada Gratuita',
    instagramLink: 'https://www.instagram.com/museudoestadope/',
    ticketLink: ''
  }
]; 
