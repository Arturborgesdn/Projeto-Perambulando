const axios = require('axios');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const prisma = new PrismaClient();

// Configuração do "Cérebro" (Gemini)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function summarizeWithAI(text, title) {
  if (!process.env.GEMINI_API_KEY) {
    return text.substring(0, 500) + "..."; // Fallback se não houver chave
  }

  try {
    const prompt = `
      Você é um editor de elite do site "Perambulando", um guia cultural de Recife.
      Sua tarefa é transformar o texto bruto abaixo em uma descrição atraente para o evento "${title}".
      
      REGRAS:
      1. Escreva exatamente dois parágrafos curtos.
      2. O tom deve ser convidativo, animado e profissional.
      3. Remova hashtags, links de redes sociais e termos técnicos de "serviço" do texto.
      4. Corrija erros gramaticais.
      5. Não invente informações que não estão no texto.
      
      TEXTO BRUTO:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro na IA:", error.message);
    return text.substring(0, 500) + "...";
  }
}

// Configurações de Categorias e Palavras-chave
function identifyCategory(text) {
  const lowerText = text.toLowerCase();
  
  const rules = [
    { cat: 'Palcos', kws: ['teatro', 'espetáculo', 'peça', 'atuação', 'monólogo', 'comédia', 'stand-up', 'show', 'música', 'cantor', 'cantora', 'banda', 'concerto', 'festival', 'palco', 'dj', 'orquestra', 'samba', 'rock', 'axé', 'frevo'] },
    { cat: 'Telas', kws: ['cinema', 'filme', 'estreia', 'telão', 'cine'] },
    { cat: 'Artes', kws: ['exposição', 'arte', 'museu', 'galeria', 'obras', 'mostra', 'workshop', 'curso', 'aula', 'palestra', 'aprendizado', 'oficina', 'mentoria', 'cultural', 'cultura', 'patrimônio', 'história', 'folclore', 'debate', 'literatura', 'livro', 'poesia', 'sarau', 'biblioteca'] },
    { cat: 'Rua', kws: ['feira', 'mercado', 'artesanato', 'gastronomia', 'comida', 'chef', 'degustação', 'vinho', 'jantar', 'almoço', 'culinária', 'restaurante', 'café', 'lazer', 'parque', 'praça'] },
    { cat: 'Infantil', kws: ['infantil', 'criança', 'teatro mirim', 'recreação', 'oficina', 'kids'] }
  ];

  for (const rule of rules) {
    if (rule.kws.some(kw => new RegExp(`\\b${kw}\\b`, 'i').test(lowerText))) {
      return rule.cat;
    }
  }

  return 'Artes'; // Default para Cultural/Geral
}

const MONTHS_MAP = {
  jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
  janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5, julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
};

function parseDateTime(dateStr, fullText = '') {
  try {
    const now = new Date();
    let day = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    
    const dayMatch = dateStr.match(/(\d{1,2})/);
    const monthMatch = dateStr.match(/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|[a-z]+)/i);

    if (dayMatch) day = parseInt(dayMatch[1]);
    if (monthMatch) {
      const m = monthMatch[1].toLowerCase().substring(0, 3);
      for (let key in MONTHS_MAP) {
        if (key.startsWith(m)) {
          month = MONTHS_MAP[key];
          break;
        }
      }
    }

    const date = new Date(year, month, day);
    if (date < now && (now - date) > 1000 * 60 * 60 * 24 * 30) {
      date.setFullYear(year + 1);
    }

    const timeMatch = fullText.match(/(?:às|as|horário|inicio|início|partir|das)\s?(\d{1,2})[:h](\d{2})?/i) || 
                      fullText.match(/(\d{1,2})[:h](\d{2})/i) ||
                      fullText.match(/(\d{1,2})h/i);

    if (timeMatch) {
      let hours = parseInt(timeMatch[1]);
      let minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
      date.setHours(hours, minutes, 0, 0);
    } else {
      date.setHours(19, 0, 0, 0);
    }

    return date;
  } catch (e) {
    return new Date();
  }
}

function extractDate(text) {
  return parseDateTime(text, text);
}

function cleanEventTitle(title, source = '') {
  if (!title) return "Evento sem título";
  let clean = title.trim();
  if (source === 'Instagram') {
    clean = clean.split('\n')[0].trim();
    clean = clean.replace(/Post de @\w+:?\s?/i, '');
    clean = clean.replace(/Agenda\s?(da\s?semana|de\s?hoje):?\s?/i, '');
  }
  clean = clean.replace(/^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F9FF}]+\s*/gu, '');
  clean = clean.replace(/\s*[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F9FF}]+$/gu, '');
  clean = clean.replace(/^["'«„]+|["'»“]+$/g, '');
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  if (clean.length > 80) clean = clean.substring(0, 77) + '...';
  return clean;
}

async function getSymplaEventDetails(url) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const $ = cheerio.load(response.data);
    let rawTitle = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content');
    const title = cleanEventTitle(rawTitle);
    const image = $('meta[property="og:image"]').attr('content');
    const rawDescription = $('meta[property="og:description"]').attr('content') || $('.event-description').text();
    
    // IA PROCESSANDO
    const description = await summarizeWithAI(rawDescription, title);
    
    let eventDate = new Date();
    const ldJson = $('script[type="application/ld+json"]').html();
    if (ldJson) {
      try {
        const data = JSON.parse(ldJson);
        const start = data.startDate || (Array.isArray(data) && data.find(i => i.startDate)?.startDate);
        if (start) eventDate = new Date(start);
      } catch(e) {}
    }

    let location = 'Recife, PE';
    const locMeta = $('meta[property="business:contact_data:street_address"]').attr('content');
    if (locMeta) location = locMeta;

    return { title, image, description, location, category: identifyCategory(title + ' ' + rawDescription), date: eventDate, price: 'Verificar no site' };
  } catch (error) { return null; }
}

async function getG1ArticleDetails(url) {
  try {
    const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 });
    const $ = cheerio.load(response.data);
    const image = $('meta[property="og:image"]').attr('content') || $('.content-media-figure img').attr('src');
    let serviceText = '';
    $('.content-text__container').each((i, el) => { serviceText += $(el).text() + ' '; });
    let rawTitle = $('h1.content-head__title').text().trim();
    const title = cleanEventTitle(rawTitle);
    
    // IA PROCESSANDO
    const description = await summarizeWithAI(serviceText, title);
    
    let eventDate = new Date();
    const whenMatch = serviceText.match(/(?:Quando|Data|Dia):\s?([^.\n]+)/i) || serviceText.match(/(\d{1,2}\s?de\s?[a-z]+)/i);
    if (whenMatch) eventDate = parseDateTime(whenMatch[1], serviceText);

    let location = 'Recife';
    const locMatch = serviceText.match(/(?:Onde|Local|Endereço):\s?([^.\n]+)/i);
    if (locMatch) location = locMatch[1].trim();

    return { title, image, category: identifyCategory(title + ' ' + serviceText), date: eventDate, location, price: serviceText.includes('Gratuito') ? 'Gratuito' : 'Verificar no link', description };
  } catch (error) { return null; }
}

async function getInstagramEvents(username) {
  try {
    const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'x-ig-app-id': '936619743392459',
      },
      timeout: 8000
    });

    const user = response.data.data.user;
    const posts = user.edge_owner_to_timeline_media.edges;
    const events = [];

    for (const post of posts.slice(0, 5)) {
      const node = post.node;
      const caption = node.edge_media_to_caption.edges[0]?.node.text || "";
      const lowerCaption = caption.toLowerCase();

      if (lowerCaption.includes('hoje') || lowerCaption.includes('ingresso') || lowerCaption.includes('local:')) {
        const date = extractDate(caption);
        if (date >= new Date(new Date().setHours(0,0,0,0))) {
          const title = cleanEventTitle(caption, 'Instagram');
          
          // IA PROCESSANDO
          const description = await summarizeWithAI(caption, title);

          events.push({
            title, 
            image: node.display_url,
            description,
            location: 'Verificar no Instagram',
            category: identifyCategory(caption),
            date: date,
            price: caption.includes('gratuito') ? 'Gratuito' : 'Verificar no link',
            instagramLink: `https://www.instagram.com/p/${node.shortcode}/`
          });
        }
      }
    }
    return events;
  } catch (error) { return []; }
}

