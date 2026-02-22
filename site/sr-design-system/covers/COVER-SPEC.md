# Cover Design Specification

**Status:** Locked | **Version:** 1.0 | **Date:** 2026-02-19

This is the **complete, authoritative spec** for generating Renergence book covers. Follow this exactly. No improvisation.

---

## Rendering Pipeline

```
1. Edit cover HTML template:  covers/cover-<book>.html
2. Render to hi-res:          node covers/render-cover.js cover-<book>.html --output ~/Projects/books/{tier}/{book}/EN/Covers/
3. Output:                    <book>-hires.png (lossless) + <book>-hires.jpg (500KB+)
```

**Output convention:** Rendered covers ALWAYS go to the book's own Covers folder:
```
books/{tier}/{book}/EN/Covers/<book>-hires.png
books/{tier}/{book}/EN/Covers/<book>-hires.jpg
```
Never leave renders in the covers/ template directory or in Drafts.

Requirements: `npm install puppeteer-core` (in /tmp or globally), Google Chrome.

---

## Canvas

| Property | Value |
|----------|-------|
| CSS dimensions | 175 x 262 px |
| Aspect ratio | ~2:3 |
| Render scale | 16x (deviceScaleFactor) |
| Output dimensions | 2800 x 4192 px |
| Output format | PNG (lossless) + JPG (quality 100, subsampling=0) |

---

## 5-Zone Grid

Every cover is a vertical stack of exactly 5 zones. Total = 262px.

| Zone | Height | Content | CSS align |
|------|--------|---------|-----------|
| 1. Pad | 24px | Empty breathing space | — |
| 2. Mark | 78px | Thread/book mark SVG, centered | center / center |
| 3. Title | 78px | Book title, serif, centered | center / center |
| 4. Subtitle | 50px | Subtitle, sans-serif, centered | flex-start / center |
| 5. Author | 32px | "Steven Rudolph", sans-serif, centered | center / center |

---

## Bookmark Tab

Position: **top-right corner**, absolute positioned.

| Property | Gateway | Depth | Instrument |
|----------|---------|-------|------------|
| Width | 8px | 14px | 18px |
| Height | 100px (all tiers) | 100px | 100px |
| Opacity | 0.6 | 1.0 | 1.0 |
| Color | Thread accent color | Thread accent color | Thread accent color |
| Border bottom | none | 2px solid rgba(255,255,255,0.12) | 2px solid rgba(255,255,255,0.12) |
| Border left | none | 1px solid rgba(255,255,255,0.06) | 1px solid rgba(255,255,255,0.06) |
| Label | none (hidden) | Vertical text, 4.8px | Vertical text, 5.2px |

### Thread Accent Colors (for bookmark)

| Thread | Accent |
|--------|--------|
| Renergence | `#4A6FFF` |
| Structure (HNR) | `#C466BB` |
| Alignment (MN) | `#FFB088` |
| Positioning (EM) | `#FF5A8A` |

---

## Background Color

Full-bleed, one solid thread color:

| Thread | Background |
|--------|-----------|
| Renergence | `#0D1164` (vibrant navy) |
| Structure (HNR) | `#640D5F` (vibrant maroon) |
| Alignment (MN) | `#F78D60` (vibrant orange) |
| Positioning (EM) | `#EA2264` (vibrant pink) |

---

## Mark (Zone 2)

SVG element, centered in zone-mark. Rendered inside `.struct-mark-container`.

| Property | Value |
|----------|-------|
| SVG size | 52 x 52 px (standard), height varies by mark |
| Container opacity | 0.80 |
| Stroke color | White, thread-specific opacity (see below) |
| Stroke width | 1.6 (default), 1.8 (heavy/HNR), 2.0 (MN) |

### Mark Stroke Colors (per thread)

| Thread | Stroke color |
|--------|-------------|
| Renergence | `rgba(255, 255, 255, 0.35)` |
| Structure (HNR) | `rgba(255, 255, 255, 0.35)` |
| Positioning (EM) | `rgba(255, 255, 255, 0.4)` |
| Alignment (MN) | `rgba(255, 255, 255, 0.5)` |

**Rule:** Gateway books use the thread mark. All other books get a unique book-specific mark (see `design-system/marks/MARKS.md`).

---

## Title (Zone 3)

| Property | Value |
|----------|-------|
| Font | Libre Baskerville, serif |
| Weight | 700 (bold) |
| Size | Variable — see table below |
| Line height | 1.2 |
| Letter spacing | 0.05em |
| Transform | uppercase |
| Alignment | centered |

### Title Color (per tier)

| Tier | Color |
|------|-------|
| Gateway | `rgba(255, 255, 255, 0.9)` |
| Depth / Instrument | `#ffffff` |

### Title Font Size by Line Count

The CSS default is 14.5px but **every title gets a per-book override** based on character count. Here are the rules:

| Lines | Characters (longest line) | Font size | Examples |
|-------|--------------------------|-----------|---------|
| 1 | 1–12 | 14.5px (default) | "Renergence" |
| 2 | 1–8 per line | 13–13.5px | "Multiple Natures", "On Witnessing" |
| 2 | 9–12 per line | 12–12.5px | "Heroes Not Required", "Built to Need You" |
| 2 | 13–18 per line | 10–11px | "How Did This Become My Job?" |
| 3 | 1–10 per line | 12–12.5px | "Why You Thrive Here and Not There" |
| 3 | 11+ per line | 10–11px | "What You Stopped Noticing" |

**Procedure:** Set font-size via inline `style` attribute on `.cover-title`. Start at the largest size for that line count, render, check it fits in the 78px zone with padding. Reduce by 0.5px increments until it fits without overflow.

