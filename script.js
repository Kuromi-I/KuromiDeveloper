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
      }, 500); 
    } 
});

// Dark Mode
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
    toggleDarkModeBtn.style.transform = 'translateX(32px)';
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

// casino-button
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.casino-wrapper');
  const button = document.getElementById('toggleButton');

  wrapper.classList.add('open');

  setTimeout(() => {
    wrapper.classList.remove('open');
  }, 1000);

  // Toggle manual
  button.addEventListener('click', () => {
    wrapper.classList.toggle('open');
  });
});

// back to top
document.addEventListener('scroll', () => {
  const backToTop = document.querySelector('.back-to-top');
  const homeSection = document.querySelector('#home');
  
  if (window.scrollY > homeSection.offsetHeight) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});

//  Bubbles
window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('mainCanvas');
  const ctx = canvas.getContext('2d');

  const fieldCanvas = document.createElement('canvas');
  const fieldCtx = fieldCanvas.getContext('2d');

  let width, height, fieldWidth, fieldHeight;
  const scale = window.innerWidth < 768 ? 0.12 : 0.2;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    fieldWidth = Math.floor(width * scale);
    fieldHeight = Math.floor(height * scale);

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    fieldCanvas.width = fieldWidth;
    fieldCanvas.height = fieldHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function detectDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark-mode)').matches;
    return prefersDark || document.body.classList.contains('dark-mode');
  }

  const metaballs = [];
  const ballCount = window.innerWidth < 768 ? 30 : 55; 

  for (let i = 0; i < ballCount; i++) {
    metaballs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 20 + Math.random() * 40,
      vx: (Math.random() - 0.4) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    });
  }

  function metaballForce(x, y, ball) {
    const dx = x - ball.x * scale;
    const dy = y - ball.y * scale;
    const dist2 = dx * dx + dy * dy;
    return (ball.r * ball.r * scale * scale) / (dist2 || 0.0001);
  }

  function animate(t) {
    const time = t * 0.005;
    const isDarkMode = detectDarkMode();

    metaballs.forEach(ball => {
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < -ball.r) ball.x = width + ball.r;
      else if (ball.x > width + ball.r) ball.x = -ball.r;

      if (ball.y < -ball.r) ball.y = height + ball.r;
      else if (ball.y > height + ball.r) ball.y = -ball.r;
    });

    const imgData = fieldCtx.getImageData(0, 0, fieldWidth, fieldHeight);
    const data = imgData.data;
    const threshold = 1.0;

    for (let y = 0; y < fieldHeight; y++) {
      for (let x = 0; x < fieldWidth; x++) {
        let sum = 0;
        for (const ball of metaballs) {
          sum += metaballForce(x, y, ball);
        }

        const i = (y * fieldWidth + x) * 4;

        if (sum > threshold) {
          const alpha = Math.min(255 * Math.tanh(sum - threshold), 180);
          let rgb;

          if (isDarkMode) {
            const pulse = 0.3 + 0.05 * Math.sin(time + x * 0.01 + y * 0.01);
            rgb = hslToRgb(280 / 360, 0.8, pulse);
          } else {
            const hue = (time * 10 + x * 0.05 + y * 0.05) % 360;
            rgb = hslToRgb(hue / 360, 1, 0.5);
          }

          data[i]     = rgb[0];
          data[i + 1] = rgb[1];
          data[i + 2] = rgb[2];
          data[i + 3] = alpha;
        } else {
          data[i + 3] = Math.max(0, data[i + 3] - 8);
        }
      }
    }

    fieldCtx.putImageData(imgData, 0, 0);

    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 0.9;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.filter = 'blur(5px)';
    ctx.drawImage(fieldCanvas, 0, 0, width, height);
    ctx.filter = 'brightness(1.2)';
    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
  }

  function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [r * 255, g * 255, b * 255];
  }

  animate();
});

