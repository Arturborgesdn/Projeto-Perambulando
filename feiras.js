// feiras.js (versão simplificada, sem Google Maps)
document.addEventListener('DOMContentLoaded', () => {

    // Dados das feiras (sem as coordenadas)

    const listingsContainer = document.getElementById('feiras-grid');
    const filterNav = document.querySelector('.filter-nav');

    // Função para renderizar os cards na tela
    function renderListings(filter = "Todas") {
        listingsContainer.innerHTML = ''; // Limpa a listagem

        const filteredData = feirasData.filter(feira => {
            return filter === "Todas" || feira.zone === filter;
        });

        if (filteredData.length === 0) {
            listingsContainer.innerHTML = "<p class='empty-state'>Nenhuma feira encontrada para esta zona.</p>";
            return;
        }

        filteredData.forEach(feira => {
            const cardHTML = `
                <div class="feira-card" data-id="${feira.id}">
                    <div class="feira-card-content">
                        <h3>${feira.name}</h3>
                        <p><i class="fas fa-map-marker-alt"></i> ${feira.address}</p>
                        <p><i class="far fa-calendar-alt"></i> Dias: <strong>${feira.days}</strong></p>
                        <span class="type-badge">${feira.type}</span>
                    </div>
                </div>
            `;
            listingsContainer.innerHTML += cardHTML;
        });
    }

    // Lógica para os botões de filtro
    filterNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderListings(e.target.dataset.filter);
        }
    });

    // Renderiza a lista inicial com todos os itens
    renderListings("Todos");
});