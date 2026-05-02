const gs = require('./backend/src/services/geoService');

async function testExpansion() {
  const cases = [
    { name: 'Marco Zero (Área densa)', lat: -8.0631, lon: -34.8711 },
    { name: 'UFRPE (Área menos densa)', lat: -8.0163, lon: -34.9506 },
    { name: 'Várzea (Oficina Brennand)', lat: -8.0526, lon: -34.9749 }
  ];

  for (const c of cases) {
    console.log(`\n--- Testando ${c.name} ---`);
    const results = await gs.getNearbyRestaurants(c.lat, c.lon);
    console.log(`Total de resultados: ${results.length}`);
    
    const types = [...new Set(results.map(r => r.type))];
    console.log(`Tipos encontrados: ${types.join(', ')}`);
    
    if (results.length > 0) {
      console.log('Exemplos:');
      results.slice(0, 5).forEach(r => {
        console.log(`- ${r.name} [${r.type}] em ${r.address}`);
      });
    }
  }
}

testExpansion();
