function toggleMenu(event) {
  const menu = event.currentTarget.nextElementSibling;
  menu.classList.toggle("hidden");
}

function showCategory(categoryId) {
  const contents = document.querySelectorAll(".category-content");
  contents.forEach((content) => {
    content.classList.add("hidden");
  });
  document.getElementById(categoryId).classList.remove("hidden");
}

function toggleMenu(event) {
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("hidden");
  event.stopPropagation(); // Impede que o evento de clique se propague
}

// Fecha o menu ao clicar fora dele
document.addEventListener("click", function (event) {
  const menu = document.getElementById("dropdownMenu");
  const toggleButton = document.querySelector(
    ".text-xl.font-bold.text-blue-600"
  );

  // Verifica se o clique foi fora do menu e do botão
  if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
    menu.classList.add("hidden");
  }
});
document.querySelectorAll("[data-category]").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    document
      .querySelectorAll(".category-content")
      .forEach((el) => el.classList.add("hidden"));
    document
      .getElementById(this.getAttribute("data-category"))
      .classList.remove("hidden");
  });
});
