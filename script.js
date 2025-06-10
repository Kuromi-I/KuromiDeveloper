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

let timeout;
window.addEventListener('scroll', () => {
  document.body.style.opacity = '0.9'; 

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    document.body.style.opacity = '1'; 
  }, 150);
});

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
const botao = document.getElementById('toggle-darkmode');
const corpo = document.body;

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  corpo.classList.add('dark-mode');
  botao.textContent = 'Dark Mode';
}
botao.addEventListener('click', () => {
  corpo.classList.toggle('dark-mode');
  if (corpo.classList.contains('dark-mode')) {
    botao.textContent = 'Light Mode';
  } else {
    botao.textContent = 'Dark Mode';
  }
});
