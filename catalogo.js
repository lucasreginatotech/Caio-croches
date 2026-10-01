// Controles da vitrine: filtros combináveis e ordenação do catálogo.
// CONTROLES DO CATÁLOGO
// Combina pesquisa, categoria, faixa de preço e ordenação dos produtos.

// Categoria selecionada no menu lateral; começa mostrando todos os modelos.
let categoriaAtiva = 'todos';

// Converte o preço exibido no card em número para permitir filtros e ordenação.
function obterPrecoProduto(card) {
    const texto = card.querySelector('.preco')?.textContent || '';
    const valor = texto.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.');
    return Number.parseFloat(valor) || 0;
}

// Liga os campos da página aos filtros e prepara o botão de limpeza.
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

// Atualiza a categoria escolhida pelo menu lateral.
function filtrarCategoria(categoria) {
    categoriaAtiva = categoria;
    aplicarFiltrosCatalogo();
}

// Aplica os filtros em conjunto, ordena os cards e atualiza a contagem.
function aplicarFiltrosCatalogo() {
    const grid = document.getElementById('gridProdutos');
    if (!grid) return;

    const termo = (document.getElementById('campoPesquisa')?.value || '').trim().toLocaleLowerCase('pt-BR');
    const minimoInput = document.getElementById('precoMinimo')?.value;
    const maximoInput = document.getElementById('precoMaximo')?.value;
    const minimo = minimoInput === '' || minimoInput == null ? 0 : Number(minimoInput);
    const maximo = maximoInput === '' || maximoInput == null ? Infinity : Number(maximoInput);
    const faixaPrecoAtiva = (minimoInput !== '' && minimoInput != null) || (maximoInput !== '' && maximoInput != null);
    const ordenar = document.getElementById('ordenarProdutos')?.value || 'preco-crescente';
    const cards = [...grid.querySelectorAll('.bone-card')];

    // Mantém apenas itens compatíveis com categoria, busca e faixa de preço.
    const correspondentes = cards.filter(card => {
        const preco = obterPrecoProduto(card);
        const negociavel = card.dataset.negociar === 'true';
        const categoriaOk = categoriaAtiva === 'todos' || card.dataset.categoria === categoriaAtiva;
        const nomeOk = (card.dataset.nome || '').includes(termo);
        const precoOk = negociavel ? !faixaPrecoAtiva : preco >= minimo && preco <= maximo;
        return categoriaOk && nomeOk && precoOk;
    });

    // Organiza pelo critério escolhido e mantém itens negociáveis no fim.
    correspondentes.sort((a, b) => {
        if (ordenar === 'nome') return (a.dataset.nome || '').localeCompare(b.dataset.nome || '', 'pt-BR');
        const aNegociavel = a.dataset.negociar === 'true';
        const bNegociavel = b.dataset.negociar === 'true';
        if (aNegociavel !== bNegociavel) return aNegociavel ? 1 : -1;
        if (ordenar === 'preco-decrescente') return obterPrecoProduto(b) - obterPrecoProduto(a);
        return obterPrecoProduto(a) - obterPrecoProduto(b);
    });

    cards.forEach(card => { card.hidden = true; });
    correspondentes.forEach(card => {
        card.hidden = false;
        grid.appendChild(card);
    });
    atualizarContadorProdutos();
}
