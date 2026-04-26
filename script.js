// script.js (FINAL, COM FILTRO QUÁDRUPLO)
document.addEventListener('DOMContentLoaded', () => {

    // ETAPA 1: AGREGAR E NORMALIZAR DADOS (com preço padronizado)
    let allEvents = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    mockEventsData.forEach(event => {
        let priceValue = 0;
        if (event.price && event.price.toLowerCase() !== 'gratuito' && event.price.toLowerCase() !== 'entrada gratuita') {
            priceValue = parseFloat(event.price.replace('R$', '').replace(',', '.')) || 1;
        }
        allEvents.push({ id: `event-${event.id}`, title: event.title, type: event.category, date: new Date(event.date), location: event.location, image: event.image, link: `evento.html?id=${event.id}`, price: priceValue });
    });
    cinemaData.forEach(cinema => cinema.movies.forEach(movie => { const firstSession = movie.sessions.map(s => new Date(s.date + 'T' + s.time)).filter(d => d >= today).sort((a, b) => a - b)[0]; if (firstSession) { allEvents.push({ id: `cinema-${movie.title.replace(/\s/g, '')}`, title: movie.title, type: "Cinema", date: firstSession, location: cinema.name, image: movie.poster, link: 'cinema.html', price: 1 }); } }));
    teatroData.forEach(teatro => teatro.shows.forEach(show => { const firstSession = show.sessions.filter(s => new Date(s.date + 'T' + s.time) >= today).sort((a, b) => new Date(a.date) - new Date(b.date))[0]; if (firstSession) { allEvents.push({ id: `teatro-${show.title.replace(/\s/g, '')}`, title: show.title, type: "Teatro", date: new Date(firstSession.date + 'T' + firstSession.time), location: teatro.name, image: show.poster, link: 'teatro.html', price: parseFloat(firstSession.price.replace('R$', '')) || 1 }); } }));
    feirasData.forEach(feira => allEvents.push({ id: `feira-${feira.id}`, title: feira.name, type: "Feira", date: new Date(), location: feira.address, image: 'https://i.imgur.com/c5Bv6g5.jpg', link: 'feiras.html', price: 0 }));

    const upcomingEvents = allEvents.filter(event => event.date >= today).sort((a, b) => a.date - b.date);

    // CAPTURAR ELEMENTOS DA PÁGINA
    const searchInput = document.getElementById('search-input');
    const priceFilterSelect = document.getElementById('price-filter');
    const dateFilterInput = document.getElementById('date-filter');
    const categoryFilterNav = document.querySelector('.filter-nav');
    const eventsGrid = document.getElementById('events-grid');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    
    // VARIÁVEL DE ESTADO PARA O FILTRO DE CATEGORIA
    let activeCategoryFilter = 'Todos';

    // FUNÇÕES
   // EM script.js, DENTRO DE createEventCard

    function createEventCard(event) {
        const formattedDate = event.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
        const formattedTime = event.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        // Adicionamos o <div class="event-actions"> e o botão
        return `<div class="event-card">
            <a href="${event.link}" class="event-card-link">
                <img src="${event.image}" alt="${event.title}">
                <div class="event-info">
                    <span class="category">${event.type}</span>
                    <h3>${event.title}</h3>
                    <p><i class="far fa-calendar-alt"></i> ${formattedDate} às ${formattedTime}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                </div>
            </a>
            <div class="event-actions">
                <button class="add-schedule-btn" data-event-title="${event.title}" data-event-date="${event.date.toISOString()}" data-event-location="${event.location}">🗓️ Adicionar à Programação</button>
            </div>
        </div>`;
    }
    
    function renderEvents(eventsToRender) {
        eventsGrid.innerHTML = '';
        if (eventsToRender.length === 0) {
            eventsGrid.innerHTML = "<p class='empty-state'>Nenhum evento encontrado. Tente outros filtros! 🧐</p>";
            return;
        }
        eventsToRender.forEach(event => { eventsGrid.innerHTML += createEventCard(event); });
    }

    function applyFilters() {
        let filteredEvents = upcomingEvents;

        // 1. Filtro de CATEGORIA
        if (activeCategoryFilter !== 'Todos') {
            filteredEvents = filteredEvents.filter(event => event.type === activeCategoryFilter);
        }

        // 2. Filtro de PREÇO
        const priceFilterValue = priceFilterSelect.value;
        switch (priceFilterValue) {
            case 'gratuito': filteredEvents = filteredEvents.filter(event => event.price === 0); break;
            case 'range1': filteredEvents = filteredEvents.filter(event => event.price > 0 && event.price <= 20); break;
            case 'range2': filteredEvents = filteredEvents.filter(event => event.price > 20 && event.price <= 50); break;
            case 'range3': filteredEvents = filteredEvents.filter(event => event.price > 50 && event.price <= 100); break;
            case 'range4': filteredEvents = filteredEvents.filter(event => event.price > 100); break;
        }
        
        // 3. Filtro de DATA
        const selectedDate = dateFilterInput.value;
        if (selectedDate) {
            filteredEvents = filteredEvents.filter(event => event.date.toISOString().split('T')[0] === selectedDate);
        }

        // 4. Filtro de TEXTO
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(searchTerm));
        }
        
        renderEvents(filteredEvents);
    }

    // EVENT LISTENERS
    searchInput.addEventListener('input', applyFilters);
    priceFilterSelect.addEventListener('change', applyFilters);
    dateFilterInput.addEventListener('change', applyFilters);

    categoryFilterNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            activeCategoryFilter = e.target.dataset.filter;
            applyFilters();
        }
    });

    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        priceFilterSelect.value = 'todos';
        dateFilterInput.value = '';
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="Todos"]').classList.add('active');
        activeCategoryFilter = 'Todos';
        applyFilters();
    });
    
    renderEvents(upcomingEvents);
});
