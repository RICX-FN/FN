// login cliente
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email-cliente");
    const passwordInput = document.getElementById("password-cliente");

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
            errorMessage.remove();
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

    const authenticateClient = async (email, password) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email, 
                    senha: password // Correção aqui
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.erro || "Erro ao tentar fazer login. Tente novamente.");
            }

            if (data.mensagem === "Login bem-sucedido!") {
                alert("Login do Cliente bem-sucedido!");
                localStorage.setItem("usuario_id", data.usuario_id);
                localStorage.setItem("token", data.token);
                localStorage.setItem("tipo_usuario", data.tipo);
                window.location.href = "./principal.html";
            } else {
                showError(passwordInput, data.erro || "E-mail ou senha inválidos.");
            }
        } catch (error) {
            console.error("Erro ao autenticar o cliente:", error);
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
            authenticateClient(email, password);
        }
    });
});
