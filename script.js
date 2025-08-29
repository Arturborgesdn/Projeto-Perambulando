document.addEventListener('DOMContentLoaded', () => {
    // Dados de exemplo (no futuro, virão do seu backend/banco de dados)
    const mockEvents = [
        {
            title: 'Show de Alceu Valença - Aniversário da Cidade',
            category: 'Música',
            date: '2025-09-12T21:00:00',
            location: 'Marco Zero, Recife Antigo',
            price: 'Gratuito',
            image: 'https://images.unsplash.com/photo-1598387993441-a364f551403a?q=80&w=400&auto=format&fit=crop',
        },
        {
            title: 'Exposição "Mestres do Barro" de Caruaru',
            category: 'Arte',
            date: '2025-09-15T09:00:00',
            location: 'Cais do Sertão, Recife',
            price: 'R$ 20',
            image: 'https://images.unsplash.com/photo-1549887552-cb136696a844?q=80&w=400&auto=format&fit=crop',
        },
        {
            title: 'Mostra de Cinema Nordestino Retrô',
            category: 'Cinema',
            date: '2025-09-20T19:00:00',
            location: 'Cinema da Fundação, Derby',
            price: 'R$ 15',
            image: 'https://images.unsplash.com/photo-1627926101822-6b995b42d7b4?q=80&w=400&auto=format&fit=crop',
        },
        {
            title: 'Peça "Lisbela e o Prisioneiro"',
            category: 'Teatro',
            date: '2025-09-27T20:30:00',
            location: 'Teatro de Santa Isabel, Santo Antônio',
            price: 'R$ 60',
            image: 'https://images.unsplash.com/photo-1596003716873-9b0a7b5220c3?q=80&w=400&auto=format&fit=crop',
        },
        {
            title: 'Festival Gastronômico "Sabores de Pernambuco"',
            category: 'Feira',
            date: '2025-10-04T12:00:00',
            location: 'Parque Dona Lindu, Boa Viagem',
            price: 'Entrada Gratuita',
            image: 'https://images.unsplash.com/photo-1620706857373-1c04d04a7a8f?q=80&w=400&auto=format&fit=crop',
        },
        {
            title: 'Show da Banda Eddie e convidados',
            category: 'Música',
            date: '2025-10-10T22:00:00',
            location: 'Clube Metrópole, Boa Vista',
            price: 'R$ 50',
            image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=400&auto=format&fit=crop',
        },
         {
            title: 'Feira de Artesanato do Recife Antigo',
            category: 'Feira',
            date: '2025-09-28T10:00:00',
            location: 'Rua do Bom Jesus, Recife Antigo',
            price: 'Gratuito',
            image: 'https://images.unsplash.com/photo-1578334462189-f79a6ce6a524?q=80&w=400&auto=format&fit=crop',
        },
        {
            title: 'Oficina de Frevo para Iniciantes',
            category: 'Arte',
            date: '2025-10-11T15:00:00',
            location: 'Paço do Frevo, Recife Antigo',
            price: 'R$ 30',
            image: 'https://images.unsplash.com/photo-1678834423832-688049a40236?q=80&w=400&auto=format&fit=crop',
        }
    ];

    const eventsContainer = document.getElementById('events-container');

    // Função para renderizar os eventos na tela
    function renderEvents(events) {
        if (!eventsContainer) return; // Não executa se o container não existir na página
        
        eventsContainer.innerHTML = ''; // Limpa a área antes de adicionar novos eventos
        events.forEach(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
            const formattedTime = eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            const eventCard = `
                <div class="event-card">
                    <img src="${event.image}" alt="${event.title}">
                    <div class="event-info">
                        <span class="category">${event.category}</span>
                        <h3>${event.title}</h3>
                        <p><i class="far fa-calendar-alt"></i> ${formattedDate} às ${formattedTime}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    </div>
                    <div class="event-actions">
                        <span class="price">${event.price}</span>
                        <button class="favorite-btn" title="Adicionar aos Favoritos">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            eventsContainer.innerHTML += eventCard;
        });
    }

    // Inicializa a página mostrando todos os eventos
    renderEvents(mockEvents);
    
    // Adiciona funcionalidade ao botão de favoritar (visual)
    if (eventsContainer) {
        eventsContainer.addEventListener('click', function(e) {
            if (e.target.closest('.favorite-btn')) {
                const button = e.target.closest('.favorite-btn');
                const icon = button.querySelector('i');
                button.classList.toggle('active');
                icon.classList.toggle('far'); // ícone de contorno
                icon.classList.toggle('fas'); // ícone preenchido
            }
        });
    }

});