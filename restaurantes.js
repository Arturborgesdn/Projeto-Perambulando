// restaurantes.js
document.addEventListener('DOMContentLoaded', () => {
    // Dados de exemplo para o Guia Gastronômico

    const listingsContainer = document.getElementById('food-listings');
    const filterNav = document.querySelector('.filter-nav');

    // Função para renderizar os cards na tela
    function renderListings(filter = "Todos") {
        listingsContainer.innerHTML = ''; // Limpa a listagem

        const filteredData = foodData.filter(item => {
            return filter === "Todos" || item.category === filter;
        });
        
        if (filteredData.length === 0) {
            listingsContainer.innerHTML = "<p class='empty-state'>Nenhum local encontrado para esta categoria.</p>";
            return;
        }

        filteredData.forEach(item => {
            const cardHTML = `
                <div class="food-card">
                    <img src="${item.image}" alt="${item.name}" class="food-card-image">
                    <div class="food-card-content">
                        <div class="food-card-header">
                            <h3>${item.name}</h3>
                            <span class="price-badge">${item.priceRange}</span>
                        </div>
                        <span class="cuisine-badge">${item.cuisine}</span>
                        <p><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                        <p style="color: #ffc400ff;" class="specialty"><i class="fas fa-star"></i> ${item.specialty}</p>
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