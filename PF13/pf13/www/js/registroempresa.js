document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nomeInput = document.getElementById("nome-reg-empresa");
    const emailInput = document.getElementById("email-reg-empresa");
    const senhaInput = document.getElementById("password-reg-empresa");

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

        const errorMessage = inputBox.querySelector(".error-message");
        if (errorMessage) {
            inputBox.removeChild(errorMessage);
        }

        const label = inputBox.querySelector("label");
        if (label) {
            label.style.color = "";
        }
    };

    const validateNome = () => {
        const nome = nomeInput.value.trim();
        if (nome === "") {
            showError(nomeInput, "Insira um nome.");
            return false;
        } else if (nome.length < 3) {
            showError(nomeInput, "O nome deve ter pelo menos 3 caracteres.");
            return false;
        }
        clearError(nomeInput);
        return true;
    };

    const validateEmail = async () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            showError(emailInput, "Insira um Email.");
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, "Insira um e-mail válido.");
            return false;
        }

        const isRegistered = await checkEmailInDatabase(email);
        if (isRegistered) {
            showError(emailInput, "O e-mail já está cadastrado.");
            return false;
        }

        clearError(emailInput);
        return true;
    };

    async function checkEmailInDatabase(email) {
        try {
            const response = await fetch("http://127.0.0.1:5000/verificar-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao verificar o e-mail: ${response.statusText}`);
            }

            const data = await response.json();
            return data.existe;
        } catch (error) {
            console.error("Erro ao verificar o e-mail no backend:", error);
            alert("Não foi possível verificar o e-mail. Tente novamente mais tarde.");
            return false;
        }
    }

    const validateSenha = () => {
        const senha = senhaInput.value.trim();
        if (senha === "") {
            showError(senhaInput, "Insira uma senha.");
            return false;
        } else if (senha.length < 6) {
            showError(senhaInput, "A senha deve ter pelo menos 6 caracteres.");
            return false;
        }
        clearError(senhaInput);
        return true;
    };

    nomeInput.addEventListener("input", validateNome);
    emailInput.addEventListener("input", () => validateEmail());
    senhaInput.addEventListener("input", validateSenha);

    nomeInput.addEventListener("blur", validateNome);
    emailInput.addEventListener("blur", () => validateEmail());
    senhaInput.addEventListener("blur", validateSenha);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const isNomeValid = validateNome();
        const isEmailValid = await validateEmail();
        const isSenhaValid = validateSenha();

        if (isNomeValid && isEmailValid && isSenhaValid) {
            try {
                const response = await fetch("http://127.0.0.1:5000/registrar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome: nomeInput.value.trim(),
                        email: emailInput.value.trim(),
                        senha: senhaInput.value.trim(),
                    }),
                });

                if (response.ok) {
                    alert("Usuário registrado com sucesso!");
                    window.location.href = "./login_empresa.html";
                } else {
                    const errorData = await response.json();
                    const errorMessage = errorData.erro || "Erro ao registrar.";
                    showError(emailInput, errorMessage);
                }
            } catch (error) {
                console.error("Erro ao registrar o usuário:", error);
                alert("Ocorreu um erro. Tente novamente mais tarde.");
            }
        }
    });
});