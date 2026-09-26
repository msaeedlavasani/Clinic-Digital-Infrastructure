# Layout & Responsive

**Class:** CANONICAL
**Change process:** Rationale-documented edit; contract-level changes require ADR.

---

## 1. Principles

- **Mobile is a first-class experience** (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §B): design compiles *up* from mobile, never shrinks from desktop.
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

Future QA validates at **six viewport classes** (not device models):

| Class | Conceptual width | Notes |
|---|---|---|
| Narrow mobile | ~360 | 320 content test included |
| Common mobile | ~390–430 | primary traffic |
| Large mobile | ~480+ | landscape stress |
| Tablet | ~768–834 | adaptive grid, 2-up patterns |
| Desktop | ~1024–1280 | 12-col grid |
| All classes | both directions + long localized strings | bidirectional + language stress |

**Every viewport class must be validated in RTL (fa) and LTR (en/ru) with long localized strings** — including long navigation labels, treatment names, and localized CTA length. A layout that only works when text is Persian is a defect.

## 7. Section behavior

- Full-bleed sections may alternate `canvas`/`surface-subtle`/`surface-strong` for tonal rhythm — tonal separation before borders/shadows.
- No identical repeated section compositions (`DESIGN-SYSTEM-CONSTITUTION.md` §3 anti-aesthetic): rhythm and emphasis may vary while the composition contract holds.
- Safe-area awareness where relevant (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §B.3).
