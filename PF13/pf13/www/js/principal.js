document.addEventListener("DOMContentLoaded", function () {
    const vagasContainer = document.getElementById("vagas-container");
    const vagas = JSON.parse(localStorage.getItem("vagas")) || [];

    if (vagas.length > 0) {
        vagas.forEach((vaga, index) => {
            const card = document.createElement("div");
            card.classList.add("vaga-card");
            card.innerHTML = `
                <p><strong>Nº vagas:</strong> ${vaga.numeroVagas}</p>
                <p><strong>Área atuação:</strong> ${vaga.areaAtuacao}</p>
                <p><strong>Data:</strong> ${vaga.data}</p>
                <p><strong>Descrição:</strong> ${vaga.descricao}</p>
                <input type="file" class="input-cv" id="cv-${index}" accept=".pdf,.docx,.txt" hidden />
                <button class="btn-upload" onclick="document.getElementById('cv-${index}').click()">📂 Selecionar Currículo</button>
                <span class="cv-nome" id="cv-nome-${index}">Nenhum arquivo selecionado</span>
                <button class="btn-aplicar">Aplicar</button>
            `;
            vagasContainer.appendChild(card);
        });

        // Atualiza o nome do arquivo quando o usuário seleciona um CV
        document.querySelectorAll(".input-cv").forEach((input, index) => {
            input.addEventListener("change", function () {
                const nomeArquivo = input.files.length > 0 ? input.files[0].name : "Nenhum arquivo selecionado";
                document.getElementById(`cv-nome-${index}`).innerText = nomeArquivo;
            });
        });

        // Evento para enviar o currículo ao backend
        document.querySelectorAll(".btn-aplicar").forEach((botao, index) => {
            botao.addEventListener("click", async function () {
                const inputFile = document.getElementById(`cv-${index}`);

                if (inputFile.files.length === 0) {
                    alert("Por favor, selecione um currículo antes de aplicar!");
                    return;
                }

                const formData = new FormData();
                formData.append("curriculoCliente", inputFile.files[0]);

                try {
                    const response = await fetch("http://127.0.0.1:5000/aplicar_vaga", {
                        method: "POST",
                        body: formData
                    });

                    const result = await response.json();
                    if (response.ok) {
                        alert("Candidatura enviada com sucesso!\n" + result.analise.resultado);
                    } else {
                        alert("Erro ao enviar candidatura: " + result.error);
                    }
                } catch (error) {
                    alert("Erro ao conectar ao servidor!");
                    console.error(error);
                }
            });
        });
    }
});
