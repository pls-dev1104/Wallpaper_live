const canvas = document.getElementById("wallpaper");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const imagemFundo = new Image();
imagemFundo.src = "./assets/img/wallpaper.jpg";

const particulas = [];
const quantidadeParticulas = 50;

for (let i = 0; i < quantidadeParticulas; i++) {
  particulas.push({
    x: Math.random() * canvas.width, // Posição horizontal aleatória na tela
    y: Math.random() * canvas.height, // Começam espalhadas por toda a altura
    raio: 4, // Tamanho aleatório entre 1 e 4
    velocidadeY: Math.random() * 1 + 0.5, // Velocidade de subida ligeiramente diferente
  });
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (imagemFundo.complete) {
    ctx.drawImage(imagemFundo, 0, 0, canvas.width, canvas.height);
  }

  particulas.forEach((p) => {
    // 1. Atualiza a posição (faz subir)
    p.y -= p.velocidadeY;

    // Se sair pelo topo, volta lá para baixo numa nova coluna horizontal aleatória
    if (p.y < 0) {
      p.y = canvas.height + 10;
      p.x = Math.random() * canvas.width;
    }

    // 2. Desenha a partícula atual na tela
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
  });

  // 4. Repete o loop
  requestAnimationFrame(animar);
}

imagemFundo.onload = function () {
  animar();
};
