function saveUserData() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const disability = document.getElementById('disability').value.trim();
    const notRobot = document.getElementById('notRobot').checked;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    errorMessage.classList.add('d-none');
    successMessage.classList.add('d-none');

    if (!username || !email || !password || !confirmPassword || !notRobot) {
        errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios!';
        errorMessage.classList.remove('d-none');
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'As senhas não coincidem!';
        errorMessage.classList.remove('d-none');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Por favor, insira um e-mail válido!';
        errorMessage.classList.remove('d-none');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        errorMessage.textContent = 'Este e-mail já está registrado!';
        errorMessage.classList.remove('d-none');
        return;
    }

    const newUser = { username, email, password, disability };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    successMessage.textContent = 'Conta de utilizador criada com sucesso!';
    successMessage.classList.remove('d-none');

    document.getElementById('registerForm').reset();
}