// navbar animation
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navigation');

  function isDesktop() {
    return window.innerWidth >= 768;
  }

  let minimizedTimeout = null;

  function minimizeNav() {
    nav.classList.remove('expanded');
    nav.classList.add('minimized');
  }

  function expandNav() {
    nav.classList.remove('minimized');
    nav.classList.add('expanded');
  }

  nav.classList.add('expanded');

  nav.addEventListener('mouseenter', () => {
    if (!isDesktop()) return;
    if (minimizedTimeout) clearTimeout(minimizedTimeout);
    expandNav();
  });

  nav.addEventListener('mouseleave', () => {
    if (!isDesktop()) return;

    minimizedTimeout = setTimeout(() => {
      minimizeNav();
    }, 1200);
  });

  nav.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      if (!isDesktop()) return;

      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        expandNav();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (!isDesktop()) {
      nav.classList.remove('minimized', 'expanded');
      nav.style = '';
    } else {
      expandNav();
    }
  });
});

// Slides
document.addEventListener('DOMContentLoaded', () => {
  const isMobile = () => window.innerWidth < 768;
  

  document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slide = btn.parentElement;
      const text = slide.querySelector('.text');
      const isVisible = text.style.display === 'block';
      document.querySelectorAll('.slide .text').forEach(el => el.style.display = 'none');
      text.style.display = isVisible ? 'none' : 'block';
    });
  });

  if (!isMobile()) {
    document.querySelectorAll('.slide .text').forEach(el => {
      el.style.display = 'block';
    });
  }

  const slider = document.querySelector('.slider');
  let isDown = false;
  let startX;
  let scrollLeft;
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; 
    slider.scrollLeft = scrollLeft - walk;
  });

  let startTouchX = 0;
  slider.addEventListener('touchstart', (e) => {
    startTouchX = e.touches[0].clientX;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].clientX;
    const diff = startTouchX - moveX;
    slider.scrollLeft = scrollLeft + diff;
  });
});

// fade in
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// decryption
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
const paragraphs = document.querySelectorAll('#aboutText p');
const aboutText = document.getElementById('aboutText');
const showBtn = document.getElementById('aboutBtn');
const backBtn = document.getElementById('backBtn');
const texT = document.getElementById('texT');
const intervals = new Map();

function decryptParagraph(paragraph, speed = 80) {
  const originalText = paragraph.getAttribute('data-original');
  let index = 0;

  if (intervals.has(paragraph)) clearInterval(intervals.get(paragraph));

  const interval = setInterval(() => {
    if (index <= originalText.length) {
      const revealed = originalText.slice(0, index);
      const randoms = originalText
        .slice(index)
        .split('')
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('');
      paragraph.innerText = revealed + randoms;
      index++;
    } else {
      clearInterval(interval);
      paragraph.innerText = originalText;
      intervals.delete(paragraph);
    }
  }, speed);

  intervals.set(paragraph, interval);
}

function showAboutText() {
  aboutText.classList.add('active');
  showBtn.style.display = 'none';
  texT.style.display = 'none';
  backBtn.style.display = 'inline';

  paragraphs.forEach(p => {

    p.innerText = p.getAttribute('data-original');

    const height = p.offsetHeight;
    p.style.height = height + 'px';

    p.innerText = '';
    decryptParagraph(p, 20);
  });
}

showBtn.addEventListener('click', showAboutText);

backBtn.addEventListener('click', () => {
  intervals.forEach(int => clearInterval(int));
  intervals.clear();

  aboutText.classList.remove('active');
  showBtn.style.display = 'block';
  texT.style.display = 'block'; 
  backBtn.style.display = 'none';

  paragraphs.forEach(p => {
    p.innerText = p.getAttribute('data-original');
    p.style.height = '';
  });
});

window.onload = () => {
  paragraphs.forEach(p => {
    p.innerText = p.getAttribute('data-original');
  });
};

function isElementVisible(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.75;
}

// Mobile scroll detection
window.addEventListener('scroll', () => {
  const isMobile = window.innerWidth <= 700;
  if (isMobile && isElementVisible(aboutText) && !aboutText.classList.contains('active')) {
    showAboutText();
  }
});
