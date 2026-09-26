# Motion & Iconography

**Class:** CANONICAL
**Change process:** Rationale-documented edit.

---

# Part 1 — Motion

## 1. Purpose

Motion communicates **precision, continuity, and feedback** — not entertainment. No animation exists because it looks impressive (`DESIGN-SYSTEM-CONSTITUTION.md` §2–3).

## 2. Categories & tokens

| Category | Token | Range | Use |
|---|---|---|---|
| Fast | `duration-fast` | 120–160ms | micro-feedback: hover, press, toggle |
| Standard | `duration-standard` | 200–300ms | component transitions: drawer, disclosure, locale-change fade |
| Slow | `duration-slow` | 400–600ms | editorial/section reveals, image transitions |

Easing: `easing-standard` (ease-out family) for entrances/UI; `easing-emphasized` (gentle in-out) for editorial movement. No springy/excessive curves (anti-aesthetic).

## 3. Motion principles

- **Every animation must answer: what does this communicate?** No answer → no animation.
- **Reduced motion is mandatory** (`prefers-reduced-motion`): reveals become opacity-only or none; carousels stop auto-play; parallax/auto-playing ambient motion disabled. Not a QA afterthought — a contract floor.
- Hover/press feedback: subtle (elevation/tonal/opacity), never layout-shifting.
- Reveal: reserved space before animation — **no layout shift** (`PERFORMANCE-PRINCIPLES.md`); never trap content behind scroll-triggered animation that fails to fire.
- Drawer/dialog: standard duration, directional slide follows the drawer's logical edge (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §A.3); scrim fade = standard.
- Carousel: standard/slow transitions; pause on hover/focus/interaction; auto-advance only if content-equal (evidence carousels never auto-advance).
- Image transitions: slow category, crossfade preferred; before/after compare interaction follows `SIGNATURE-PATTERNS.md` §4 (evidence clarity first).
- Route transitions: **not defined** — may be justified later; not now.

## 4. Directional motion

Directional UI motion follows locale direction; semantically fixed content does not mirror (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §A.3). Distinguish semantic direction from decorative mirroring.

# Part 2 — Iconography

## 5. Icon philosophy

Minimal · line-based where appropriate · consistent stroke · legible · culturally neutral · **direction-aware where semantically directional**. One coherent system; combining visually incompatible icon systems is prohibited. **No library selection in this task** (that's an implementation-adjacent choice, recorded later).

## 6. Icon behaviors

| Domain | Behavior |
|---|---|
| time / sessions | clock/calendar semantics; numerals via central formatting (`LOCALIZATION-FOUNDATION.md` §9) |
| recovery | healing/rest semantics, non-graphic, non-alarming |
| location | pin; never mirrored (semantically fixed, §A.3) |
| phone | handset; never mirrored |
| social | platform glyphs kept accurate; not mirrored |
| search | magnifier; never mirrored |
| navigation | hamburger/menu; disclosure chevron **follows direction** (`SIGNATURE-PATTERNS.md` §9) |
| disclosure | chevron rotates/mirrors with direction; drawer slide edge follows logical direction |
| previous/next | arrows **follow direction**: "next" points toward inline-end in RTL (left) and right in LTR; never mechanically mirrored for fixed-semantics cases (media controls) |

## 7. Accessibility

Icons: text alternative or `aria-hidden` when adjacent text exists; interactive icon-only controls require localized accessible names. Icon-only buttons ≥ touch target floor (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §C.2).
