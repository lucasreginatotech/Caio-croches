/**
 * FILTRAGEM INTELIGENTE DE PRODUTOS
 * Permite que o cliente busque qualquer termo digitado na barra e filtre os cards em tempo real.
 */
function filtrarBones() {
    const termoBusca = document.getElementById('campoPesquisa').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.bone-card');

    cards.forEach(card => {
        const nomeProduto = card.getAttribute('data-nome').toLowerCase();
        const tituloProduto = card.querySelector('.bone-titulo').textContent.toLowerCase();

        if (nomeProduto.includes(termoBusca) || tituloProduto.includes(termoBusca)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}