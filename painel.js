document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutBtn = document.getElementById('logout-btn');

    // Tenta pegar os dados do usuário "logado" do localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // --- PROTEÇÃO DE ROTA SIMULADA ---
    // Se não houver usuário logado, redireciona para a página de login
    if (!currentUser) {
        window.location.href = 'login.html';
        return; // Interrompe a execução do resto do script
    }

    // Se o usuário estiver logado, personaliza a mensagem de boas-vindas
    // (Em um sistema real, o nome viria do objeto de usuário completo)
    welcomeMessage.textContent = `Bem-vindo(a) de volta, ${currentUser.email}!`;

    // Funcionalidade do botão de sair
    logoutBtn.addEventListener('click', () => {
        // Remove os dados do usuário do localStorage
        localStorage.removeItem('currentUser');
        
        // Redireciona para a página inicial
        window.location.href = 'index.html';
// painel.js (COMPLETO E REFEITO)
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Lógica de login e logout (sem alterações)
    // ...

    // Elementos da Agenda
    const datePicker = document.getElementById('date-picker');
    const scheduleTitle = document.getElementById('schedule-title');
    const scheduleList = document.getElementById('schedule-list');
    const addNoteForm = document.getElementById('add-note');
    const noteTimeInput = document.getElementById('note-time');
    const noteTitleInput = document.getElementById('note-title');

    function renderSchedule(dateString) {
        const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {};
        const itemsForDay = schedule[dateString] || [];
        
        const displayDate = new Date(dateString + 'T12:00:00');
        scheduleTitle.textContent = `Programação para ${displayDate.toLocaleDateString('pt-BR', {weekday: 'long', day: '2-digit', month: 'long'})}`;
        
        scheduleList.innerHTML = '';
        
        if (itemsForDay.length === 0) {
            scheduleList.innerHTML = '<li class="empty-state">Nenhuma programação para este dia. Adicione eventos ou anotações!</li>';
            return;
        }

        itemsForDay.sort((a, b) => a.time.localeCompare(b.time));

        itemsForDay.forEach(item => {
            const li = document.createElement('li');
            li.className = 'schedule-item';
            li.innerHTML = `
                <div class="schedule-item-time">${item.time}</div>
                <div class="schedule-item-content">
                    <h4>${item.title}</h4>
                    <p>${item.details || ''}</p>
                </div>
                <button class="schedule-item-delete" data-id="${item.id}" title="Remover item">&times;</button>
            `;
            scheduleList.appendChild(li);
        });
    }

    datePicker.addEventListener('change', () => {
        renderSchedule(datePicker.value);
    });

    addNoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const dateKey = datePicker.value;
        const newItem = {
            id: Date.now(),
            time: noteTimeInput.value,
            title: noteTitleInput.value,
            details: 'Anotação Pessoal',
            type: 'note'
        };

        const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {};
        if (!schedule[dateKey]) schedule[dateKey] = [];
        schedule[dateKey].push(newItem);
        localStorage.setItem('userSchedule', JSON.stringify(schedule));
        
        renderSchedule(dateKey);
        addNoteForm.reset();
    });
    
    scheduleList.addEventListener('click', (e) => {
        if (e.target.classList.contains('schedule-item-delete')) {
            const itemId = parseInt(e.target.dataset.id);
            const dateKey = datePicker.value;
            const schedule = JSON.parse(localStorage.getItem('userSchedule')) || {};
            
            if (schedule[dateKey]) {
                schedule[dateKey] = schedule[dateKey].filter(item => item.id !== itemId);
                localStorage.setItem('userSchedule', JSON.stringify(schedule));
                renderSchedule(dateKey);
            }
        }
    });

    // Inicialização
    const todayString = new Date().toISOString().split('T')[0];
    datePicker.value = todayString;
    renderSchedule(todayString);
});
