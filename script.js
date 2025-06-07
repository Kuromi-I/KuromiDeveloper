  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  let isVisible = false;

  toggle.addEventListener("click", () => {
    if (!isVisible) {
      // Mostra com animação
      menu.classList.remove("fade-out");
      menu.style.display = "flex";
      void menu.offsetWidth; // força reflow para reiniciar a animação
      menu.classList.add("fade-in");
      isVisible = true;
    } else {
      // Esconde com fade-out
      menu.classList.remove("fade-in");
      menu.classList.add("fade-out");

      // Espera a animação terminar e esconde com display: none
      setTimeout(() => {
        menu.style.display = "none";
        isVisible = false;
      }, 300); // mesmo tempo da animação
    }
  });