---

## Subtitle (Zone 4)

| Property | Value |
|----------|-------|
| Font | IBM Plex Sans, sans-serif |
| Weight | 300 (light) |
| Size | 8.5px |
| Line height | 1.5 |
| Letter spacing | 0.015em |
| Alignment | centered, top of zone |

### Subtitle Color (per tier)

| Tier | Color |
|------|-------|
| Gateway | `rgba(255, 255, 255, 0.75)` |
| Depth / Instrument | `rgba(255, 255, 255, 0.85)` |

### Subtitle Line Breaks

| Lines | Rule |
|-------|------|
| 1 line | No `<br>`. Fits naturally. |
| 2 lines | Break at natural phrase boundary. Use `<br>` in HTML. |

**No subtitle should exceed 2 lines.** If it does, the subtitle is too long — edit it.

---

## Author (Zone 5)

| Property | Value |
|----------|-------|
| Font | IBM Plex Sans, sans-serif |
| Weight | 400 (regular) |
| Size | 5.5px |
| Letter spacing | 0.16em |
| Transform | uppercase |
| Alignment | centered |
| Color | `rgba(255, 255, 255, 0.7)` (all tiers) |
| Text | `Steven Rudolph` (always — never varies) |

---

## HTML Template Structure

Every cover HTML file follows this exact structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap">
<link rel="stylesheet" href="../sr-design-tokens.css">
<link rel="stylesheet" href="../sr-covers.css">
<title>{Book Title} — SR Cover</title>
<style>
  body { margin: 0; padding: 40px; background: var(--surface-page); display: flex; justify-content: center; align-items: center; min-height: 100vh; }
</style>
</head>
<body>
<div class="cover thread-{thread} tier-{tier}">
  <div class="bookmark bm-{tier} bm-{thread}">
    <span class="bookmark-label">{label or empty}</span>
  </div>
  <div class="zone-pad"></div>
  <div class="zone-mark">
    <div class="struct-mark-container">
      <!-- SVG mark here, inline, with class="struct-mark mark-{thread}" -->
    </div>
  </div>
  <div class="zone-title">
    <div class="cover-title" style="font-size:{N}px">{Title Line 1}<br>{Title Line 2}</div>
  </div>
  <div class="zone-subtitle">
    <div class="cover-subtitle">{Subtitle}</div>
  </div>
  <div class="zone-author">
    <div class="cover-author">Steven Rudolph</div>
  </div>
</div>
</body>
</html>
```

### Thread Class Names

| Thread | CSS class |
|--------|-----------|
| Renergence | `thread-renergence` / `bm-renergence` |
| Structure | `thread-hnr` / `bm-hnr` |
| Alignment | `thread-mn` / `bm-mn` |
| Positioning | `thread-engagement` / `bm-engagement` |

### Tier Class Names

| Tier | CSS class |
|------|-----------|
| Gateway | `tier-gateway` / `bm-gateway` |
| Depth | `tier-paid` / `bm-depth` |
| Instrument | `tier-paid` / `bm-instrument` |

---

## SVG Fallback (cover-orange-render.svg)

Each book also has an SVG render file in its `Covers/` directory. This is a **standalone SVG** that doesn't depend on CSS/HTML — useful for embedding in documents or quick previews. It must be kept in sync with the HTML template.

SVG files reference Google Fonts via `@import` in `<defs><style>`. Note: **cairosvg cannot load web fonts** — the SVG renders with fallback serif/sans. For correct font rendering, always use the HTML template + `render-cover.js`.

---

## Checklist: Creating a New Cover

1. Determine thread (`renergence` / `hnr` / `mn` / `engagement`)
2. Determine tier (`gateway` / `depth` / `instrument`)
3. Get or create the mark SVG (gateway = thread mark, others = book mark from `design-system/marks/`)
4. Count title lines and longest line → pick font-size from table
5. Copy nearest existing cover HTML template
6. Replace: thread class, tier class, mark SVG, title, subtitle, font-size
7. Author is always "Steven Rudolph" — do not change
8. Preview in browser: `open cover-{book}.html`
9. Render: `node render-cover.js cover-{book}.html --output /path/to/book/Covers/`
10. Verify: output is 2800x4192, JPG is 500KB+, fonts are Libre Baskerville/IBM Plex Sans, bookmark is on right side

---

## Square Thumbnail & Publishing

Thumbnail spec, Gumroad product setup, and content file requirements have moved to:
**`books/PUBLISHING-SPEC.md`**

Thumbnail renderer remains here: `render-thumbnail.js`

---

## Common Mistakes (Do Not Repeat)

| Mistake | Fix |
|---------|-----|
| Using cairosvg to render — fonts fall back to system serif | Always use render-cover.js (Puppeteer + Chrome) |
| Chrome headless `--screenshot` captures whole page, not cover element | render-cover.js uses element screenshot on `.cover` |
| Chrome headless with `file://` and no wait — fonts don't load | render-cover.js uses `networkidle0` + `document.fonts.ready` |
| PNG file size "too small" (50–150KB) | This is normal for flat-color designs. JPG at quality=100 subsampling=0 produces 500KB+. PNG compression is efficient — size ≠ quality. |
| Bookmark on wrong side | CSS has `right: 0`. SVG must use `x="167"` (175 - 8). |
| Title font-size too small | Check the font-size table above. Don't use the CSS default (14.5px) for multi-line titles — it will overflow. |
| Wrong subtitle text | Always check `canon-docs/EXPLORATION.md` for the locked subtitle. |
| Thumbnail mistakes | See `books/PUBLISHING-SPEC.md` — thumbnail spec lives there now |
