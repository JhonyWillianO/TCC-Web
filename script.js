// API URL e carrinho
const apiUrl = "http://localhost:3000/api/dados"; // URL de API Node.js
const menuContainer = document.getElementById("menu");
let cart = []; // Array para armazenar os itens do carrinho

// Configurações do mini-game
let score = 0;
let totalTargets = 5;
let gameActive = false;

// Referências do mini-game
const startGameButton = document.getElementById("start-game");
const gameArea = document.getElementById("game-area");
const gameMessage = document.getElementById("game-message");

// Função para iniciar o mini-game
startGameButton.addEventListener("click", () => {
  if (gameActive) return; // Evita reiniciar durante o jogo
  gameActive = true;
  score = 0;
  gameMessage.textContent = "";
  gameArea.innerHTML = ""; // Limpa o campo
  gameArea.style.display = "block";
  startGame();
});

// Função para criar alvos com imagem como uma tag <img>
function createTarget() {
  const target = document.createElement("div");
  target.classList.add("target");

  // Criando a tag <img> e configurando sua src
  const img = document.createElement("img");
  img.src = "./assets/mascote.jpg";  // Substitua pelo caminho correto
  img.style.width = "50px";  // Defina o tamanho da bola
  img.style.height = "50px"; // Defina o tamanho da bola
  
  target.appendChild(img); // Adiciona a imagem dentro da div

  // Posicionamento aleatório
  const x = Math.random() * (gameArea.offsetWidth - 50);
  const y = Math.random() * (gameArea.offsetHeight - 50);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  // Clique no alvo
  target.addEventListener("click", () => {
    score++;
    target.remove(); // Remove o alvo clicado

    if (score === totalTargets) {
      gameActive = false;
      gameArea.style.display = "none";
      gameMessage.textContent = "Parabéns! Você ganhou um desconto especial.";
      applyDiscount();
    }
  });

  gameArea.appendChild(target);

  // Remove o alvo após 2 segundos se não for clicado
  setTimeout(() => {
    if (gameActive && target.parentElement) {
      target.remove();
      checkGameOver();
    }
  }, 2000);
}

// Função principal do mini-game
function startGame() {
  for (let i = 0; i < totalTargets; i++) {
    setTimeout(() => {
      if (gameActive) createTarget();
    }, i * 1000); // Intervalos de 1 segundo
  }
}

// Verifica se o jogo acabou sem atingir todos os alvos
function checkGameOver() {
  const remainingTargets = gameArea.querySelectorAll(".target").length;
  if (!remainingTargets && score < totalTargets) {
    gameActive = false;
    gameArea.style.display = "none";
    gameMessage.textContent = "Jogo encerrado! Tente novamente.";
  }
}

// Aplica o desconto ao carrinho
function applyDiscount() {
  const discount = 10; // Desconto de 10%
  cart = cart.map((item) => {
    item.price = item.price * (1 - discount / 100);
    return item;
  });

  updateCartModal(); // Atualiza o carrinho com os novos preços
  alert(`Parabéns! Você ganhou ${discount}% de desconto.`);
}

