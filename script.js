  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  let isVisible = false;

  toggle.addEventListener("click", () => {
    if (!isVisible) {

      menu.classList.remove("fade-out");
      menu.style.display = "flex";
      void menu.offsetWidth;
      menu.classList.add("fade-in");
      isVisible = true;
    } else {
      
      menu.classList.remove("fade-in");
      menu.classList.add("fade-out");

      setTimeout(() => {
        menu.style.display = "none";
        isVisible = false;
      }, 300);
    } 
});
// Opacidade
let timeout;
window.addEventListener('scroll', () => {
  document.body.style.opacity = '0.9';

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    document.body.style.opacity = '1'; 
  }, 150);
});

// Dark Mode
let darkmode = localStorage.getItem('dark-mode');
const toggleDarkModeBtn = document.querySelector('.toggle-darkmode');

const enableDarkMode = () => {
  document.body.classList.add('dark-mode');
  localStorage.setItem('dark-mode', 'active');
}

const disableDarkMode = () => {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('dark-mode', null);
}

if (darkmode === "active") {
  enableDarkMode();
}

toggleDarkModeBtn.addEventListener('click', () => {
  darkmode = localStorage.getItem('dark-mode');
  darkmode !== "active" ? enableDarkMode() : disableDarkMode();
});

//img portfolio
document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  const cards = document.querySelectorAll('.cards li');
  const totalCards = cards.length;

function showCard(index) {
  console.log("Mostrando imagem:", index);
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

  function next() {
    currentIndex = (currentIndex + 1) % totalCards;
    showCard(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    showCard(currentIndex);
  }

  showCard(currentIndex);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  window.next = next;
  window.prev = prev;
});

// casino-button

  const wrapper = document.querySelector('.casino-wrapper');
  const button = document.getElementById('toggleButton');

  button.addEventListener('click', () => {
    wrapper.classList.toggle('open');
  });

