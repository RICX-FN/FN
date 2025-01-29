document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email-empresa");
    const passwordInput = document.getElementById("password-empresa");

    // Função para exibir erro e mudar cor da label para vermelho
    const showError = (input, message) => {
        const inputBox = input.parentElement;
        inputBox.classList.add("error");

        const label = inputBox.querySelector("label");
        if (label) {
            label.style.color = "red";
        }

        let errorMessage = inputBox.querySelector(".error-message");
        if (!errorMessage) {
            errorMessage = document.createElement("small");
            errorMessage.classList.add("error-message");
            inputBox.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    };

    // Função para limpar erro e restaurar cor padrão da label
    const clearError = (input) => {
        const inputBox = input.parentElement;
        inputBox.classList.remove("error");

        const label = inputBox.querySelector("label");
        if (label) {
            label.style.color = "";
        }

        const errorMessage = inputBox.querySelector(".error-message");
        if (errorMessage) {
            inputBox.removeChild(errorMessage);
        }
    };

    // Validação do email (vazio e formato)
    const validateEmail = () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            showError(emailInput, "O e-mail é obrigatório.");
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, "Insira um e-mail válido.");
            return false;
        }
        clearError(emailInput);
        return true;
    };

    // Validação da senha (apenas verificar se está vazia)
    const validatePassword = () => {
        const password = passwordInput.value.trim();

        if (password === "") {
            showError(passwordInput, "A senha é obrigatória.");
            return false;
        }
        clearError(passwordInput);
        return true;
    };

    // Eventos para validação em tempo real
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);

    emailInput.addEventListener("blur", validateEmail);
    passwordInput.addEventListener("blur", validatePassword);

    // Evento de envio do formulário
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            alert("Dados enviados para autenticação!");
            form.submit(); // Enviar o formulário para o backend
        }
    });
});
