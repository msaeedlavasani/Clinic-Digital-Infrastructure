# Visual Worlds

**Class:** CANONICAL
**Change process:** New worlds require a reusable need and Design System validation. Literal semantic mappings are recorded here and implemented by the registry in `src/design-system/tokens/visual-worlds.json`.

---

## 1. Concept

A **Visual World** is a clinic-selectable, complete art-direction environment — palette, materiality, lighting, photographic grading, contrast strategy, and controlled motion expression — mapped into the Experience DNA (`EXPERIENCE-DIRECTION.md` §3). Worlds are **not separate applications, not dark/light "modes", and not mere color swaps**: each is a coherent spatial/material language, and all must sustain the same components, UX contracts, and accessibility floors.

**Critical canonical rule: Luxury is not dark mode.** Dark/bronze imagery from visual research was *one expression only*. CDI's architecture treats **dark and light worlds as equally first-class**. If only the dark expression feels luxurious, the Design System proof has failed (see `PROTOTYPE-02-ACCEPTANCE.md` §D).

## 2. Initial canonical validation set (four directions)

### DARK CINEMATIC
Immersive · modern · premium. Near-black and charcoal foundations; warm restrained metallic/gold expression; high-contrast editorial typography; cinematic depth; controlled luminous accents. Preserve editorial restraint, skin/media compatibility, and medical credibility. Gold is accent authority, not a default control color.

### LUMINOUS LUXURY
Elegant · refined · radiant. Warm ivory/cream foundations; restrained champagne/taupe expression; soft luminous surfaces; dark editorial typography; quiet luxury rather than decorative glamour. Light remains spatial and tonal, not visually empty or generic.

### CLINICAL ARCHITECTURAL
Clean · structured · trustworthy. Cool white and very pale blue foundations; deep navy typography; precise blue/cyan expression; architectural clarity; premium clinical authority without hospital sterility.

### NATURAL PRESTIGE
Organic · warm · sophisticated. Warm stone/ivory foundations; deep botanical green expression; natural material warmth; refined editorial typography; prestige rather than rustic wellness styling.

These four worlds are the **initial canonical validation set**, not a platform limit. The registry supports N worlds. A fifth or later world requires complete semantic mappings and Design System validation; it must not require component, route, clinic, or geometry forks.

## 3. What a World specification contains

Each world is specified as a complete mapping over:

- **Palette:** complete semantic-role mapping (`COLOR-THEMING.md` §2 contract — AA contrast as validity condition, full coverage, feedback colors functional, brand/action decoupling).
- **Materiality & lighting:** surface behavior, depth/lighting logic, image treatment and grading direction.
- **Contrast strategy:** how dark/light surfaces interleave across the scroll journey (continuity contract).
- **Typography expression:** weights/scales within the fixed type system.
- **Motion expression:** world-appropriate choreography within the amended motion contract (`EXPERIENCE-DIRECTION.md` §4).
- **Photography direction:** grading/subject emphasis per `PHOTOGRAPHY.md` categories.

## 4. Production semantic color mappings

The Owner approved the four directions above. The literal mappings below are implementation-derived values for the initial validation set; they are not copied from concept-board pixels. Role meanings remain stable while values vary by world. The JSON registry is consumed by shared components through semantic CSS variables. Keep this table aligned with the registry.

