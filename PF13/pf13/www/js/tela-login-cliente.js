document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#login-form");
    const emailInput = document.getElementById("email-cliente");
    const passwordInput = document.getElementById("password-cliente");

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

    // Função para verificar a autenticação do usuário (requisição ao backend)
    const authenticateUser = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/login", { // URL correta
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email, // Usa os valores dos inputs
                    password: password // Usa os valores dos inputs
                })
            });

            if (!response.ok) { // Verifica se a resposta foi um erro (ex: 400, 500)
                const errorData = await response.json(); // Tenta obter a mensagem de erro do backend
                throw new Error(errorData.message || "Erro na requisição"); // Lança o erro com a mensagem
            }

            const data = await response.json();
            if (data.success) {
                // Autenticação bem-sucedida
                alert("Login bem-sucedido!");
                window.location.href = "./principal.html"; // Redireciona para a página inicial do cliente
            } else {
                // Erro de login
                showError(passwordInput, data.message || "E-mail ou senha inválidos."); // Exibe a mensagem do backend ou uma mensagem padrão
            }
        } catch (error) {
            console.error("Erro ao autenticar o usuário:", error);
            showError(passwordInput, error.message || "Erro ao tentar fazer login. Tente novamente."); // Exibe a mensagem do erro ou uma mensagem padrão
        }
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
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Chama a função de autenticação
            authenticateUser(email, password);
        }
    });
});