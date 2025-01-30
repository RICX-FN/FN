function mostrarMensagem(texto, tipo) {
    const msgDiv = document.getElementById("mensagem");
    msgDiv.textContent = texto;
    msgDiv.className = "mensagem " + (tipo === "sucesso" ? "sucesso" : "erro");
    msgDiv.style.display = "block";

    setTimeout(() => {
        msgDiv.style.display = "none";  // Esconder a mensagem após 3 segundos
    }, 3000);
}

document.querySelector(".carregar-cv").addEventListener("click", function () {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf, .docx, .txt";

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length === 0) {
            mostrarMensagem("Por favor, selecione um arquivo para upload.", "erro");
            return;
        }

        let formData = new FormData();
        formData.append("modeloCV", fileInput.files[0]);

        fetch("http://127.0.0.1:5000/upload_modelo_cv", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            mostrarMensagem("Modelo de currículo carregado com sucesso!", "sucesso");
        })
        .catch(error => {
            console.error("Erro ao enviar o modelo de CV:", error);
            mostrarMensagem("Erro ao carregar o currículo!", "erro");
        });
    });

    fileInput.click(); // Aciona o input de arquivo
});

document.getElementById("publicar-btn").addEventListener("click", function () {
    const areaAtuacao = document.querySelector("input[placeholder='Área de atuação']").value;
    const numeroVagas = document.querySelector("input[placeholder='Nº de Vagas']").value;
    const data = document.querySelector("input[placeholder='Data']").value;
    const descricao = document.querySelector(".description").value;

    if (!areaAtuacao || !numeroVagas || !descricao || !data) {
        mostrarMensagem("Preencha todos os campos antes de publicar.", "erro");
        return;
    }

    const vaga = { areaAtuacao, numeroVagas, data, descricao };
    const vagas = JSON.parse(localStorage.getItem("vagas")) || [];
    vagas.push(vaga);
    localStorage.setItem("vagas", JSON.stringify(vagas));

    mostrarMensagem("Vaga publicada com sucesso!", "sucesso");
});
