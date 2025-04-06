document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

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

  // Exibe categorias ao passar o mouse no desktop ou clicar no mobile
  document.querySelectorAll("[data-category]").forEach((item) => {
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
