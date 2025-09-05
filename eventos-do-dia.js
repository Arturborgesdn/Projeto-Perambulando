// eventos-do-dia.js
document.addEventListener('DOMContentLoaded', () => {

    // ETAPA 1: AGREGAR E NORMALIZAR DADOS DE TODAS AS FONTES
    // (A mesma lógica da página inicial para juntar tudo)
    let allEvents = [];
    
    mockEventsData.forEach(event => allEvents.push({ id: `event-${event.id}`, title: event.title, type: event.category, date: new Date(event.date), location: event.location, image: event.image, link: `evento.html?id=${event.id}` }));
    cinemaData.forEach(cinema => cinema.movies.forEach(movie => movie.sessions.forEach(session => allEvents.push({ id: `cinema-${movie.title.replace(/\s/g, '')}`, title: movie.title, type: "Cinema", date: new Date(`${session.date}T${session.time}`), location: cinema.name, image: movie.poster, link: 'cinema.html' }))));
    teatroData.forEach(teatro => teatro.shows.forEach(show => show.sessions.forEach(session => allEvents.push({ id: `teatro-${show.title.replace(/\s/g, '')}`, title: show.title, type: "Teatro", date: new Date(`${session.date}T${session.time}`), location: teatro.name, image: show.poster, link: 'teatro.html' }))));
    feirasData.forEach(feira => allEvents.push({ id: `feira-${feira.id}`, title: feira.name, type: "Feira", date: new Date(), location: feira.address, image: 'https://i.imgur.com/c5Bv6g5.jpg', link: 'feiras.html' }));

    // Elementos da Página
    const pageTitle = document.getElementById('page-title');
    const eventsGrid = document.getElementById('todays-events-grid');
    
    // =======================================================
    // ETAPA 2: FILTRAR APENAS OS EVENTOS DE HOJE E ORDENAR
    // =======================================================
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Formato AAAA-MM-DD

    const todaysEvents = allEvents
        .filter(event => {
            // Compara apenas a parte da data, ignorando o horário
            const eventDateString = event.date.toISOString().split('T')[0];
            return eventDateString === todayString;
        })
        .sort((a, b) => a.date - b.date); // Ordena pelo horário, do mais cedo para o mais tarde

    // =======================================================
    // ETAPA 3: RENDERIZAR TUDO NA TELA
    // =======================================================

    function renderPage() {
        // Atualiza o título da página com a data de hoje
        pageTitle.textContent = `Eventos para Hoje, ${today.toLocaleDateString('pt-BR', {day: 'numeric', month: 'long'})}`;
        
        eventsGrid.innerHTML = '';
        if (todaysEvents.length === 0) {
            eventsGrid.innerHTML = "<p class='empty-state'>Nenhum evento encontrado para hoje. Que tal planejar o amanhã?</p>";
            return;
        }

        todaysEvents.forEach(event => {
            const formattedTime = event.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            const cardHTML = `
                <div class="event-card">
                    <a href="${event.link}" class="event-card-link">
                        <img src="${event.image}" alt="${event.title}">
                        <div class="event-info">
                            <span class="category">${event.type}</span>
                            <h3>${event.title}</h3>
                            <p><i class="far fa-clock"></i> Hoje às ${formattedTime}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        </div>
                    </a>
                    <div class="event-actions">
                         <button class="add-schedule-btn" data-event-title="${event.title}" data-event-date="${event.date.toISOString()}" data-event-location="${event.location}">🗓️ Agendar</button>
                    </div>
                </div>
            `;
            eventsGrid.innerHTML += cardHTML;
        });
    }

    // Chama a função para renderizar a página
    renderPage();
});