# Changelog

All notable changes to the **Fluid Grids** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
