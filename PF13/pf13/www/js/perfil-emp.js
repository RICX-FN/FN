document.addEventListener("DOMContentLoaded", function () {
    function mostrarMensagem(texto, tipo) {
        const msgDiv = document.getElementById("mensagem");
        msgDiv.textContent = texto;
        msgDiv.className = `mensagem ${tipo === "sucesso" ? "sucesso" : "erro"}`;
        msgDiv.style.display = "block";
        msgDiv.style.opacity = "1";

        setTimeout(() => {
            msgDiv.style.opacity = "0"; // Suaviza a saída da mensagem
            setTimeout(() => {
                msgDiv.style.display = "none";
            }, 500);
        }, 3000);
    }

    let modeloCVCarregado = false;
    let nomeArquivoModeloCV = "";
    let carregandoArquivo = false; // Impede múltiplos uploads simultâneos

    document.querySelector(".carregar-cv").addEventListener("click", function () {
        if (carregandoArquivo) {
            mostrarMensagem("Aguarde o carregamento do arquivo anterior.", "erro");
            return;
        }

        let fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".pdf, .docx, .txt";

        fileInput.addEventListener("change", async function () {
            if (fileInput.files.length === 0) {
                mostrarMensagem("Por favor, selecione um arquivo para upload.", "erro");
                return;
            }

            carregandoArquivo = true; // Bloqueia novos uploads até a conclusão

            let formData = new FormData();
            formData.append("modeloCV", fileInput.files[0]);

            try {
                const response = await fetch("http://localhost:5000/upload_modelo_cv", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.erro || "Erro ao enviar o arquivo.");
                }

                mostrarMensagem("Modelo de currículo carregado com sucesso!", "sucesso");
                modeloCVCarregado = true;
                nomeArquivoModeloCV = fileInput.files[0].name;

                const nomeArquivoElemento = document.getElementById("nome-arquivo-modelo-cv");
                if (nomeArquivoElemento) {
                    nomeArquivoElemento.textContent = nomeArquivoModeloCV;
                } else {
                    console.error("Elemento com ID 'nome-arquivo-modelo-cv' não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao enviar o modelo de CV:", error);
                mostrarMensagem(error.message || "Erro ao carregar o currículo!", "erro");
            } finally {
                carregandoArquivo = false; // Libera para novos uploads
            }
        });

        fileInput.click();
    });

    document.getElementById("publicar-btn").addEventListener("click", function () {
        const areaAtuacao = document.querySelector("input[placeholder='Área de atuação']").value.trim();
        const numeroVagas = document.querySelector("input[placeholder='Nº de Vagas']").value.trim();
        const data = document.querySelector("input[placeholder='Data']").value.trim();
        const descricao = document.querySelector(".description").value.trim();

        if (!areaAtuacao || !numeroVagas || !descricao || !data) {
            mostrarMensagem("Preencha todos os campos antes de publicar.", "erro");
            return;
        }

        if (!modeloCVCarregado) {
            mostrarMensagem("Por favor, carregue um currículo antes de publicar a vaga.", "erro");
            return;
        }

        const vaga = {
            areaAtuacao,
            numeroVagas,
            data,
            descricao,
            modeloCV: nomeArquivoModeloCV,
        };

        try {
            const vagas = JSON.parse(localStorage.getItem("vagas")) || [];
            vagas.push(vaga);
            localStorage.setItem("vagas", JSON.stringify(vagas));

            mostrarMensagem("Vaga publicada com sucesso!", "sucesso");
        } catch (error) {
            console.error("Erro ao salvar vaga:", error);
            mostrarMensagem("Erro ao publicar a vaga. Tente novamente.", "erro");
        }
    });
});
