// evento.js
document.addEventListener('DOMContentLoaded', () => {

    const contentDiv = document.getElementById('event-detail-content');

    // 1. Pega os "parâmetros" da URL (o que vem depois do "?")
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id')); // Pega o valor do id e transforma em número

    // 2. Procura na nossa lista o evento que tem o ID correspondente
    const event = mockEvents.find(e => e.id === eventId);

    // 3. Se encontrou o evento, mostra na tela. Se não, mostra um erro.
    if (event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
        const formattedTime = eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        contentDiv.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="event-detail-image">
            <div class="event-detail-header">
                <span class="category">${event.category}</span>
                <h1>${event.title}</h1>
                <div class="event-detail-meta">
                    <p><i class="fas fa-calendar-alt"></i> ${formattedDate} às ${formattedTime}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <p><i class="fas fa-dollar-sign"></i> ${event.price}</p>
                </div>
            </div>
            <div class="event-detail-body">
                <h2>Sobre o Evento</h2>
                <p>${event.description}</p>
            </div>
        `;
    } else {
        contentDiv.innerHTML = '<h1>Evento não encontrado!</h1>';
    }
});