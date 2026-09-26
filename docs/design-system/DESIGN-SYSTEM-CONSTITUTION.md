# Design System Constitution

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Purpose and mission

The CDI Design System is the shared capability that lets many clinics inherit **strong UX, accessibility, responsive quality, medical credibility, coherent interaction behavior, and maintainable component architecture** — while producing clinic websites that do **not** look like the same template with a different logo and primary color.

> **Design strategy: Stable System + Controlled Expression.**
> The system (tokens, components, patterns, UX contracts) is stable and shared. Expression (theme, variants, imagery, emphasis) is controlled and per-clinic.

This document establishes the design system's governance and experience language. Concrete specifications live in sibling documents (§11) and reference this Constitution.

## 2. Core experience principle

CDI's experience language is:

> **Clinical Precision × Quiet Luxury × Human Warmth**

- **Clinical Precision** — clear hierarchy, structured information, trustworthy presentation, predictable interactions, readable treatment information.
- **Quiet Luxury** — whitespace, restraint, strong typography, high-quality imagery, subtle surfaces, minimal decorative noise.
- **Human Warmth** — people-centered photography, approachable language, calm interaction, patient-centered discovery — explicitly avoiding sterile, hospital-like presentation.

All three qualities must coexist; optimizing one into caricature (cold precision, luxury emptiness, cozy clutter) is a design defect.

## 3. Anti-aesthetic rules (anti-patterns, not absolute bans)

CDI designs must be evaluated against drift toward:

- **Generic beauty salon** — excessive pink/gold, glamorous decorative clutter, stereotypically feminine visual language.
- **Generic hospital** — sterile institutional blue everywhere, institutional layouts, intimidating medical presentation.
- **Generic SaaS** — dashboard language on patient-facing pages, excessive cards, badge-heavy interfaces, UI density inappropriate for patients.
- **AI-template aesthetic** — every section in rounded cards, excessive gradients, arbitrary blobs, shadow stacking, glassmorphism by default, meaningless animation, identical repeated section compositions.

These are **anti-patterns with reviewable exceptions**, not absolute bans: a specific brand context may justify a deviation, documented in the design change. Undocumented drift into these aesthetics is a review-blocker.

## 4. Design System layers

| Layer | Content | Governing doc |
|---|---|---|
| **L1 — Primitives** | Spacing, sizing, type scale, radius, border, elevation, motion, breakpoints, containers, grid, layering | `DESIGN-TOKENS.md`, `LAYOUT-RESPONSIVE.md` |
| **L2 — Semantic tokens** | canvas/surface/text/border/action/feedback/brand roles — never tied to arbitrary color names | `COLOR-THEMING.md`, `DESIGN-TOKENS.md` |
| **L3 — Components/patterns** | Button, Navigation, TreatmentFacts, ConcernExplorer, DoctorProfile, BeforeAfterCompare, ConsultationSurface, … | `COMPONENT-INVENTORY.md`, `SIGNATURE-PATTERNS.md` |
| **L4 — Clinic expression** | Brand palette, approved typography mapping, imagery, theme, composition variants, emphasis/density config | `CONTROLLED-VARIATION.md` |

**Canonical rule:** Clinic themes map into **semantic tokens and approved variants** — they do not override component internals. Clinic-specific CSS overrides are not the customization mechanism; if a clinic need cannot be expressed through L4, the need goes through variant admission (`CONTROLLED-VARIATION.md` §3), not overrides.

## 5. Tokens, theme, and the not-a-color-swap rule

Themes vary **more than color**: photography direction, surface behavior, composition emphasis, and density may legitimately differ between theme families, while shared UX contracts (accessibility, responsiveness, bidirectionality, interaction behavior) remain intact. `COLOR-THEMING.md` defines theme families and the mapping contract; `CONTROLLED-VARIATION.md` defines the full variation axes.

## 6. Script-aware typography

Typography is configured **per script**, not per page:

| Script | Requirement |
|---|---|
| **Persian** | Primary typeface: **Vazirmatn** (canonical, established) |
| **Arabic** | Persian typography settings are not assumed optimal for Arabic; an appropriate Arabic face/configuration is required (family: `OPEN-DECISIONS.md` D-1) |
| **Latin (English)** | Appropriate Latin typography configuration; family not finally selected |
| **Cyrillic (Russian)** | Cyrillic must be explicitly considered; do not assume an English face has suitable Cyrillic coverage or quality |

One global font assumption is prohibited. Family selection criteria, semantic roles, and typographic behavior are specified in `TYPOGRAPHY.md`. Font loading is also a performance concern (`PERFORMANCE-PRINCIPLES.md`).

## 7. Component philosophy

Components must be: reusable · accessible · responsive · **theme-aware** · **direction-aware** · variant-aware where justified. No direction- or locale-specific component families (`PersianButton`, `EnglishButton`, `RTLHeader`, `LTRHeader`) — one component architecture serves all locales and directions (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`).

## 8. Accessibility

Accessibility is a system requirement, not cleanup work. The accessibility contract — including the WCAG 2.1 **AA** canonical target — is codified in `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §C. A proposal to move to WCAG 2.2 AA is recorded in `OPEN-DECISIONS.md` (A-9); Foundation's decision stands until formally changed.

## 9. Design System validation gate

The Design System cannot be considered validated by Persian screenshots alone. Before sign-off, validation must include: RTL reference (Persian) · LTR reference (English or Russian) · Arabic script stress · Russian/Cyrillic stress · language stress (long labels, long treatment names, multi-line buttons where policy permits) · the responsive validation matrix (`LAYOUT-RESPONSIVE.md` §6) · the design quality tests (§10). Gate tracked as D-4 in `OPEN-DECISIONS.md`.

## 10. Design quality tests

The system is judged against:

- **A — Premium:** intentionally designed, not template-generated.
- **B — Clinical:** medical credibility preserved.
- **C — Human:** no sterile institutional UX.
- **D — Scalable:** many clinics can use it.
- **E — Distinct:** clinics can look meaningfully different.
- **F — Bidirectional:** survives RTL and LTR.
- **G — Responsive:** coherent across viewport classes.
- **H — Accessible:** accessibility constraints are native to the system.

Both failure modes are FAIL: a system producing 2,000 near-identical sites, and a permissive system producing 2,000 unmaintainable bespoke sites. Target: **one coherent system, many credible clinic identities.**

## 11. Specification documents

`DESIGN-TOKENS.md` (v0.1 token spec) · `TYPOGRAPHY.md` · `COLOR-THEMING.md` · `LAYOUT-RESPONSIVE.md` · `MOTION-ICONOGRAPHY.md` · `PHOTOGRAPHY.md` · `COMPONENT-INVENTORY.md` · `SIGNATURE-PATTERNS.md` · `CONTROLLED-VARIATION.md` — all specifications are implementation-independent; none selects a framework, and none constitutes production UI. Page/IA/UX contracts live in `product/INFORMATION-ARCHITECTURE.md`, `product/PAGE-ARCHETYPES.md`, `product/UX-FLOWS.md`.

## 12. What this Constitution deliberately does not do

- Does not select final typefaces for Arabic/Latin/Cyrillic (D-1).
- Does not hard-freeze token *values* as immutable — v0.1 values are recommended initial scales, refinable through design validation without ADR unless a contract-level rule changes.
- Does not freeze named variant families as final visual designs (`CONTROLLED-VARIATION.md` §2).
- Does not let Reference Clinic aesthetics become Core aesthetics (`CONTROLLED-VARIATION.md` §6).
