const rawText = `
title: Mostra de Cinema Clássico: O Suspense de Hitchcock
category: arte
date: 05 de Agosto, 2026
location: Cinema São Luiz, Recife - PE
description: Exibição especial de obras remasterizadas com debate técnico sobre a linguagem cinematográfica e o legado do "Mestre do Suspense".
image: https://example.com/images/hitchcock-mostra.jpg
instagramLink: https://instagram.com/cinemasaoluiz
ticketLink: https://ingresso.com/mostra-hitchcock
`;

function testParser(text) {
  if (text.includes('title:') && text.includes('category:')) {
    const lines = text.split('\n');
    const event = {};
    lines.forEach(line => {
      const index = line.indexOf(':');
      if (index !== -1) {
        const key = line.substring(0, index).trim().toLowerCase();
        const val = line.substring(index + 1).trim();
        if (key === 'title') event.title = val;
        if (key === 'category') event.category = val;
        if (key === 'date') event.date = val;
        if (key === 'location') event.location = val;
        if (key === 'description') event.description = val;
        if (key === 'image') event.image = val;
        if (key === 'instagramlink') event.instagramLink = val;
        if (key === 'ticketlink') event.ticketLink = val;
      }
    });
    console.log("EVENTO PARSEADO:", event);
    return event;
  }
  return null;
}

testParser(rawText);
