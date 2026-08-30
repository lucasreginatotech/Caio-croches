// LISTA DE PRODUTOS - QUIKSILVER
const produtos = [
    {
        nome: "Boné Quiksilver Azul Claro",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilverazulclaro.jpg",
            "imagem/quiksilver/quiksilver-azul-frente.jpg",
            "imagem/quiksilver/quiksilver-azul-lado.jpg",
            "imagem/quiksilver/quiksilver-azul-emcima.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Azul Claro."
    },
    {
        nome: "Boné Quiksilver Azul Clarinho",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilverazulclaroinho.jpg",
            "imagem/quiksilver/quiksilverazulclaroinhofrente.jpg",
            "imagem/quiksilver/quiksilverazulclaroinhodentro.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Azul Clarinho."
    },
    {
        nome: "Boné Quiksilver Branco e Preto",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilver-branco-e-preto-logo.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Branco e Preto."
    },
    {
        nome: "Boné Quiksilver Cinza",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilver-cinza-frente.jpg",
            "imagem/quiksilver/quiksilver-cinza-lado.jpg",
            "imagem/quiksilver/quiksilver-cinza.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Cinza."
    },
    {
        nome: "Boné Quiksilver Lado Preto e Branco",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilver-lado-preto-ebranco.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Lado Preto e Branco."
    },
    {
        nome: "Boné Quiksilver Letras Vermelhas",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilver-letras-vermelhas-na-cabeca.jpg",
            "imagem/quiksilver/quiksilver-letras-vermelhas-atras.jpg",
            "imagem/quiksilver/quiksilver-letras-vermelhas-lados.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Letras Vermelhas."
    },
    {
        nome: "Boné Quiksilver Preto e Branco",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilver-preto-e-branco-e-lado.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Preto e Branco."
    },
    {
        nome: "Boné Quiksilver Roxo e Verde",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilver-roxo-e-verde-frente.jpg",
            "imagem/quiksilver/quiksilver-roxo-e-verde-lado.jpg",
            "imagem/quiksilver/quiksilver-roxo-e-verde-logo.jpg",
            "imagem/quiksilver/quiksilver-roxo-e-verde.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Roxo e Verde."
    },
    {
        nome: "Boné Quiksilver Vermelho",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilver-vermelho-frente.jpg",
            "imagem/quiksilver/quiksilver-vermelho-atras.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Vermelho."
    },
    {
        nome: "Boné Quiksilver Branco com Azul",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilverbranco-comazul.jpg",
            "imagem/quiksilver/quiksilverbranco-comazul-lado.jpg",
            "imagem/quiksilver/quiksilverbranco-comazul-atras.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Branco com Azul."
    },
    {
        nome: "Boné Quiksilver Verde com Roxo",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilververdecomroxo.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Verde com Roxo."
    },
    {
        nome: "Boné Quiksilver Metade Metade",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilvermetade-metade.jpg",
            "imagem/quiksilver/quiksilvermetade-metadelogo.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Metade Metade."
    },
    {
        nome: "Boné Quiksilver Letreiro",
        categoria: "quiksilver",
        preco: "R$ 300,00",
        imagens: [
            "imagem/quiksilver/quiksilverletreiro.jpg"
        ],
        whatsapp: "Salve Caio! Quero encomendar o Boné Quiksilver Letreiro."
    }
];

// FUNÇÃO PARA GERAR OS CARDS NA TELA
function carregarProdutos() {
    const grid = document.getElementById('gridProdutos');
    if (!grid) return;
    grid.innerHTML = "";

    produtos.forEach((produto) => {
        const card = document.createElement('div');
        card.classList.add('bone-card');
        card.setAttribute('data-categoria', produto.categoria);

        let botoesTroca = '';
        if (produto.imagens && produto.imagens.length > 1) {
            botoesTroca = `
                <button class="btn-slide btn-prev" onclick="mudarFoto(this, -1)">❮</button>
                <button class="btn-slide btn-next" onclick="mudarFoto(this, 1)">❯</button>
            `;
        }

        card.innerHTML = `
            <div class="imagem-container" data-index="0" data-imagens='${JSON.stringify(produto.imagens)}'>
                <img src="${produto.imagens[0]}" alt="${produto.nome}" class="produto-img" loading="lazy">
                <span class="tag-lancamento">Exclusivo</span>
                ${botoesTroca}
            </div>
            <div class="card-conteudo">
                <h3 class="bone-titulo">${produto.nome}</h3>
                <p class="bone-descricao">Crochê artesanal de alta qualidade.</p>
                <div class="preco-container">
                    <span class="preco">${produto.preco}</span>
                </div>
                <a href="https://wa.me/5511948975863?text=${encodeURIComponent(produto.whatsapp)}" 
                   target="_blank" 
                   class="btn-whatsapp">
                    Pedir no WhatsApp ⚡
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// FUNÇÃO DAS SETINHAS DE TROCAR FOTO
function mudarFoto(botao, direcao) {
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