// Função para buscar os dados da API
async function fetchMenu() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Erro ${response.status}: Não foi possível buscar os produtos`);
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Os dados retornados não são um array");
    }

    displayMenu(data);
  } catch (error) {
    console.error("Erro ao buscar o menu:", error);
    menuContainer.innerHTML =
      "<p>Não foi possível carregar o cardápio. Tente novamente mais tarde.</p>";
  }
}

// Função para exibir os dados no front-end
function displayMenu(menuData) {
  menuContainer.innerHTML = ""; // Limpa o contêiner

  // Agrupa os produtos por categoria
  const categories = menuData.reduce((acc, product) => {
    if (!acc[product.categoria]) {
      acc[product.categoria] = [];
    }
    acc[product.categoria].push(product);
    return acc;
  }, {});

  // Cria uma seção para cada categoria
  for (const category in categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category-section", "mb-5");

    // Título da categoria
    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);

    // Lista de produtos da categoria
    const productList = document.createElement("div");
    productList.classList.add("gap-3", "d-flex", "flex-wrap", "justify-content-start");

    categories[category].forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("col-12", "col-md-4", "col-lg-3", "mb-4");

      // Corrigir o caminho da imagem
      const imagePath = `assets/${product.imagem}`;

      productDiv.innerHTML = `
        <div class="card product-card" data-id="${product.id}" data-name="${product.nome}" data-price="${product.preco}">
          <img src="${imagePath}" alt="${product.nome}" class="product-img">
          <div class="card-body">
            <h5 class="card-title">${product.nome}</h5>
            <p class="card-text">${product.descricao}</p>
            <p class="text-primary fw-bold">R$ ${product.preco}</p>
            <span class="material-symbols-outlined cart-btn">Adicionar🛒</span>
          </div>
        </div>
      `;
      productList.appendChild(productDiv);
    });

    categoryDiv.appendChild(productList);
    menuContainer.appendChild(categoryDiv);
  }
}

// Adicionar produto ao carrinho
function addToCart(productId, productName, productPrice) {
  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  }
  updateCartCount();
  updateCartModal();
}

// Atualizar contador do carrinho
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = `(${cartCount})`;
}

// Remover produto do carrinho (decrementar quantidade ou remover completamente)
function decrementProductQuantity(productId) {
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex !== -1) {
    if (cart[productIndex].quantity > 1) {
      // Decrementa a quantidade
      cart[productIndex].quantity -= 1;
    } else {
      // Remove o item completamente
      cart.splice(productIndex, 1);
    }
  }

  updateCartCount();
  updateCartModal();
}

function applyDiscount() {
  const discount = 10; // Desconto de 10%
  
  // Aplica o desconto no preço de cada item
  cart = cart.map((item) => {
    item.price = item.price * (1 - discount / 100); // Aplica o desconto
    return item;
  });

  // Atualiza o modal para mostrar o desconto
  updateCartModal(true); // Passando 'true' para mostrar a mensagem de desconto
  alert(`Parabéns! Você ganhou ${discount}% de desconto.`);
}

function updateCartModal(hasDiscount = false) {
  const modalContent = document.querySelector("#cartModal .modal-content");
  modalContent.innerHTML = ""; // Limpa o conteúdo atual do modal

  // Verifica se há itens no carrinho
  if (cart.length === 0) {
    modalContent.innerHTML = "<p>Seu carrinho está vazio.</p>";
  } else {
    // Exibe os itens do carrinho
    cart.forEach((item) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("cart-item");
      productDiv.innerHTML = `
        <p>${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}
          <button class="remove-item btn btn-danger btn-sm" data-id="${item.id}">Remover 1</button>
        </p>
      `;
      modalContent.appendChild(productDiv);
    });

    // Calcula o total do carrinho
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total");
    totalDiv.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
    modalContent.appendChild(totalDiv);

    // Exibe a mensagem de desconto, se houver
    if (hasDiscount) {
      const discountMessage = document.createElement("div");
      discountMessage.classList.add("discount-message");
      discountMessage.innerHTML = `
        <p class="text-success">Desconto de 10% aplicado como prêmio do mini-game!</p>
      `;
      modalContent.insertBefore(discountMessage, modalContent.firstChild); // Coloca no topo do modal
    }

    // Campo de endereço
    const addressDiv = document.createElement("div");
    addressDiv.classList.add("address");
    addressDiv.innerHTML = `
      <label for="address">Endereço de entrega:</label>
      <input type="text" id="address" placeholder="Digite seu endereço">
    `;
    modalContent.appendChild(addressDiv);

    // Botão para enviar para WhatsApp
    const whatsappButton = document.createElement("button");
    whatsappButton.classList.add("btn", "btn-success", "mt-3");
    whatsappButton.innerText = "Enviar pedido para WhatsApp";
    whatsappButton.addEventListener("click", () => sendOrderToWhatsApp());
    modalContent.appendChild(whatsappButton);
  }

  // Adiciona o evento para remover itens do carrinho
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      decrementProductQuantity(productId);
    });
  });
}

function sendOrderToWhatsApp() {
  const phoneNumber = "67991836252"; // Coloque o número de WhatsApp aqui (ex: com DDD e código do país)
  const address = document.querySelector("#address").value || "Endereço não informado";

  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let message = "🚀 *Pedido realizado na Espaço Jasmim*\n\n";
  message += "Aqui estão os itens que você escolheu:\n\n";

  cart.forEach((item) => {
    message += `📦 *${item.quantity}x ${item.name}* (R$ ${(item.price * item.quantity).toFixed(2)})\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\n💰 *Total*: R$ ${total.toFixed(2)}\n`;
  message += `🛵 *Endereço de entrega*: ${address}\n\n`;

  message += "📱 Para mais informações, entre em contato conosco!\n\n";
  message += "📞 Horário de funcionamento: 9h - 18h de segunda a sexta-feira\n";
  message += "📱 Siga nossas redes sociais: https://www.instagram.com/jhonywillian2018/\n";
  message += "\n❤️ Agradecemos por escolher a Espaço Jasmim!\n\n";
  
  // Codifica a mensagem para o formato de URL
  const encodedMessage = encodeURIComponent(message);

  // Abre o WhatsApp com a mensagem
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
}

// Finalizar compra
function finalizarCompra() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const address = document.getElementById("address")?.value || "";
  if (!address) {
    alert("Por favor, insira um endereço de entrega.");
    return;
  }

  let receipt = "Resumo da Compra:\n";
  cart.forEach((item) => {
    receipt += `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  receipt += `\nTotal: R$ ${total.toFixed(2)}\nEndereço: ${address}`;

  const modal = document.getElementById("cartModal");
  const modalContent = modal.querySelector(".modal-content");
  modalContent.innerHTML = `<pre>${receipt}</pre>`;
}

