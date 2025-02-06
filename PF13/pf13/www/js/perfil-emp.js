document.addEventListener('DOMContentLoaded', function() {
    function mostrarMensagem(texto, tipo) {
        const msgDiv = document.getElementById("mensagem");
        msgDiv.textContent = texto;
        msgDiv.className = "mensagem " + (tipo === "sucesso" ? "sucesso" : "erro");
        msgDiv.style.display = "block";

        setTimeout(() => {
            msgDiv.style.display = "none"; // Esconder a mensagem após 3 segundos
        }, 3000);
    }

    let modeloCVCarregado = false; // Variável global para indicar se o currículo foi carregado
    let nomeArquivoModeloCV = ""; // Variável para armazenar o nome do arquivo do modelo

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
                console.log("Resposta do servidor:", data);
                
                if (data.erro) {
                    mostrarMensagem(data.erro, "erro"); // Exibe mensagens de erro do servidor
                    return;
                }
                mostrarMensagem("Modelo de currículo carregado com sucesso!", "sucesso");
                modeloCVCarregado = true; // Atualiza a variável para indicar que o currículo foi carregado
                nomeArquivoModeloCV = fileInput.files[0].name; // Armazena o nome do arquivo

                // Exibe o nome do arquivo abaixo do botão "Carregar CV"
                const nomeArquivoElemento = document.getElementById("nome-arquivo-modelo-cv");
                if (nomeArquivoElemento) {
                    nomeArquivoElemento.textContent = nomeArquivoModeloCV;
                } else {
                    console.error("Elemento com ID 'nome-arquivo-modelo-cv' não encontrado.");
                }
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

        // Verifica se um currículo foi carregado
        if (!modeloCVCarregado) {
            mostrarMensagem("Por favor, carregue um currículo antes de publicar a vaga.", "erro");
            return;
        }

        const vaga = {
            areaAtuacao,
            numeroVagas,
            data,
            descricao,
            modeloCV: nomeArquivoModeloCV // Inclui o nome do arquivo do modelo na vaga
        };

        const vagas = JSON.parse(localStorage.getItem("vagas")) || [];
        vagas.push(vaga);
        localStorage.setItem("vagas", JSON.stringify(vagas));

        mostrarMensagem("Vaga publicada com sucesso!", "sucesso");
    });
});