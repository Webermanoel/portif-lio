let itensDaLista = [];
const limiteDeItens = 10;

function exibirTextoNaTela(tag, texto, classe = '') {
  const elemento = document.createElement(tag);
  elemento.innerText = texto;
  if (classe) {
    elemento.classList.add(classe); 
  }
  const container = document.querySelector('.container__informacoes');
  container.appendChild(elemento);

  setTimeout(() => {
    elemento.remove();
  }, 5000);
}

function salvarItens() {
  const entrada = document.querySelector('.entrada_do_usuario').value;
  
  if (!entrada) {
    exibirTextoNaTela('p', 'Por favor, insira um item antes de salvar.', 'texto');
    return;
  }

  if (itensDaLista.length < limiteDeItens) {
    itensDaLista.push(entrada);
    exibirTextoNaTela('p', `Item "${entrada}" adicionado com sucesso!`, 'texto');
    document.querySelector('.entrada_do_usuario').value = '';
  } else {
    exibirTextoNaTela('p', 'Você atingiu o limite de itens. Deseja salvar?', 'texto');
  }
}

function reiniciarLista() {
  itensDaLista = [];
  exibirTextoNaTela('p', 'A lista foi reiniciada com sucesso.', 'texto');
}

function mostrarLista() {
  if (itensDaLista.length === 0) {
    exibirTextoNaTela('p', 'A lista está vazia.', 'class texto');
    return;
  }

  exibirTextoNaTela('p', `Itens cadastrados: ${itensDaLista.join(', ')}`, 'texto');
}
