function registerCompany(event) {
    event.preventDefault();

    const companyName = document.getElementById("companyName").value.trim();
    const companyEmail = document.getElementById("companyEmail").value.trim();
    const companyNIF = document.getElementById("companyNIF").value.trim();
    const companyPassword = document.getElementById("companyPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");

    errorMessage.classList.add('d-none');
    successMessage.classList.add('d-none');

    if (!companyName || !companyEmail || !companyNIF || !companyPassword || !confirmPassword) {
        errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios!';
        errorMessage.classList.remove('d-none');
        return;
    }

    if (companyPassword !== confirmPassword) {
        errorMessage.textContent = 'As senhas não coincidem!';
        errorMessage.classList.remove('d-none');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail)) {
        errorMessage.textContent = 'Por favor, insira um e-mail válido!';
        errorMessage.classList.remove('d-none');
        return;
    }

    if (!/^\d{9}$/.test(companyNIF)) {
        errorMessage.textContent = 'O NIF deve conter exatamente 9 dígitos!';
        errorMessage.classList.remove('d-none');
        return;
    }

    let companies = JSON.parse(localStorage.getItem('companies')) || [];

    if (companies.some(company => company.companyEmail === companyEmail || company.companyNIF === companyNIF)) {
        errorMessage.textContent = 'O e-mail ou NIF já está registrado!';
        errorMessage.classList.remove('d-none');
        return;
    }

    const newCompany = { companyName, companyEmail, companyNIF, companyPassword };
    companies.push(newCompany);

    localStorage.setItem('companies', JSON.stringify(companies));

    successMessage.textContent = 'Conta de empresa criada com sucesso!';
    successMessage.classList.remove('d-none');

    document.getElementById('registerCompanyForm').reset();
}
