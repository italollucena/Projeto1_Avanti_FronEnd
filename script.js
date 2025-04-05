document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(
    ".text-xl.font-bold.text-blue-600"
  );
  const dropdownMenu = document.getElementById("dropdownMenu");

  // Verifica se os elementos existem
  if (toggleButton && dropdownMenu) {
    toggleButton.addEventListener("click", function (event) {
      dropdownMenu.classList.toggle("hidden");
      event.stopPropagation(); // Evita que o clique se propague e feche imediatamente o menu
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (event) {
      if (
        !dropdownMenu.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }

  // Mostrar conteúdo da categoria ao passar o mouse
  document.querySelectorAll("[data-category]").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      document.querySelectorAll(".category-content").forEach((el) => {
        el.classList.add("hidden");
      });

      const targetId = this.getAttribute("data-category");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.remove("hidden");
      }
    });
  });
});

// Função global do carrossel — definida fora do DOMContentLoaded para garantir visibilidade global
window.scrollCarousel = function (direction) {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;
  const scrollAmount = carousel.offsetWidth * 0.8; // rolagem proporcional
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
};
