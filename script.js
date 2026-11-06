/**
 * Fluid Grids - Interactive Engine
 * Handles responsive navigation, live Flex/Grid playground, and clipboard interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initDemoSwitcher();
  initCopyCss();
  initScrollNav();
  initScrollEnhancements();
});

/* 0. Theme Toggle with LocalStorage & System Sync */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('fluid-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 
        (prefersDark.matches ? 'dark' : 'light');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('fluid-theme', nextTheme);
    });
  }

  prefersDark.addEventListener('change', () => {
    if (!localStorage.getItem('fluid-theme')) {
      document.documentElement.removeAttribute('data-theme');
    }
  });
}

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

/* 2. Interactive Flex / Grid Demo Switcher & Dynamic Controls */
function initDemoSwitcher() {
  const btnFlex = document.getElementById('btnFlex');
  const btnGrid = document.getElementById('btnGrid');
  const stage = document.getElementById('demoStage');
  const cssOutput = document.getElementById('cssOutput');
  const gapSelect = document.getElementById('demoGap');
  const flexAlignSelect = document.getElementById('demoFlexAlign');
  const gridColsSelect = document.getElementById('demoGridCols');
  const flexAlignWrap = document.getElementById('flexAlignWrap');
  const gridColsWrap = document.getElementById('gridColsWrap');
  const btnAddItem = document.getElementById('btnAddItem');
  const btnRemoveItem = document.getElementById('btnRemoveItem');

  if (!btnFlex || !btnGrid || !stage || !cssOutput) return;

  let isGrid = false;

  function updateStage() {
    const gap = gapSelect ? gapSelect.value : '16px';
    stage.style.gap = gap;

    if (isGrid) {
      stage.classList.remove('flex-mode');
      stage.classList.add('grid-mode');
      stage.style.display = 'grid';
      stage.style.justifyContent = '';

      const cols = gridColsSelect ? gridColsSelect.value : 'repeat(3, 1fr)';
      stage.style.gridTemplateColumns = cols;
      cssOutput.textContent = `display: grid; grid-template-columns: ${cols}; gap: ${gap};`;
    } else {
      stage.classList.remove('grid-mode');
      stage.classList.add('flex-mode');
      stage.style.display = 'flex';
      stage.style.gridTemplateColumns = '';

      const align = flexAlignSelect ? flexAlignSelect.value : 'space-between';
      stage.style.justifyContent = align;
      cssOutput.textContent = `display: flex; flex-wrap: wrap; justify-content: ${align}; gap: ${gap};`;
    }
  }

  function setFlexMode() {
    isGrid = false;
    btnFlex.classList.add('active');
    btnFlex.setAttribute('aria-pressed', 'true');
    btnGrid.classList.remove('active');
    btnGrid.setAttribute('aria-pressed', 'false');

    if (flexAlignWrap) flexAlignWrap.style.display = 'flex';
    if (gridColsWrap) gridColsWrap.style.display = 'none';

    updateStage();
  }

  function setGridMode() {
    isGrid = true;
    btnGrid.classList.add('active');
    btnGrid.setAttribute('aria-pressed', 'true');
    btnFlex.classList.remove('active');
    btnFlex.setAttribute('aria-pressed', 'false');

    if (flexAlignWrap) flexAlignWrap.style.display = 'none';
    if (gridColsWrap) gridColsWrap.style.display = 'flex';

    updateStage();
  }

  btnFlex.addEventListener('click', setFlexMode);
  btnGrid.addEventListener('click', setGridMode);

  if (gapSelect) gapSelect.addEventListener('change', updateStage);
  if (flexAlignSelect) flexAlignSelect.addEventListener('change', updateStage);
  if (gridColsSelect) gridColsSelect.addEventListener('change', updateStage);

  // Dynamic Add Item
  if (btnAddItem) {
    btnAddItem.addEventListener('click', () => {
      const currentItems = stage.querySelectorAll('.stage-item');
      const nextNum = String(currentItems.length + 1).padStart(2, '0');
      const titles = ['Component Box', 'Flex Item', 'Grid Cell', 'Widget Block', 'Sub-grid Column'];
      const randomTitle = titles[currentItems.length % titles.length];

      const newItem = document.createElement('div');
      newItem.className = 'stage-item';
      newItem.innerHTML = `
        <div class="stage-num">${nextNum}</div>
        <h4>${randomTitle}</h4>
        <p>Dynamic node</p>
      `;
      stage.appendChild(newItem);
    });
  }

  // Dynamic Remove Item
  if (btnRemoveItem) {
    btnRemoveItem.addEventListener('click', () => {
      const items = stage.querySelectorAll('.stage-item');
      if (items.length > 2) {
        stage.removeChild(items[items.length - 1]);
      }
    });
  }

  // Initial stage configuration
  updateStage();
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

/* 5. Scroll Progress & Back to Top */
function initScrollEnhancements() {
  const progressBar = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

