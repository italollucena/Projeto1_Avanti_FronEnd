document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.querySelector("input[type='text']");
  const searchResult = document.getElementById("searchResult");

  // Inicializa a contagem de itens no carrinho
  let cartCount = 0;

  const decreaseButtons = document.querySelectorAll(".decrease");
  const increaseButtons = document.querySelectorAll(".increase");
  const cartIcons = document.querySelectorAll(".cart-icon");
  const quantityControls = document.querySelectorAll(".quantity-controls");
  const cartQuantityEls = document.querySelectorAll(".cart-quantity");
  const cartCountElements = document.querySelectorAll(".cart-count");

  // Atualiza a contagem de itens no carrinho
  function updateCartCount() {
    cartCountElements.forEach((element) => {
      element.textContent = cartCount;
    });

    cartQuantityEls.forEach((element) => {
      element.textContent = cartCount;
    });
  }

  // Adiciona item ao carrinho
  function addToCart() {
    cartCount++;
    updateCartCount();
  }

  // Botões + e -
  increaseButtons.forEach((increaseButton) => {
    increaseButton.addEventListener("click", function (e) {
      e.stopPropagation(); // Impede que o clique feche o menu
      cartCount++;
      updateCartCount();
    });
  });

  decreaseButtons.forEach((decreaseButton) => {
    decreaseButton.addEventListener("click", function (e) {
      e.stopPropagation(); // Impede que o clique feche o menu
      if (cartCount > 0) {
        cartCount--;
        updateCartCount();
      }
    });
  });

  // Clique no carrinho mostra/esconde botões
  cartIcons.forEach((cartIcon, index) => {
    cartIcon.addEventListener("click", function (e) {
      e.stopPropagation(); // Impede que clique fora feche o menu sem querer
      quantityControls[index].classList.toggle("hidden"); // Alterna a visibilidade
    });

    // Fecha ao clicar fora
    document.addEventListener("click", function (e) {
      if (
        !cartIcon.contains(e.target) &&
        !quantityControls[index].contains(e.target)
      ) {
        quantityControls[index].classList.add("hidden"); // Esconde os controles
      }
    });
  });

  // Impede zoom ao clicar
  function preventZoom(event) {
    event.preventDefault();
  }

  // Resultado de busca
  function displaySearchResult() {
    const query = searchInput.value.trim();
    searchResult.textContent = query ? `Você buscou por: '${query}'` : "";
  }

  // Menu suspenso responsivo
  if (toggleButton && dropdownMenu) {
    toggleButton.addEventListener("click", function (event) {
      event.stopPropagation();
      if (window.innerWidth < 768) {
        dropdownMenu.classList.toggle("hidden");
      }
    });

    document.addEventListener("click", function (event) {
      if (
        !dropdownMenu.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        dropdownMenu.classList.add("hidden");
      }
    });

    toggleButton.addEventListener("mouseenter", function () {
      if (window.innerWidth >= 768) {
        const rect = toggleButton.getBoundingClientRect();
        dropdownMenu.style.left = `${rect.left}px`;
        dropdownMenu.style.top = `${rect.bottom + window.scrollY}px`;
        setTimeout(() => {
          dropdownMenu.classList.remove("hidden");
        }, 100); // Adiciona um pequeno atraso
      }
    });

    dropdownMenu.addEventListener("mouseleave", function () {
      if (window.innerWidth >= 768) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }

  // Categorias (hover no desktop / clique no mobile)
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

    item.addEventListener("mouseenter", function () {
      if (window.innerWidth >= 768) {
        showCategory.call(this);
      }
    });

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

  // Impede zoom por duplo toque
  let lastTouchEnd = 0;
  document.addEventListener("touchend", function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  });

  // Busca
  searchButton.addEventListener("click", function () {
    displaySearchResult();
  });

  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      displaySearchResult();
    }
  });

  // Botões "Comprar"
  const buyButtons = document.querySelectorAll("button.mt-6.bg-blue-600");
  buyButtons.forEach((button) => {
    const handleBuy = function (event) {
      preventZoom(event);
      addToCart();
    };

    button.addEventListener("touchstart", handleBuy, { passive: false });
    button.addEventListener("click", handleBuy);
  });

  // Formulário de cadastro
  const formCadastro = document.getElementById("formCadastro");
  const formularioAdicional = document.getElementById("formularioAdicional");
  const formMaisInformacoes = document.getElementById("formMaisInformacoes");

  if (formCadastro) {
    formCadastro.addEventListener("submit", function (event) {
      event.preventDefault();
      formularioAdicional.classList.remove("hidden");
    });
  }

  if (formularioAdicional) {
    formularioAdicional.addEventListener("submit", function (e) {
      e.preventDefault();
      window.location.href = "/";
    });
  }

  if (formMaisInformacoes) {
    formMaisInformacoes.addEventListener("submit", function (event) {
      event.preventDefault();
      window.location.href = "pagina_inicial.html";
    });
  }

  // Atualiza o carrinho ao iniciar
  updateCartCount();
});

// Carrossel
window.scrollCarousel = function (direction) {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const scrollAmount = carousel.offsetWidth * 0.8;
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
};
