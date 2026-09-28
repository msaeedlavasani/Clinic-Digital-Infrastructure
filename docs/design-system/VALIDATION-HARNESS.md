# Design System Validation Harness — Specification

**Class:** CANONICAL (specification and implementation record); implementation follows the accepted application architecture in ADR-0001.
**Origin:** DESIGN-SYSTEM-VNEXT-01 — defines the future standing validation surface for the Design System (`DESIGN-QA.md` §4; Constitution §9 gate D-4).

---

## 1. Purpose

A **standing rendered surface** where the Design System is exercised and validated continuously — typography, color, spacing, controls, forms, navigation, media, composition contracts, worlds, directions, stress scenarios — so Design QA (`DESIGN-QA.md`) runs against living evidence instead of per-change ad-hoc captures.

It is **not a marketing page**, not a prototype, and not a playground for invented patterns: it is a visual QA/reference surface rendering only canonical tokens, contracts, and approved variants.

## 2. Status — IMPLEMENTED

Application framework decision A-1 is resolved by [ADR-0001](../decisions/ADR-0001-APPLICATION-FRAMEWORK-AND-RENDERING.md), which selects Next.js App Router. `DS-IMPL-001` is resolved: the Owner approved the four initial Visual World directions and authorized derived semantic mappings with contrast verification. The working implementation uses the shared production Design System source under `src/design-system`; there is no separate harness token/component layer.

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

## 7. Implementation status and run instructions

**Status:** IMPLEMENTED — executable shared-system validation foundation; this status does not constitute Owner acceptance of every composition or a final visual-direction approval.

- **Route:** `/design-system` (server-rendered semantic surface; scoped client controls).
- **Run locally:** `npm install`, `npm run dev`; then open `http://localhost:3000/design-system`.
- **Framework:** Next.js 16.3.6 App Router, verified on 2026-09-28 as the current 16.x release against the [Next.js support policy](https://nextjs.org/support-policy) and [official npm package metadata](https://www.npmjs.com/package/next); exact versions are pinned in `package.json` and `package-lock.json`.
- **Automated checks:** `npm run typecheck`, `npm run build`, and `npx playwright install chromium` followed by `npm run test`.
- **Fixture controls:** switch registered Visual World, language/direction (`fa-IR`, `en`, `ar`, `ru`), presentation context, experience mode, reduced-motion preview, and media-boundary overlays.
- **Validation geometries:** 390×844, 430×932, 1024×768, and 1440×900. Context controls label iPhone/Android/Desktop semantics; responsive CSS recomposes fluidly and these sizes are evidence points, not device breakpoints.
- **Evidence:** screenshots and a 136-pair measured contrast report are in `evidence/design-system-harness-01/`; the directory README identifies each fixture.
- **Limitations:** fixtures use neutral illustration placeholders, not production clinic assets or clinical evidence. No consultation is submitted. Dedicated non-Persian fonts remain open. Subjective approval of each visual composition remains separate. The harness does not implement clinic routes, CMS, persistence, or the future public locale URL policy.
