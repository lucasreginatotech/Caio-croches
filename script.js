const produtos = [
    ...produtosQuiksilver,
    ...produtosLouisVuitton,
    ...produtosTimes,
    ...produtosNike,
    ...produtosLacoste,
    ...produtosRedBull,
    ...produtosGucci,
    ...produtosGrau46,
    ...produtosEcko,
    ...produtosTonyCountry,
    ...produtosCyclone,
    ...produtosOakley
];
// FUNÇÃO PARA CRIAR A TELA DE DETALHES (ESTILO MERCADO LIVRE)
// FUNÇÃO PARA CRIAR A TELA DE DETALHES (ESTILO MERCADO LIVRE - COM X BEM VISÍVEL)
function criarModalDetalhes() {
    if (document.getElementById('modalDetalhes')) return;
    const modal = document.createElement('div');
    modal.id = 'modalDetalhes';
    modal.style.cssText = 'display:none; position:fixed; z-index:9999; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); justify-content:center; align-items:center; padding: 20px;';
    
    modal.innerHTML = `
        <div style="background: #1a1a1a; color: #fff; width: 100%; max-width: 500px; border-radius: 12px; padding: 25px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); font-family: 'Montserrat', sans-serif; max-height: 90vh; overflow-y: auto;">
            
            <button onclick="fecharModal()" style="position: absolute; top: 12px; right: 12px; background: #e74c3c; color: #fff; border: none; font-size: 22px; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5); z-index: 10; font-weight: bold;">✕</button>
            
            <div style="text-align: center; margin-bottom: 15px; position: relative;">
                <img id="modalImg" src="" style="width: 100%; max-height: 320px; object-fit: contain; border-radius: 8px; background: #111;" onerror="this.src='https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60'">
                <div id="modalBotoesTroca" style="display:none;">
                    <button onclick="mudarFotoModal(-1)" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.6); color: #fff; border: none; padding: 10px; cursor: pointer; border-radius: 50%;">❮</button>
                    <button onclick="mudarFotoModal(1)" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.6); color: #fff; border: none; padding: 10px; cursor: pointer; border-radius: 50%;">❯</button>
                </div>
            </div>

            <h2 id="modalTitulo" style="font-size: 20px; margin-bottom: 10px; font-weight: 700;"></h2>
            <p style="color: #aaa; font-size: 14px; margin-bottom: 15px;">Crochê artesanal de alta qualidade, feito sob encomenda.</p>
            
            <div style="font-size: 24px; font-weight: 700; color: #25d366; margin-bottom: 20px;" id="modalPreco"></div>

            <a id="modalBtnZap" href="" target="_blank" style="display: block; width: 100%; background: #25d366; color: #fff; text-align: center; padding: 14px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 16px;">
                Pedir no WhatsApp ⚡
            </a>
        </div>
    `;
    document.body.appendChild(modal);
}

let produtoAtualModal = null;
let fotoIndexModal = 0;

function abrirDetalhes(indexOriginal) {
    // Acha o produto correto mesmo se estiver filtrado na pesquisa
    const produto = produtos[indexOriginal];
    if (!produto) return;
    produtoAtualModal = produto;
    fotoIndexModal = 0;
    atualizarConteudoModal();
    document.getElementById('modalDetalhes').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalDetalhes').style.display = 'none';
}

function mudarFotoModal(direcao) {
    if (!produtoAtualModal || !produtoAtualModal.imagens) return;
    fotoIndexModal += direcao;
    if (fotoIndexModal >= produtoAtualModal.imagens.length) fotoIndexModal = 0;
    if (fotoIndexModal < 0) fotoIndexModal = produtoAtualModal.imagens.length - 1;
    document.getElementById('modalImg').src = produtoAtualModal.imagens[fotoIndexModal];
}

