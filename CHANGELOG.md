# Changelog

All notable changes to the **Fluid Grids** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.4.0] - 2026-11-13

### Added
- **Responsive Device Viewport Simulator**: Interactive desktop (100%), tablet (768px), and mobile (375px) framing controls in the playground to preview layouts across viewports.
- **Offline PWA Service Worker (`sw.js`)**: Full offline caching and instant page shell loading with cache-first asset strategy.
- **Interactive Code Export Modal**: Dynamic exporter generating ready-to-use HTML, CSS, and standalone boilerplate with one-click copy and `.html`/`.css` file download.
- **Floating Toast Notification System**: Smooth, non-blocking notification alerts for theme changes, clipboard actions, device switching, item adjustments, and form updates.
- **Keyboard Shortcuts System & Modal**: Global hotkeys (`T` for theme toggle, `F` for flexbox, `G` for grid, `E` for export, `?` for shortcuts, `Esc` to close) with accessible reference dialog.

---

## [1.3.0] - 2026-11-06

### Added
- **Manual Theme Switcher**: Added dark/light/system theme toggle in the navbar with `localStorage` persistence and live system preference sync.
- **Dynamic Playground Controls**: Added real-time gap selector (`8px` to `32px`), Flexbox justify controls, CSS Grid column presets, and dynamic node addition/removal buttons.
- **Scroll Progress Bar**: Added top reading progress bar that dynamically indicates viewport scroll position.
- **Back to Top Button**: Added floating smooth-scroll return button triggered upon scrolling past 300px.
- **Progressive Web App (PWA) Support**: Added `manifest.json`, mobile icon definitions, and standalone fullscreen meta tags.
- **CI/CD Automation**: Added GitHub Actions workflow (`deploy.yml`) for automated asset verification and GitHub Pages deployment.

---

## [1.2.0] - 2026-10-26

### Added
- **Dark Mode Support**: Automatic night mode styling responding to `prefers-color-scheme: dark`.
- **Print Stylesheet**: Clean media query for paper/PDF export omitting interactive controls.
- **Copy CSS Feature**: One-click clipboard copy button with feedback toast.
- **Accessibility Enhancements**: Skip-to-content anchor, focus-visible indicators, and `prefers-reduced-motion` fallbacks.
- **Documentation**: Added comprehensive `README.md`, `LICENSE`, and `CONTRIBUTING.md`.

### Changed
- Refactored mobile drawer to support `Escape` key dismiss and ARIA state updates.
- Updated main content landmark with accessible `id="main-content"`.

---

## [1.1.0] - 2026-08-18

### Added
- Interactive layout engine sandbox comparing Flexbox vs. CSS Grid in real time.
- Responsive showcase section with asymmetric 2-column image/content grid.
- Plus Jakarta Sans typography tokens and CSS custom variables.

### Changed
- Rebranded studio prototype to **Fluid Grids** with clean visual polish.
- Simplified CSS rule sets into modular, well-commented blocks.

---

## [1.0.0] - 2026-08-18

### Added
- Initial project creation with semantic HTML5 document.
- One-dimensional Flexbox navigation and action button groups.
- Two-dimensional CSS Grid feature matrix with auto-fit wrapping.
- Vanilla JavaScript for mobile navigation toggling.
