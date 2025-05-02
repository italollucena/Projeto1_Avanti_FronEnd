document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.querySelector("input[type='text']");
  const searchResult = document.getElementById("searchResult");

  let cartCount = 0;

  const decreaseButtons = document.querySelectorAll(".decrease");
  const increaseButtons = document.querySelectorAll(".increase");
  const cartIcons = document.querySelectorAll(".cart-icon");
  const quantityControls = document.querySelectorAll(".quantity-controls");
  const cartQuantityEls = document.querySelectorAll(".cart-quantity");
  const cartCountElements = document.querySelectorAll(".cart-count");

  function updateCartCount() {
    cartCountElements.forEach((element) => {
      element.textContent = cartCount;
    });

    cartQuantityEls.forEach((element) => {
      element.textContent = cartCount;
    });
  }

  function addToCart() {
    cartCount++;
    updateCartCount();
  }

  increaseButtons.forEach((increaseButton) => {
    const handleIncrease = function (e) {
      e.stopPropagation();
      cartCount++;
      updateCartCount();
    };

    increaseButton.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        handleIncrease(e);
      },
      { passive: false }
    );

    increaseButton.addEventListener("click", handleIncrease);
  });

  decreaseButtons.forEach((decreaseButton) => {
    const handleDecrease = function (e) {
      e.stopPropagation();
      if (cartCount > 0) {
        cartCount--;
        updateCartCount();
      }
    };

    decreaseButton.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        handleDecrease(e);
      },
      { passive: false }
    );

    decreaseButton.addEventListener("click", handleDecrease);
  });

  cartIcons.forEach((cartIcon, index) => {
    cartIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      quantityControls[index].classList.toggle("hidden");
    });

    document.addEventListener("click", function (e) {
      if (
        !cartIcon.contains(e.target) &&
        !quantityControls[index].contains(e.target)
      ) {
        quantityControls[index].classList.add("hidden");
      }
    });
  });

  function preventZoom(event) {
    event.preventDefault();
  }

  function displaySearchResult() {
    const query = searchInput.value.trim();
    searchResult.textContent = query ? `Você buscou por: '${query}'` : "";
  }

  // Menu suspenso responsivo (atualizado)
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
        dropdownMenu.classList.remove("hidden");
      }
    });

    dropdownMenu.addEventListener("mouseleave", function () {
      if (window.innerWidth >= 768) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }

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

  const defaultCategory = document.querySelector("[data-category]");
  if (defaultCategory) {
    const firstId = defaultCategory.getAttribute("data-category");
    const firstEl = document.getElementById(firstId);
    if (firstEl) {
      firstEl.classList.remove("hidden");
    }
  }

  let lastTouchEnd = 0;
  document.addEventListener("touchend", function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  });

  searchButton.addEventListener("click", function () {
    displaySearchResult();
  });

  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      displaySearchResult();
    }
  });

  const buyButtons = document.querySelectorAll("button.mt-6.bg-blue-600");
  buyButtons.forEach((button) => {
    const handleBuy = function (event) {
      preventZoom(event);
      addToCart();
    };

    button.addEventListener("touchstart", handleBuy, { passive: false });
    button.addEventListener("click", handleBuy);
  });

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

  updateCartCount();
});

window.scrollCarousel = function (direction) {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const scrollAmount = carousel.offsetWidth * 0.8;
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
};
