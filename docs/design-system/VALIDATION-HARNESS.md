# Design System Validation Harness — Specification

**Class:** CANONICAL (specification); implementation is a future stage and must not select a framework solely for this purpose.
**Origin:** DESIGN-SYSTEM-VNEXT-01 — defines the future standing validation surface for the Design System (`DESIGN-QA.md` §4; Constitution §9 gate D-4).

---

## 1. Purpose

A **standing rendered surface** where the Design System is exercised and validated continuously — typography, color, spacing, controls, forms, navigation, media, composition contracts, worlds, directions, stress scenarios — so Design QA (`DESIGN-QA.md`) runs against living evidence instead of per-change ad-hoc captures.

It is **not a marketing page**, not a prototype, and not a playground for invented patterns: it is a visual QA/reference surface rendering only canonical tokens, contracts, and approved variants.

## 2. Status — SPECIFIED ONLY

No canonical application shell exists yet (framework A-1 deliberately unmade; `docs/decisions/README.md`). **No framework, bundler, or app is selected or built for the harness in this task.** When a canonical shell exists and the harness can be added without prematurely selecting architecture, implementation is allowed; until then this document is the contract for that future work.

A throwaway app built merely to claim this gate is prohibited.

## 3. Required rendering inventory

The harness must eventually render, as reference/QA specimens:

| Area | Specimens |
|---|---|
| Typography | all semantic roles + cinematic roles (Hero/Scene Title if admitted), per script (fa reference; en/ru/ar stress), fluid behavior at context extremes |
| Semantic colors | full role set per Visual World sample (never raw hex swatches alone) |
| Spacing relationships | primitive scale + every semantic relationship token in a visible composition |
| Controls | Button system (5 variants × states), IconButton, Link |
| Forms | every control × every state (`rest/hover/focus/filled/invalid/disabled`), including consent + phone input; keyboard-open behavior on touch contexts |
| Navigation | Header (desktop/mobile), MobileNavigation drawer, Breadcrumb, Pagination, LocaleSwitcher |
| Media compositions | photography categories, crop envelopes, text-safe regions, focal-subject integrity cases |
| Signature patterns | ConcernExplorer, TreatmentFacts, TreatmentJourney, BeforeAfterCompare, DoctorProfile, ConsultationSurface |
| Composition contracts | one specimen per contract (`COMPOSITION-CONTRACTS.md` §5) per allowed variation |
| Visual World samples | at minimum DARK CINEMATIC + LUMINOUS LUXURY (dark/light first-class proof), plus admitted worlds |
| RTL/LTR | every specimen in fa-IR/RTL and en/LTR |
| Stress | ar/RTL, ru/LTR, long localized strings, mixed-script strings, reduced motion, keyboard, touch, virtual keyboard, safe-area environments |

## 4. Required context coverage

Specimens render under the presentation contexts (`PRESENTATION-CONTEXTS.md` §2): DESKTOP_WEB (standard + wide), IPHONE_WEB (~390 portrait, safe-area/keyboard states), ANDROID_WEB (~390–412 portrait, cutout/gesture states), plus the tablet class and the responsive validation matrix (`LAYOUT-RESPONSIVE.md` §6). Device classes are contextual emulation, not device-model claims.

## 5. Non-goals

- Not a component library documentation site for its own sake; not marketing.
- Not a place for unapproved variants, clinic-specific tweaks, or experimental patterns.
- Not a replacement for per-change Design QA evidence; it is the standing complement.

## 6. Acceptance when implemented

- Every inventory row renders without console/visual defects in both directions.
- DESIGN-QA rules can be evaluated against harness captures without bespoke setup.
- Adding a token/variant/world updates specimens without harness code forks (the harness consumes the same token/contract source of truth).
