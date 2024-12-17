function registerCompany(event) {
    event.preventDefault();

    // Captura os valores dos campos
    const companyName = document.getElementById("companyName").value.trim();
    const companyEmail = document.getElementById("companyEmail").value.trim();
    const companyNIF = document.getElementById("companyNIF").value.trim();
    const companyPassword = document.getElementById("companyPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");

    // Limpa mensagens anteriores
    errorMessage.classList.add("d-none");
    successMessage.classList.add("d-none");

    // Validação de E-mail com Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail)) {
        showError("Por favor, insira um e-mail válido!");
        return;
    }

    // Validação de NIF
    if (!/^[0-9]{9}$/.test(companyNIF)) {
        showError("O NIF deve conter exatamente 9 dígitos.");
        return;
    }

    // Validação da Senha
    if (companyPassword.length < 6) {
        showError("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (companyPassword !== confirmPassword) {
        showError("As senhas não coincidem!");
        return;
    }

    // Recupera dados existentes no LocalStorage
    const companies = JSON.parse(localStorage.getItem("companies")) || [];

    // Verifica se o e-mail já existe
    if (companies.some(company => company.companyEmail === companyEmail)) {
        showError("Este e-mail já está registrado!");
        return;
    }

    // Verifica se o NIF já existe
    if (companies.some(company => company.companyNIF === companyNIF)) {
        showError("Este NIF já está registrado!");
        return;
    }

    // Adiciona nova empresa
    companies.push({
        companyName,
        companyEmail,
        companyNIF,
        companyPassword
    });

    localStorage.setItem("companies", JSON.stringify(companies));
    showSuccess("Empresa registrada com sucesso!");

    // Limpa o formulário
    clearFields();
}

function showError(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.classList.remove("d-none");
}

function showSuccess(message) {
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = message;
    successMessage.classList.remove("d-none");
}

function clearFields() {
    document.getElementById("companyName").value = "";
    document.getElementById("companyEmail").value = "";
    document.getElementById("companyNIF").value = "";
    document.getElementById("companyPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}