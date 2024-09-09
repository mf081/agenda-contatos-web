document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formContato');
    const tabelaCorpo = document.getElementById('tabela-corpo');

    const carregarDados = () => {
        const dados = JSON.parse(localStorage.getItem('contatos')) || [];
        tabelaCorpo.innerHTML = '';
        dados.forEach((dado, index) => adicionarLinhaTabela(dado, index));
    };

    const adicionarLinhaTabela = (dado, index) => {
        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td>${dado.nome}</td>
            <td>${dado.telefone}</td>
            <td>${dado.email}</td>
            <td>${dado.interesses}</td>
            <td><button class="editar">Editar</button></td>
        `;
        tabelaCorpo.appendChild(novaLinha);

        novaLinha.querySelector('.editar').addEventListener('click', () => editarLinha(index));
    };

    const salvarDados = (dados) => {
        localStorage.setItem('contatos', JSON.stringify(dados));
    };

    const editarLinha = (index) => {
        const dados = JSON.parse(localStorage.getItem('contatos')) || [];
        const contato = dados[index];
        document.getElementById('nome').value = contato.nome;
        document.getElementById('telefone').value = contato.telefone;
        document.getElementById('email').value = contato.email;
        document.getElementById('interesses').value = contato.interesses;

        dados.splice(index, 1);
        salvarDados(dados);
        carregarDados();
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const novoContato = {
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            interesses: document.getElementById('interesses').value
        };

        const dados = JSON.parse(localStorage.getItem('contatos')) || [];
        dados.push(novoContato);
        salvarDados(dados);
        adicionarLinhaTabela(novoContato, dados.length - 1);
        form.reset();
    });

    carregarDados();
});