// Abrir modal
document.getElementById("btn-finalizar").addEventListener("click", () => {
  document.getElementById("cartModal").style.display = "block";
});

// Fechar modal
function closeCartModal() {
  document.getElementById("cartModal").style.display = "none";
}

// Evento para fechar o modal quando o usuário clicar fora do conteúdo
window.addEventListener("click", (e) => {
  const modal = document.getElementById("cartModal");
  if (e.target === modal) {
    closeCartModal();
  }
});

// Atualizar status de aberto/fechado
function updateStatus() {
  const statusElement = document.getElementById("status");
  const currentTime = new Date();
  const day = currentTime.getDay();
  const hour = currentTime.getHours();

  if (day >= 1 && day <= 6 && hour >= 8 && hour < 19) {
    statusElement.textContent = "Aberto - Seg-Sáb: 8:30 - 19:30";
    statusElement.style.color = "green";
  } else {
    statusElement.textContent = "Fechado - Seg-Sáb: 8:30 - 19:30";
    statusElement.style.color = "red";
  }
}

// Certifique-se de que o contador do carrinho está atualizado ao carregar a página
function initializeCart() {
  updateCartCount();
}

// Adicionar evento para capturar cliques nos botões de "Adicionar ao carrinho"
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart-btn")) {
    const card = event.target.closest(".product-card");
    const productId = parseInt(card.dataset.id);
    const productName = card.dataset.name;
    const productPrice = parseFloat(card.dataset.price);

    console.log("Adicionando ao carrinho:", { productId, productName, productPrice });
    addToCart(productId, productName, productPrice);
  }
});

// Atualizar contador do carrinho
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  console.log("Total de itens no carrinho:", cartCount);
  
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = `(${cartCount})`;
  } else {
    console.error("Elemento #cart-count não encontrado.");
  }
}


// Inicializar o menu e carrinho ao carregar a página
window.onload = function () {
  fetchMenu();
  initializeCart();
  updateStatus();

};