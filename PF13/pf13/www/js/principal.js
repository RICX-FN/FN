document.addEventListener("DOMContentLoaded", function () {
    const vagasContainer = document.getElementById("vagas-container");
    const vagas = JSON.parse(localStorage.getItem("vagas")) || [];

    function obterUsuarioID() {
        return localStorage.getItem("usuario_id"); // Obtém o ID real do usuário autenticado
    }

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
                <button class="btn-upload" onclick="document.getElementById('cv-${index}').click()">📄 Selecionar Currículo</button>
                <span class="cv-nome" id="cv-nome-${index}">Nenhum arquivo selecionado</span>
                <button class="btn-aplicar">Aplicar</button>
            `;
            vagasContainer.appendChild(card);
        });

        document.querySelectorAll(".input-cv").forEach((input, index) => {
            input.addEventListener("change", function () {
                const nomeArquivo = input.files.length > 0 ? input.files[0].name : "Nenhum arquivo selecionado";
                document.getElementById(`cv-nome-${index}`).innerText = nomeArquivo;
            });
        });

        const token = localStorage.getItem("token");

        document.querySelectorAll(".btn-aplicar").forEach((botao, index) => {
            botao.addEventListener("click", async function () {
                const inputFile = document.getElementById(`cv-${index}`);

                if (!token) {
                    alert("Usuário não autenticado. Faça login para aplicar!");
                    return;
                }

                if (inputFile.files.length === 0) {
                    alert("Por favor, selecione um currículo antes de aplicar!");
                    return;
                }

                const usuarioID = obterUsuarioID(); // Obtém o ID do usuário autenticado

                const formData = new FormData();
                formData.append("usuario_id", usuarioID);
                formData.append("curriculo", inputFile.files[0]); // Envia o arquivo corretamente
                formData.append("modelo_vaga", vagas[index].modeloVaga); // Adiciona o modelo da vaga

                try {
                    const response = await fetch("http://127.0.0.1:5000/aplicar_vaga", {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    const result = await response.json();
                    console.log("Resposta do servidor:", result);

                    if (response.ok) {
                        alert("Candidatura enviada com sucesso!\n" + (result.analise || ""));
                    } else {
                        alert("Erro ao enviar candidatura: " + (result.erro || "Erro desconhecido"));
                    }
                } catch (error) {
                    alert("Erro ao conectar ao servidor!");
                    console.error(error);
                }
            });
        });
    }
});
