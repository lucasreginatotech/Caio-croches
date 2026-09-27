// Controles da vitrine: filtros combináveis e ordenação do catálogo.
let categoriaAtiva = 'todos';

function obterPrecoProduto(card) {
    const texto = card.querySelector('.preco')?.textContent || '';
    const valor = texto.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.');
    return Number.parseFloat(valor) || 0;
}

function inicializarCatalogoAvancado() {
    const busca = document.getElementById('campoPesquisa');
    const minimo = document.getElementById('precoMinimo');
    const maximo = document.getElementById('precoMaximo');
    const ordenar = document.getElementById('ordenarProdutos');
    const limpar = document.getElementById('limparFiltros');

    busca?.addEventListener('input', aplicarFiltrosCatalogo);
    minimo?.addEventListener('input', aplicarFiltrosCatalogo);
    maximo?.addEventListener('input', aplicarFiltrosCatalogo);
    ordenar?.addEventListener('change', aplicarFiltrosCatalogo);
    limpar?.addEventListener('click', () => {
        categoriaAtiva = 'todos';
        if (busca) busca.value = '';
        if (minimo) minimo.value = '';
        if (maximo) maximo.value = '';
        if (ordenar) ordenar.value = 'preco-crescente';
        document.querySelectorAll('.item-filtro-lateral').forEach(item => item.classList.remove('ativo'));
        document.querySelector('.item-filtro-lateral')?.classList.add('ativo');
        aplicarFiltrosCatalogo();
    });

    document.querySelectorAll('.item-filtro-lateral').forEach((item, index) => {
        item.addEventListener('click', () => {
            categoriaAtiva = index === 0 ? 'todos' : item.dataset.categoriaFiltro;
            aplicarFiltrosCatalogo();
        });
    });

    aplicarFiltrosCatalogo();
}

function filtrarCategoria(categoria) {
    categoriaAtiva = categoria;
    aplicarFiltrosCatalogo();
}

function aplicarFiltrosCatalogo() {
    const grid = document.getElementById('gridProdutos');
    if (!grid) return;

    const termo = (document.getElementById('campoPesquisa')?.value || '').trim().toLocaleLowerCase('pt-BR');
    const minimoInput = document.getElementById('precoMinimo')?.value;
    const maximoInput = document.getElementById('precoMaximo')?.value;
    const minimo = minimoInput === '' || minimoInput == null ? 0 : Number(minimoInput);
    const maximo = maximoInput === '' || maximoInput == null ? Infinity : Number(maximoInput);
    const ordenar = document.getElementById('ordenarProdutos')?.value || 'preco-crescente';
    const cards = [...grid.querySelectorAll('.bone-card')];

    const correspondentes = cards.filter(card => {
        const preco = obterPrecoProduto(card);
        const categoriaOk = categoriaAtiva === 'todos' || card.dataset.categoria === categoriaAtiva;
        const nomeOk = (card.dataset.nome || '').includes(termo);
        return categoriaOk && nomeOk && preco >= minimo && preco <= maximo;
    });

    correspondentes.sort((a, b) => {
        if (ordenar === 'preco-decrescente') return obterPrecoProduto(b) - obterPrecoProduto(a);
        if (ordenar === 'nome') return (a.dataset.nome || '').localeCompare(b.dataset.nome || '', 'pt-BR');
        return obterPrecoProduto(a) - obterPrecoProduto(b);
    });

    cards.forEach(card => { card.hidden = true; });
    correspondentes.forEach(card => {
        card.hidden = false;
        grid.appendChild(card);
    });
    atualizarContadorProdutos();
}
