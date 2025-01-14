// Selecionar o canvas e o contexto
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Garantir foco no canvas
canvas.focus();

const musicaFundo = new Audio("../jogo/assets/musica-de-fundo.mp3");
musicaFundo.loop = true;
musicaFundo.volume = 1.0;

// Inicializando a música automaticamente
musicaFundo.play().catch((error) => {
    console.warn("A reprodução automática da música foi bloqueada pelo navegador:", error);
});

// Alternar música com a tecla "M"
document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "m") {
        musicaFundo.paused ? musicaFundo.play() : musicaFundo.pause();
    }
});

// Exibir instrução sobre o controle de música
function exibeControlesAudio() {
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Pressione 'M' para ligar/desligar a música", 500, 20);
}

// Carregar imagens
const imgEstrada = new Image();
imgEstrada.src = "../jogo/assets/estrada.png";

const imgAtor = new Image();
imgAtor.src = "../jogo/assets/ator-1.png";

const imgCarro1 = new Image();
imgCarro1.src = "../jogo/assets/carro-1.png";

const imgCarro2 = new Image();
imgCarro2.src = "../jogo/assets/carro-2.png";

const imgCarro3 = new Image();
imgCarro3.src = "../jogo/assets/carro-3.png";

const imagensCarros = [imgCarro1, imgCarro2, imgCarro3, imgCarro1, imgCarro2, imgCarro3];

// Variáveis do Ator
let xAtor = 85;
let yAtor = 366;
const larguraAtor = 40;
const alturaAtor = 40;

// Variáveis dos carros
let xCarros = [700, 600, 500, 800, 900, 1000];
let yCarros = [40, 100, 150, 200, 250, 300]; // Linhas adicionais
let velocidadeCarros = [4, 5, 6, 2.5, 3.5, 4.5]; // Velocidades ajustadas
const larguraCarro = 60;
const alturaCarro = 40;

// Variáveis gerais
let meusPontos = 0;
const teclasPressionadas = {};

// Desenhar a estrada
function desenhaEstrada() {
    ctx.drawImage(imgEstrada, 0, 0, canvas.width, canvas.height);
}

// Desenhar o ator
function desenhaAtor() {
    ctx.drawImage(imgAtor, xAtor, yAtor, larguraAtor, alturaAtor);
}

// Desenhar os carros
function desenhaCarros() {
    for (let i = 0; i < xCarros.length; i++) {
        ctx.drawImage(imagensCarros[i % imagensCarros.length], xCarros[i], yCarros[i], larguraCarro, alturaCarro);
    }
}

// Movimentar o ator com base nas teclas pressionadas
function movimentaAtor() {
    if (teclasPressionadas["ArrowUp"] && yAtor > 0) yAtor -= 2.5;
    if (teclasPressionadas["ArrowDown"] && yAtor < canvas.height - alturaAtor) yAtor += 2.5;
    if (teclasPressionadas["ArrowLeft"] && xAtor > 0) xAtor -= 2.5;
    if (teclasPressionadas["ArrowRight"] && xAtor < canvas.width - larguraAtor) xAtor += 2.5;
}

// Detectar pressionamento de teclas
document.addEventListener("keydown", (event) => {
    teclasPressionadas[event.key] = true;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault(); // Impede o comportamento padrão das teclas de seta
    }
});

// Detectar liberação de teclas
document.addEventListener("keyup", (event) => {
    teclasPressionadas[event.key] = false;
});

// Movimentar os carros
function movimentaCarros() {
    for (let i = 0; i < xCarros.length; i++) {
        xCarros[i] -= velocidadeCarros[i];
        if (xCarros[i] < -larguraCarro) {
            xCarros[i] = canvas.width; // Reseta o carro para a borda direita
        }
    }
}

// Verificar colisão
function verificaColisao() {
    for (let i = 0; i < xCarros.length; i++) {
        if (
            xAtor < xCarros[i] + larguraCarro &&
            xAtor + larguraAtor > xCarros[i] &&
            yAtor < yCarros[i] + alturaCarro &&
            yAtor + alturaAtor > yCarros[i]
        ) {
            voltaAtorParaPosicaoInicial();
            if (meusPontos > 0) meusPontos -= 1;
        }
    }
}

// Reposicionar o ator
function voltaAtorParaPosicaoInicial() {
    yAtor = 366;
}

// Marcar ponto
function marcaPonto() {
    if (yAtor < 15) {
        meusPontos += 1;
        voltaAtorParaPosicaoInicial();
    }
}

// Exibir os pontos
function exibePontos() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Pontos: ${meusPontos}`, 50, 20);
}

// Atualizar o jogo
function atualizaJogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenhaEstrada();
    desenhaAtor();
    desenhaCarros();
    movimentaAtor();
    movimentaCarros();
    verificaColisao();
    marcaPonto();
    exibePontos();
    requestAnimationFrame(atualizaJogo);
}

// Iniciar o jogo quando a imagem da estrada carregar
imgEstrada.onload = () => atualizaJogo();
