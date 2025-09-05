// cinema.js (COMPLETO E 100% CORRIGIDO)
document.addEventListener('DOMContentLoaded', () => {
    // 1. DADOS DOS CINEMAS

    // 2. VARIÁVEIS DE ELEMENTOS DO HTML
    const listingsContainer = document.getElementById('cinema-listings');
    const dateSelectorContainer = document.getElementById('date-selector');
    // CORREÇÃO #2: O ID correto do modal de cinema é 'session-modal'
    const modal = document.getElementById('session-modal'); 
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body');

    // 3. FUNÇÕES
    function getRatingClass(rating) {
        if (!rating) return '';
        const ratingNumber = rating.split(' ')[0].toLowerCase();
        return `rating-${ratingNumber}`;
    }

    function generateDateSelector() {
        for (let i = 0; i < 5; i++) {
            const date = new Date(); date.setDate(date.getDate() + i);
            const dateString = date.toISOString().split('T')[0];
            let label = date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
            if (i === 0) label = "Hoje"; if (i === 1) label = "Amanhã";
            const button = document.createElement('button');
            button.textContent = label; button.dataset.date = dateString;
            if (i === 0) button.classList.add('active');
            dateSelectorContainer.appendChild(button);
        }
    }

    function renderListings(selectedDate) {
        listingsContainer.innerHTML = '';
        cinemaData.forEach(cinema => {
            let moviesHTML = '';
            cinema.movies.forEach(movie => {
                const sessionsForDay = movie.sessions.filter(session => session.date === selectedDate);
                if (sessionsForDay.length > 0) {
                    let sessionsHTML = '';
                    sessionsForDay.forEach(session => {
                        sessionsHTML += `<a href="#" class="session-link" data-cinema-name="${cinema.name}" data-movie-title="${movie.title}" data-session-time="${session.time}" data-session-type="${session.type}" data-date="${session.date}">${session.time}</a>`;
                    });
                    const ratingClass = getRatingClass(movie.rating);
                    // CORREÇÃO #3: Removida a sinopse do card principal e corrigido o H3
                    moviesHTML += `
                        <div class="movie-listing">
                            <div class="movie-poster"><img src="${movie.poster}" alt="Pôster de ${movie.title}"></div>
                            <div class="movie-details">
                                <h3>${movie.title} <span class="rating-badge ${ratingClass}">${movie.rating || ''}</span></h3>
                                <p class="genre">${movie.genre}</p>
                                <div class="session-times">
                                    <h4>Horários</h4>
                                    <div class="session-list">${sessionsHTML}</div>
                                </div>
                            </div>
                        </div>`;
                }
            });
            if (moviesHTML !== '') {
                listingsContainer.innerHTML += `<article class="cinema-group"><h2>${cinema.name}</h2>${moviesHTML}</article>`;
            }
        });
        if (listingsContainer.innerHTML === '') { listingsContainer.innerHTML = "<p class='empty-state'>Nenhum filme em cartaz para esta data. 😥</p>"; }
    }

    function openModal(details) {
        const { cinemaName, movieTitle, sessionTime, sessionType, date } = details;
        const movie = cinemaData.flatMap(c => c.movies).find(m => m.title === movieTitle);
        const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
        modalBody.innerHTML = `
            <h3>${movieTitle}</h3>
            <p><strong>Classificação:</strong> ${movie.rating}</p>
            <p><strong>Cinema:</strong> ${cinemaName}</p>
            <p><strong>Sessão:</strong> ${sessionTime} (${sessionType}) - ${formattedDate}</p>
            <h3 class="synopsis-title">Sinopse</h3>
            <p>${movie.synopsis}</p>

            <button class="add-schedule-btn" data-event-title="${movie.title}" data-event-date="${new Date(date + 'T' + sessionTime).toISOString()}" data-event-location="${cinemaName}">🗓️ Adicionar à Minha Programação</button>
        `;
        modal.classList.add('active');
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
    }

    // 4. INICIALIZAÇÃO E EVENT LISTENERS
    generateDateSelector();

    dateSelectorContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('.date-selector-container button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderListings(e.target.dataset.date);
        }
    });

    listingsContainer.addEventListener('click', (e) => {
        e.preventDefault();
        const sessionLink = e.target.closest('.session-link');
        if (sessionLink) { openModal(sessionLink.dataset); }
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    const todayString = new Date().toISOString().split('T')[0];
    renderListings(todayString);

// CORREÇÃO #1: O }); final agora está no lugar certo, englobando todo o código.
});