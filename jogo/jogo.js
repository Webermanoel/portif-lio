// Selecionar o canvas e o contexto
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Garantir foco no canvas
canvas.focus();

const musicaFundo = new Audio("../images/musica-de-fundo.mp3");
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

const botaoMusica = document.getElementById('botaoMusica');
const musica = document.getElementById('musicaDeFundo');

botaoMusica.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
        botaoMusica.textContent = '🔇'; // Ícone de desligar
    } else {
        musica.pause();
        botaoMusica.textContent = '🔊'; // Ícone de ligar
    }
});


const mensagemOrientacao = document.querySelector('.mensagem-orientacao');

// Função para verificar a orientação e mostrar/esconder a mensagem
function verificaOrientacao() {
    if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
        mensagemOrientacao.style.display = "block"; // Exibe a mensagem em retrato
    } else {
        mensagemOrientacao.style.display = "none"; // Esconde a mensagem em paisagem ou telas maiores
    }
}

// Chama a função inicialmente
verificaOrientacao();

// Adiciona evento para detectar mudanças de orientação
window.addEventListener("resize", verificaOrientacao);

// Carregar imagens
const imgEstrada = new Image();
const imgAtor = new Image();
const imagensCarros = [];
const imagens = [
    { src: "../images/estrada.jpg", img: imgEstrada },
    { src: "../images/ator-1.jpg", img: imgAtor },
    { src: "../images/carro-1.jpg", img: new Image() },
    { src: "../images/carro-2.jpg", img: new Image() },
    { src: "../images/carro-3.jpg", img: new Image() },
    { src: "../images/carro-4.jpg", img: new Image() },
    { src: "../images/carro-5.jpg", img: new Image() },
    { src: "../images/carro-6.jpg", img: new Image() }
];

// Função para carregar as imagens
function carregarImagens() {
    return new Promise((resolve, reject) => {
        let imagesLoaded = 0;
        imagens.forEach(({ src, img }) => {
            img.src = src;
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === imagens.length) {
                    resolve();
                }
            };
            img.onerror = reject;
        });
    });
}

// Variáveis do Ator
let xAtor = 85;
let yAtor = 366;
const larguraAtor = 40;
const alturaAtor = 40;

const personagem = document.getElementById('personagem');
const velocidade = 10; // Pixels por movimento

document.getElementById('cima').addEventListener('click', () => {
    personagem.style.top = `${personagem.offsetTop - velocidade}px`;
});

document.getElementById('baixo').addEventListener('click', () => {
    personagem.style.top = `${personagem.offsetTop + velocidade}px`;
});

document.getElementById('esquerda').addEventListener('click', () => {
    personagem.style.left = `${personagem.offsetLeft - velocidade}px`;
});

document.getElementById('direita').addEventListener('click', () => {
    personagem.style.left = `${personagem.offsetLeft + velocidade}px`;
});


function moverPersonagem(event) {
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const y = event.touches ? event.touches[0].clientY : event.clientY;

    personagem.style.left = `${x}px`;
    personagem.style.top = `${y}px`;
}


// Adiciona os eventos de clique e toque
document.addEventListener('click', moverPersonagem);
document.addEventListener('touchstart', moverPersonagem);

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
        ctx.drawImage(imagens[i + 2].img, xCarros[i], yCarros[i], larguraCarro, alturaCarro);
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
            if (meusPontos > 0) meusPontos--;
        }
    }
}

// Voltar o ator à posição inicial após colisão
function voltaAtorParaPosicaoInicial() {
    xAtor = 85;
    yAtor = 366;
}

// Atualizar a pontuação
function atualizaPontos() {
    if (yAtor <= 0) {  // O ator atravessou a estrada (você pode ajustar a condição)
        meusPontos++;
        yAtor = 366; // Reseta o ator para a posição inicial
    }
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Pontos: " + meusPontos, 10, 20);
}

// Atualizar o jogo a cada quadro
function atualizaJogo() {
    desenhaEstrada();
    desenhaAtor();
    desenhaCarros();
    movimentaAtor();
    movimentaCarros();
    verificaColisao();
    atualizaPontos();
    requestAnimationFrame(atualizaJogo);
}

// Iniciar o jogo após o carregamento das imagens
carregarImagens().then(() => {
    atualizaJogo();
}).catch((err) => {
    console.error("Erro ao carregar as imagens:", err);
});
