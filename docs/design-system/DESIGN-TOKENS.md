# Design Token Specification v0.1

**Class:** CANONICAL (naming system and structure); token *values* are v0.1 recommended initial scales, refinable through design validation without ADR.
**Implementation-independence:** tokens are described conceptually — no framework-specific token code is generated here.

---

## 1. Token model

Three tiers:

```text
Primitive        raw, context-free values        space-100, font-size-200, radius-200, blue-600
Semantic         role-named references           surface, text-primary, action-primary, border-subtle
Component (opt)  component-scoped references     button-padding-x, input-height   ← used sparingly
```

Clinic themes map at the **semantic tier and below** (`CONTROLLED-VARIATION.md` §4). Primitives are shared CDI Core and never clinic-branded.

## 2. Naming convention

```text
<category>-<scale>          primitives        space-200, radius-300, duration-200
<role>[-<variant>]          semantic          surface-elevated, text-muted, action-primary-hover
```

Categories: `space` · `size` · `font-size` · `font-weight` · `line-height` · `radius` · `border` · `elevation` · `duration` · `easing` · `breakpoint` · `container` · `layer` · colors by role name (semantic tier only). The canonical semantic color roles and per-world literal mappings are maintained in `COLOR-THEMING.md` and `VISUAL-WORLDS.md`.

## 3. Spacing (base-4 conceptual scale)

| Token | Value | Intended use |
|---|---|---|
| `space-50` | 4 | hairline offsets, icon gaps |
| `space-100` | 8 | intra-component micro spacing |
| `space-200` | 12 | compact component spacing |
| `space-300` | 16 | default component spacing |
| `space-400` | 24 | form field spacing, card padding |
| `space-500` | 32 | intra-section group spacing |
| `space-600` | 48 | card/pattern separation |
| `space-700` | 64 | standard section spacing (mobile) |
| `space-800` | 96 | section rhythm (desktop) |
| `space-900` | 128 | major editorial whitespace |
| `space-1000` | 160+ | hero/flagship editorial air |

**Two distinct rhythms (canonical distinction):** *component spacing* lives in `space-50…500`; *page/section rhythm* lives in `space-600…1000`. CDI pages breathe — sections are separated generously; components stay compact. Responsive behavior in `LAYOUT-RESPONSIVE.md` §5.

### 3A. Semantic spacing relationships (added DESIGN-SYSTEM-VNEXT-01)

Primitives answer **"how much"**; semantic spacing answers **"between what"**. A semantic relationship token names a recurring spatial relationship and resolves (per context/world) to a primitive — it never introduces a new raw value. Component/page implementations consume these named relationships wherever the relationship recurs; unexplained local spacing values are violations (`DESIGN-QA.md` SPACE-01). A unique composition may use a deliberate one-off value only when its composition contract explains it in one sentence (`COMPOSITION-CONTRACTS.md` §6).

