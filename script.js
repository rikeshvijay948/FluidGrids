/**
 * Fluid Grids - Interactive Engine
 * Handles responsive navigation, live Flex/Grid playground, and clipboard interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initDemoSwitcher();
  initCopyCss();
  initScrollNav();
});

/* 1. Mobile Navigation Toggle & Keyboard Accessibility */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    // Close when clicking any nav item
    navLinks.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
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

  function setFlexMode() {
    btnFlex.classList.add('active');
    btnFlex.setAttribute('aria-pressed', 'true');
    btnGrid.classList.remove('active');
    btnGrid.setAttribute('aria-pressed', 'false');
    
    stage.classList.remove('grid-mode');
    stage.classList.add('flex-mode');
    
    cssOutput.textContent = 'display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px;';
  }

  function setGridMode() {
    btnGrid.classList.add('active');
    btnGrid.setAttribute('aria-pressed', 'true');
    btnFlex.classList.remove('active');
    btnFlex.setAttribute('aria-pressed', 'false');
    
    stage.classList.remove('flex-mode');
    stage.classList.add('grid-mode');
    
    cssOutput.textContent = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;';
  }

  btnFlex.addEventListener('click', setFlexMode);
  btnGrid.addEventListener('click', setGridMode);
}

/* 3. Copy CSS to Clipboard */
function initCopyCss() {
  const btnCopy = document.getElementById('btnCopyCss');
  const copyBtnText = document.getElementById('copyBtnText');
  const cssOutput = document.getElementById('cssOutput');

  if (!btnCopy || !copyBtnText || !cssOutput) return;

  btnCopy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(cssOutput.textContent.trim());
      copyBtnText.textContent = 'Copied!';
      btnCopy.classList.add('btn-primary');
      btnCopy.classList.remove('btn-secondary');

      setTimeout(() => {
        copyBtnText.textContent = 'Copy CSS';
        btnCopy.classList.remove('btn-primary');
        btnCopy.classList.add('btn-secondary');
      }, 2000);
    } catch {
      copyBtnText.textContent = 'Selected';
    }
  });
}

/* 4. Active Link Highlight on Scroll */
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
