  const nav = document.querySelector('.navigation');
  const heading = document.querySelector('h1');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        heading.classList.remove('fade-out');
      } else {
        heading.classList.add('fade-out');
      }
    });
  }, {
    root: null,
    threshold: 0.1
  });

  observer.observe(nav);