| Relationship token | The relationship it names |
|---|---|
| `space-page-inline` | viewport/safe-area → page content (the inline gutter of the whole page) |
| `space-stage-block` | stage boundary → stage content (a full stage's internal block padding) |
| `space-section` | one section → the next major section (page rhythm) |
| `space-scene` | scene boundary → scene content inside a cinematic stage (`SIGNATURE-PATTERNS.md` §16) |
| `space-content-group` | heading/lead → the content group it introduces |
| `space-copy` | paragraph ↔ paragraph within one copy block |
| `space-media-copy` | media field ↔ its adjacent/copy region (media–text relationship) |
| `space-action` | content/decision → its action system, and within the action system (`COMPOSITION-CONTRACTS.md` §4) |
| `space-control` | label ↔ control, control ↔ control inside one form/cluster |
| `space-safe-action` | action system → safe-area boundary (touch contexts; never zero — `PRESENTATION-CONTEXTS.md` §4.1) |

Mapping discipline: each token has one mapping per presentation context class (e.g. `space-page-inline` mobile vs desktop), declared in implementation tokens — not re-derived per component.

## 4. Typography scale

Semantic roles with v0.1 desktop reference values (fluid/responsive behavior: `TYPOGRAPHY.md` §3):

| Role | Size range | Weight (fa) | Line-height |
|---|---|---|---|
| Display | 40–72 | 700–800 | tight (≈1.15) |
| H1 | 32–48 | 700 | ≈1.2 |
| H2 | 26–36 | 700 | ≈1.25 |
| H3 | 21–28 | 600 | ≈1.35 |
| Title | 17–22 | 600 | ≈1.45 |
| Body Large | 17–19 | 400 | ≈1.8 |
| Body | 15–17 | 400 | ≈1.8 |
| Small | 13–15 | 400 | ≈1.6 |
| Caption | 12–13 | 400 | ≈1.5 |
| Label | 13–15 | 500–600 | ≈1.4 |

Persian line-heights are set for Persian metrics, **not** Latin ratios (`TYPOGRAPHY.md` §4). Role list supersedes the Foundation's 9-role list: `Small` is added between Body and Caption (site chrome needs it); no other role changed.

## 5. Radius

| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0 | editorial blocks, evidence surfaces |
| `radius-small` | 4–6 | inputs, chips, small controls |
| `radius-medium` | 8–12 | cards where containment is functional |
| `radius-large` | 16–20 | large media blocks where justified |
| `radius-expressive` | 24+ | rare, theme-expressive surfaces |
| `radius-pill` | 999 | pills/tags; buttons only when theme justifies |

**Principle (canonical):** avoid universal rounded-card aesthetics; not every section is a card — **whitespace and typography may establish grouping without a container**. Default is `none`–`small`; radius escalates only when containment is functional or theme-expressive.

## 6. Border

| Token | Value |
|---|---|
| `border-subtle` | 1px, lowest-emphasis role color |
| `border-default` | 1px, standard role color |
| `border-strong` | 1–2px, emphasis role color |

Borders are hairlines by default; tonal separation and whitespace precede borders (`elevation` below).

## 7. Elevation / surfaces

| Level | Meaning | Expression |
|---|---|---|
| `elevation-canvas` | page background | none |
| `elevation-surface` | resting content | tonal shift and/or `border-subtle` |
| `elevation-elevated` | floating/hover/overlay | soft, small shadow |
| `elevation-overlay` | drawer/dialog/scrim | stronger shadow + scrim |

**Order of preference (canonical):** whitespace → tonal separation → subtle border → shadow. Strong elevation only when interaction hierarchy genuinely requires it; decorative shadow stacking is an anti-pattern (`DESIGN-SYSTEM-CONSTITUTION.md` §3).

## 8. Motion

| Token | Value | Use |
|---|---|---|
| `duration-fast` | 120–160ms | micro-feedback (hover, press) |
| `duration-standard` | 200–300ms | component transitions (drawer, disclosure) |
| `duration-slow` | 400–600ms | editorial/section reveals |
| `easing-standard` | ease-out family | entrances, UI transitions |
| `easing-emphasized` | gentle in-out | editorial movement |

Rules in `MOTION-ICONOGRAPHY.md`; `prefers-reduced-motion` is mandatory, not optional.

## 9. Breakpoints & containers

| Token | Conceptual value | Class |
|---|---|---|
| `breakpoint-xs` | ~360 | narrow mobile |
| `breakpoint-sm` | ~480 | large mobile |
| `breakpoint-md` | ~768 | tablet |
| `breakpoint-lg` | ~1024 | desktop |
| `breakpoint-xl` | ~1440 | large desktop |

Values are v0.1 starting points (`LAYOUT-RESPONSIVE.md` §6 owns the classes; exact device binding stays fluid).

| Token | Behavior |
|---|---|
| `container-default` | main content; caps at ~1200–1320 |
| `container-text` | readable measure; caps at ~640–720 |
| `container-editorial` | wide editorial/media; caps at ~1440 |
| `container-full` | full-bleed |

`container-text` is the body-copy contract everywhere, in every locale (`TYPOGRAPHY.md` §5).

## 10. Layering / z-index

| Token | Use |
|---|---|
| `layer-base` | document flow |
| `layer-raised` | sticky in-flow elements (e.g. section headers) |
| `layer-header` | site header |
| `layer-overlay` | drawer/dialog scrims |
| `layer-modal` | drawer/dialog content |
| `layer-toast` | transient feedback |
| `layer-skip` | skip links (always on top) |

Named layers, not raw integers; no arbitrary z-index values in components.

## 11. Semantic color roles

Roles (never raw color names at component level); full definitions and theme mapping: `COLOR-THEMING.md`.

**Backgrounds:** `canvas` · `surface` · `surface-subtle` · `surface-strong` · `surface-inverse`
**Text:** `text-primary` · `text-secondary` · `text-muted` · `text-inverse`
**Borders:** `border-subtle` · `border-default` · `border-strong`
**Actions:** `action-primary` (+`-hover`, `-active`) · `action-secondary` (+`-hover`, `-active`)
**Feedback:** `success` · `warning` · `danger` · `information` (each with a `-surface` pairing for backgrounds)
**Brand expression:** `brand-primary` · `brand-secondary` · `accent`
**Focus:** `focus-ring` — always visible, theme-independent floor (AA-contrast against adjacent surfaces).

**Accessibility floor (canonical):** every theme mapping must satisfy WCAG 2.1 AA contrast for its role pairings (text-on-surface, action labels, focus visibility) — a theme that cannot satisfy contrast is an invalid theme, not a config option.

## 12. What v0.1 does not decide

- Literal color values for any theme family (defined conceptually in `COLOR-THEMING.md`; hex/oklch values are produced at visual prototyping).
- Font files/subsetting strategy (implementation-time, `PERFORMANCE-PRINCIPLES.md`).
- Component-scoped tokens beyond the pattern shown in §1 (added only when a real component needs one).
