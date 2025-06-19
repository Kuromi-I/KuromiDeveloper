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

//Dark Mode
document.addEventListener('DOMContentLoaded', () => {
  const toggleDarkModeBtn = document.querySelector('.toggle-darkmode');


  const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'active');
  };

  const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', null);
  };


  let darkmode = localStorage.getItem('dark-mode');
  if (darkmode === "active") {
    enableDarkMode();
  }


  const openButton = () => {
    toggleDarkModeBtn.style.opacity = '1';
    toggleDarkModeBtn.style.transform = 'translateX(0)';
  };

  const closeButton = () => {
    toggleDarkModeBtn.style.opacity = '1';
    toggleDarkModeBtn.style.transform = 'translateX(38px)';
  };


  openButton();

  
  let closeTimeout = setTimeout(closeButton, 2000);


  toggleDarkModeBtn.addEventListener('click', () => {
    darkmode = localStorage.getItem('dark-mode');
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();


    openButton();


    clearTimeout(closeTimeout);
    closeTimeout = setTimeout(closeButton, 2000);
  });
});


//img portfolio
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.cards li');
  let currentIndex = 0;

  function showCard(index) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
  }

  window.next = () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  };
  window.prev = () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
  };

  showCard(currentIndex);
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
});

// casino-button

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.casino-wrapper');
  const button = document.getElementById('toggleButton');

  wrapper.classList.add('open');

  setTimeout(() => {
    wrapper.classList.remove('open');
  }, 1000);

  button.addEventListener('click', () => {
    wrapper.classList.toggle('open');
  });
});
// navigation

  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navigation');
    let lastScroll = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        nav.classList.add('hide'); // Scroll down
      } else {
        nav.classList.remove('hide'); // Scroll up
      }

      lastScroll = currentScroll;
    });
  });

