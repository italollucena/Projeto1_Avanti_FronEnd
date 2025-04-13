document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.querySelector("input[type='text']");
  const searchResult = document.getElementById("searchResult");

  // Inicializa a contagem de itens no carrinho
  let cartCount = 0;

  // Função para atualizar a contagem de itens no carrinho
  function updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    cartCountElements.forEach((element) => {
      element.textContent = cartCount;
    });
  }

  // Função para adicionar um item ao carrinho
  function addToCart() {
    cartCount++;
    updateCartCount();
  }

  // Bloqueia o zoom ao clicar no botão "Comprar"
  function preventZoom(event) {
    event.preventDefault(); // Impede o comportamento padrão de zoom
  }

  // Função para exibir a mensagem de busca
  function displaySearchResult() {
    const query = searchInput.value.trim();
    if (query) {
      searchResult.textContent = `Você buscou por: '${query}'`;
    } else {
      searchResult.textContent = "";
    }
  }

  // Alterna o menu ao clicar no botão (mobile)
  if (toggleButton && dropdownMenu) {
    toggleButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Impede fechamento imediato
      if (window.innerWidth < 768) {
        dropdownMenu.classList.toggle("hidden");
      }
    });

    // Fecha o menu ao clicar fora (mobile e desktop)
    document.addEventListener("click", function (event) {
      if (
        !dropdownMenu.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        dropdownMenu.classList.add("hidden");
      }
    });

    // Exibe o menu ao passar o mouse no botão (desktop)
    toggleButton.addEventListener("mouseenter", function () {
      if (window.innerWidth >= 768) {
        // Posiciona o dropdown alinhado ao botão
        const rect = toggleButton.getBoundingClientRect();
        dropdownMenu.style.left = `${rect.left}px`;
        dropdownMenu.style.top = `${rect.bottom + window.scrollY}px`;
        dropdownMenu.classList.remove("hidden");
      }
    });

    // Oculta o menu ao sair com o mouse (desktop)
    dropdownMenu.addEventListener("mouseleave", function () {
      if (window.innerWidth >= 768) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }

  // Manipulação das categorias (hover no desktop / clique no mobile)
  const categoryItems = document.querySelectorAll("[data-category]");
  categoryItems.forEach((item) => {
    const showCategory = function () {
      document.querySelectorAll(".category-content").forEach((el) => {
        el.classList.add("hidden");
      });

      const targetId = this.getAttribute("data-category");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.remove("hidden");
      }
    };

    // Hover (apenas desktop)
    item.addEventListener("mouseenter", function () {
      if (window.innerWidth >= 768) {
        showCategory.call(this);
      }
    });

    // Clique (apenas mobile)
    item.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        showCategory.call(this);
      }
    });
  });

  // Exibe a primeira categoria por padrão
  const defaultCategory = document.querySelector("[data-category]");
  if (defaultCategory) {
    const firstId = defaultCategory.getAttribute("data-category");
    const firstEl = document.getElementById(firstId);
    if (firstEl) {
      firstEl.classList.remove("hidden");
    }
  }

  // Bloqueia o zoom por duplo toque em dispositivos móveis
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );

  // Funcionalidade de busca
  searchButton.addEventListener("click", function () {
    displaySearchResult();
  });

  // Adiciona evento de tecla para o campo de busca
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      displaySearchResult();
    }
  });

  // Adiciona o evento de clique a todos os botões "Comprar"
  const buyButtons = document.querySelectorAll("button.mt-6.bg-blue-600");
  buyButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      preventZoom(event); // Impede o zoom ao clicar
      addToCart(); // Adiciona ao carrinho
    });
  });

  // Cadastro e Formulário Adicional
  const formCadastro = document.getElementById("formCadastro");
  const formularioAdicional = document.getElementById("formularioAdicional");
  const formMaisInformacoes = document.getElementById("formMaisInformacoes");

  if (formCadastro) {
    formCadastro.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio do formulário
      formularioAdicional.classList.remove("hidden"); // Exibe o formulário adicional
    });
  }

  if (formMaisInformacoes) {
    formMaisInformacoes.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio do formulário
      // Aqui você pode adicionar a lógica para enviar os dados, se necessário
      window.location.href = "pagina_inicial.html"; // Substitua pelo URL da sua página inicial
    });
  }
});

// Função de rolagem do carrossel
window.scrollCarousel = function (direction) {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const scrollAmount = carousel.offsetWidth * 0.8;
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
};
