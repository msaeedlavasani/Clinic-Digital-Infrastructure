# Color & Theming

**Class:** CANONICAL
**Change process:** Role additions = rationale-documented edit; theme-family changes = variant admission (`CONTROLLED-VARIATION.md` §3).

---

## 1. Semantic color architecture

Components consume **semantic color roles** — never raw hex/named colors. Roles (token structure: `DESIGN-TOKENS.md` §11):

### Backgrounds
`canvas` (page) · `surface` (resting content) · `surface-subtle` (tonal grouping) · `surface-strong` (inverted/strong sections) · `surface-inverse`

### Text
`text-primary` · `text-secondary` · `text-muted` · `text-inverse`

### Borders
`border-subtle` · `border-default` · `border-strong`

### Actions
`action-primary`/`-hover`/`-active` · `action-secondary`/`-hover`/`-active`

### Feedback
`success` · `warning` · `danger` · `information` (each with a `-surface` background pairing)

### Brand expression
`brand-primary` · `brand-secondary` · `accent`

### Focus
`focus-ring` — always-visible focus indicator; floor independent of theme.

## 2. Theme mapping contract

A clinic theme is a **mapping into the semantic role set** (plus imagery/variants — §4). Contract:

1. **Only semantic tier and below.** Themes map onto roles; they never override component internals (`DESIGN-SYSTEM-CONSTITUTION.md` §4 canonical rule).
2. **Contrast is a validity condition.** Every mapping must satisfy WCAG 2.1 AA for its role pairings: text-on-surface ≥ 4.5:1 (large text ≥ 3:1), action labels ≥ 4.5:1, focus indicators ≥ 3:1 against adjacent surfaces, non-text UI boundaries where meaning depends on them. **A theme that cannot satisfy contrast is an invalid theme** — not a configuration option.
3. **Full coverage.** Every role must be mapped; no "unstyled" roles.
4. **Feedback colors are functional, not decorative** — `danger` is not a brand color; feedback semantics stay recognizable across themes.
5. **Brand vs action decoupling.** `brand-primary` is expressive (surfaces, moments); `action-primary` is functional (CTAs). They may be related, but a theme may keep them distinct — the CTA stays the CTA in every locale and theme.
6. **One theme per clinic across locales.** A single Clinic Theme works across all supported locales; themes are never the mechanism for RTL/LTR (`PLATFORM-BOUNDARIES.md` §3).

## 3. Theme families (v0.1 conceptual directions)

Three initial families for validation — **conceptual directions, not hard-coded templates** (values, imagery, and surface behavior are expressed at visual prototyping):

### PEARL — calm · premium · natural · clinical
Warm ivory canvas; charcoal text; mineral tones; restrained sage as action/brand.
Surfaces: warm, quietly tonal; borders hairline-minimal; shadows nearly absent.
Photography: natural, warm-graded, people-forward.

### MINERAL — modern · medical · architectural · precise
Clean neutral canvas; slate text; deep teal brand/action; sand as subtle brand-secondary/accent.
Surfaces: cooler, flatter, architectural; more hairline borders than PEARL; elevation restrained.
Photography: crisp, controlled, technology/equipment-forward, cool-graded.

### OBSIDIAN — editorial · premium · dramatic · controlled
Bone canvas; graphite text; **restrained warm accent** (single warm accent role carries expression; large drama comes from typographic scale and dark editorial surfaces, not saturated fields).
Surfaces: higher tonal contrast; dark `surface-strong` sections for editorial moments; minimal hairlines.
Photography: high-contrast editorial, dramatic light, texture-forward.

**Not color swaps.** The families differ in: surface behavior (warm-tonal / flat-architectural / dark-editorial), border/elevation balance (near-zero hairline / hairline-led / tonal-contrast-led), photography grading (warm-natural / cool-controlled / dramatic-editorial), and compositional emphasis (calm premium / precise medical / editorial dramatic). All three satisfy the same UX contracts (§2) and the same component architecture — that is the point of *Stable System + Controlled Expression*.

## 4. Beyond color: theme-expression surfaces

A theme family may also vary (documented with the family):

- **Photography direction** (grading, subject emphasis) — `PHOTOGRAPHY.md` categories per family;
- **Surface behavior** — how surfaces group, tone, and transition;
- **Composition emphasis / density** — Section Emphasis axis (`CONTROLLED-VARIATION.md` §2);
- **Radius expression** — e.g. PEARL may license slightly softer radii than OBSIDIAN's near-sharp editorial blocks, within the radius system (`DESIGN-TOKENS.md` §5).

Variation stays inside the token/variant system; none of this overrides component internals.

## 5. Adding themes / clinics

- A **new clinic** = a theme mapping within an approved family (or a newly admitted family via §3's admission route).
- A **new family** = variant admission (reusable need, contrast-valid, axis-consistent, not one clinic's arbitrary preference).
- Reference Clinic directions: `CONTROLLED-VARIATION.md` §6 — reference-clinic aesthetics never become Core rules.
