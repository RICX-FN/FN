document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos elementos do formulário
    const form = document.querySelector("form");
    const nomeInput = document.getElementById("nome-reg-empresa");
    const emailInput = document.getElementById("email-reg-empresa");

    // Função para exibir mensagens de erro
    const showError = (input, message) => {
        const inputBox = input.parentElement; // Seleciona o div da classe .input-box
        inputBox.classList.add("error");

        // Altera a cor da label para indicar erro
        const label = inputBox.querySelector("label");
        if (label) {
            label.style.color = "red"; // Muda a cor da label para vermelho
        }

        const errorMessage = document.createElement("small");
        errorMessage.textContent = message;
        errorMessage.classList.add("error-message");

        // Remove mensagens duplicadas
        if (!inputBox.querySelector(".error-message")) {
            inputBox.appendChild(errorMessage);
        }
    };

    // Função para limpar o erro
    const clearError = (input) => {
        const inputBox = input.parentElement;
        inputBox.classList.remove("error");

        // Remove a mensagem de erro, se existir
        const errorMessage = inputBox.querySelector(".error-message");
        if (errorMessage) {
            inputBox.removeChild(errorMessage);
        }

        // Reseta a cor da label para o padrão
        const label = inputBox.querySelector("label");
        if (label) {
            label.style.color = ""; // Remove estilos inline
        }
    };

    // Validação do campo Nome
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

    // Validação do campo E-mail
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

        // Verifica se o e-mail já está registrado
        const isRegistered = await checkEmailInDatabase(email);
        if (isRegistered) {
            showError(emailInput, "O e-mail já está cadastrado.");
            return false;
        }

        clearError(emailInput);
        return true;
    };

    // Função para verificar se o e-mail já está no banco (requisição ao backend)
    const checkEmailInDatabase = async (email) => {
        try {
            const response = await fetch("https://sua-api.com/verificar-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            return data.exists; // Retorna true se o e-mail já existe
        } catch (error) {
            console.error("Erro ao verificar o e-mail no banco:", error);
            return false;
        }
    };

    // Adiciona validação em tempo real (evento 'input' e 'blur')
    nomeInput.addEventListener("input", validateNome);
    emailInput.addEventListener("input", () => validateEmail());

    nomeInput.addEventListener("blur", validateNome);
    emailInput.addEventListener("blur", () => validateEmail());

    // Evento de envio do formulário
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário
        const isNomeValid = validateNome();
        const isEmailValid = await validateEmail();

        if (isNomeValid && isEmailValid) {
            alert("Formulário válido! Enviando os dados...");
            window.location.href = "./login_cliente.html"; // Redireciona para a página de login
            form.submit(); // Envia o formulário se tudo for válido
        }
    });
});
