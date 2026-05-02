const axios = require("axios");

// Cache simples em memória para coordenadas (TTL: 24 horas)
const coordCache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000;

// Configuração padrão do Axios com timeout de 10 segundos
const api = axios.create({
  timeout: 10000,
  headers: {
    "User-Agent": "Perambulando-App/1.0 (contato@perambulando.com.br)",
  },
});

/**
 * Função auxiliar para retry com backoff exponencial
 */
async function retryWithBackoff(fn, maxRetries = 3, delayMs = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = delayMs * Math.pow(2, i);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Obtém as coordenadas (latitude e longitude) de um endereço usando Nominatim (OpenStreetMap).
 */
async function getCoordinates(address) {
  if (!address || typeof address !== "string") return null;

  const normalizedAddress = address.trim();

  // Verifica cache
  const cached = coordCache.get(normalizedAddress);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const search = async (q) => {
    try {
      const response = await api.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: q,
            format: "json",
            limit: 1,
            addressdetails: 1,
          },
        },
      );
      return response.data && response.data.length > 0
        ? response.data[0]
        : null;
    } catch (e) {
      console.warn(`Nominatim search error for "${q}":`, e.message);
      return null;
    }
  };

  try {
    let result = null;

    // Se não menciona Recife/Pernambuco, tenta primeiro com o sufixo local para priorizar resultados próximos
    const hasLocalContext =
      normalizedAddress.toLowerCase().includes("recife") ||
      normalizedAddress.toLowerCase().includes("pernambuco") ||
      normalizedAddress.toLowerCase().includes(", pe");

    if (!hasLocalContext) {
      result = await retryWithBackoff(
        () => search(`${normalizedAddress}, Recife, PE`),
        2,
      );
    }

    // Se não encontrou com sufixo ou se já tinha contexto, tenta a busca original/pura
    if (!result) {
      result = await retryWithBackoff(() => search(normalizedAddress), 2);
    }

    if (result && result.lat && result.lon) {
      const coords = {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        display_name: result.display_name,
        city:
          result.address?.city ||
          result.address?.town ||
          result.address?.village ||
          result.address?.state,
        suburb:
          result.address?.suburb ||
          result.address?.neighbourhood ||
          result.address?.district,
      };

      // Armazena no cache
      coordCache.set(normalizedAddress, {
        data: coords,
        timestamp: Date.now(),
      });
      return coords;
    }
    return null;
  } catch (error) {
    console.error("Erro na geocodificação:", error.message);
    return null;
  }
}

/**
 * Busca estabelecimentos e pontos de interesse próximos usando Overpass API.
 */
async function getNearbyRestaurants(lat, lon, radius = 1000) {
  if (!lat || !lon) return [];

  const fetchPlaces = async (currentRadius) => {
    // Categorias expandidas para cobrir tudo que é interessante para quem está "Perambulando"
    const amenities = "restaurant|cafe|bar|fast_food|pub|ice_cream|theatre|museum|cinema|arts_centre|library|community_centre|place_of_worship|market|nightclub";
    const tourism = "museum|viewpoint|gallery|attraction|artwork|information|hotel";
    const leisure = "park|garden|marina|playground|stadium|nature_reserve";
    const historic = "monument|memorial|castle|ruins|heritage|city_gate|tomb";
    const shop = "books|art|gift|antiques|bakery|chocolate|coffee|pastry|craft";

    const query = `
      [out:json][timeout:30];
      (
        node["amenity"~"${amenities}"](around:${currentRadius},${lat},${lon});
        way["amenity"~"${amenities}"](around:${currentRadius},${lat},${lon});
        node["tourism"~"${tourism}"](around:${currentRadius},${lat},${lon});
        node["leisure"~"${leisure}"](around:${currentRadius},${lat},${lon});
        node["historic"~"${historic}"](around:${currentRadius},${lat},${lon});
        node["shop"~"${shop}"](around:${currentRadius},${lat},${lon});
      );
      out center;
    `;

    return await retryWithBackoff(
      async () => {
        return await api.post(
          "https://overpass-api.de/api/interpreter",
          `data=${encodeURIComponent(query)}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          },
        );
      },
      2,
      2000,
    );
  };

  try {
    let response = await fetchPlaces(radius);
    
    // Se encontrou menos de 10 lugares, tenta expandir o raio para 2km
    if (response.data && response.data.elements && response.data.elements.length < 10 && radius < 2000) {
      console.log(`Poucos resultados (${response.data.elements.length}) no raio de ${radius}m. Expandindo para 2000m...`);
      response = await fetchPlaces(2000);
    }

    if (
      response.data &&
      response.data.elements &&
      Array.isArray(response.data.elements)
    ) {
      return response.data.elements
        .filter((el) => el.tags && (el.tags.name || el.tags.description)) // Filtra locais sem identificação
        .map((el) => {
          try {
            const coords =
              el.type === "node"
                ? { lat: el.lat, lon: el.lon }
                : el.center
                  ? { lat: el.center.lat, lon: el.center.lon }
                  : null;

            if (!coords) return null;

            const tags = el.tags || {};
            
            // Tradução amigável de tipos
            let type = "Local";
            if (tags.amenity === "restaurant") type = "Restaurante";
            else if (tags.amenity === "cafe") type = "Café";
            else if (tags.amenity === "bar" || tags.amenity === "pub") type = "Bar / Pub";
            else if (tags.amenity === "theatre") type = "Teatro";
            else if (tags.amenity === "museum" || tags.tourism === "museum") type = "Museu";
            else if (tags.amenity === "cinema") type = "Cinema";
            else if (tags.amenity === "place_of_worship") type = "Igreja / Templo";
            else if (tags.leisure === "park") type = "Parque";
            else if (tags.historic) type = "Histórico";
            else if (tags.tourism === "viewpoint") type = "Mirante";
            else if (tags.tourism === "artwork") type = "Arte de Rua";
            else if (tags.shop) type = "Loja / Comércio";
            else type = tags.amenity || tags.tourism || tags.historic || tags.leisure || "Ponto de interesse";

            const street = tags["addr:street"] || "";
            const number = tags["addr:housenumber"] || "";
            const suburb =
              tags["addr:suburb"] || tags["addr:neighbourhood"] || "";
            const city = tags["addr:city"] || "";

            let addressParts = [];
            if (street)
              addressParts.push(`${street}${number ? " " + number : ""}`);
            if (suburb) addressParts.push(suburb);
            if (city && city !== "Recife") addressParts.push(city);

            return {
              id: el.id,
              name: tags.name || tags.description || "Ponto de interesse",
              type: type.charAt(0).toUpperCase() + type.slice(1),
              lat: coords.lat,
              lon: coords.lon,
              address: addressParts.join(", ") || "Endereço aproximado",
              cuisine: tags.cuisine || null,
              website: tags.website || tags["contact:website"] || null,
              phone: tags.phone || tags["contact:phone"] || null,
              opening_hours: tags.opening_hours || null,
              distance: null // Poderia ser calculado se necessário
            };
          } catch (e) {
            return null;
          }
        })
        .filter((el) => el !== null)
        .slice(0, 60); // Limite um pouco maior para dar mais opções
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar locais próximos:", error.message);
    return [];
  }
}

module.exports = {
  getCoordinates,
  getNearbyRestaurants,
};
