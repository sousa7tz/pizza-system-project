// ==========================================
// ESTADO DA APLICAÇÃO (Stateful)
// ==========================================
let carrinhoDeCompras = [];
const TAXA_ENTREGA = 9.90;

// ==========================================
// MAPEAMENTO DO DOM (Elementos do HTML)
// ==========================================
const vitrine = document.getElementById('vitrine');
const badgeCarrinho = document.querySelector('.cart-badge');
const botoesFiltro = document.querySelectorAll('.btn-filtro');

// Novos elementos do Carrinho Lateral mapeados
const btnAbrirCarrinho = document.querySelector('.cart-btn');
const sidebarCarrinho = document.getElementById('cart-sidebar');
const overlayCarrinho = document.getElementById('cart-overlay');
const btnFecharCarrinho = document.getElementById('fechar-carrinho');
const containerItensCarrinho = document.getElementById('cart-items');
const displaySubtotal = document.getElementById('cart-subtotal');
const displayTotal = document.getElementById('cart-total');

// ==========================================
// FUNÇÃO DE INICIALIZAÇÃO
// ==========================================
async function iniciarLoja() {
    const pizzas = await mockBuscarPizzas(); 
    renderizarPizzas(pizzas);
    configurarFiltros();
    configurarEventosCarrinho();
}

// ==========================================
// RENDERIZAÇÃO DA VITRINE
// ==========================================
function renderizarPizzas(listaPizzas) {
    vitrine.innerHTML = ''; 

    listaPizzas.forEach(pizza => {
        const precoFormatado = pizza.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const card = document.createElement('div');
        card.className = 'card-produto';
        
        card.innerHTML = `
            <div class="card-img-box">
                <img src="${pizza.imagem}" alt="${pizza.nome}">
                <span class="tag-nota">⭐ ${pizza.nota}</span>
            </div>
            <div class="card-info">
                <h3>${pizza.nome}</h3>
                <p>${pizza.ingredientes}</p>
                <div class="card-footer">
                    <span class="preco">${precoFormatado}</span>
                    <button class="btn-verde btn-add" onclick="adicionarAoCarrinho(${pizza.id}, '${pizza.nome}', ${pizza.preco})">
                        Adicionar
                    </button>
                </div>
            </div>
        `;
        vitrine.appendChild(card);
    });
}

// ==========================================
// LÓGICA DE ABRIR E FECHAR O CARRINHO
// ==========================================
function configurarEventosCarrinho() {
    // Abre o carrinho
    btnAbrirCarrinho.addEventListener('click', () => {
        sidebarCarrinho.classList.add('aberto');
        overlayCarrinho.classList.add('ativo');
    });

    // Função única para fechar
    const fechar = () => {
        sidebarCarrinho.classList.remove('aberto');
        overlayCarrinho.classList.remove('ativo');
    };

    // Fecha se clicar no X ou fora do carrinho (no fundo escuro)
    btnFecharCarrinho.addEventListener('click', fechar);
    overlayCarrinho.addEventListener('click', fechar);
}

// ==========================================
// LÓGICA DE GERENCIAMENTO DO CARRINHO
// ==========================================
function adicionarAoCarrinho(id, nome, preco) {
    // 1. Verifica se a pizza já existe no array do carrinho
    const itemExistente = carrinhoDeCompras.find(item => item.id === id);

    if (itemExistente) {
        // Se já existe, só aumenta a quantidade
        itemExistente.quantidade += 1;
    } else {
        // Se não existe, cria o objeto novo com quantidade 1
        carrinhoDeCompras.push({ id, nome, preco, quantidade: 1 });
    }
    
    // 2. Atualiza a interface visual
    renderizarItensDoCarrinho();
    
    // 3. Efeito visual no ícone
    badgeCarrinho.style.transform = 'scale(1.4)';
    setTimeout(() => badgeCarrinho.style.transform = 'scale(1)', 200);
}

function renderizarItensDoCarrinho() {
    // Atualiza o numerozinho vermelho lá no header
    const totalItens = carrinhoDeCompras.reduce((acc, item) => acc + item.quantidade, 0);
    badgeCarrinho.textContent = totalItens;

    // Se estiver vazio, mostra a mensagem
    if (carrinhoDeCompras.length === 0) {
        containerItensCarrinho.innerHTML = '<p class="cart-vazio">Seu carrinho está vazio.</p>';
        displaySubtotal.textContent = 'R$ 0,00';
        displayTotal.textContent = 'R$ 0,00';
        return;
    }

    // Se tem item, limpa o container e começa a desenhar e somar
    containerItensCarrinho.innerHTML = ''; 
    let valorSubtotal = 0;

    carrinhoDeCompras.forEach(item => {
        const totalDoItem = item.preco * item.quantidade;
        valorSubtotal += totalDoItem;

        // Criando a linha visual do item direto no JS
        const divItem = document.createElement('div');
        divItem.style.cssText = "display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; margin-bottom: 15px;";
        
        divItem.innerHTML = `
            <div>
                <h4 style="font-size: 15px; margin-bottom: 5px;">${item.quantidade}x ${item.nome}</h4>
                <span style="color: var(--texto-cinza); font-size: 13px;">R$ ${item.preco.toFixed(2).replace('.', ',')} cada</span>
            </div>
            <div style="font-weight: bold; font-size: 15px;">
                R$ ${totalDoItem.toFixed(2).replace('.', ',')}
            </div>
        `;
        containerItensCarrinho.appendChild(divItem);
    });

    // Atualiza os valores finais na base do carrinho
    displaySubtotal.textContent = `R$ ${valorSubtotal.toFixed(2).replace('.', ',')}`;
    const valorTotal = valorSubtotal + TAXA_ENTREGA;
    displayTotal.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
}

// ==========================================
// LÓGICA DE FILTROS (Visual)
// ==========================================
function configurarFiltros() {
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            evento.target.classList.add('ativo');
        });
    });
}

// ==========================================
// MOCK TEMPORÁRIO (Simula o Python/FastAPI)
// ==========================================
async function mockBuscarPizzas() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, nome: "Margherita Clássica", ingredientes: "Queijo, manjericão fresco, molho de tomate pelati", preco: 44.90, nota: 4.8, imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80" },
                { id: 2, nome: "Calabresa Premium", ingredientes: "Calabresa artesanal, cebola roxa", preco: 44.90, nota: 4.8, imagem: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80" },
                { id: 3, nome: "Quatro Queijos Italiano", ingredientes: "Gorgonzola, parmesão, provolone, muçarela", preco: 44.90, nota: 4.8, imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80" },
                { id: 4, nome: "Chocolate com Morango", ingredientes: "Chocolate, morango, leite condensado", preco: 44.90, nota: 4.8, imagem: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&q=80" }
            ]);
        }, 300);
    });
}

// Dá a partida na aplicação
iniciarLoja();