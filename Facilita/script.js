document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("category");
    const cards = document.querySelectorAll(".card");

    // FILTRAR
    function filtrarCards() {
        const termo = searchInput.value.toLowerCase();
        const categoria = categorySelect.value;

        cards.forEach(card => {
            const nome = card.querySelector("h2").textContent.toLowerCase();
            const cardCategoria = card.getAttribute("data-categoria");

            const correspondeNome = nome.includes(termo);
            const correspondeCategoria = !categoria || cardCategoria === categoria;

            card.style.display = (correspondeNome && correspondeCategoria) ? "block" : "none";
        });
    }

    searchInput.addEventListener("keyup", filtrarCards);
    categorySelect.addEventListener("change", filtrarCards);

    // ABRIR EMPRESA
    window.openEmpresa = function (pagina) {
        window.location.href = pagina;
    };

    // CARROSSEL
    const header = document.getElementById("header");
    const imagens = [
  'assets/images/unitel-banner.png',
  'assets/images/bai-banner.jpg',
  'assets/images/bi-banner.png',
  'assets/images/passaporte-banner.png',
  'assets/images/agt-banner.png',
  
];

    let indiceAtual = 0;

    function trocarImagemHeader() {
        header.style.backgroundImage = `url('${imagens[indiceAtual]}')`;
        indiceAtual = (indiceAtual + 1) % imagens.length;
    }

    trocarImagemHeader(); // Primeira imagem
    setInterval(trocarImagemHeader, 5000); // Troca a cada 5 segundos
});
