const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.focus();

const musicaFundo = new Audio("../images/musica-de-fundo.mp3");
musicaFundo.loop = true;
musicaFundo.volume = 1.0;

musicaFundo.play().catch((error) => {
    console.warn("A reprodução automática da música foi bloqueada pelo navegador:", error);
});

document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "m") {
        musicaFundo.paused ? musicaFundo.play() : musicaFundo.pause();
    }
});

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
        botaoMusica.textContent = '🔇'; 
    } else {
        musica.pause();
        botaoMusica.textContent = '🔊'; 
    }
});


const mensagemOrientacao = document.querySelector('.mensagem-orientacao');

function verificaOrientacao() {
    if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
        mensagemOrientacao.style.display = "block"; 
    } else {
        mensagemOrientacao.style.display = "none";
    }
}

verificaOrientacao();

window.addEventListener("resize", verificaOrientacao);

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

let xAtor = 85;
let yAtor = 366;
const larguraAtor = 40;
const alturaAtor = 40;

const personagem = document.getElementById('personagem');
const velocidade = 10; 

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



document.addEventListener('click', moverPersonagem);
document.addEventListener('touchstart', moverPersonagem);


let xCarros = [700, 600, 500, 800, 900, 1000];
let yCarros = [40, 100, 150, 200, 250, 300]; 
let velocidadeCarros = [4, 5, 6, 2.5, 3.5, 4.5]; 
const larguraCarro = 60;
const alturaCarro = 40;

let meusPontos = 0;
const teclasPressionadas = {};

function desenhaEstrada() {
    ctx.drawImage(imgEstrada, 0, 0, canvas.width, canvas.height);
}

function desenhaAtor() {
    ctx.drawImage(imgAtor, xAtor, yAtor, larguraAtor, alturaAtor);
}

function desenhaCarros() {
    for (let i = 0; i < xCarros.length; i++) {
        ctx.drawImage(imagens[i + 2].img, xCarros[i], yCarros[i], larguraCarro, alturaCarro);
    }
}

function movimentaAtor() {
    if (teclasPressionadas["ArrowUp"] && yAtor > 0) yAtor -= 2.5;
    if (teclasPressionadas["ArrowDown"] && yAtor < canvas.height - alturaAtor) yAtor += 2.5;
    if (teclasPressionadas["ArrowLeft"] && xAtor > 0) xAtor -= 2.5;
    if (teclasPressionadas["ArrowRight"] && xAtor < canvas.width - larguraAtor) xAtor += 2.5;
}

document.addEventListener("keydown", (event) => {
    teclasPressionadas[event.key] = true;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault(); 
    }
});

document.addEventListener("keyup", (event) => {
    teclasPressionadas[event.key] = false;
});

function movimentaCarros() {
    for (let i = 0; i < xCarros.length; i++) {
        xCarros[i] -= velocidadeCarros[i];
        if (xCarros[i] < -larguraCarro) {
            xCarros[i] = canvas.width; 
        }
    }
}

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

function voltaAtorParaPosicaoInicial() {
    xAtor = 85;
    yAtor = 366;
}

function atualizaPontos() {
    if (yAtor <= 0) {  
        meusPontos++;
        yAtor = 366; 
    }
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Pontos: " + meusPontos, 10, 20);
}

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

carregarImagens().then(() => {
    atualizaJogo();
}).catch((err) => {
    console.error("Erro ao carregar as imagens:", err);
});
