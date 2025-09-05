// infantil.js
document.addEventListener('DOMContentLoaded', () => {

    // 1. FILTRAR DADOS: Pega apenas os eventos da categoria "Infantil"
    const infantilData = mockEventsData
        .filter(event => event.category === "Infantil")
        .map(item => ({ ...item, date: new Date(item.date) }))
        .sort((a, b) => a.date - b.date);

    const upcomingInfantil = infantilData.filter(item => item.date >= new Date());

    // Elementos da Página
    const genreFilter = document.getElementById('genre-filter');
    const infantilGrid = document.getElementById('infantil-grid');

    // 2. POPULAR O FILTRO DE TIPO/GÊNERO
    function populateGenreFilter() {
        const genres = new Set(infantilData.map(item => item.genre));
        genres.forEach(genre => {
            if (genre) {
                const option = document.createElement('option');
                option.value = genre;
                option.textContent = genre;
                genreFilter.appendChild(option);
            }
        });
    }

    // 3. FUNÇÃO PARA RENDERIZAR OS CARDS
    function renderInfantil(filteredItems) {
        infantilGrid.innerHTML = '';
        if (filteredItems.length === 0) {
            infantilGrid.innerHTML = "<p class='empty-state'>Nenhuma atividade encontrada com este filtro.</p>";
            return;
        }
        filteredItems.forEach(item => {
            const formattedDate = item.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
            
            const cardHTML = `
                <div class="event-card">
                    <a href="evento.html?id=${item.id}" class="event-card-link">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="event-info">
                            <span class="category">${item.genre || 'Infantil'}</span>
                            <h3>${item.title}</h3>
                            <p><i class="far fa-calendar-alt"></i> ${formattedDate}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                        </div>
                    </a>
                    <div class="event-actions">
                         <span class="price">${item.price}</span>
                         <button class="add-schedule-btn" data-event-title="${item.title}" data-event-date="${item.date.toISOString()}" data-event-location="${item.location}">🗓️ Agendar</button>
                    </div>
                </div>
            `;
            infantilGrid.innerHTML += cardHTML;
        });
    }

    // 4. FUNÇÃO PRINCIPAL DE FILTRAGEM
    function applyFilters() {
        let filteredItems = upcomingInfantil;
        const selectedGenre = genreFilter.value;

        if (selectedGenre !== 'todos') {
            filteredItems = filteredItems.filter(item => item.genre === selectedGenre);
        }

        renderInfantil(filteredItems);
    }

    // 5. INICIALIZAÇÃO
    populateGenreFilter();
    renderInfantil(upcomingInfantil);
    genreFilter.addEventListener('change', applyFilters);
});