function atualizarConteudoModal() {
    if (!produtoAtualModal) return;
    document.getElementById('modalImg').src = produtoAtualModal.imagens[0];
    document.getElementById('modalTitulo').innerText = produtoAtualModal.nome;
    document.getElementById('modalPreco').innerText = produtoAtualModal.preco;
    
    const btnZap = document.getElementById('modalBtnZap');
    btnZap.href = `https://wa.me/5511948975863?text=${encodeURIComponent(produtoAtualModal.whatsapp)}`;

    const divTroca = document.getElementById('modalBotoesTroca');
    if (produtoAtualModal.imagens.length > 1) {
        divTroca.style.display = 'block';
    } else {
        divTroca.style.display = 'none';
    }
}

// CONFIGURAR BARRA DE PESQUISA EM TEMPO REAL
function configurarPesquisa() {
    const inputBusca = document.querySelector('input[placeholder*="Pesquisar"]');
    if (!inputBusca) return;
    
    inputBusca.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.bone-card');
        
        cards.forEach(card => {
            const titulo = card.querySelector('.bone-titulo').innerText.toLowerCase();
            if (titulo.includes(termo)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// FUNÇÃO PARA GERAR OS CARDS NA TELA
function carregarProdutos() {
    criarModalDetalhes();
    const grid = document.getElementById('gridProdutos');
    if (!grid) return;
    grid.innerHTML = "";

    produtos.forEach((produto, index) => {
        const card = document.createElement('div');
        card.classList.add('bone-card');
        card.setAttribute('data-categoria', produto.categoria);
        card.style.cursor = "pointer";

        let botoesTroca = '';
        if (produto.imagens && produto.imagens.length > 1) {
            botoesTroca = `
                <button class="btn-slide btn-prev" onclick="mudarFotoCard(event, this, -1)">❮</button>
                <button class="btn-slide btn-next" onclick="mudarFotoCard(event, this, 1)">❯</button>
            `;
        }

        card.innerHTML = `
            <div class="imagem-container" data-index="0" data-imagens='${JSON.stringify(produto.imagens)}'>
                <img src="${produto.imagens[0]}" alt="${produto.nome}" class="produto-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60'">
                ${botoesTroca}
            </div>
            <div class="card-conteudo">
                <h3 class="bone-titulo">${produto.nome}</h3>
                <p class="bone-descricao">Crochê artesanal de alta qualidade.</p>
                <div class="preco-container">
                    <span class="preco">${produto.preco}</span>
                </div>
                <span class="btn-whatsapp" style="text-align:center; display:block;">Ver Detalhes 🔍</span>
            </div>
        `;

        // Clicar no card abre o modal de detalhes
        card.onclick = () => abrirDetalhes(index);

        grid.appendChild(card);
    });

    configurarPesquisa();
}

// FUNÇÃO DAS SETINHAS NO CARD DA VITRINE
function mudarFotoCard(event, botao, direcao) {
    event.stopPropagation(); // Evita abrir o modal ao clicar na setinha
    const container = botao.closest('.imagem-container');
    const img = container.querySelector('.produto-img');
    const imagens = JSON.parse(container.getAttribute('data-imagens'));
    let indexAtual = parseInt(container.getAttribute('data-index')) || 0;

    indexAtual += direcao;
    if (indexAtual >= imagens.length) indexAtual = 0;
    if (indexAtual < 0) indexAtual = imagens.length - 1;

    container.setAttribute('data-index', indexAtual);
    img.src = imagens[indexAtual];
}

// FILTRAR POR CATEGORIA (MARCA)
function filtrarCategoria(categoriaSelecionada) {
    const cards = document.querySelectorAll('.bone-card');
    const botoes = document.querySelectorAll('.btn-cat');

    botoes.forEach(btn => btn.classList.remove('ativo'));
    if (event && event.target) {
        event.target.classList.add('ativo');
    }

    cards.forEach(card => {
        const categoriaCard = card.getAttribute('data-categoria');
        if (categoriaSelecionada === 'todos' || categoriaCard === categoriaSelecionada) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

window.onload = carregarProdutos;