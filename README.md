# 🌐 Fluid Grids

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Deploy to GitHub Pages](https://github.com/rikeshvijay948/FluidGrids/actions/workflows/deploy.yml/badge.svg)](https://github.com/rikeshvijay948/FluidGrids/actions/workflows/deploy.yml)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-orange.svg)](manifest.json)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-Flexbox%20%26%20Grid-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Design-100%25%20Responsive-brightgreen)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

> A modern, lightweight, zero-dependency responsive webpage architecture demonstrating practical synergy between **CSS Flexbox** and **CSS Grid**.

---

## 📖 Overview

**Fluid Grids** is designed to provide developers with a real-world, production-ready reference for building modern websites with pure CSS. Instead of relying on bloated UI frameworks, it utilizes:

- **CSS Flexbox** for 1-dimensional item alignment, distribution, and content wrapping.
- **CSS Grid** for 2-dimensional multi-column layouts, asymmetric sections, and auto-fitting card arrays.

---

## ⚡ Key Highlights

- **Zero External Dependencies**: Pure vanilla HTML5, CSS3, and ES6+ JavaScript.
- **Dual-Mode Theme Engine**: Manual Dark / Light switcher with `localStorage` persistence and automatic OS preference synchronization.
- **Dynamic Interactive Playground**: Real-time layout switcher with custom gap adjustments, column presets, alignment controls, dynamic node creation, and one-click CSS copy.
- **Progressive Web App (PWA)**: Includes `manifest.json` and mobile meta definitions for standalone installability.
- **Scroll Enhancements**: Real-time top scroll reading progress indicator and smooth return-to-top floating button.
- **Fluid Typography**: Dynamic scaling with CSS `clamp()` expressions across viewports.
- **Mobile First Navigation**: Smooth off-canvas dropdown menu with keyboard dismissibility (`Esc`).
- **Accessible (WCAG AA)**: Semantic landmarks, high-contrast outlines, skip-to-content anchor, and ARIA compliant roles.
- **Automated CI/CD**: Built-in GitHub Actions workflow for asset verification and deployment to GitHub Pages.

---

## 📐 Layout Architecture: When to use Flexbox vs. CSS Grid

| Layout Context | Technique | CSS Implementation | Reason |
| :--- | :--- | :--- | :--- |
| **Site Navigation** | Flexbox | `display: flex; justify-content: space-between;` | Spreads brand logo, navigation links, and CTA across a single horizontal line. |
| **Hero Feature Split** | CSS Grid | `display: grid; grid-template-columns: 1.1fr 0.9fr;` | Aligns hero text and visual code card into an asymmetric 2D structure. |
| **Feature Cards** | CSS Grid | `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));` | Automatically calculates column count based on available screen space without media queries. |
| **Interactive Sandbox** | Dynamic | `flex` vs. `grid` toggle | Live DOM toggle showing CSS layout changes in real-time. |
| **Action & Button Groups** | Flexbox | `display: flex; gap: 14px; flex-wrap: wrap;` | Keeps buttons side-by-side on desktop while wrapping cleanly on small mobile viewports. |
| **Footer & Social Links** | Flexbox | `display: flex; justify-content: space-between;` | Clean vertical and horizontal alignment across screen sizes. |

---

## 📂 Project Structure

```text
fluid-grids/
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions CI/CD deployment
├── images/
│   └── hero.jpg          # High-resolution architectural preview asset
├── .gitignore            # Git exclusion definitions
├── CHANGELOG.md          # Semantic version release notes
├── CONTRIBUTING.md       # Developer contribution guidelines
├── index.html            # Semantic HTML5 document
├── LICENSE               # MIT Open Source License
├── manifest.json         # PWA Web App Manifest
├── README.md             # Project documentation
├── script.js             # Vanilla JS for live demo and navigation
└── styles.css            # Responsive CSS design tokens & layout rules
```

---

## 🚀 Quick Start

### 1. Clone or Download Repository
```bash
git clone https://github.com/rikeshvijay948/fluid-grids.git
cd fluid-grids
```

### 2. Run Locally
Open `index.html` directly in your browser, or spin up a quick local web server:

**Using Python 3:**
```bash
python -m http.server 3000
```

**Using Node.js (`npx serve`):**
```bash
npx serve .
```

Visit `http://localhost:3000` in your browser.

---

## 📱 Responsive Breakpoints

- **Desktop & Wide Displays**: `> 1024px` — Multi-column asymmetric grids and persistent horizontal navigation.
- **Tablets & Small Laptops**: `769px - 1024px` — Balanced 2-column grids with adjusted spacing.
- **Mobile Devices**: `<= 768px` — Single-column layout with collapsable drawer navigation.
- **Compact Handhelds**: `<= 480px` — Full-width action buttons and optimized touch targets.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/rikeshvijay948/fluid-grids/issues).

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Developed with 💙 by **Rikesh Vijay**.
