/**
 * Script de teste para a API de Geolocalização
 * Execute com: node test_geo_api.js
 */

const geoService = require("./src/services/geoService");

async function testarAPI() {
  console.log("🧪 Iniciando testes da API de Geolocalização...\n");

  // Teste 1: Geocodificação
  console.log("✅ Teste 1: Geocodificação de endereço");
  console.log('  Buscando coordenadas de: "Rua das Flores, Recife"');
  const coords = await geoService.getCoordinates("Rua das Flores, Recife");
  if (coords) {
    console.log(`  ✓ Coordenadas encontradas:`, coords);
    console.log(`  - Latitude: ${coords.lat}`);
    console.log(`  - Longitude: ${coords.lon}`);
    console.log(`  - Cidade: ${coords.city}`);
  } else {
    console.log("  ✗ Endereço não encontrado");
  }

  // Teste 2: Busca de proximidades
  console.log("\n✅ Teste 2: Busca de proximidades");
  if (coords) {
    console.log(`  Buscando restaurantes em raio de 1km...`);
    const restaurantes = await geoService.getNearbyRestaurants(
      coords.lat,
      coords.lon,
      1000,
    );
    console.log(`  ✓ Encontrados ${restaurantes.length} locais:`);
    restaurantes.slice(0, 5).forEach((r, i) => {
      console.log(`    ${i + 1}. ${r.name}`);
      console.log(`       Tipo: ${r.type}`);
      console.log(`       Endereço: ${r.address}`);
      console.log(`       Website: ${r.website || "N/A"}`);
    });
  }

  // Teste 3: Cache
  console.log("\n✅ Teste 3: Teste de cache");
  console.log(
    "  Buscando novamente pelo mesmo endereço (deve vir do cache)...",
  );
  console.time("Cache Hit");
  const coords2 = await geoService.getCoordinates("Rua das Flores, Recife");
  console.timeEnd("Cache Hit");
  console.log(
    `  ✓ Cache funcionando: ${JSON.stringify(coords) === JSON.stringify(coords2)}`,
  );

  // Teste 4: Endereço sem contexto local
  console.log("\n✅ Teste 4: Endereço sem contexto local");
  console.log('  Buscando: "Rua Augusta" (sem mencionar Recife)');
  const coords3 = await geoService.getCoordinates("Rua Augusta");
  if (coords3) {
    console.log(`  ✓ Encontrado em: ${coords3.display_name}`);
  }

  console.log("\n✨ Testes concluídos!");
}

testarAPI().catch(console.error);
