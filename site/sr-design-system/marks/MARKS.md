# Element Mark System

The mark system provides geometric identifiers for each Renergence thread and book. Marks are structural — they encode the conceptual logic of their domain, not decoration.

---

## Thread Marks (Canonical)

Each thread has exactly one canonical mark. These are **locked geometry** — coordinates, proportions, and stroke weights do not change. Color and opacity are context-dependent.

| Thread | File | Geometry | ViewBox |
|--------|------|----------|---------|
| Renergence | `thread/renergence-cycle.svg` | Two arcs with directional arrows — the return cycle | 0 0 50 50 |
| Structure | `thread/structure-tree.svg` | Single node splitting to three branches — load distribution | 0 0 50 42 |
| Alignment | `thread/alignment-spectrum.svg` | Five horizontal bars of varying length — the nature spectrum | 0 0 50 50 |
| Positioning | `thread/positioning-crosshair.svg` | Interrupted crosshair with side dots — where attending breaks | 0 0 50 50 |

### Locked Values (Alignment example — all thread marks follow the same principle)

```
x=10 start. Endpoints: 42, 28, 38, 20, 34. Y intervals: 9px. Stroke: 2.0.
THIS NEVER CHANGES.
```

Each thread mark SVG contains an inline comment specifying its locked coordinates. Do not modify these values.

---

## Book Marks

Book-level marks appear on individual book covers. Each is unique to its title but inherits its thread's color class.

| Thread | Book | File | Geometry |
|--------|------|------|----------|
| Structure | Heroes Not Required (gateway) | Uses thread mark | Tree — same as `thread/structure-tree.svg` |
| Structure | The Bottleneck Trap | `book/hnr-bottleneck-convergence.svg` | Four lines converging to center point |
| Structure | Built to Need You | `book/hnr-btny-radial.svg` | Center circle radiating to locked corner nodes |
| Structure | How Did This Become My Job? | `book/hnr-hdtbmj-scope.svg` | Nested rectangles with outward arrows |
| Structure | It's Not That Complicated | `book/hnr-intc-layers.svg` | Real layers + fake layers with X marks |
| Structure | The Heroic Load Audit | `book/hnr-audit-grid.svg` | 3x3 grid — systematic examination |
| Structure | The Move Catalog | `book/hnr-move-catalog-list.svg` | Numbered list items with content lines |
| Alignment | Why You Thrive (gateway) | Uses thread mark | Spectrum bars — same as `thread/alignment-spectrum.svg` |
| Alignment | Multiple Natures | Uses thread mark | Spectrum bars — same as `thread/alignment-spectrum.svg` |
| Alignment | MN for Educators | Uses thread mark | Spectrum bars — same as `thread/alignment-spectrum.svg` |
| Alignment | MN for Counselors | Uses thread mark | Spectrum bars — same as `thread/alignment-spectrum.svg` |
| Alignment | MN for Practitioners | Uses thread mark | Spectrum bars — same as `thread/alignment-spectrum.svg` |
| Positioning | What You Stopped Noticing (gateway) | Uses thread mark | Interrupted crosshair — same as `thread/positioning-crosshair.svg` |
| Positioning | The Engagement Map | Inline only | Full crosshair with vertical segments and side dots |
| Positioning | When We Stop Seeing People | Inline only | Circle with 3 horizontal lines |
| Positioning | On Witnessing | Inline only | Circle with center dot and vertical line |
| Renergence | Renergence (gateway) | Uses thread mark | Cycle arrows — same as `thread/renergence-cycle.svg` |
| Renergence | Renergence Framework | Inline only | 3 converging lines with thread-colored dots |

**Note:** All MN-thread books currently share the thread mark (spectrum bars). Structure books each have unique marks. Positioning book marks exist only inline in cover HTML files — no standalone SVGs yet.

---

## Usage Contexts

Marks appear in multiple contexts with different color/opacity rules:

| Context | Color Source | Opacity | Size | CSS |
|---------|-------------|---------|------|-----|
| Book cover | `mark-{thread}` CSS class | `--mark-opacity` (0.80) | 52x52 | `.struct-mark-container` |
| Nav index | `var(--thread-{name})` inline | 1.0 | 28x28 | `.area-index-mark` |
| Page header | `rgba(255,255,255,0.35)` inline | 0.65 | varies | `.page-header__marks` |
| Panel background | `var(--thread-{name})` inline | 0.04 | 400-550px | `.panel-bg-mark` |
| Section divider | `var(--thread-renergence)` inline | 1.0 | 32x32 | `.section-divider-mark` |

### Color Rules

- **On covers:** Marks use CSS classes (`mark-hnr`, `mark-mn`, `mark-engagement`, `mark-renergence`) which resolve to token values. These are light tints designed for contrast against vibrant thread backgrounds.
- **In nav/UI:** Marks use full thread color at full opacity.
- **As backgrounds:** Marks use thread color at very low opacity (0.04) for environmental texture.
- **In page headers:** Marks use white at low opacity against the dark gradient background.

### Implementation

Marks are always **inlined as SVG** in HTML — never referenced as `<img>` or `<use>` elements. The SVG files in this directory are canonical references, not linked assets.

---

## File Naming Convention

- **Thread marks:** `thread/{thread-name}-{geometry-noun}.svg`
- **Book marks:** `book/{thread-abbrev}-{geometry-noun}.svg`
- Thread abbreviations: `hnr` (Structure), `mn` (Alignment), `em` (Positioning), `ren` (Renergence)

---

## What's Missing

- Positioning book marks (Engagement Map, When We Stop Seeing People, On Witnessing) exist only inline in cover HTML — no standalone SVG reference files yet
- No book-specific marks for MN titles beyond the shared thread mark — all MN books use spectrum bars
- Renergence Framework mark exists only inline — no standalone SVG

---

## Change Policy

- Thread mark geometry is **locked**. Do not modify coordinates, proportions, or stroke weights.
- Book mark geometry is **stable** — changes require reviewing all cover HTML files that use the mark.
- New marks may be created for new books. Follow the naming convention and add to this manifest.
- Color/opacity values are contextual and governed by CSS tokens, not by the SVG files themselves.
