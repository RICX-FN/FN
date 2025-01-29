document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    const emailInput = document.getElementById("email-cliente");
    const senhaInput = document.getElementById("password-cliente");
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    // Função para exibir mensagens de erro e mudar a cor da label
    const showError = (input, message) => {
        const inputBox = input.parentElement; // Seleciona o div da classe .input-box
        inputBox.classList.add("error");

        // Altera a cor da label para indicar erro
        const label = inputBox.querySelector("label");
        if (label) {
            label.style.color = "red"; // Muda a cor da label para vermelho
        }

        let errorMessage = inputBox.querySelector(".error-message");
        if (!errorMessage) {
            errorMessage = document.createElement("small");
            errorMessage.classList.add("error-message");
            inputBox.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    };

    // Função para limpar erro e restaurar cor da label
    const clearError = (input) => {
        const inputBox = input.parentElement;
        inputBox.classList.remove("error");

        const errorMessage = inputBox.querySelector(".error-message");
        if (errorMessage) {
            inputBox.removeChild(errorMessage);
        }

        const label = inputBox.querySelector("label");
        if (label) {
            label.style.color = ""; // Remove estilos inline
        }
    };

    // Limpa os erros antes de validar novamente
    clearError(emailInput);
    clearError(senhaInput);

    const conta = await buscarContaPorEmail(email);
    if (!conta) {
        showError(emailInput, "Este email não está cadastrado.");
        return;
    }

    const senhaCorreta = await verificarSenha(senha, conta.senhaHash);
    if (!senhaCorreta) {
        showError(senhaInput, "A palavra-passe não corresponde ao email informado.");
        return;
    }

    alert("Login realizado com sucesso!");
    window.location.href = "#"; // Redireciona após login bem-sucedido
});

// Simulação da função de busca no banco de dados (deve ser substituída por uma real)
async function buscarContaPorEmail(email) {
    // Simulando um banco de dados para teste
    const usuariosDB = [
        { email: "teste@email.com", senhaHash: "123456" },
        { email: "usuario@email.com", senhaHash: "senha123" }
    ];
    
    return usuariosDB.find(user => user.email === email) || null;
}

// Simulação da verificação de senha (deve ser substituída por um método seguro)
async function verificarSenha(senhaDigitada, senhaHash) {
    return senhaDigitada === senhaHash;
}
