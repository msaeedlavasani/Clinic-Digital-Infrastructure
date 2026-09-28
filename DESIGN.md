# CDI Design System — Operational Entry Point

**Class:** CANONICAL (operational map + rules index); the documents it points to remain the detailed authority.
**Origin:** DESIGN-SYSTEM-VNEXT-01.
**Conflict rule:** if this file contradicts a canonical source, the canonical source wins and this file must be fixed — that is a documentation defect, not a choice.

---

This is the **front door** for any agent or contributor doing design-affecting work. It tells you what is authoritative, what to read, and what you may never invent. It deliberately does not duplicate the canonical documents.

## 1. What is authoritative

All documents below are **CANONICAL** (`docs/governance/DOCUMENT-AUTHORITY.md`). Governance first: `AGENT-CONTRACT.md` binds your behavior; `DOCUMENT-AUTHORITY.md` defines precedence and change process.

| Authority | Document |
|---|---|
| Experience direction & DNA | `docs/design-system/EXPERIENCE-DIRECTION.md` |
| Experience runtime (persistent Stage, Scenes, and Editorial handoff) | `docs/architecture/EXPERIENCE-RUNTIME-CONTRACT.md` |
| Experience language & layers | `docs/design-system/DESIGN-SYSTEM-CONSTITUTION.md` |
| Visual Worlds | `docs/design-system/VISUAL-WORLDS.md` |
| Tokens | `docs/design-system/DESIGN-TOKENS.md` |
| Color/theming contract | `docs/design-system/COLOR-THEMING.md` |
| Layout & responsive | `docs/design-system/LAYOUT-RESPONSIVE.md` |
| Presentation contexts | `docs/design-system/PRESENTATION-CONTEXTS.md` |
| Composition contracts | `docs/design-system/COMPOSITION-CONTRACTS.md` |
| Typography | `docs/design-system/TYPOGRAPHY.md` |
| Bidirectional + accessibility | `docs/design-system/BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` |
| Motion & iconography | `docs/design-system/MOTION-ICONOGRAPHY.md` |
| Photography & media | `docs/design-system/PHOTOGRAPHY.md` |
| Signature patterns | `docs/design-system/SIGNATURE-PATTERNS.md` |
| Controlled variation | `docs/design-system/CONTROLLED-VARIATION.md` |
| Components & states | `docs/design-system/COMPONENT-INVENTORY.md` |
| Design QA rules | `docs/design-system/DESIGN-QA.md` |
| Validation harness spec | `docs/design-system/VALIDATION-HARNESS.md` |

## 2. What to read for a UI task (minimum)

1. This file (map + rules).
2. `AGENT-CONTRACT.md` (§2 mandatory behavior; §6 design enforcement).
3. For cinematic/scene-based work, `EXPERIENCE-RUNTIME-CONTRACT.md` and `SIGNATURE-PATTERNS.md` §16; then the composition contract(s) for your surface (`COMPOSITION-CONTRACTS.md` §5).
4. `DESIGN-TOKENS.md` + `COLOR-THEMING.md` (tokens/roles).
5. `LAYOUT-RESPONSIVE.md` + `PRESENTATION-CONTEXTS.md` (geometry/contexts).
6. `TYPOGRAPHY.md` + `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` (text/direction/a11y).
7. Domain-specific: `MOTION-ICONOGRAPHY.md`, `PHOTOGRAPHY.md`, `SIGNATURE-PATTERNS.md`, `COMPONENT-INVENTORY.md` as touched.
8. `DESIGN-QA.md` — the rules your change will be judged by.

## 3. Stable Experience DNA (never per-clinic)

Cinematic · premium · spatial · art-directed · continuous · restrained · medically credible · choreographed · human + architecture + medicine + technology · mobile-aware · WCAG 2.1 AA floor. Direction: **Cinematic Spatial Luxury × Persistent Scene Journey × Medical Aesthetics**; Scene progression uses a bounded persistent Experience Stage and releases to semantic Editorial Information Mode. Scroll is only one possible input, not the Scene primitive. "Quiet Luxury" = restraint in decoration, not passivity in experience. The world persists across the journey — above-the-fold luxury never collapses into a generic page.

## 4. Token usage hierarchy

Semantic roles first, primitives beneath, component tokens sparingly. Components never consume raw values where an approved token exists. Theme maps into semantic roles (AA contrast is a validity condition, not a review note). Full rules: `DESIGN-TOKENS.md`, `COLOR-THEMING.md` §2.

## 5. Responsive rule (canonical)

> Responsive = re-composition, not proportional scaling.

`desktop × scale = mobile` is a FAIL (`DESIGN-QA.md` RESP-01). Re-composition may change composition, ordering, crop, emphasis, density, navigation, action placement, grouping, spatial relationships — while preserving semantic hierarchy, meaning, accessibility, Visual World, and evidence integrity.

## 6. Presentation contexts

