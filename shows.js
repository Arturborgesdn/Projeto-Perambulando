// shows.js (CORRIGIDO E APRIMORADO)
document.addEventListener('DOMContentLoaded', () => {

    // 1. FILTRAR DADOS: Pega apenas os eventos da categoria "Shows"
    const allShows = mockEventsData
        .filter(event => event.category === "Shows") // CORREÇÃO: Filtro simplificado e correto
        .map(show => ({ ...show, date: new Date(show.date) }))
        .sort((a, b) => a.date - b.date);
    
    // Lista apenas com shows futuros, que será a base para os filtros
    const upcomingShows = allShows.filter(show => show.date >= new Date());

    // Elementos da Página
    const genreFilter = document.getElementById('genre-filter');
    const dateFilter = document.getElementById('date-filter');
    const showsGrid = document.getElementById('shows-grid');

    // 2. POPULAR O FILTRO DE GÊNERO DINAMICAMENTE
    function populateGenreFilter() {
        const genres = new Set(allShows.map(show => show.genre));
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
    function renderShows(filteredShows) {
        showsGrid.innerHTML = '';
        if (filteredShows.length === 0) {
            showsGrid.innerHTML = "<p class='empty-state'>Nenhum show encontrado com os filtros selecionados.</p>";
            return;
        }
        filteredShows.forEach(show => {
            const formattedDate = show.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
            const formattedTime = show.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            // CORREÇÃO PRINCIPAL: Removido o ".replace()" do show.id
            const cardHTML = `
                <div class="event-card">
                    <a href="evento.html?id=${show.id}" class="event-card-link">
                        <img src="${show.image}" alt="${show.title}">
                        <div class="event-info">
                            <span class="category">${show.genre || 'Show'}</span>
                            <h3>${show.title}</h3>
                            <p><i class="far fa-calendar-alt"></i> ${formattedDate} às ${formattedTime}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${show.location}</p>
                        </div>
                    </a>
                    <div class="event-actions">
                         <span class="price">${show.price}</span>
                         <button class="add-schedule-btn" data-event-title="${show.title}" data-event-date="${show.date.toISOString()}" data-event-location="${show.location}">🗓️ Agendar</button>
                    </div>
                </div>
            `;
            showsGrid.innerHTML += cardHTML;
        });
    }

    // 4. FUNÇÃO PRINCIPAL DE FILTRAGEM
    function applyFilters() {
        // CORREÇÃO: Sempre parte da lista de shows futuros
        let filteredShows = upcomingShows;
        const selectedGenre = genreFilter.value;
        const selectedDate = dateFilter.value;

        if (selectedGenre !== 'todos') {
            filteredShows = filteredShows.filter(show => show.genre === selectedGenre);
        }
        if (selectedDate) {
            filteredShows = filteredShows.filter(show => 
                show.date.toISOString().split('T')[0] === selectedDate
            );
        }
        renderShows(filteredShows);
    }

    // 5. INICIALIZAÇÃO
    populateGenreFilter();
    renderShows(upcomingShows); // Renderiza a lista inicial de shows futuros
    genreFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);
});