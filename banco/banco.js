let emailCadastrado = [];
let senhaCadastrado = [];
let saldo = 0; 

function exibirTextoNaTela(tag, texto, classe = '') {
    const elemento = document.createElement(tag);
    elemento.innerText = texto;
    if (classe) {
        elemento.classList.add(classe);
    }
    const container = document.body; 
    container.appendChild(elemento);

    setTimeout(() => {
        elemento.remove();
    }, 5000);
}

function realizarCadastro() {
    let email = prompt("Cadastre um email pessoal no formato válido:");
    emailCadastrado.push(email);
    alert('Email cadastrado com sucesso');

    let senha = prompt("Cadastre uma senha com até 8 caracteres no formato válido:");
    senhaCadastrado.push(senha);
    alert('Senha cadastrada com sucesso');
}

function fazerLogin() {
    alert('Para acessar a conta, favor fazer login com email e senha cadastrados!');
    let emailLogin = prompt('Digite seu email:');
    if (!emailCadastrado.includes(emailLogin)) {
        alert('Email incorreto! Digite o email cadastrado');
        return false;
    }

    let senhaLogin = prompt('Digite sua senha:');
    if (!senhaCadastrado.includes(senhaLogin)) {
        alert('Senha incorreta! Digite a senha cadastrada');
        return false;
    }

    alert('Login efetuado com sucesso!');
    return true;
}

function depositar() {
    const deposito = parseFloat(document.querySelector('.entrada_do_deposito').value);
    if (isNaN(deposito) || deposito <= 0) {
        exibirTextoNaTela('p', 'Valor inválido para depósito!', 'texto');
        return;
    }
    saldo += deposito;
    exibirTextoNaTela('p', `Depósito realizado com sucesso, seu saldo agora é: R$ ${saldo.toFixed(2)}`, 'texto');
}

function sacar() {
    const saque = parseFloat(document.querySelector('.entrada_do_saque').value);
    if (isNaN(saque) || saque <= 0) {
        exibirTextoNaTela('p', 'Valor inválido para saque!', 'texto');
        return;
    }
    if (saque > saldo) {
        exibirTextoNaTela('p', 'Saldo insuficiente para saque!', 'texto');
        return;
    }
    saldo -= saque;
    exibirTextoNaTela('p', `Saque realizado com sucesso, seu saldo agora é: R$ ${saldo.toFixed(2)}`, 'texto');
}

function fazerTransferencia() {
    const transferencia = parseFloat(document.querySelector('.entrada_da_transferencia').value);
    if (isNaN(transferencia) || transferencia <= 0) {
        exibirTextoNaTela('p', 'Valor inválido para transferência!', 'texto');
        return;
    }
    if (transferencia > saldo) {
        exibirTextoNaTela('p', 'Saldo insuficiente para transferência!', 'texto');
        return;
    }
    saldo -= transferencia;
    exibirTextoNaTela('p', `Transferência realizada com sucesso, seu saldo agora é: R$ ${saldo.toFixed(2)}`, 'texto');
}

realizarCadastro();
if (fazerLogin()) {
    exibirTextoNaTela('h3', 'Bem-vindo ao sistema bancário!', 'boas-vindas');
}
