// exposicoes.js
document.addEventListener('DOMContentLoaded', () => {

    // 1. FILTRAR DADOS: Pega apenas os eventos da categoria "Exposições"
    const allExposicoes = mockEventsData
        .filter(event => event.category === "Exposições")
        .map(expo => ({ ...expo, date: new Date(expo.date) })) // Converte a data para objeto Date
        .sort((a, b) => a.date - b.date); // Ordena por data

    // Lista apenas com exposições futuras ou em andamento
    const upcomingExposicoes = allExposicoes.filter(expo => expo.date >= new Date());

    // Elementos da Página
    const genreFilter = document.getElementById('genre-filter');
    const dateFilter = document.getElementById('date-filter');
    const exposicoesGrid = document.getElementById('exposicoes-grid');

    // 2. POPULAR O FILTRO DE TIPO/GÊNERO DINAMICAMENTE
    function populateGenreFilter() {
        const genres = new Set(allExposicoes.map(expo => expo.genre));
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
    function renderExposicoes(filteredExpos) {
        exposicoesGrid.innerHTML = '';
        if (filteredExpos.length === 0) {
            exposicoesGrid.innerHTML = "<p class='empty-state'>Nenhuma exposição encontrada com os filtros selecionados.</p>";
            return;
        }
        filteredExpos.forEach(expo => {
            const formattedDate = expo.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
            // Exposições geralmente não têm horário, então podemos omitir
            
            const cardHTML = `
                <div class="event-card">
                    <a href="evento.html?id=${expo.id}" class="event-card-link">
                        <img src="${expo.image}" alt="${expo.title}">
                        <div class="event-info">
                            <span class="category">${expo.genre || 'Exposição'}</span>
                            <h3>${expo.title}</h3>
                            <p><i class="far fa-calendar-alt"></i> Início em ${formattedDate}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${expo.location}</p>
                        </div>
                    </a>
                    <div class="event-actions">
                         <span class="price">${expo.price}</span>
                         <button class="add-schedule-btn" data-event-title="${expo.title}" data-event-date="${expo.date.toISOString()}" data-event-location="${expo.location}">🗓️ Agendar</button>
                    </div>
                </div>
            `;
            exposicoesGrid.innerHTML += cardHTML;
        });
    }

    // 4. FUNÇÃO PRINCIPAL DE FILTRAGEM
    function applyFilters() {
        let filteredExpos = upcomingExposicoes;
        const selectedGenre = genreFilter.value;
        const selectedDate = dateFilter.value;

        // Filtra por gênero
        if (selectedGenre !== 'todos') {
            filteredExpos = filteredExpos.filter(expo => expo.genre === selectedGenre);
        }

        // Filtra por data (verifica se a exposição está acontecendo na data selecionada)
        if (selectedDate) {
            filteredExpos = filteredExpos.filter(expo => 
                expo.date.toISOString().split('T')[0] <= selectedDate
            );
        }

        renderExposicoes(filteredExpos);
    }

    // 5. INICIALIZAÇÃO
    populateGenreFilter();
    renderExposicoes(upcomingExposicoes);
    genreFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);
});