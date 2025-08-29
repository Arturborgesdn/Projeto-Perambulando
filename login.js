document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio real do formulário

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // --- SIMULAÇÃO DE LOGIN ---
        // Em um projeto real, aqui você enviaria os dados para o backend
        // para verificar se o usuário e a senha estão corretos.
        if (email && password) {
            alert('Login realizado com sucesso! ✅');

            // Salva um "token de usuário" falso no localStorage para simular que ele está logado.
            // Guardamos o nome do usuário para usar na página do painel.
            const fakeUser = {
                name: "Visitante", // Em um sistema real, o nome viria do banco de dados
                email: email,
            };
            localStorage.setItem('currentUser', JSON.stringify(fakeUser));

            // Redireciona o usuário para a página do painel
            window.location.href = 'painel.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});