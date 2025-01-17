const images = [
  { src: "img/Cliente.png", text: "Cliente", redirect: "./screens/login_cliente.html" },
  { src: "img/Empresa.png", text: "Empresa", redirect: "./screens/login_empresa.html" }
];

let currentIndex = 0;

function navigate(direction) {
  if (direction === "esquerda") {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  } else {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  }
  updateDisplay();
}

function updateDisplay() {
  const displayImage = document.getElementById("displayImage");
  const displayText = document.getElementById("displayText");
  displayImage.src = images[currentIndex].src;
  displayText.textContent = images[currentIndex].text;
}

function confirmSelection() {
  const selected = images[currentIndex].redirect;
  window.location.href = selected; // Redireciona para a tela correspondente
}

function toggleInfo() {
  const caixaaviso = document.getElementById("caixa-aviso");
  caixaaviso.classList.toggle("grande");
}