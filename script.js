const produtos = [
    ...produtosQuiksilver,
    ...produtosLV,
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

        card.onclick = () => abrirDetalhes(index);
        grid.appendChild(card);
    });

    configurarPesquisa();
    montarMenuLateral();
}

// FUNÇÃO DAS SETINHAS NO CARD DA VITRINE
function mudarFotoCard(event, botao, direcao) {
    event.stopPropagation();
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

    cards.forEach(card => {
        const categoriaCard = card.getAttribute('data-categoria');
        if (categoriaSelecionada === 'todos' || categoriaCard === categoriaSelecionada) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// ABRIR E FECHAR A GAVETA LATERAL
function toggleMenuLateral() {
    const aba = document.getElementById('abaLateral');
    const overlay = document.getElementById('overlayMenu');
    aba.classList.toggle('ativa');
    overlay.classList.toggle('ativo');
}

// CRIAR OS BOTÕES NA ABA LATERAL CONTANDO OS PRODUTOS AUTOMATICAMENTE
function montarMenuLateral() {
    const container = document.getElementById('listaFiltrosLateral');
    if (!container) return;

    const categorias = [
        { id: 'todos', nome: 'Todos os Modelos' },
        { id: 'quiksilver', nome: 'Quiksilver' },
        { id: 'lv', nome: 'Louis Vuitton' },
        { id: 'times', nome: 'Times' },
        { id: 'nike', nome: 'Nike' },
        { id: 'lacoste', nome: 'Lacoste' },
        { id: 'oakley', nome: 'Oakley' },
        { id: 'redbull', nome: 'Red Bull' },
        { id: 'gucci', nome: 'Gucci' },
        { id: 'grau46', nome: 'Grau 46' },
        { id: 'ecko', nome: 'Ecko' },
        { id: 'tonycountry', nome: 'Tony Country' },
        { id: 'cyclone', nome: 'Cyclone' } // <-- ADICIONADO AQUI
    ];

    container.innerHTML = "";

    categorias.forEach(cat => {
        let quantidade = 0;
        if (cat.id === 'todos') {
            quantidade = produtos.length;
        } else {
            quantidade = produtos.filter(p => p.categoria === cat.id).length;
        }

        const btn = document.createElement('div');
        btn.className = `item-filtro-lateral ${cat.id === 'todos' ? 'ativo' : ''}`;
        btn.innerHTML = `
            <span>${cat.nome}</span>
            <span class="badge-qtd">${quantidade}</span>
        `;
        
        btn.onclick = () => {
            filtrarCategoria(cat.id);
            document.querySelectorAll('.item-filtro-lateral').forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');
            toggleMenuLateral();
        };

        container.appendChild(btn);
    });
}
window.onload = carregarProdutos;

// ROLAR OS FAMOSOS COM AS SETINHAS NO TOPO
function rolarFamosos(direcao) {
    const container = document.getElementById('famososScroll');
    if (container) {
        container.scrollBy({ left: direcao * 180, behavior: 'smooth' });
    }
}

// ==========================================
// MODAL DOS FAMOSOS COM SETINHAS DE NAVEGAÇÃO
// ==========================================
const listaFamosos = [
    { img: 'imagens/famosos/buzeira.jpg', nome: 'Buzeira' },
    { img: 'imagens/famosos/buzeira2.jpg', nome: 'Buzeira' },
    { img: 'imagens/famosos/buzeira3.jpg', nome: 'Buzeira' },
    { img: 'imagens/famosos/hariel.jpg', nome: 'MC Hariel' },
    { img: 'imagens/famosos/hariel1.jpg', nome: 'MC Hariel' },
    { img: 'imagens/famosos/hariel2.jpg', nome: 'MC Hariel' },
    { img: 'imagens/famosos/hariel3.jpg', nome: 'MC Hariel' },
    { img: 'imagens/famosos/hariel4.jpg', nome: 'MC Hariel' },
    { img: 'imagens/famosos/salvador.jpg', nome: 'Salvador da Rima' },
    { img: 'imagens/famosos/salvador1.jpg', nome: 'Salvador da Rima' },
    { img: 'imagens/famosos/salvador2.jpg', nome: 'Salvador da Rima' },
    { img: 'imagens/famosos/salvador3.jpg', nome: 'Salvador da Rima' },
    { img: 'imagens/famosos/Brunotatuape1.jpg', nome: 'Bruno Tatuapé' },
    { img: 'imagens/famosos/brunotatuape2.jpg', nome: 'Bruno Tatuapé' },
    { img: 'imagens/famosos/mckauan.jpg', nome: 'MC Kauan' },
    { img: 'imagens/famosos/crysdias.jpg', nome: 'Crys Dias' },
    { img: 'imagens/famosos/mccebezinho.jpg', nome: 'MC Cebebinho' }
];

let indexFamosoModalAtual = 0;

function criarModalFamosoContainer() {
    if (document.getElementById('modalFamoso')) return;
    const modal = document.createElement('div');
    modal.id = 'modalFamoso';
    modal.style.cssText = 'display:none; position:fixed; z-index:10000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); justify-content:center; align-items:center; padding: 20px;';
    
    modal.innerHTML = `
        <div style="background: #141414; color: #fff; width: 100%; max-width: 420px; border-radius: 12px; padding: 20px; position: relative; text-align: center; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
            <button onclick="fecharModalFamoso()" style="position: absolute; top: 12px; right: 12px; background: #e74c3c; color: #fff; border: none; font-size: 20px; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.5); z-index: 20;">✕</button>
            
            <div style="position: relative; margin-bottom: 15px;">
                <img id="modalFamosoImg" src="" style="width: 100%; max-height: 400px; object-fit: contain; border-radius: 8px; background: #000; border: 1px solid #00ff66;">
                
                <button onclick="mudarFotoFamosoModal(-1)" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: #fff; border: none; width: 38px; height: 38px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; z-index: 10; transition: 0.2s;">❮</button>
                <button onclick="mudarFotoFamosoModal(1)" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: #fff; border: none; width: 38px; height: 38px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; z-index: 10; transition: 0.2s;">❯</button>
            </div>
            
            <h3 id="modalFamosoTitulo" style="font-size: 1.2rem; color: #00ff66; text-transform: uppercase; font-weight: 800;"></h3>
            <p style="font-size: 0.75rem; color: #aaa; margin-top: 5px;">Usando Caio Crochê na quebrada 🧢</p>
        </div>
    `;
    document.body.appendChild(modal);
}

function abrirModalFamoso(index) {
    criarModalFamosoContainer();
    indexFamosoModalAtual = index;
    atualizarConteudoModalFamoso();
    document.getElementById('modalFamoso').style.display = 'flex';
}

function mudarFotoFamosoModal(direcao) {
    indexFamosoModalAtual += direcao;
    if (indexFamosoModalAtual >= listaFamosos.length) indexFamosoModalAtual = 0;
    if (indexFamosoModalAtual < 0) indexFamosoModalAtual = listaFamosos.length - 1;
    atualizarConteudoModalFamoso();
}

function atualizarConteudoModalFamoso() {
    const item = listaFamosos[indexFamosoModalAtual];
    if (!item) return;
    document.getElementById('modalFamosoImg').src = item.img;
    document.getElementById('modalFamosoTitulo').innerText = item.nome;
}

function fecharModalFamoso() {
    const modal = document.getElementById('modalFamoso');
    if (modal) modal.style.display = 'none';
}