async function runScraper() {
  console.log('🤖 Robô com Cérebro IA ativado!');

  const instaProfiles = ['prefeituradorecife', 'descubrapernambuco', 'recifemais'];
  for (const profile of instaProfiles) {
    const instaEvents = await getInstagramEvents(profile);
    for (const event of instaEvents) {
      const exists = await prisma.evento.findFirst({ where: { title: event.title } });
      if (!exists) {
        await prisma.evento.create({ data: { ...event, status: 'PENDENTE' } });
        console.log(`🧠 [IA + Insta] Processado: ${event.title.substring(0, 30)}`);
      }
    }
  }

  try {
    const g1Res = await axios.get('https://g1.globo.com/pe/pernambuco/o-que-fazer-no-recife/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $g1 = cheerio.load(g1Res.data);
    const g1Links = [];
    $g1('.feed-post-link').each((i, el) => { g1Links.push($g1(el).attr('href')); });

    for (const link of g1Links.slice(0, 5)) {
      const details = await getG1ArticleDetails(link);
      if (details && details.title) {
        if (details.date < new Date()) continue;
        const exists = await prisma.evento.findFirst({ where: { title: details.title } });
        if (!exists) {
          await prisma.evento.create({ data: { ...details, status: 'PENDENTE', instagramLink: link } });
          console.log(`🧠 [IA + G1] Processado: ${details.title.substring(0, 30)}`);
        }
      }
    }
  } catch (e) {}

  try {
    const symplaRes = await axios.get('https://www.sympla.com.br/eventos/recife-pe', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $s = cheerio.load(symplaRes.data);
    const symplaLinks = [];
    $s('a[href*="/evento/"]').each((i, el) => { symplaLinks.push($s(el).attr('href')); });

    for (const link of [...new Set(symplaLinks)].slice(0, 8)) {
      const details = await getSymplaEventDetails(link);
      if (details && details.title) {
        if (details.date < new Date()) continue;
        const exists = await prisma.evento.findFirst({ where: { title: details.title } });
        if (!exists) {
          await prisma.evento.create({ data: { ...details, status: 'PENDENTE', ticketLink: link } });
          console.log(`🧠 [IA + Sympla] Processado: ${details.title.substring(0, 30)}`);
        }
      }
    }
  } catch (e) {}

  await prisma.$disconnect();
}

if (require.main === module) runScraper();
module.exports = runScraper;
