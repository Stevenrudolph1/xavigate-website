# Renergence Website Governance

## Deployment

This repo deploys to DigitalOcean App Platform at `renergence.com`
- Auto-deploys from GitHub on push
- This site is for **books, pricing, about, training** — static content
- **Diagnostic/encounter UI does NOT go here** — it lives on `mcp.xavigate.com` (separate server, separate repo: `xavigate-mcp/`)

---



## CRITICAL: Area Names vs Book Titles

**This distinction is non-negotiable. Get it wrong and the site rots.**

### Area Names (SHORT - use in navigation, tables, categorization):
1. **Renergence**
2. **Structure** (not "Heroes Not Required")
3. **Alignment** (not "Multiple Natures")
4. **Positioning** (not "Engagement Map" or "The Engagement Map")

### Book Titles (FULL - use when referring to specific books):
1. **Renergence** (book title same as area name)
2. **Heroes Not Required** (HNR)
3. **Multiple Natures** (MN)
4. **The Engagement Map**

### When to Use Which:

**Use AREA NAMES (short):**
- Navigation links (footer, header)
- Table headers and categorization
- "How These Areas Relate" type sections
- When discussing the system/framework organizationally
- CSS classes and IDs can use either, but be consistent

**Use BOOK TITLES (full):**
- h2/h3 headings in book detail sections
- When saying "Read *Heroes Not Required*"
- Book covers and metadata
- When referring to the specific published work
- In prose describing the books

### Examples:

**CORRECT:**
- Footer link: "Structure" → links to #thread-hnr
- Table header: "Alignment" (column header)
- Section text: "**Structure** prescribes structural moves..."
- Book section heading: `<h2>Heroes Not Required</h2>`
- Cover title: "Heroes Not Required"

**WRONG:**
- Footer link: "Heroes Not Required" (too long, wrong context)
- Table header: "Multiple Natures" (should be "Alignment")
- Section text: "**Heroes Not Required** prescribes..." (should be "**Structure**")

---

## Thread Order

**Correct order everywhere:**
1. Renergence
2. Structure (HNR)
3. Alignment (MN)
4. Positioning (Engagement Map)

**NOT:** Ren → HNR → Positioning → Alignment
**NOT:** Ren → HNR → Alignment → Positioning (but Alignment and Positioning swapped)

---

## Design System Colors

From `sr-design-system/sr-design-tokens.css`:

```css
--thread-renergence: #0D1164;    /* vibrant navy */
--thread-hnr: #640D5F;           /* vibrant maroon */
--thread-mn: #F78D60;            /* vibrant orange */
--thread-engagement: #EA2264;    /* vibrant pink */
```

Use these variables in CSS, not hard-coded hex values.

---

## Recognition Hooks (thread-question text)

**Current correct versions:**
- Renergence: "Has something that once worked become quietly expensive to maintain?"
- Structure: "Does everything depend on you?"
- Alignment: "Are you competent at what you do, but quietly drained by it?"
- Positioning: "Do you keep responding without having seen what's happening?"

---

## Content Depth Counts

**Gateway books:** 4 (one per area - all free)
**Depth books:**
- Renergence: 0 published (3 planned — see ~/Projects/books/FUTURE_BOOKS_REFERENCE.md)
- Structure (HNR): 0 published (4 planned — see ~/Projects/books/FUTURE_BOOKS_REFERENCE.md)
- Alignment (MN): 5 books by topic & profession
- Positioning (Engagement Map): 2 books on practice & witnessing
**Total available:** 11 (4 free + 7 depth)

---

## Real vs Aspirational

**Rule: Only list real products or confirmed-at-launch products.**
- No "coming soon" sections
- No "planned" without clear launch date
- Use status tags: "Available" or "Available at launch" only
- If it doesn't exist or isn't confirmed for launch, it doesn't go on the site

---

## Language Cleanup

**Governance terms (internal use only - NOT visitor-facing):**
- "thread" (use "area" in visible text)
- "epistemic"
- "load-bearing"
- "imprint"
- "Gateway" — NEVER use publicly. Use "Free" for badges, "free books" in prose. Internal architecture term only.
- "Depth" (remove badge, use status tags instead)
- "Instruments" (use "Practitioner" for reader-facing badges)

**Visitor-facing terms:**
- "areas" (not "threads")
- Use area names or book titles as appropriate
- Layer badges: "Free" / "Practitioner" (NOT "Gateway" / "Instruments")
- No badge needed for depth books - status tags handle it

---

## AI Policy

**Where it appears:**
- Footer tagline on all pages (if applicable)

**Terms page covers:**
- Personal AI use (allowed for summarization, analysis)
- AI training (prohibited)
- RAG/embedding (prohibited without permission)
- Commercial use (requires licensing)

---

## Product Terminology

**Governed by:** `planning/governance/terminology/TERM-001-products-not-catalog.md`

**Top-level nav:** "Products" (not Books, not Move Catalog, not Resources)
**Main products page:** `products.html` (renamed from books.html)
**Permitted sub-terms:** Books, Courses, Tools, Training, Diagnostic Tools
**Prohibited terms on public surfaces:** Move Catalog, Move Library, Move System, Resources, Solutions, Offerings
