/**
 * Fluid Grids - Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initDemoSwitcher();
  initScrollNav();
});

/* 1. Mobile Navigation Toggle */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close when clicking any nav item
    navLinks.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* 2. Interactive Flex / Grid Demo Switcher */
function initDemoSwitcher() {
  const btnFlex = document.getElementById('btnFlex');
  const btnGrid = document.getElementById('btnGrid');
  const stage = document.getElementById('demoStage');
  const cssOutput = document.getElementById('cssOutput');

  if (!btnFlex || !btnGrid || !stage || !cssOutput) return;

  btnFlex.addEventListener('click', () => {
    btnFlex.classList.add('active');
    btnGrid.classList.remove('active');
    
    stage.classList.remove('grid-mode');
    stage.classList.add('flex-mode');
    
    cssOutput.textContent = 'display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px;';
  });

  btnGrid.addEventListener('click', () => {
    btnGrid.classList.add('active');
    btnFlex.classList.remove('active');
    
    stage.classList.remove('flex-mode');
    stage.classList.add('grid-mode');
    
    cssOutput.textContent = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;';
  });
}

/* 3. Active Link Highlight on Scroll */
function initScrollNav() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  });
}
