// roteiros.js
document.addEventListener('DOMContentLoaded', () => {

    // Dados dos Roteiros Prontos
    const roteirosData = [
        {
            id: 1,
            title: "Um Dia Cultural no Recife Antigo",
            description: "Mergulhe na história e na arte do coração do Recife, finalizando com um show de MPB.",
            zone: "Centro",
            priceCategory: "moderado",
            path: [
                { time: "14:00", type: "Evento Secundário", title: "Visita ao Cais do Sertão", details: "Explore a cultura sertaneja de forma interativa." },
                { time: "17:00", type: "Alimentação", title: "Café no Paço do Frevo", details: "Uma pausa para um café com bolo de rolo." },
                { time: "18:00", type: "Evento Principal", title: "Passeio de Catamarã", details: "Veja o pôr do sol do Rio Capibaribe." }
            ]
        },
        {
            id: 2,
            title: "Tarde de Arte e Natureza na Zona Norte",
            description: "Um roteiro para quem ama arte e tranquilidade, combinando um museu incrível com um parque relaxante.",
            zone: "Norte",
            priceCategory: "moderado",
            path: [
                { time: "14:00", type: "Evento Principal", title: 'Exposição no Instituto Ricardo Brennand', details: "Um castelo de arte e história." },
                { time: "17:00", type: "Alimentação", title: "Tapioca no Alto da Sé (Olinda)", details: "Estique o passeio até Olinda para uma vista e sabor incríveis." },
                { time: "18:30", type: "Evento Secundário", title: "Piquenique no Parque da Jaqueira", details: "Relaxe na maior área verde da Zona Norte." }
            ]
        },
        {
            id: 3,
            title: "Noite Agitada na Zona Sul",
            description: "Para quem quer curtir a noite com boa comida, cerveja e rock'n'roll em Boa Viagem.",
            zone: "Sul",
            priceCategory: "premium",
            path: [
                { time: "19:00", type: "Alimentação", title: "Jantar no Entre Amigos - O Bode", details: "Experimente o melhor da culinária regional." },
                { time: "21:00", type: "Evento Principal", title: "Show de Rock no UK Pub", details: "Curta o som de bandas locais e covers." },
                { time: "23:30", type: "Evento Secundário", title: "Caminhada no Calçadão", details: "Termine a noite com uma brisa do mar." }
            ]
        }
    ];

    // Elementos da Página
    const roteirosContainer = document.getElementById('roteiros-container');
    const zoneFilter = document.getElementById('zone-filter');
    const priceFilter = document.getElementById('price-filter');

    // Mapeia o tipo de passo para um ícone do Font Awesome
    const iconMap = {
        'Alimentação': 'fas fa-utensils',
        'Evento Principal': 'fas fa-star',
        'Evento Secundário': 'far fa-star'
    };

    // Função para renderizar os roteiros
    function renderRoteiros(filteredRoteiros) {
        roteirosContainer.innerHTML = '';
        if (filteredRoteiros.length === 0) {
            roteirosContainer.innerHTML = "<p class='empty-state'>Nenhum roteiro encontrado com os filtros selecionados.</p>";
            return;
        }

        filteredRoteiros.forEach(roteiro => {
            let pathHTML = '';
            roteiro.path.forEach(step => {
                pathHTML += `
                    <li class="path-step" data-type="${step.type}">
                        <div class="step-header">
                            <i class="${iconMap[step.type] || 'fas fa-circle'}"></i>
                            <span class="time">${step.time}</span>
                        </div>
                        <div class="step-content">
                            <h4>${step.title}</h4>
                            <p>${step.details}</p>
                        </div>
                    </li>
                `;
            });

            const roteiroHTML = `
                <div class="roteiro-card">
                    <h2>${roteiro.title}</h2>
                    <p class="description">${roteiro.description}</p>
                    <ul class="roteiro-path">${pathHTML}</ul>
                </div>
            `;
            roteirosContainer.innerHTML += roteiroHTML;
        });
    }

    // Função principal de filtragem
    function applyFilters() {
        let filteredData = roteirosData;
        const selectedZone = zoneFilter.value;
        const selectedPrice = priceFilter.value;

        if (selectedZone !== 'todos') {
            filteredData = filteredData.filter(r => r.zone === selectedZone);
        }
        if (selectedPrice !== 'todos') {
            filteredData = filteredData.filter(r => r.priceCategory === selectedPrice);
        }
        renderRoteiros(filteredData);
    }

    // Inicialização
    renderRoteiros(roteirosData);
    zoneFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
});