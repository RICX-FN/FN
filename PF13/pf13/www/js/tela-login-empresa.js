// login empresa
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email-empresa");
    const passwordInput = document.getElementById("password-empresa");

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

    const validatePassword = () => {
        const password = passwordInput.value.trim();

        if (password === "") {
            showError(passwordInput, "A senha é obrigatória.");
            return false;
        }
        clearError(passwordInput);
        return true;
    };

    const authenticateCompany = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/login", { // URL de login unificada
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email: email, 
                    senha: password // Envia 'senha' para o backend
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.erro || "Erro na requisição"); // Mensagem de erro unificada
            }

            const data = await response.json();
            if (data.mensagem === "Login bem-sucedido!") { // Verifica a mensagem de sucesso
                alert("Login da empresa bem-sucedido!");
                window.location.href = "./perfil-empresa.html";
            } else {
                showError(passwordInput, data.erro || "E-mail ou senha inválidos."); // Mensagem de erro unificada
            }
        } catch (error) {
            console.error("Erro ao autenticar a empresa:", error);
            showError(passwordInput, error.message || "Erro ao tentar fazer login. Tente novamente.");
        }
    };

    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);

    emailInput.addEventListener("blur", validateEmail);
    passwordInput.addEventListener("blur", validatePassword);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            authenticateCompany(email, password);
        }
    });
});

