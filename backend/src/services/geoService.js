const axios = require('axios');

/**
 * Obtém as coordenadas (latitude e longitude) de um endereço usando Nominatim (OpenStreetMap).
 */
async function getCoordinates(address) {
  try {
    // Adicionamos "Recife" para melhorar a precisão se não estiver presente
    const query = address.toLowerCase().includes('recife') ? address : `${address}, Recife, PE`;
    
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'Perambulando-App/1.0 (contato@perambulando.com.br)'
      }
    });

    if (response.data && response.data.length > 0) {
      return {
        lat: parseFloat(response.data[0].lat),
        lon: parseFloat(response.data[0].lon),
        display_name: response.data[0].display_name
      };
    }
    return null;
  } catch (error) {
    console.error('Erro na geocodificação:', error.message);
    return null;
  }
}

/**
 * Busca restaurantes num raio (em metros) de uma coordenada usando Overpass API.
 */
async function getNearbyRestaurants(lat, lon, radius = 1000) {
  try {
    const query = `
      [out:json];
      (
        node["amenity"="restaurant"](around:${radius},${lat},${lon});
        node["amenity"="cafe"](around:${radius},${lat},${lon});
        node["amenity"="bar"](around:${radius},${lat},${lon});
      );
      out body;
    `;

    const response = await axios.post('https://overpass-api.de/api/interpreter', 
      `data=${encodeURIComponent(query)}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    if (response.data && response.data.elements) {
      return response.data.elements.map(el => ({
        id: el.id,
        name: el.tags.name || 'Restaurante sem nome',
        type: el.tags.amenity,
        lat: el.lat,
        lon: el.lon,
        address: el.tags['addr:street'] ? `${el.tags['addr:street']}, ${el.tags['addr:housenumber'] || ''}` : 'Endereço não disponível',
        cuisine: el.tags.cuisine || 'Variada'
      }));
    }
    return [];
  } catch (error) {
    console.error('Erro ao buscar restaurantes próximos:', error.message);
    return [];
  }
}

module.exports = {
  getCoordinates,
  getNearbyRestaurants
};
