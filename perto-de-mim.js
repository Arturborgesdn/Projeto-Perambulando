// perto-de-mim.js
document.addEventListener('DOMContentLoaded', () => {

    // JUNTA TODOS OS DADOS DISPONÍVEIS (eventos, restaurantes, feiras)
    const allPlaces = [
        ...mockEventsData.map(e => ({ name: e.title, category: e.category, location: e.location })),
        ...foodData.map(f => ({ name: f.name, category: `Gastronomia (${f.category})`, location: f.location })),
        ...feirasData.map(fe => ({ name: fe.name, category: "Feira", location: fe.address }))
    ];

    const findButton = document.getElementById('find-nearby-btn');
    const resultsContainer = document.getElementById('results-container');
    const resultsList = document.getElementById('results-list');

    findButton.addEventListener('click', () => {
        findButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procurando...';
        findButton.disabled = true;

        if (navigator.geolocation) {
            // Se o navegador suportar geolocalização
            navigator.geolocation.getCurrentPosition(showResults, showError);
        } else {
            // Se não suportar
            alert("Geolocalização não é suportada por este navegador.");
            findButton.innerHTML = '<i class="fas fa-map-marker-alt"></i> Tente Novamente';
            findButton.disabled = false;
        }
    });

    function showResults(position) {
        // EM UM APP REAL:
        // Aqui você enviaria as coordenadas (position.coords.latitude, position.coords.longitude)
        // para uma API do Google Maps para obter uma lista real de locais próximos.

        // NOSSA SIMULAÇÃO:
        // Vamos apenas pegar 5 locais aleatórios da nossa lista de dados para simular o resultado.
        const nearbyPlaces = allPlaces.sort(() => 0.5 - Math.random()).slice(0, 5);
        
        resultsList.innerHTML = '<h2>Encontramos para você:</h2>';

        nearbyPlaces.forEach(place => {
            const itemHTML = `
                <div class="result-item">
                    <h3>${place.name}</h3>
                    <p>${place.location}</p>
                    <small>${place.category}</small>
                </div>
            `;
            resultsList.innerHTML += itemHTML;
        });

        resultsContainer.style.display = 'grid';
        findButton.style.display = 'none'; // Esconde o botão após a busca
    }

    function showError(error) {
        let message = "Ocorreu um erro desconhecido.";
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message = "Você negou o pedido de geolocalização. Por favor, habilite nas configurações do seu navegador.";
                break;
            case error.POSITION_UNAVAILABLE:
                message = "A informação de localização não está disponível.";
                break;
            case error.TIMEOUT:
                message = "O pedido para obter a sua localização demorou muito.";
                break;
        }
        alert(message);
        findButton.innerHTML = '<i class="fas fa-map-marker-alt"></i> Tente Novamente';
        findButton.disabled = false;
    }
});