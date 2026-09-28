# Layout & Responsive

**Class:** CANONICAL
**Change process:** Rationale-documented edit; contract-level changes require ADR.

---

## 1. Principles

- **Mobile is a first-class experience** (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §B): design compiles *up* from mobile, never shrinks from desktop.
- **Responsive = re-composition, not proportional scaling (canonical, vNext):** a valid responsive implementation may change composition, ordering, media crop, relative emphasis, information density, navigation presentation, action placement, grouping, and spatial relationship — while preserving semantic hierarchy, content meaning, accessibility, brand/Visual World, and treatment/evidence integrity. The explicit failure `desktop layout × scale factor = mobile layout` is non-compliant (`DESIGN-QA.md` RESP-01).
- Fluid layout; no horizontal overflow at any supported width, in any locale.
- Do not overfit to one viewport; layout must survive text expansion/contraction (`TYPOGRAPHY.md` §6.6).
- Whitespace and typography establish structure before boxes and borders (`DESIGN-TOKENS.md` §5, §7).

## 2. Conceptual grid

| Viewport class | Conceptual grid |
|---|---|
| Mobile | 4-column conceptual grid |
| Tablet | adaptive intermediate (e.g. 8-col) |
| Desktop | 12-column grid |

The grid is a **composition aid**, not a visible scaffold; editorial layouts may break the grid deliberately (editorial width) while text and forms respect it.

### 2A. Stage geometry authorities (added DESIGN-SYSTEM-VNEXT-01)

Page/scene geometry composes from named authorities — semantic, not coordinates (`COMPOSITION-CONTRACTS.md` §2 for full definitions):

```text
Viewport → Safe Area → Stage/Page
  ├── Global Rail      persistent alignment authority
  ├── Content Rail     text alignment + readable measure (container-text)
  ├── Media Rail       visual subjects / bleed authority (container-editorial/full)
  ├── Action Zone      primary/secondary action relationship
  └── Navigation Zone  navigation + justified progress controls
```

Containers map: `container-text` → Content Rail measure · `container-editorial`/`container-full` → Media Rail · gutters → `space-page-inline`. Safe Area behavior (notch/cutout/home-indicator/browser chrome) is defined per presentation context (`PRESENTATION-CONTEXTS.md` §4) and enforced by `DESIGN-QA.md` SAFE-01. Compositions must be able to name which authority each major element consumes (`DESIGN-QA.md` LAYOUT-01); identical coordinates across all compositions are neither required nor assumed.

## 3. Containers & widths

Container tokens (`DESIGN-TOKENS.md` §9):

- `container-default` (~1200–1320) — main content
- `container-text` (~640–720) — readable text measure, all locales
- `container-editorial` (~1440) — wide editorial/media blocks
- `container-full` — full-bleed media/sections

Rules:

- Body copy always sits in `container-text`, in every locale and theme.
- Full-bleed is for media/section backdrops — **never** for text beyond `container-text` inner measure.
- `container-editorial` serves hero/media/section compositions that need to span wider while text stays bound.

## 4. Gutters

- Gutter tokens derive from the spacing scale: mobile ≈ `space-300` (16), tablet/desktop ≈ `space-400`–`500` (24–32).
- Gutters are symmetric inline (logical start/end — `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §A.2); never side-asymmetric by direction.

## 5. Section rhythm (page spacing)

Page rhythm uses the section tier of the spacing scale (`DESIGN-TOKENS.md` §3):

- **Mobile:** `space-700` (64) between major sections; `space-600` (48) for sub-sections.
- **Tablet:** transitional.
- **Desktop:** `space-800` (96) between major sections; `space-700` (64) sub-sections.
- **Editorial moments** (hero, major statements): `space-900`–`1000` (128–160+).

Rhythm is generous by default — CDI pages breathe (`DESIGN-SYSTEM-CONSTITUTION.md` §2 Quiet Luxury). Denser expression is a Section-Emphasis variation within these bounds (floors, not values: mobile never below `space-600` between major sections).

## 6. Responsive validation matrix

Future QA validates at **viewport classes bound to presentation contexts** (not device models; context environmental rules: `PRESENTATION-CONTEXTS.md`):

| Class | Conceptual width | Context | Notes |
|---|---|---|---|
| Desktop Standard | ~1280 class | DESKTOP_WEB | 12-col grid |
| Desktop Wide | ~1440–1728 class | DESKTOP_WEB | negative-space inspection (LAYOUT-02) |
| iPhone Compact | compact portrait | IPHONE_WEB | narrow-content stress |
| iPhone Modern | ~390 class portrait | IPHONE_WEB | primary touch traffic; safe areas |
| iPhone Large | ~430 class portrait | IPHONE_WEB | landscape stress included |
| Android Compact | compact portrait | ANDROID_WEB | narrow-content stress |
| Android Standard | ~390–412 portrait | ANDROID_WEB | gesture + three-button nav |
| Android Large | ~430 class portrait | ANDROID_WEB | device variance |
| Tablet | ~768–834 | mobile-class composition at tablet width | adaptive grid, 2-up patterns |
| All classes | — | both directions + long localized strings | bidirectional + language stress |

Class names are **emulation contexts, not commercial device claims** — correctness never binds to a device model. **Every class must be validated in RTL (fa) and LTR (en/ru)** for primary composition validation, with **system stress validation** (ar/RTL, ru/LTR, long localized strings, mixed-script strings, reduced motion, keyboard, touch, virtual keyboard where relevant, safe-area environments). A layout that only works when text is Persian is a defect.

## 6A. Design QA linkage (vNext)

Rendered validation consumes the rule registry in `DESIGN-QA.md` (LAYOUT-01/02, RESP-01, SAFE-01, MEDIA-01, BIDI-01, …); computed-CSS/DOM assertions alone never constitute a design pass. The executable standing surface is `/design-system`, documented in `VALIDATION-HARNESS.md`; its implementation includes rendered evidence and automated smoke checks.

## 7. Section behavior

- Full-bleed sections may alternate `canvas`/`surface-subtle`/`surface-strong` for tonal rhythm — tonal separation before borders/shadows.
- No identical repeated section compositions (`DESIGN-SYSTEM-CONSTITUTION.md` §3 anti-aesthetic): rhythm and emphasis may vary while the composition contract holds.
- Safe-area awareness where relevant (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §B.3).
