document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("categoryToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (!toggleButton || !dropdownMenu) return;

  const isMobile = () => window.innerWidth < 768;

  function showMenu() {
    dropdownMenu.classList.remove("hidden");
  }

  function hideMenu() {
    dropdownMenu.classList.add("hidden");
  }

  function toggleMenu() {
    dropdownMenu.classList.toggle("hidden");
  }

  toggleButton.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", function (e) {
    if (!dropdownMenu.contains(e.target) && !toggleButton.contains(e.target)) {
      hideMenu();
    }
  });

  function handleHoverEvents() {
    toggleButton.addEventListener("mouseenter", () => {
      if (!isMobile()) showMenu();
    });

    toggleButton.addEventListener("mouseleave", () => {
      if (!isMobile()) {
        setTimeout(() => {
          if (
            !dropdownMenu.matches(":hover") &&
            !toggleButton.matches(":hover")
          ) {
            hideMenu();
          }
        }, 200);
      }
    });

    dropdownMenu.addEventListener("mouseenter", () => {
      if (!isMobile()) showMenu();
    });

    dropdownMenu.addEventListener("mouseleave", () => {
      if (!isMobile()) hideMenu();
    });
  }

  handleHoverEvents();

  document.querySelectorAll("[data-category]").forEach((item) => {
    const showCategory = function () {
      document
        .querySelectorAll(".category-content")
        .forEach((el) => el.classList.add("hidden"));

      const targetId = this.getAttribute("data-category");
      const target = document.getElementById(targetId);
      if (target) target.classList.remove("hidden");
    };

    if (isMobile()) {
      item.addEventListener("click", showCategory);
    } else {
      item.addEventListener("mouseenter", showCategory);
    }
  });

  window.addEventListener("resize", hideMenu);
});
