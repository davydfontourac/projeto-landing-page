document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const indicator = document.querySelector('.nav-indicator');
  const sections = document.querySelectorAll('.sections-wrapper > section');
  const wrapper = document.querySelector('.sections-wrapper');
  const slider = document.querySelector('.sections-wrapper.horizontal-slider');

  function updateIndicator(el) {
    indicator.style.left = el.offsetLeft + 'px';
    indicator.style.width = el.offsetWidth + 'px';
  }

  function goToSection(index) {
    slider.style.transform = `translateX(-${index * 100}vw)`;
    navLinks.forEach((link) => link.classList.remove('active'));
    navLinks[index].classList.add('active');
  }

  navLinks.forEach((link, idx) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
      updateIndicator(this);
      goToSection(idx);
      // Scroll horizontal
      wrapper.scrollTo({
        left: idx * window.innerWidth,
        behavior: 'smooth',
      });
      // Atualiza o hash na URL sem scroll
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });

  // Permite navegação por hash ao recarregar a página
  window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash) {
      const idx = Array.from(sections).findIndex(
        (sec) => '#' + sec.id === hash
      );
      if (idx >= 0) goToSection(idx);
    }
  });

  // Inicializa o indicador na posição correta
  const activeLink = document.querySelector('.nav-link.active');
  if (activeLink) updateIndicator(activeLink);
});
