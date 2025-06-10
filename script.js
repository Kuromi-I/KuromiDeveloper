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
// Opacity
let timeout;
window.addEventListener('scroll', () => {
  document.body.style.opacity = '0.9'; 

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    document.body.style.opacity = '1'; 
  }, 150);
});

//Dark  Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
const button = document.getElementById('toggle-darkmode');
const body = document.body;

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.add('dark-mode');
  button.textContent = 'Dark Mode';
}
button.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    button.textContent = 'Light Mode';
  } else {
    button.textContent = 'Dark Mode';
  }
});
