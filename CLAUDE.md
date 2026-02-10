# Xavigate Governance

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
- Renergence: 3 books on depletion patterns
- Structure (HNR): 4 books on structural patterns
- Alignment (MN): 5 books by topic & profession
- Positioning (Engagement Map): 2 books on practice & witnessing

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
- "Gateway" (use "Free" for reader-facing badges)
- "Depth" (remove badge, use status tags instead)
- "Instruments" (use "Practitioner" for reader-facing badges)

**Visitor-facing terms:**
- "areas" (not "threads")
- Use area names or book titles as appropriate
- Layer badges: "Free" / "Practitioner" (NOT "Gateway" / "Instruments")
- No badge needed for depth books - status tags handle it

---

## AI Policy

**Positioning line:** "AI is optional. The work is not."

**Where it appears:**
- How It Works page (in body content)
- Footer tagline on all pages

**Terms page covers:**
- Personal AI use (allowed for summarization, analysis)
- AI training (prohibited)
- RAG/embedding (prohibited without permission)
- Commercial use (requires licensing)

---

## Move Catalog Terminology

**CRITICAL: "Move Catalog" NOT "Move Library"**

### Canonical Term

**Move Catalog** (always capitalized when referring to the product)

**Deprecated/Prohibited:**
- ✗ Move Library
- ✗ Move Set
- ✗ Move Repository
- ✗ Move Toolkit
- ✗ Move Framework
- ✗ Move Playbook

### What It Is

**Formal definition:**
The Move Catalog is the complete, indexed collection of structural moves prescribed by the HNR framework, organized by pattern and move family, accessed exclusively through diagnostic routing—never by browsing.

**One-sentence description (for copy, UI, inline reference):**
A complete, indexed collection of structural moves selected by diagnosis, not exploration.

**Current scope:**
- 57 structural interventions (current count)
- Organized across 4 pattern books (BT, BTNY, INTC, HDTBMJ)
- 16 move families
- Accessed via Heroic Load Audit diagnostic routing

### Product Structure

**Thread-specific catalogs:**
- Structure Move Catalog: $497 (one-time)
- Alignment Move Catalog: $497 (one-time)
- Positioning Move Catalog: $497 (one-time)
- Renergence Move Catalog: $497 (one-time)

**Complete catalog:**
- Complete Move Catalog (or "Full Move Catalog"): $1,497 (one-time)
- Includes all areas, all books, all tools, all assessments

### Permitted Access Language

**Always use diagnostic-first framing:**
- ✓ "The Audit routes you to your Move Catalog section"
- ✓ "Access the Move Catalog through diagnostic results"
- ✓ "Your diagnostic output maps to Move Catalog section [X]"
- ✓ "Locate your move in the Move Catalog"
- ✓ "The Move Catalog entry for [move name] specifies..."
- ✓ "Select the prescribed move from the Move Catalog"

**Prohibited - never imply browsing or exploration:**
- ✗ "Browse the Move Catalog"
- ✗ "Explore the Move Catalog"
- ✗ "Choose from the Move Catalog"
- ✗ "Try moves from the Move Catalog"
- ✗ "The Move Catalog offers options"
- ✗ "Discover interventions"

### Where It Appears

**Website pages:**
- pricing.html - practitioner licensing tiers
- training.html - tools & access overview
- practitioners.html - professional licensing context
- books/structure.html - "Apply it" practitioner section
- how-it-works.html - workflow and operational sequence

**Definition boxes required on:**
- pricing.html (explain Move Catalog vs individual books)
- books/structure.html (explain diagnostic-first access)
- Any page where first introduced

**Design system files:**
- move-catalog-list.svg (icon)
- cover-move-catalog.html (book cover template)

### Key Distinction

**Move Catalog ≠ Individual Books**

Individual books are purchased/read independently. The Move Catalog is the complete practitioner reference system that includes all books, tools, and diagnostic instruments organized for professional use.

Readers buy books. Practitioners license the Move Catalog.
