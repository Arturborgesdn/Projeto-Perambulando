require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockEventsData = [
  { title: 'Show de Lenine e Orquestra', category: 'Palcos', genre: 'MPB, Rock', date: new Date('2026-09-26T21:00:00'), location: 'Classic Hall, Olinda', price: 'R$ 80', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=800&auto=format&fit=crop', description: 'Uma noite inesquecível com o mestre Lenine acompanhado pela Orquestra Sinfônica do Recife.', ticketLink: 'https://www.eventim.com.br', instagramLink: 'https://www.instagram.com/lenine' },
  { title: 'Noite do Brega Romântico', category: 'Palcos', genre: 'Brega, Romântico', date: new Date('2026-09-19T22:00:00'), location: 'Clube das Pás, Encruzilhada', price: 'R$ 40', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop', description: 'Prepare o coração para uma noite de muito romance.', ticketLink: 'https://www.sympla.com.br', instagramLink: 'https://www.instagram.com/clubedaspas' },
  { title: 'Exposição "Luz e Sombra" de Abelardo da Hora', category: 'Artes', genre: 'Artes Visuais', date: new Date('2026-10-01T10:00:00'), location: 'Instituto Ricardo Brennand, Várzea', price: 'R$ 30', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop', description: 'Uma retrospectiva completa da obra de Abelardo da Hora.', ticketLink: 'https://www.institutoricardobrennand.org.br', instagramLink: 'https://www.instagram.com/institutorb' },
  { title: 'Passeio de Catamarã pelo Rio Capibaribe', category: 'Rua', genre: 'Passeio', date: new Date('2026-09-28T16:00:00'), location: 'Cais das Cinco Pontas, Recife Antigo', price: 'R$ 45', image: 'https://images.unsplash.com/photo-1620021313245-8c792f3e8b0a?q=80&w=800&auto=format&fit=crop', description: 'Descubra as pontes e histórias do Recife de uma perspectiva única.', ticketLink: 'https://www.catamaratours.com.br', instagramLink: 'https://www.instagram.com/catamaratours' },
  { title: 'Contação de Histórias com Tapete Voador', category: 'Infantil', genre: 'Contação de histórias', date: new Date('2026-09-27T15:00:00'), location: 'Livraria Jaqueira, Jaqueira', price: 'Gratuito', image: 'https://images.unsplash.com/photo-1521714161819-15534968fc5f?q=80&w=800&auto=format&fit=crop', description: 'Uma tarde mágica para a criançada.', instagramLink: 'https://www.instagram.com/livrariajaqueira' },
  { title: 'Happy Hour com Música ao Vivo', category: 'Palcos', genre: 'Rock', date: new Date('2026-09-02T19:00:00'), location: 'Bar Central, Santo Amaro', price: 'Couvert R$ 10', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop', description: 'Relaxe após o trabalho.', instagramLink: 'https://www.instagram.com/barcentralrecife' },
  { title: 'Recife em Foco: Um Olhar Fotográfico', category: 'Artes', genre: 'Fotografia', date: new Date('2026-09-15T09:00:00'), location: 'Caixa Cultural Recife, Recife Antigo', price: 'Gratuito', image: 'https://images.unsplash.com/photo-1516900557549-4155312b3e5c?q=80&w=800&auto=format&fit=crop', description: 'Uma coleção de fotografias que capturam a alma e a arquitetura do Recife.', instagramLink: 'https://www.instagram.com/caixaculturalrecife' },
  { title: 'Visita à Oficina Cerâmica Francisco Brennand', category: 'Rua', genre: 'Arte e Cultura', date: new Date('2026-09-10T14:00:00'), location: 'Várzea, Recife', price: 'R$ 40', image: 'https://i.imgur.com/8QW5z2b.jpg', description: 'Explore o universo místico e monumental de Francisco Brennand.', ticketLink: 'https://www.oficinabrennand.org.br', instagramLink: 'https://www.instagram.com/oficinabrennand' },
  { title: 'Piquenique no Parque da Jaqueira', category: 'Rua', genre: 'Parque e Ar Livre', date: new Date('2026-09-06T15:00:00'), location: 'Parque da Jaqueira, Jaqueira', price: 'Gratuito', image: 'https://i.imgur.com/0fW5aK2.jpg', description: 'Aproveite a vasta área verde do Parque da Jaqueira.', instagramLink: 'https://www.instagram.com/parquejaqueira' },
  { title: 'Oficina de Argila para Crianças', category: 'Infantil', genre: 'Oficina Criativa', date: new Date('2026-09-07T10:00:00'), location: 'Oficina Brennand, Várzea', price: 'R$ 50', image: 'https://images.unsplash.com/photo-1596420267212-352112a14c63?q=80&w=800&auto=format&fit=crop', description: 'Uma manhã divertida onde as crianças criam suas próprias peças de argila.', ticketLink: 'https://www.oficinabrennand.org.br', instagramLink: 'https://www.instagram.com/oficinabrennand' },
  { title: 'Teatrinho: Os Três Porquinhos', category: 'Infantil', genre: 'Teatro Infantil', date: new Date('2026-09-07T16:00:00'), location: 'Teatro do Parque, Boa Vista', price: 'R$ 30', image: 'https://images.unsplash.com/photo-1616463530799-51a4a40875c7?q=80&w=800&auto=format&fit=crop', description: 'Uma adaptação divertida e musical do clássico conto dos Três Porquinhos.', ticketLink: 'https://www.sympla.com.br', instagramLink: 'https://www.instagram.com/teatrodoparque' },
  { 
    title: 'Sexta Dançante', 
    category: 'Palcos', 
    genre: 'Bailes, Orquestra', 
    date: new Date('2026-05-01T17:00:00'), 
    location: 'Clube das Pás - Campo Grande, Recife', 
    price: 'R$ 30,00 (Meia para todos)', 
    image: 'https://www.clubedaspas.com.br/fotos/sexta_dancante_recife.jpg', 
    description: 'O feriado pede um passinho no salão mais tradicional da cidade ao som da Orquestra das Pás e Banda Kabaret. É a oportunidade perfeita para celebrar o Dia do Trabalhador com a elegância dos antigos bailes recifenses. Ingressos disponíveis na bilheteria física (Rua Odorico Mendes, 263).', 
    instagramLink: 'http://agendaculturaldorecife.blogspot.com/2026/04/o-clube-das-pas-promove-sexta-dancante.html' 
  },
  { 
    title: 'Diogo Nogueira - Infinito Samba', 
    category: 'Palcos', 
    genre: 'Samba', 
    date: new Date('2026-05-02T21:00:00'), 
    location: 'Classic Hall - Salgadinho, Olinda', 
    price: 'A partir de R$ 70,00', 
    image: 'https://cdn.folhape.com.br/upload/dn_arquivo/2024/01/design-sem-nome_1.png', 
    description: 'O herdeiro do samba carioca traz o calor do Rio para o limite entre Recife e Olinda em uma noite de celebração aos clássicos do gênero. Prepare a voz para cantar do início ao fim em um dos maiores palcos do estado.', 
    instagramLink: 'https://www.bilheteriadigital.com/infinito-samba-diogo-nogueira-recife-02-de-maio',
    ticketLink: 'https://www.bilheteriadigital.com/infinito-samba-diogo-nogueira-recife-02-de-maio'
  },
  { 
    title: 'Chico César - Nova Turnê "FOFO"', 
    category: 'Palcos', 
    genre: 'MPB', 
    date: new Date('2026-05-02T20:00:00'), 
    location: 'Teatro do Parque (Boa Vista, Recife)', 
    price: 'R$ 100,00 (meia) / R$ 200,00 (inteira)', 
    image: 'https://diariodoestadogo.com.br/wp-content/uploads/2026/05/chico-cesar-recife.jpg', 
    description: 'O mestre paraibano ocupa o palco-jardim mais charmoso da cidade para lançar seu novo álbum. Entre arranjos contemporâneos e a poesia afiada de sempre, Chico promete um abraço rítmico que celebra a resistência e a alegria nordestina.', 
    instagramLink: 'https://www.instagram.com/chicocesar/',
    ticketLink: 'https://bileto.sympla.com.br/event/117858'
  },
  { 
    title: 'A Última Entrevista (Marília Gabriela e Theodoro Cochrane)', 
    category: 'Palcos', 
    genre: 'Teatro', 
    date: new Date('2026-05-07T19:00:00'), 
    location: 'Teatro RioMar (Pina, Recife)', 
    price: 'Verificar no link', 
    image: 'https://www.riomarrecife.com.br/fotos/marilia_gabriela_teatro.jpg', 
    description: 'Em um encontro emocionante e provocativo, mãe e filho viram o jogo: desta vez, quem responde às perguntas é a própria Marília Gabriela. Um espetáculo que mistura realidade e ficção sobre memória e laços familiares.', 
    instagramLink: 'https://www.instagram.com/gabi_mariliagabriela/',
    ticketLink: 'https://uhuu.com/v/teatro-riomar-recife-80'
  },
  { 
    title: 'Men At Work - Turnê Brasil 2026', 
    category: 'Palcos', 
    genre: 'Rock, Pop', 
    date: new Date('2026-05-08T21:00:00'), 
    location: 'Pavilhão do Centro de Convenções (Olinda)', 
    price: 'A partir de R$ 90,00 (meia-entrada)', 
    image: 'https://cdn.folhape.com.br/upload/dn_arquivo/2025/10/men-at-work.jpg', 
    description: 'A icônica banda australiana desembarca em solo pernambucano para uma noite de pura nostalgia oitentista. Prepare-se para cantar clássicos como "Down Under" em uma presentation única que une gerações no pavilhão de Olinda.', 
    instagramLink: 'https://www.instagram.com/menatwork/',
    ticketLink: 'https://www.bilheteriadigital.com/men-at-work-recife-08-de-maio'
  },
  { 
    title: 'Jota.pê no Projeto Seis e Meia', 
    category: 'Palcos', 
    genre: 'MPB', 
    date: new Date('2026-05-08T18:30:00'), 
    location: 'Teatro do Parque (Boa Vista, Recife)', 
    price: 'Verificar no link', 
    image: 'https://conecta.recife.pe.gov.br/fotos/jota_pe_recife.jpg', 
    description: 'Vencedor de três Grammys Latinos, Jota.pê traz sua voz grave e envolvente para o palco do Parque. A noite começa com o gingado latino da banda Los Cubanos, garantindo um encontro musical sofisticado e vibrante.', 
    instagramLink: 'https://www.instagram.com/jota.peoficial/',
    ticketLink: 'https://www.sympla.com.br/evento/projeto-seis-e-meia-recife-jota-pe/4721'
  },
  { 
    title: 'Daniela Araújo - A Turnê 2026', 
    category: 'Palcos', 
    genre: 'Gospel', 
    date: new Date('2026-05-02T19:00:00'), 
    location: 'Teatro de Santa Isabel (Santo Antônio, Recife)', 
    price: 'Verificar no link', 
    image: 'https://bileto.sympla.com.br/fotos/daniela_araujo_recife.jpg', 
    description: 'Uma noite intimista em celebração aos 15 anos de carreira de uma das vozes mais potentes da música cristã contemporânea. O cenário histórico do Santa Isabel é o convite perfeito para uma jornada de emoção e espiritualidade.', 
    instagramLink: 'https://www.instagram.com/daniela_araujo/',
    ticketLink: 'https://bileto.sympla.com.br/event/118323'
  },
  { 
    title: 'Espetáculo "Nas Selvas do Brazyl"', 
    category: 'Palcos', 
    genre: 'Teatro', 
    date: new Date('2026-05-02T20:00:00'), 
    location: 'Teatro Luiz Mendonça (Boa Viagem, Recife)', 
    price: 'Verificar no link', 
    image: 'https://www2.recife.pe.gov.br/fotos/nas_selvas_do_brazyl.jpg', 
    description: 'A peça propõe uma reflexão profunda sobre colonização, meio ambiente e relações de poder através de uma expedição histórica. Uma montagem potente que ocupa o palco do Parque Dona Lindu com drama contemporâneo de alta qualidade.', 
    instagramLink: 'https://www.instagram.com/nasselvas.teatro/',
    ticketLink: 'https://teatroluizmendonca.byinti.com/'
  },
  { 
    title: 'Supertramp Experience', 
    category: 'Palcos', 
    genre: 'Rock', 
    date: new Date('2026-05-02T21:00:00'), 
    location: 'Teatro RioMar (Pina, Recife)', 
    price: 'Verificar no link', 
    image: 'https://www.teatroriomarrecife.com.br/fotos/supertramp_experience.jpg', 
    description: 'A melhor homenagem ao Supertramp do mundo chega ao Recife para uma viagem sonora pelos grandes sucessos do rock progressivo. Uma noite para fechar os olhos e se deixar levar pelos clássicos que marcaram gerações.', 
    instagramLink: 'https://www.instagram.com/supertrampexperience/',
    ticketLink: 'https://uhuu.com/evento/pe/recife/supertramp-experience-11234'
  },
  { 
    title: 'Gola Rolê 20 Anos - Pabllo Vittar e Tati Quebra Barraco', 
    category: 'Palcos', 
    genre: 'Pop, Funk', 
    date: new Date('2026-05-09T20:00:00'), 
    location: 'Pavilhão do Centro de Convenções - Salgadinho, Olinda', 
    price: 'A partir de R$ 120,00 (meia-entrada)', 
    image: 'https://www.sympla.com.br/fotos/gola20_vittar_tati.jpg', 
    description: 'A festa mais democrática do Recife celebra duas décadas com um encontro explosivo entre a maior drag queen do mundo e a rainha do funk. Uma ocupação de brilho, resistência e muito grave para sacudir as estruturas do Cecon.', 
    instagramLink: 'https://www.sympla.com.br/evento/gola20-pabllo-vittar-tati-quebra-barraco/3253639',
    ticketLink: 'https://www.sympla.com.br/evento/gola20-pabllo-vittar-tati-quebra-barraco/3253639'
  },
  { 
    title: '5ª Semana do Audiovisual Negro (SAN)', 
    category: 'Telas', 
    genre: 'Cinema, Festival', 
    date: new Date('2026-05-02T14:00:00'), 
    location: 'Cinema São Luiz (Boa Vista, Recife)', 
    price: 'Entrada Gratuita', 
    image: 'https://www.pretessencias.com.br/fotos/semana_audiovisual_negro_recife.jpg', 
    description: 'O cinema mais bonito do país abre suas portas para celebrar a identidade e a resistência negra através de 41 curtas e videoartes. É uma ocupação política e estética imperdível, com debates que pulsam no coração da Rua da Aurora.', 
    instagramLink: 'https://www.instagram.com/semanadoaudiovisualnegro/',
    ticketLink: ''
  },
  { 
    title: 'Estreia Nacional: "O Riso e a Faca"', 
    category: 'Telas', 
    genre: 'Cinema, Drama', 
    date: new Date('2026-05-01T20:00:00'), 
    location: 'Cinema da Fundação - Sala Museu (Casa Forte, Recife)', 
    price: 'Verificar no link', 
    image: 'https://www.adorocinema.com/poster/o_riso_e_a_faca_brasil.jpg', 
    description: 'Um mergulho profundo nas fronteiras humanas através da jornada de um engenheiro português na África Ocidental. A Sala Museu oferece o clima acolhedor ideal para apreciar este cinema de autor que desafia os sentidos.', 
    instagramLink: 'https://www.instagram.com/cinemadafundacao/',
    ticketLink: 'https://www.veloxtickets.com/Portal/Local/cinema/Recife/Fundacao-Joaquim-Nabuco/FJN'
  },
  { 
    title: 'Clássico de Terror: "Veneno para as Fadas"', 
    category: 'Telas', 
    genre: 'Cinema, Terror', 
    date: new Date('2026-05-01T14:00:00'), 
    location: 'Cinema da Fundação - Sala Museu (Casa Forte, Recife)', 
    price: 'Verificar no link', 
    image: 'https://www.adorocinema.com/poster/veneno_para_las_hadas.jpg', 
    description: 'Que tal um feriado com um clássico do terror mexicano? A história de Flávia e sua amiga que acredita ser bruxa transforma a infância em um pesadelo visual inesquecível na tela da Sala Museu.', 
    instagramLink: 'https://www.instagram.com/cinemadafundacao/',
    ticketLink: 'https://www.veloxtickets.com/Portal/Local/cinema/Recife/Fundacao-Joaquim-Nabuco/FJN'
  },
  { 
    title: 'Exposição "Sobre águas" - Vera Reichert', 
    category: 'Artes', 
    genre: 'Instalação, Escultura', 
    date: new Date('2026-05-03T14:00:00'), 
    location: 'Museu do Estado de Pernambuco - MEPE (Graças, Recife)', 
    price: 'Entrada Gratuita', 
    image: 'https://www.cultura.pe.gov.br/wp-content/uploads/2026/03/vera_reichert_mepe.jpg', 
    description: 'Um mergulho sensorial e urgente sobre o elemento que define a vida na Terra e a memória do Recife. As esculturas retroiluminadas e instalações de Reichert transformam o casarão das Graças em um oceano de reflexão.', 
    instagramLink: 'https://www.instagram.com/museudoestadope/' 
  },
  { 
    title: 'Exposição "Árvore da Palavra" - Roberta Guimarães', 
    category: 'Artes', 
    genre: 'Fotografia', 
    date: new Date('2026-05-03T10:00:00'), 
    location: 'Museu do Estado de Pernambuco - MEPE (Graças, Recife)', 
    price: 'Entrada Gratuita', 
    image: 'https://www.opoder.com.br/fotos/roberta_guimaraes_mepe.jpg', 
    description: 'A fotógrafa Roberta Guimarães captura a essência das mãos que criam e a força do verbo na cultura nordestina. Uma mostra delicada que dialoga com a ancestralidade e as tradições manuais de nossa terra.', 
    instagramLink: 'https://www.instagram.com/robertaguimarafoto/' 
  },
  { 
    title: 'Exposição "Onde moram os sonhos" - Marina Zardo', 
    category: 'Artes', 
    genre: 'Bordado, Pintura', 
    date: new Date('2026-05-03T10:00:00'), 
    location: 'Museu Cais do Sertão (Bairro do Recife)', 
    price: 'Entrada Gratuita', 
    image: 'http://agendaculturaldorecife.blogspot.com/2026/05/marina_zardo_exposicao.jpg', 
    description: 'Não perca os últimos dias desta mostra vibrante que une a delicadeza do bordado à força da autonomia feminina. As telas de Marina Zardo florescem no coração do porto, trazendo cores e simbolismos ancestrais.', 
    instagramLink: 'https://www.instagram.com/caisdosertao/' 
  },
  { 
    title: 'Café na Rua - Abertura do Recife Coffee 2026', 
    category: 'Rua', 
    genre: 'Gastronomia, Café', 
    date: new Date('2026-05-02T09:00:00'), 
    location: 'Avenida Rio Branco (Bairro do Recife)', 
    price: 'Acesso Livre (Degustações gratuitas)', 
    image: 'http://agendaculturaldorecife.blogspot.com/2026/05/recife_coffee_filipe_ramos.jpg', 
    description: 'O boulevard do Recife Antigo se transforma no maior laboratório de cafés especiais da cidade. Degustações gratuitas, baristas especializados e muita música boa para despertar os sentidos no seu passeio de sábado.', 
    instagramLink: 'https://www.instagram.com/recifecoffeeoficial/' 
  },
  { 
    title: 'Feira de Artesanato da Rua do Bom Jesus', 
    category: 'Rua', 
    genre: 'Artesanato, Gastronomia', 
    date: new Date('2026-05-03T10:00:00'), 
    location: 'Rua do Bom Jesus (Bairro do Recife)', 
    price: 'Acesso Gratuito', 
    image: 'https://conecta.recife.pe.gov.br/fotos/feira_bom_jesus_domingo.jpg', 
    description: 'O domingo no Antigo pede um passeio pela rua mais bonita do mundo entre barracas de artesãos locais e delícias gastronômicas. O clima é de festa, especialmente com o Arrastão de Frevo da Troça Dom Juan do Monte que deve passar por lá.', 
    instagramLink: 'https://www.instagram.com/feirabomjesus/' 
  },
  { 
    title: 'Olha! Recife a pé: Muafro e Poetas Negros', 
    category: 'Rua', 
    genre: 'Turismo, História', 
    date: new Date('2026-05-06T14:00:00'), 
    location: 'Saída da Praça do Arsenal (Bairro do Recife)', 
    price: 'Gratuito', 
    image: 'https://visit.recife.pe.gov.br/fotos/muafro_olha_recife.jpg', 
    description: 'Uma caminhada guiada que presta homenagem à presença negra na história e poesia do Recife. Visitando o Museu Afro e referenciando nomes como Solano Trindade, este roteiro é uma aula de história a céu aberto.', 
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
    image: 'https://www.leiaja.com/fotos/orquestra_rockfonica_recife.jpg', 
    description: 'Uma tarde mágica que une o erudito à vibração do pop e rock sob as sombras das árvores. Traga sua canga e aproveite este encontro sensorial que celebra a música brasileira e clássicos mundiais ao ar livre.', 
    instagramLink: 'https://www.instagram.com/prefeiturarecife/' 
  },
  { 
    title: 'Show "Cacau, Lulu e o Manguebitinho"', 
    category: 'Infantil', 
    genre: 'Música Infantil', 
    date: new Date('2026-05-03T16:00:00'), 
    location: 'Teatro do Parque (Boa Vista, Recife)', 
    price: 'Bilheteria física ou Sympla', 
    image: 'https://www2.recife.pe.gov.br/fotos/cacau_lulu_manguebitinho.jpg', 
    description: 'Um encontro rítmico imperdível para os pequenos caranguejos descobrirem o balanço do Manguebeat. Cláudia Soul e Lulu Araújo garantem um show cheio de energia para as novas gerações fincarem as raízes na nossa cultura.', 
    instagramLink: 'https://www.instagram.com/fadameagrinha/' 
  },
  { 
    title: 'Oficina de Barro Infantil com Mestre Nena', 
    category: 'Infantil', 
    genre: 'Oficina, Arte', 
    date: new Date('2026-05-03T16:00:00'), 
    location: 'Jardins do Museu do Estado de Pernambuco - MEPE (Graças)', 
    price: 'Gratuito (Inscrição no local)', 
    image: 'https://www.opoder.com.br/fotos/oficina_barro_mestre_nena.jpg', 
    description: 'Mãos pequenas se sujam de barro para criar arte sob a orientação de um mestre da tradição. É o momento perfeito para as crianças aprenderem sobre nossa cultura popular de forma prática e lúdica nos jardins do museu.', 
    instagramLink: 'https://www.instagram.com/museudoestadope/' 
  },
];

async function main() {
  console.log('Iniciando seed...');
  
  // Limpar a tabela para evitar duplicatas
  await prisma.evento.deleteMany({});
  console.log('Tabela de eventos limpa.');

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
