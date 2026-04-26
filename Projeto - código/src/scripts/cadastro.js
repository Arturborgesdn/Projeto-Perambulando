document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validação simples
        if (password !== confirmPassword) {
            alert('As senhas não coincidem! 🤯');
            return; // Interrompe a execução
        }
        
        if (name && email && password) {
             // --- SIMULAÇÃO DE CADASTRO ---
            // Em um projeto real, você enviaria esses dados para o backend salvar no banco de dados.
            alert(`Cadastro realizado com sucesso, ${name}! 🎉\nAgora você será redirecionado para a página de login.`);
            
            // Redireciona para a página de login para que o novo usuário possa entrar
            window.location.href = 'login.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});