| Semantic role | Dark Cinematic | Luminous Luxury | Clinical Architectural | Natural Prestige | Intended pairing / validation |
|---|---|---|---|---|---|
| `canvas` | #111315 | #F7F3EA | #F3F7FA | #F3F0E7 | Page background; no text pairing. |
| `surface` | #1B1E22 | #FFFCF6 | #FFFFFF | #FCFAF4 | Resting content surface; text role checks apply. |
| `surfaceSubtle` | #202429 | #EEE7DA | #E8F0F5 | #EAE4D8 | Tonal grouping surface; text role checks apply. |
| `surfaceStrong` | #090B0D | #2D2924 | #12334D | #263F31 | Strong/inverted section; pair with textInverse at ≥4.5:1. |
| `surfaceInverse` | #F3EFE7 | #241F1B | #10283A | #1D2D24 | Alternate/inverse surface; validate actual text pairing before use. |
| `surfaceElevated` | #25292E | #FFFDFC | #FFFFFF | #FFFDF7 | Raised surface; primary, secondary, and muted text ≥4.5:1. |
| `textPrimary` | #F6F3ED | #29251F | #162B3A | #272F28 | Canvas, surface, and elevated surface ≥4.5:1. |
| `textSecondary` | #D6D1C8 | #554E45 | #40596B | #48554B | Canvas, surface, and elevated surface ≥4.5:1. |
| `textMuted` | #B1ACA3 | #655D53 | #506779 | #5D685F | Canvas, surface, and elevated surface ≥4.5:1. |
| `textInverse` | #F6F3ED | #FFF9F0 | #F7FAFC | #F6F3E9 | surfaceStrong ≥4.5:1. |
| `borderSubtle` | #484D52 | #DED5C7 | #D6E1E8 | #DED8CA | Decorative/tonal only; not the sole meaningful UI boundary. |
| `borderDefault` | #737A80 | #8A7D6B | #718697 | #817B70 | Canvas, surface, elevated surface ≥3:1 when boundary is meaningful. |
| `borderStrong` | #92979C | #8F8371 | #71899A | #7E897D | Canvas, surface, elevated surface ≥3:1 when boundary is meaningful. |
| `actionPrimary` | #D8B778 | #5B4634 | #155D91 | #365B43 | Action fill; actionPrimaryText ≥4.5:1 in default, hover, and active states. |
| `actionPrimaryText` | #1B160E | #FFFCF6 | #FFFFFF | #FFFFFF | Action-primary default/hover/active fills ≥4.5:1. |
| `actionPrimaryHover` | #E5C891 | #4D392B | #104E7B | #2D4C38 | Action fill; actionPrimaryText ≥4.5:1. |
| `actionPrimaryActive` | #C7A360 | #3E2D21 | #0C3F64 | #233D2D | Action fill; actionPrimaryText ≥4.5:1. |
| `actionSecondary` | #2B3035 | #E9E0D3 | #E4EEF4 | #E4EBDD | Action fill; actionSecondaryText ≥4.5:1 in default, hover, and active states. |
| `actionSecondaryText` | #F6F3ED | #382F25 | #183E59 | #2A3D30 | Action-secondary default/hover/active fills ≥4.5:1. |
| `actionSecondaryHover` | #363C42 | #DED2C1 | #D7E6EF | #D8E3D2 | Action fill; actionSecondaryText ≥4.5:1. |
| `actionSecondaryActive` | #424950 | #D1C3AE | #C9DCE8 | #CBD8C4 | Action fill; actionSecondaryText ≥4.5:1. |
| `focusRingLight` | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | Outer/inner dual ring; at least one ring ≥3:1 against adjacent surface. |
| `focusRingDark` | #172332 | #172332 | #172332 | #172332 | Outer/inner dual ring; at least one ring ≥3:1 against adjacent surface. |
| `success` | #8BE0AA | #1B6945 | #176442 | #1B6945 | successSurface pairing ≥4.5:1. |
| `successSurface` | #173225 | #E3F3E9 | #E3F3EA | #E3F3E9 | Pair with success text ≥4.5:1. |
| `warning` | #F4D070 | #76570E | #74520A | #76570E | warningSurface pairing ≥4.5:1. |
| `warningSurface` | #362C13 | #FBF1D5 | #FAF0D4 | #FBF1D5 | Pair with warning text ≥4.5:1. |
| `danger` | #FFAAA3 | #A72624 | #A32627 | #A72624 | dangerSurface pairing ≥4.5:1. |
| `dangerSurface` | #3B1E1D | #FCE9E7 | #FCE9E8 | #FCE9E7 | Pair with danger text ≥4.5:1. |
| `information` | #9ED4FF | #195A89 | #175785 | #195A89 | informationSurface pairing ≥4.5:1. |
| `informationSurface` | #182E41 | #E5F1F9 | #E4F1FA | #E5F1F9 | Pair with information text ≥4.5:1. |
| `brandPrimary` | #B89154 | #846C50 | #164A6B | #3D654A | Large hero display pairing on canvas/surface/subtle/elevated ≥3:1; test any other text/control use. |
| `brandSecondary` | #877255 | #AE9979 | #3D7794 | #839474 | Expressive brand role; test if used for text/control. |
| `accent` | #D8B778 | #8D734B | #138BA8 | #847045 | Expressive accent, not default control authority; test if used for text/control. |

Contrast is measured in `evidence/design-system-harness-01/contrast-report.json` using the WCAG relative-luminance formula. Tested text pairings meet 4.5:1; action labels are checked on default, hover, and active fills at 4.5:1; the primary action role when used as a text link meets 4.5:1; the large hero brand expression meets 3:1; dual focus rings meet 3:1 against tested adjacent surfaces; meaningful default/strong boundaries meet 3:1 against canvas, surface, and elevated surfaces. `borderSubtle` and accent are reserved for decorative expression and must not be the sole cue for an interactive boundary or small text. Error messaging uses the existing canonical `danger`/`dangerSurface` roles from `COLOR-THEMING.md`; it does not introduce a duplicate palette role.

The implementation evidence has 180 passing pair checks across the four mappings. The lowest passing ratio is recorded in the measured report.

## 5. Registry and geometry contract

- Visual Worlds are registry entries with an ID and complete semantic mapping. The harness selector enumerates the registry, which is the single source for available worlds.
- Shared buttons, fields, media, composition primitives, and routes consume semantic roles. They do not branch on world names or hard-code world-specific CSS.
- A Visual World is broader than its color palette. Future expression metadata may describe approved material, media, or motion direction, but only after those dimensions have canonical contracts.
- World expression may change appearance. Shared grid/rails, safe-area behavior, component dimensions, touch targets, hierarchy, and responsive behavior remain invariant unless an explicit presentation-variation contract authorizes a change.
- Adding a complete fifth registry entry works through the same token adapter without editing components, routes, clinic logic, or layout geometry. A test-only neutral fifth-world proof exercises this extension without admitting a new canonical world.

## 6. Governance

- A **clinic selects one Visual World** (plus its theme mapping and Controlled Variation selections) at provisioning (`CLINIC-PROVISIONING.md` §2). One world per clinic across that clinic's locales — never a locale-direction split (`PLATFORM-BOUNDARIES.md` §3).
- **New world admission:** reusable need · DNA-consistent · contrast-valid · photography-feasible · not one clinic's arbitrary preference · demonstrable in both a hero and a continuation section. Rejected requests park as design decisions.
- **Relationship to PROTOTYPE-01 families:** the former PEARL/MINERAL/OBSIDIAN family *names* are superseded by the Visual Worlds model; any literal values they carried remain prototype evidence only.
- **Relationship to Reference Clinics:** a world choice is Clinic Expression; it never hard-codes into Core (Foundation invariant).
