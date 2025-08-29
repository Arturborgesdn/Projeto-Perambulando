document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutBtn = document.getElementById('logout-btn');

    // Tenta pegar os dados do usuário "logado" do localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // --- PROTEÇÃO DE ROTA SIMULADA ---
    // Se não houver usuário logado, redireciona para a página de login
    if (!currentUser) {
        alert('Você precisa estar logado para acessar esta página! 🔒');
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
        alert('Você foi desconectado.');
        
        // Redireciona para a página inicial
        window.location.href = 'index.html';
    });
});