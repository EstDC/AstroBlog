const backToTopButton = document.getElementById('back-to-top');
const scrollableSection = document.getElementById('scrollable-section');

function toggleBackToTopButton() {
  // si has scrolleado más de 300px dentro de la sección
  if (scrollableSection.scrollTop > 200) {
    backToTopButton.classList.remove('opacity-0', 'invisible', 'translate-y-2');
    backToTopButton.classList.add('opacity-100', 'visible', 'translate-y-0');
  } else {
    backToTopButton.classList.add('opacity-0', 'invisible', 'translate-y-2');
    backToTopButton.classList.remove('opacity-100', 'visible', 'translate-y-0');
  }
}

function scrollToTop() {
  // Desplazarse dentro de la sección hasta el top
  scrollableSection.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Escuchar evento de scroll en la sección, no en window
scrollableSection.addEventListener('scroll', toggleBackToTopButton);
backToTopButton.addEventListener('click', scrollToTop);