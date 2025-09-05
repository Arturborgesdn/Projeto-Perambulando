document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    // Função para abrir/fechar o menu
    function toggleMenu() {
        body.classList.toggle('menu-open');
    }

    // Adiciona o evento de clique ao botão do menu
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Adiciona o evento de clique ao overlay para fechar o menu
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }
    // EM main.js - ADICIONE NO FINAL
});

// --- LÓGICA PARA ADICIONAR ITENS À PROGRAMAÇÃO ---
document.body.addEventListener('click', function(e) {
    const button = e.target.closest('.add-schedule-btn');
    if (button) {
        // Pega os dados do evento a partir dos atributos data-* do botão
        const { eventTitle, eventDate, eventLocation } = button.dataset;
        
        const dateObj = new Date(eventDate);
        const dateKey = dateObj.toISOString().split('T')[0]; // Formato AAAA-MM-DD
        const time = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const newItem = {
            id: Date.now(),
            time: time,
            title: eventTitle,
            details: eventLocation,
            type: 'event'
        };

        // Pega a agenda atual do localStorage ou cria um objeto vazio
        const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {};
        
        if (!schedule[dateKey]) {
            schedule[dateKey] = []; // Cria a lista para a data, se for a primeira vez
        }
        schedule[dateKey].push(newItem);

        // Salva a agenda atualizada de volta no localStorage
        localStorage.setItem('userSchedule', JSON.stringify(schedule));
        
        button.textContent = "✅ Adicionado!";
        setTimeout(() => { button.textContent = "🗓️ Adicionar à Programação"; }, 2000);
        
        alert(`"${eventTitle}" foi adicionado à sua programação!`);
    }
});