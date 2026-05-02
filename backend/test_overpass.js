const axios = require('axios');

async function testOverpass() {
  const lat = -8.0620879;
  const lon = -34.8820486;
  const radius = 1000;

  const query = `
    [out:json];
    (
      node(around:${radius},${lat},${lon})["amenity"];
      way(around:${radius},${lat},${lon})["amenity"];
    );
    out center;
  `;

  try {
    console.log('Enviando consulta ao Overpass...');
    const response = await axios.post('https://overpass-api.de/api/interpreter', 
      `data=${encodeURIComponent(query)}`,
      { 
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Perambulando-App/1.0 (contato@perambulando.com.br)'
        } 
      }
    );
    console.log('Resposta recebida. Total de elementos:', response.data.elements.length);
    if (response.data.elements.length > 0) {
      console.log('Exemplos de amenities encontradas:');
      response.data.elements.slice(0, 5).forEach(el => {
        console.log(`- ${el.tags.name || 'Sem nome'} (${el.tags.amenity})`);
      });
    }
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

testOverpass();
