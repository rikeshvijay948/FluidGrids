# Contributing to Fluid Grids

Thank you for your interest in contributing to **Fluid Grids**! We welcome improvements, bug reports, and responsive design enhancements.

---

## 🛠️ Development Workflow

1. **Fork the Repository**
   Create your own fork of the repository on GitHub.

2. **Clone your fork locally**
   ```bash
   git clone https://github.com/<your-username>/fluid-grids.git
   cd fluid-grids
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**
   - Follow clean semantic HTML5 standards.
   - Use CSS custom properties for color and sizing consistency.
   - Ensure layouts work across all viewports (`320px` to `1920px+`).
   - Test accessibility using keyboard navigation (`Tab`, `Shift+Tab`, `Escape`).

5. **Commit Following Conventional Commits**
   ```bash
   git commit -m "feat(layout): add new responsive grid component"
   ```
   Prefix types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

6. **Push and Submit a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   Open a PR against the `main` branch with a clear summary of your changes.

---

## 📋 Code Standards

- **HTML**: Validate tags, maintain indentation, provide alt tags for media, use ARIA landmarks.
- **CSS**: Organize sections with clear section headers; avoid hardcoded magic numbers.
- **JavaScript**: Write clean vanilla ES6+ without unnecessary dependencies.

Thank you for helping make responsive web design clean and accessible!
