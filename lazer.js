// lazer.js
document.addEventListener('DOMContentLoaded', () => {

    // 1. FILTRAR DADOS: Pega apenas os eventos da categoria "Lazer"
    const lazerData = mockEventsData
        .filter(event => event.category === "Lazer")
        .map(item => ({ ...item, date: new Date(item.date) }))
        .sort((a, b) => a.date - b.date);

    // Elementos da Página
    const genreFilter = document.getElementById('genre-filter');
    const lazerGrid = document.getElementById('lazer-grid');

    // 2. POPULAR O FILTRO DE TIPO/GÊNERO
    function populateGenreFilter() {
        const genres = new Set(lazerData.map(item => item.genre));
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
    function renderLazer(filteredItems) {
        lazerGrid.innerHTML = '';
        if (filteredItems.length === 0) {
            lazerGrid.innerHTML = "<p class='empty-state'>Nenhuma atividade encontrada com este filtro.</p>";
            return;
        }
        filteredItems.forEach(item => {
            const formattedDate = item.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
            
            const cardHTML = `
                <div class="event-card">
                    <a href="evento.html?id=${item.id}" class="event-card-link">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="event-info">
                            <span class="category">${item.genre || 'Lazer'}</span>
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
            lazerGrid.innerHTML += cardHTML;
        });
    }

    // 4. FUNÇÃO PRINCIPAL DE FILTRAGEM
    function applyFilters() {
        let filteredItems = lazerData;
        const selectedGenre = genreFilter.value;

        if (selectedGenre !== 'todos') {
            filteredItems = filteredItems.filter(item => item.genre === selectedGenre);
        }

        renderLazer(filteredItems);
    }

    // 5. INICIALIZAÇÃO
    populateGenreFilter();
    renderLazer(lazerData);
    genreFilter.addEventListener('change', applyFilters);
});