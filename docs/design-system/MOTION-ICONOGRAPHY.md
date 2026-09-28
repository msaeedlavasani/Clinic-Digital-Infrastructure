# Motion & Iconography

**Class:** CANONICAL
**Change process:** Rationale-documented edit.

---

# Part 1 — Motion

## 1. Purpose

Motion communicates **precision, continuity, and feedback** — not entertainment. No animation exists because it looks impressive (`DESIGN-SYSTEM-CONSTITUTION.md` §2–3).

> **Amended (DESIGN-AMENDMENT-01):** motion is part of CDI **Art Direction and spatial storytelling** (`EXPERIENCE-DIRECTION.md` §4) — choreographed scene transitions, masking, depth, and scroll continuity are canonical motion vocabulary; repeated generic fade-up/card-entrance as the *primary* luxury language is an anti-pattern. Restraint, reduced-motion, and no-information-blocking rules below remain fully binding.

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

### 3A. Reduced motion — complete alternate presentation (strengthened, DESIGN-SYSTEM-VNEXT-01)

Reduced motion is **a complete alternate presentation of the SAME content and navigation** — never an amputated experience. It must preserve hierarchy, orientation, information, actions, and route/scene comprehension. Under reduced motion the implementation may: replace spatial travel with state replacement · replace parallax with static composition · replace morph with cut/crossfade · replace ambient movement with still media. It may **never** leave content inaccessible because a motion trigger was disabled, hide content that motion would reveal, or flatten the journey into an unrecognizable outline. A reduced-motion pass requires the same rendered evidence as the motion presentation (same stages, same content — `DESIGN-QA.md` evidence rules).

## 4. Directional motion

Directional UI motion follows locale direction; semantically fixed content does not mirror (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §A.3). Distinguish semantic direction from decorative mirroring.

## 4A. Motion grammar chain and vocabulary (added DESIGN-SYSTEM-VNEXT-01)

Motion authority extends from experience intent down to tokens — every motion decision traces upward to intent, never upward from "which animation looks cool":

```text
Experience Intent
  ↓
Treatment / Scene Signature      sensory vocabulary of the scene/treatment (COMPOSITION-CONTRACTS.md §8)
  ↓
Transition Grammar               how scenes/states connect
  ↓
Motion Primitive                 the reusable motion noun
  ↓
Duration / Easing                tokens (§2)
```

Reasoning vocabulary (non-mandatory, non-exhaustive — for describing and reviewing motion, not a required effects catalog):

- **MATERIAL / PERCEPTUAL:** Light · Glass · Skin · Fluid · Particle · Filament · Surface · Depth
- **MOTION:** Reveal · Morph · Focus · Expand · Contract · Flow · Scatter · Converge · Freeze
- **SPATIAL:** Push · Pull · Orbit · Pass-through · Macro→Wide · Foreground→Background
- **TRANSITION:** Mask · Light · Radial · Depth · Displacement · Morph

Usage rules: primitives compose into transitions; a signature may reuse primitives across treatments; vocabulary terms appearing in a design/PR description must map to implementable behavior with intent (MOTION-01). No library or technology is mandated or implied by this vocabulary — simplest-technology-wins (`EXPERIENCE-DIRECTION.md` §4).

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
