# Renergence Website

Static website for [Renergence](https://renergence.com) — the publishing and practice platform built on Steven Rudolph's work across four areas: Renergence, Structure, Alignment, and Positioning.

## Structure

```
site/               → Deployed HTML/CSS/JS
  index.html        → Homepage
  books.html        → Books catalog
  books/            → Individual book pages
  sr-design-system/ → Design tokens, cover components, marks
  styles.css        → Global stylesheet
  header.js         → Shared header component
  navigator-*.js    → Navigator chat widget integration
content/            → Source content (not deployed)
CLAUDE.md           → Governance rules for AI-assisted editing
```

## Local Development

No build step required. Serve the `site/` directory with any static server:

```bash
# Python
python3 -m http.server 8080 --directory site

# Node
npx serve site

# Or just open site/index.html in a browser
```

## Design System

Thread colors and typography are defined in `site/sr-design-system/sr-design-tokens.css`. Use CSS variables — don't hardcode hex values.

## Governance

See `CLAUDE.md` for area name vs. book title conventions, thread ordering, and content rules.
