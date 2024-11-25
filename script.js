const apiUrl = "http://localhost:3000/api/dados"; // URL da sua API Node.js
const menuContainer = document.getElementById("menu");

// Função para buscar os dados da API
async function fetchMenu() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Erro ao buscar os produtos");
    const data = await response.json();
    displayMenu(data); // Ajuste aqui, pois 'data' já é o array com os produtos
  } catch (error) {
    console.error("Erro:", error);
    menuContainer.innerHTML =
      "<p>Não foi possível carregar o cardápio. Tente novamente mais tarde.</p>";
  }
}

// Função para exibir os dados no front-end
function displayMenu(menuData) {
  menuContainer.innerHTML = ""; // Limpa o contêiner
  menuData.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("col");
    productDiv.innerHTML = `
<div class="card product-card d-flex flex-row align-items-center" data-id="${product.id}" data-name="${product.nome}" data-price="${product.preco}">
  <img src="${product.imagem}" alt="${product.nome}" class="product-img me-3">
  <div class="w-100">
    <h5 class="card-title">${product.nome}</h5>
    <p class="card-text">${product.descricao}</p>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <p class="text-primary fw-bold mb-0">R$ ${product.preco}</p>
      <span class="material-symbols-outlined cart-btn">shopping_cart_checkout</span>
    </div>
  </div>
</div>
`;
    menuContainer.appendChild(productDiv);
  });
}


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



// Inicializar
window.onload = function () {
  // Chama a função para buscar e exibir o cardápio ao carregar a página
fetchMenu();
  updateStatus();
};
