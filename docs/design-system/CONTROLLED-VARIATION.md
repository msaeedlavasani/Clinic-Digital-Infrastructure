# Controlled Variation

**Class:** CANONICAL
**Change process:** Variant admission decisions recorded as design decisions (§3); grammar changes require ADR.

---

## 1. Purpose

CDI does not want 2,000 identical sites, nor 2,000 unmaintainable bespoke sites. This document defines the **bounded grammar** of clinic differentiation: the same design system, producing materially different clinic identities.

## 2. Variation axes

| Axis | Varies | Bounded by |
|---|---|---|
| **Theme** | **Visual World selection** (`VISUAL-WORLDS.md`) + semantic-token mapping + imagery direction + surface behavior + lighting/materiality expression | `COLOR-THEMING.md` §2 mapping contract (AA contrast validity condition); world admission rules |
| **Hero Composition** | Editorial · Clinical · Immersive (§5.1) | pattern contracts in `SIGNATURE-PATTERNS.md` |
| **Service Presentation** | Editorial Service · Compact Treatment · Featured Treatment (§5.2) | same |
| **Doctor Presentation** | Portrait · Minimal · Profile (§5.3) | same |
| **Section Emphasis** | Image/text/data dominance within sections (§5.4) | contrast/a11y floors; section rhythm floors (`LAYOUT-RESPONSIVE.md` §5) |

Variant families are named **families, not frozen designs**; final visuals are expressed at prototyping. Combinatorial explosion is prevented by §3.7 — not every permutation is designed or permitted.

## 3. Variant admission rule

A new variant enters Core only if it satisfies **all** of:

1. represents a reusable design need;
2. preserves accessibility (AA floors native, not retrofitted);
3. works responsively across the validation matrix;
4. works bidirectionally (RTL + LTR, no direction forks);
5. does not encode one clinic's arbitrary preference;
6. can plausibly serve multiple clinics;
7. does not create excessive combinatorial complexity (≤ ~5 families per axis guideline; a new family must earn its place, and unused families are retired).

**Clinic-specific CSS overrides are not the customization mechanism** — a need that fails admission becomes configuration within existing variants, a parked design decision, or an ADR-level grammar change.

## 4. Grammar composition

One selection per axis, per clinic:

```text
Clinic expression = Theme family
                  + one Hero family
                  + one Service Presentation family
                  + one Doctor Presentation family
                  + Section Emphasis parameters
                  + Section composition choices (§5.5)
                  + clinic imagery (within theme photography direction)
```

Per-section presentation variation is permitted where content justifies (e.g. a featured treatment uses Featured Treatment presentation while the services index uses Editorial Service) — variation *within* an axis per page, but **one clinic-level default per axis**, changed only deliberately. MegaMenu/no-MegaMenu is configuration (`SIGNATURE-PATTERNS.md` §9).

## 5. Variant families (initial set)

### 5.1 Hero
- **EDITORIAL** — typography-led, strong brand expression, large photography, low information density. Premium/brand-led clinics.
- **CLINICAL** — clear treatment/clinic value proposition, trust context, more structured information. Medical-credibility/specialist positioning.
- **IMMERSIVE** — full visual experience, photography/video-led, restrained overlay content. High-quality assets/flagship clinics.

All hero families must support: RTL/LTR · mobile-first layouts · accessible contrast · primary CTA · localization stress (long labels).

### 5.2 Service Presentation
- **Editorial Service** — large imagery + title + short description.
- **Compact Treatment** — text/data-led (TreatmentFacts-adjacent).
- **Featured Treatment** — strong visual + content + CTA.

Avoid endless uniform card grids (anti-aesthetic); presentation mixes are bounded by §4.

### 5.3 Doctor Presentation
- **Portrait** — people-forward portrait imagery.
- **Minimal** — typographic, calm.
- **Profile** — detail-forward (§5 DoctorProfile pattern).

### 5.4 Section Emphasis
Parameters varying image/text/data dominance within sections — bounded by contrast and rhythm floors; documented per clinic configuration, not per-component hacks.

### 5.5 Section composition
Homepage sections compose from the information architecture responsibilities (`INFORMATION-ARCHITECTURE.md` §3); controlled reordering/emphasis is variation, sequence inventing new section *types* is Core change.

## 6. Reference clinic design directions

Reference Clinic aesthetics **never become Core aesthetics** (Foundation invariant; `COLOR-THEMING.md` §5). These are reference implementation directions, not CDI's universal identity:

### Reference Clinic #1 — "نور" (Noor) — premium aesthetic & dermatology
- Theme: **PEARL** · Hero: **EDITORIAL** · Services: mixed **Editorial + Featured** · Doctors: **PORTRAIT** · overall: premium/calm/modern/credible. Persian-first, `fa-IR` launch locale (O-1 default).

### Reference Clinic #2 — "آوا" (AvA) — hair restoration & dermatology, specialist positioning
- Theme: **MINERAL** · Hero: **CLINICAL** · Services: **Compact Treatment**-led presentation · Doctors: **MINIMAL** · overall: medical-precise/specialist.

### Purpose
The pair proves the design system produces **materially different identities** — different theme families (warm-tonal vs cool-architectural), different heroes (typography-led vs trust-structured), different service and doctor presentations — with **zero Core changes**. This is the design-level Replication Gate (architecture-level gate: `REPLICATION-CONTRACT.md` §4). Clinic #2 is **not built** in this task; the direction is recorded for the gate.

## 7. What is deliberately not defined

- Final visual designs for any variant family (prototyping stage).
- Additional axes (future candidates are parked as design decisions, not silently added).
- Clinic-specific variant tweaks outside the admission route.
