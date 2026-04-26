// teatro.js (VERSÃO SIMPLIFICADA, SEM AVALIAÇÕES)
document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos da página
    const dateSelectorContainer = document.getElementById('date-selector');
    const listingsContainer = document.getElementById('teatro-listings');
    const modal = document.getElementById('show-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body');

    // Funções auxiliares (sem alterações)
    function getRatingClass(rating) {
        if (!rating) return '';
        const ratingNumber = rating.split(' ')[0].toLowerCase();
        return `rating-${ratingNumber}`;
    }

    function generateDateSelector() {
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dateString = date.toISOString().split('T')[0];
            let label = date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
            if (i === 0) label = "Hoje";
            if (i === 1) label = "Amanhã";
            const button = document.createElement('button');
            button.textContent = label;
            button.dataset.date = dateString;
            if (i === 0) button.classList.add('active');
            dateSelectorContainer.appendChild(button);
        }
    }

    // Função de renderização principal (sem alterações)
    function renderListings(selectedDate) {
        listingsContainer.innerHTML = '';
        teatroData.forEach(teatro => {
            let showsHTML = '';
            teatro.shows.forEach(show => {
                const sessionsForDay = show.sessions.filter(session => session.date === selectedDate);
                if (sessionsForDay.length > 0) {
                    let sessionsHTML = '';
                    sessionsForDay.forEach(session => {
                        sessionsHTML += `<a href="#" class="session-link" data-teatro-name="${teatro.name}" data-show-title="${show.title}" data-session-date="${session.date}" data-session-time="${session.time}" data-price="${session.price}">${session.time}</a>`;
                    });
                    const ratingClass = getRatingClass(show.rating);
                    showsHTML += `<div class="show-listing"><div class="show-poster"><img src="${show.poster}" alt="Pôster de ${show.title}"></div><div class="show-details"><h3>${show.title} <span class="rating-badge ${ratingClass}">${show.rating}</span></h3><p class="genre">${show.genre}</p><div class="session-times"><h4>Sessões para ${new Date(selectedDate+'T12:00:00').toLocaleDateString('pt-BR', {day:'numeric', month:'long'})}</h4><div class="session-list">${sessionsHTML}</div></div></div></div>`;
                }
            });
            if (showsHTML !== '') {
                const teatroHTML = `<article class="teatro-group"><h2>${teatro.name}</h2>${showsHTML}</article>`;
                listingsContainer.innerHTML += teatroHTML;
            }
        });
        if (listingsContainer.innerHTML === '') {
            listingsContainer.innerHTML = "<p class='empty-state'>Nenhum espetáculo em cartaz para esta data. 😥</p>";
        }
    }

    // =======================================================
    // FUNÇÃO DO MODAL (VERSÃO SIMPLIFICADA SEM AVALIAÇÕES)
    // =======================================================
    function openModal(details) {
        const { showTitle, teatroName, sessionDate, sessionTime, price } = details;
        const show = teatroData.flatMap(t => t.shows).find(s => s.title === showTitle);
        const formattedDate = new Date(sessionDate+'T12:00:00').toLocaleDateString('pt-BR', {weekday:'long', day: '2-digit', month:'long'});
        
        // Injeta apenas o conteúdo principal do espetáculo
        modalBody.innerHTML = `
            <h3>${showTitle}</h3>
            <p><strong>Local:</strong> ${teatroName}</p>
            <p><strong>Quando:</strong> ${formattedDate} às ${sessionTime}</p>
            <p><strong>Ingresso:</strong> ${price}</p>
            <p><strong>Classificação:</strong> ${show.rating}</p>
            <h3 class="synopsis-title">Sinopse</h3>
            <p>${show.synopsis}</p>
        `;
        
        modal.classList.add('active');
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
    }

    // INICIALIZAÇÃO E EVENT LISTENERS (sem alterações)
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
});