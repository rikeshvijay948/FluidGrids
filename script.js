/**
 * Fluid Grids - Interactive Engine
 * Handles responsive navigation, live Flex/Grid playground, and clipboard interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initDemoSwitcher();
  initViewportSimulator();
  initCopyCss();
  initExportModal();
  initScrollNav();
  initScrollEnhancements();
  initSubscribeForm();
  registerServiceWorker();
});

/* Service Worker Registration */
function registerServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Fluid Grids Service Worker registered'))
        .catch(err => console.warn('Service Worker registration skipped:', err));
    });
  }
}

/* Toast Notification Utility */
function showToast(message, icon = '✓') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 2600);
}

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
      showToast(`Switched to ${nextTheme} theme`, nextTheme === 'dark' ? '🌙' : '☀️');
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
      showToast(`Added card item #${nextNum}`, '➕');
    });
  }

  // Dynamic Remove Item
  if (btnRemoveItem) {
    btnRemoveItem.addEventListener('click', () => {
      const items = stage.querySelectorAll('.stage-item');
      if (items.length > 2) {
        stage.removeChild(items[items.length - 1]);
        showToast('Removed layout item card', '➖');
      } else {
        showToast('Minimum 2 cards required', 'ℹ️');
      }
    });
  }

  // Initial stage configuration
  updateStage();
}

/* 2b. Device Viewport Simulation Controls */
function initViewportSimulator() {
  const viewportBtns = document.querySelectorAll('.viewport-btn');
  const stage = document.getElementById('demoStage');
  const indicator = document.getElementById('viewportIndicator');

  if (!viewportBtns.length || !stage) return;

  viewportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.viewport;
      viewportBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      stage.classList.remove('viewport-tablet', 'viewport-mobile');

      if (mode === 'tablet') {
        stage.classList.add('viewport-tablet');
        if (indicator) indicator.textContent = 'Width: 768px (Tablet)';
        showToast('Viewport set to Tablet (768px)', '📱');
      } else if (mode === 'mobile') {
        stage.classList.add('viewport-mobile');
        if (indicator) indicator.textContent = 'Width: 375px (Mobile)';
        showToast('Viewport set to Mobile (375px)', '📱');
      } else {
        if (indicator) indicator.textContent = 'Width: 100% (Fluid)';
        showToast('Viewport set to Fluid Desktop (100%)', '💻');
      }
    });
  });
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
      showToast('Active CSS rule copied to clipboard!', '📋');

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

/* 6. Newsletter Subscription Form */
function initSubscribeForm() {
  const form = document.getElementById('subscribeForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to Fluid Grids!', '🎉');
      form.reset();
    });
  }
}

/* 7. Interactive Code Export Modal */
function initExportModal() {
  const exportBtn = document.getElementById('btnExportCode');
  const modal = document.getElementById('exportModal');
  const modalClose = document.getElementById('modalClose');
  const modalCode = document.getElementById('modalCodeSnippet');
  const modalTabs = document.querySelectorAll('.modal-tab');
  const copySnippetBtn = document.getElementById('btnCopySnippet');
  const downloadBtn = document.getElementById('btnDownloadTemplate');
  const stage = document.getElementById('demoStage');
  const cssOutput = document.getElementById('cssOutput');

  if (!exportBtn || !modal || !modalCode) return;

  let activeTab = 'boilerplate';

  function generateCode() {
    const isGrid = stage.classList.contains('grid-mode');
    const stageItems = stage.querySelectorAll('.stage-item');
    const activeCss = cssOutput ? cssOutput.textContent.trim() : '';

    const itemsHtml = Array.from(stageItems).map((item, idx) => {
      const num = item.querySelector('.stage-num')?.textContent || String(idx + 1).padStart(2, '0');
      const title = item.querySelector('h4')?.textContent || 'Card Item';
      const desc = item.querySelector('p')?.textContent || 'Responsive block';
      return `  <div class="layout-card">\n    <span class="card-num">${num}</span>\n    <h3>${title}</h3>\n    <p>${desc}</p>\n  </div>`;
    }).join('\n');

    const htmlOnly = `<div class="${isGrid ? 'grid-container' : 'flex-container'}">\n${itemsHtml}\n</div>`;

    const cssOnly = `/* Layout Container */\n.${isGrid ? 'grid-container' : 'flex-container'} {\n  ${activeCss.split('; ').join(';\n  ')}\n}\n\n/* Card Styles */\n.layout-card {\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 16px;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.05);\n}\n\n.card-num {\n  font-weight: 800;\n  color: #2563eb;\n  font-size: 0.75rem;\n}\n\n.layout-card h3 {\n  margin: 4px 0 2px;\n  font-size: 1rem;\n}\n\n.layout-card p {\n  margin: 0;\n  font-size: 0.85rem;\n  color: #64748b;\n}`;

    const boilerplate = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Fluid Grids Layout Export</title>\n  <style>\n    body {\n      font-family: system-ui, -apple-system, sans-serif;\n      padding: 32px;\n      background: #f8fafc;\n      color: #0f172a;\n      line-height: 1.5;\n    }\n\n${cssOnly.split('\n').map(line => '    ' + line).join('\n')}\n  </style>\n</head>\n<body>\n\n${htmlOnly.split('\n').map(line => '  ' + line).join('\n')}\n\n</body>\n</html>`;

    if (activeTab === 'html') {
      modalCode.textContent = htmlOnly;
    } else if (activeTab === 'css') {
      modalCode.textContent = cssOnly;
    } else {
      modalCode.textContent = boilerplate;
    }
  }

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    generateCode();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  exportBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modalTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeTab = tab.dataset.tab;
      generateCode();
    });
  });

  if (copySnippetBtn) {
    copySnippetBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(modalCode.textContent);
        showToast('Code snippet copied to clipboard!', '📋');
      } catch {
        showToast('Snippet selected', 'ℹ️');
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const blob = new Blob([modalCode.textContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fluid-${activeTab === 'css' ? 'styles.css' : 'layout.html'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('File downloaded successfully!', '💾');
    });
  }
}