`DESKTOP_WEB` · `IPHONE_WEB` · `ANDROID_WEB` — composition inputs, never component forks (`PRESENTATION-CONTEXTS.md`). Every contract defines INVARIANT vs context-specific behavior. Safe areas, dynamic chrome, virtual keyboard, cutouts, gesture regions are first-class composition constraints (SAFE-01).

## 7. Composition contracts

Every major surface (Hero, Treatment Discovery/Experience/Information, Doctor, Technology, Evidence, Before/After, Consultation, Editorial) composes under a contract: rails (Global/Content/Media), Action Zone, Navigation Zone, Safe Area, negative-space purpose, per-context behavior, forbidden failures. Contracts are not templates — Controlled Variation still applies. See `COMPOSITION-CONTRACTS.md`.

## 8. Typography authority

Vazirmatn for Persian (fixed); script-aware configuration for every script; ten semantic roles + cinematic roles only as admitted (`TYPOGRAPHY.md` §2–2A); Persian-first metrics; no Latin letter-spacing leakage into Persian; mixed-script isolation; central numeral formatting.

## 9. Spacing authority

Primitives answer "how much"; semantic relationships answer "between what" (`DESIGN-TOKENS.md` §3A). Recurring relationships consume `space-*`-mapped semantic tokens (`space-content-group`, `space-media-copy`, `space-action`, …). Unexplained local spacing is a violation (SPACE-01).

## 10. Media / crop authority

FOCAL SUBJECT · PROTECTED SUBJECT REGION · TEXT-SAFE REGION · CROP ENVELOPE · CONTRAST REGION (`PHOTOGRAPHY.md` §2A). `object-fit: cover` is implementation behavior, not art direction. Mobile crop may differ materially from desktop crop — deliberately. A composition fails when headline/CTA/progress unintentionally competes with the focal subject (MEDIA-01).

## 11. Action & navigation rules

CONTENT → gap → PRIMARY (≤1/surface-view) → secondaries → safe boundary; one action system per decision (`COMPOSITION-CONTRACTS.md` §4). Persistent progress exists only when it materially aids orientation/completion (PROGRESS-01); scene advancement and progress indication are separate responsibilities.

## 12. Motion & reduced motion

Motion originates from experience intent through the grammar chain (intent → signature → transition grammar → primitive → duration/easing); vocabulary for reasoning, not an effects catalog (`MOTION-ICONOGRAPHY.md` §4). Reduced motion is a complete alternate presentation of the same content/navigation — never a content amputation.

## 13. RTL/LTR rules

Direction derives from locale; logical start/end everywhere directional UI is involved; fixed-semantics content never mirrors mechanically; mixed-script isolation; both directions are equal citizens (BIDI-01).

## 14. Medical / evidence boundary

Guidance language, never diagnosis or suitability claims; Treatment Signature ≠ Information ≠ Evidence; sensory metaphor never implies outcome (MEDICAL-01); Before/After is governed evidence with labels/metadata/disclaimer; risks/consents are never truncated or de-styled.

## 15. Design QA

Stable rule IDs with PASS/FAIL + evidence requirements: LAYOUT-01/02 · MEDIA-01 · ACTION-01 · FORM-01 · RESP-01 · TYPE-01 · SPACE-01 · PROGRESS-01 · MOTION-01 · MEDICAL-01 · SAFE-01 · BIDI-01 (`DESIGN-QA.md`). **No visual pass from computed CSS/DOM/automated assertions alone** — rendered evidence across required contexts is mandatory.

## 16. What you may NOT invent

- Raw design values where tokens/semantic relationships exist.
- New tokens without a documented reusable semantic need.
- Page-specific CSS fixes for reusable requirements.
- Device/context-specific component forks (no `IphoneButton`).
- Magic positioning without composition-contract authority.
- New patterns when an existing pattern satisfies the need.
- A visual pass from computed CSS/DOM alone; a responsive pass without rendered evidence across required contexts; a design-system pass when a prototype invented undocumented geometry/interaction grammar.
- Progress ornament, efficacy simulation, decorative motion without intent.

## 17. Missing design requirement? Classify first

Before inventing a local fix, classify the need (`AGENT-CONTRACT.md` §6.1):

| Class | Meaning | Route |
|---|---|---|
| `IMPLEMENTATION_VIOLATION` | A canonical rule already covers it; the plan/code is wrong | Fix the implementation |
| `SYSTEM_GAP` | Canonical contracts should have covered this | File rationale-documented canonical edit (or ADR if contract-level) |
| `CONTENT_ASSET_PROBLEM` | Content/imagery is missing or unusable | Route to content/media owners |
| `NEW_REUSABLE_PATTERN` | Genuinely new, reusable, admission-worthy | Variant/pattern admission (`CONTROLLED-VARIATION.md` §3) |
| `EXPERIMENTAL_EXCEPTION` | Prototype-only exploration | Must be declared experimental; never silently enters Core |

Only after classification may the work proceed on the classified route. An unclassified local fix is a contract violation.
