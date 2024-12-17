function saveUserData() {
    // Obter valores dos campos
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const disability = document.getElementById('disability');
    const notRobot = document.getElementById('notRobot');
    const errorMessage = document.getElementById('errorMessage');

    // Resetar mensagens de erro
    errorMessage.classList.add('d-none');
    [username, email, password, confirmPassword].forEach(field => field.classList.remove('is-invalid'));

    let hasError = false;

    // Verificar se os campos estão preenchidos
    [username, email, password, confirmPassword].forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            hasError = true;
        }
    });

    // Validação do e-mail (regex para formato de e-mail válido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('is-invalid');
        errorMessage.textContent = 'Por favor, insira um e-mail válido!';
        errorMessage.classList.remove('d-none');
        return;
    }

    // Verificar se as senhas coincidem
    if (password.value.trim() && confirmPassword.value.trim() &&
        password.value !== confirmPassword.value) {
        confirmPassword.classList.add('is-invalid');
        errorMessage.textContent = 'As senhas não coincidem!';
        errorMessage.classList.remove('d-none');
        return;
    }

    // Verificar checkbox
    if (!notRobot.checked) {
        alert('Por favor, confirme que não é um robô!');
        return;
    }

    if (hasError) {
        errorMessage.textContent = 'Por favor, preencha todos os campos corretamente!';
        errorMessage.classList.remove('d-none');
        return;
    }

    // Obter a lista de usuários do LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar duplicação (e-mail já existente)
    const emailExists = users.some(user => user.email === email.value.trim());
    if (emailExists) {
        alert('Este e-mail já está registrado!');
        email.classList.add('is-invalid');
        return;
    }

    // Criar o objeto do usuário
    const userData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        disability: disability.value.trim()
    };

    // Adicionar o novo usuário à lista e salvar no LocalStorage
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    showSuccess("Conta criada com sucesso!");

    function showSuccess(message) {
        const successMessage = document.getElementById("successMessage");
        successMessage.textContent = message;
        successMessage.classList.remove("d-none");
    }
    // Limpar os campos após sucesso
    username.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    disability.value = '';
    notRobot.checked = false;
}