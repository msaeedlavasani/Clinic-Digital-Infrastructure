# Design QA

**Class:** CANONICAL (rule IDs and PASS/FAIL conditions); evidence formats may evolve with rationale-documented edits.
**Origin:** DESIGN-SYSTEM-VNEXT-01 — the enforceable rendered-design QA layer referenced by `AGENT-CONTRACT.md` §6 and `DESIGN.md`.

---

## 1. Purpose

Design quality so far rested on constitutions and taste. This document converts the canonical contracts into **stable, rule-ID'd PASS/FAIL checks evaluated against rendered evidence** — not computed-CSS inspection alone. Every rule defines INTENT · PASS CONDITION · FAIL CONDITION · APPLIES TO · EVIDENCE EXPECTATION.

**NO VISUAL PASS rule:** computed CSS, DOM inspection, or automated assertions alone never constitute a design pass. Rendered evidence (screenshots/recordings across required contexts) is mandatory. Automated checks may *assist* (contrast math, overflow detection), but the pass is rendered.

## 2. Evidence requirements (applies to every rule)

- Evidence covers the **required presentation contexts** for the change: at minimum DESKTOP_WEB + one touch context (IPHONE_WEB or ANDROID_WEB class) for UI-affecting changes (`PRESENTATION-CONTEXTS.md` §2).
- Evidence covers **fa-IR/RTL and en/LTR** for primary composition validation, plus system-stress scenarios per `LAYOUT-RESPONSIVE.md` §6 when layout-affecting.
- Reduced-motion evidence whenever motion or choreography is touched.
- Evidence is stored with the change and referenced by rule ID in review/PR descriptions.

## 3. Rule registry

### LAYOUT-01 — Composition authority
- **INTENT:** content aligns to a named composition authority (rails/zones of `COMPOSITION-CONTRACTS.md` §2).
- **PASS:** every major landmark can name its authority (Global Rail / Content Rail / Media Rail / Action Zone / Navigation Zone); alignments are consistent or deliberately art-directed per a composition contract.
- **FAIL:** independently positioned content with no composition rationale (magic coordinates).
- **APPLIES TO:** all page/scene compositions.
- **EVIDENCE:** full-page rendered screenshots, both directions, ≥2 contexts.

### LAYOUT-02 — Negative space purpose
- **INTENT:** empty space is compositional (`COMPOSITION-CONTRACTS.md` §6).
- **PASS:** each large empty region serves subject isolation / hierarchy / rhythm / text-safe region / depth / breathing.
- **FAIL:** accidental large dead region from weak anchoring or undersized content.
- **APPLIES TO:** all contexts; desktop review explicitly inspects this.
- **EVIDENCE:** desktop + touch full-stage captures.

### MEDIA-01 — Focal subject integrity
- **INTENT:** text/controls never unintentionally compete with the focal subject (`PHOTOGRAPHY.md` §2A).
- **PASS:** headline/CTA/progress/decorative elements sit in the planned text-safe region; face and clinically relevant anatomy remain unobscured; treatment/device focal subject legible; crop preserves meaning; text-over-image is art-directed and contrast-valid.
- **FAIL:** headline/CTA/progress/decoration covering the face or clinical focal region; unplanned text-over-subject.
- **APPLIES TO:** every media composition, every context.
- **EVIDENCE:** rendered compositions at required contexts; crop-envelope notes for mobile-differing crops.

### ACTION-01 — Action system coherence
- **INTENT:** related actions read as one hierarchy (`COMPOSITION-CONTRACTS.md` §4).
- **PASS:** ≤1 primary action per surface view; secondaries relate spatially to the primary; no duplicate sticky+inline primaries without conversion-contract justification.
- **FAIL:** detached CTA island; competing primaries; CTA floating in unrelated negative space.
- **APPLIES TO:** every surface with actions.
- **EVIDENCE:** rendered action regions per context.

### FORM-01 — Field affordance
- **INTENT:** interactive fields are recognizable before interaction (`COMPONENT-INVENTORY.md` §3A).
- **PASS:** rest state visibly interactive (label/boundary/surface per Visual World); full state set present (rest/hover/focus/filled/invalid/disabled); labels, errors, values clear in every world.
- **FAIL:** field indistinguishable from static text before focus; error by color alone.
- **APPLIES TO:** all form controls.
- **EVIDENCE:** state captures in both Visual World samples, both directions.

### RESP-01 — Re-composition, not scaling
- **INTENT:** mobile is a re-composition (`LAYOUT-RESPONSIVE.md` §1; `PRESENTATION-CONTEXTS.md` §3).
- **PASS:** touch-context compositions change ordering/crop/density/navigation/action placement per the composition contract while preserving semantics; geometry consumes rails/zones per context.
- **FAIL:** `desktop layout × scale factor = mobile layout` (proportionally scaled desktop); width-only responsive thinking; context-forked components.
- **APPLIES TO:** every responsive composition.
- **EVIDENCE:** side-by-side desktop + touch-context captures demonstrating deliberate re-composition.

### TYPE-01 — Semantic typography
- **INTENT:** typography consumes semantic roles (`TYPOGRAPHY.md` §2).
- **PASS:** sizes/weights/line-heights map to roles + script tuning; cinematic roles (Hero/Scene Title) used only per their definitions.
- **FAIL:** arbitrary local font sizing used to solve composition; Latin letter-spacing conventions leaking into Persian; role proliferation outside admission.
- **APPLIES TO:** all text.
- **EVIDENCE:** rendered typography specimens per script direction.

### SPACE-01 — Semantic spacing
- **INTENT:** recurring spatial relationships consume semantic spacing (`DESIGN-TOKENS.md` §3A).
- **PASS:** component/page spacing consumes `space-*` primitives via the named relationship tokens (`space-content-group`, `space-media-copy`, …) wherever the relationship recurs; one-off composition decisions are explainable by the contract in one sentence.
- **FAIL:** unexplained local offset/margin (magic numbers); new raw values for recurring relationships.
- **APPLIES TO:** all layouts.
- **EVIDENCE:** rendered layout + spacing-relationship notes in the change description.

### PROGRESS-01 — Progress existence
- **INTENT:** persistent progress exists only when it materially improves orientation/comprehension/task completion (`SIGNATURE-PATTERNS.md` §17).
- **PASS:** a present progress control states its orientation benefit; subordinate placement; never overlaps focal subject; never competes with CTA; safe-area aware; direction-correct; understandable without decorative geometry.
- **FAIL:** decorative progress ornament; progress merged with scene advancement without justification.
- **APPLIES TO:** journeys, cinematic sequences, multi-step flows.
- **EVIDENCE:** rendered journey captures with/without-progress rationale in the change description.

### MOTION-01 — Motion intent
- **INTENT:** motion communicates state/continuity/hierarchy/experience intent (`MOTION-ICONOGRAPHY.md` §1–4).
- **PASS:** each animation answers "what does this communicate?"; motion originates from experience intent per the grammar chain; no layout shift; content never trapped behind failed animation.
- **FAIL:** animation existing only for spectacle; repeated generic entrance libraries as the primary language.
- **APPLIES TO:** all motion.
- **EVIDENCE:** recording/sequence evidence + reduced-motion captures.

### MEDICAL-01 — Signature ≠ efficacy
- **INTENT:** sensory treatment signature never implies outcome (`COMPOSITION-CONTRACTS.md` §8; `MEDICAL-TRUST-GOVERNANCE.md`).
- **PASS:** signature vocabulary renders as experiential language; evidence surfaces follow the governed Before/After contract; disclaimers present.
- **FAIL:** simulated efficacy/result (e.g. wrinkle-disappearing proof theatrics, guaranteed-outcome morphs, fabricated comparisons).
- **APPLIES TO:** treatment experience, evidence, marketing surfaces.
- **EVIDENCE:** rendered signature/evidence surfaces + copy review.

### SAFE-01 — Safe regions
- **INTENT:** primary content/actions respect applicable safe regions (`PRESENTATION-CONTEXTS.md` §4).
- **PASS:** no primary content/CTA/navigation collides with notch/cutout/home-indicator/gesture regions or browser chrome; submit reachable with keyboard open; full-bleed media under safe regions only where art-directed.
- **FAIL:** CTA or control collision with system exclusion regions; content trapped by chrome/keyboard.
- **APPLIES TO:** IPHONE_WEB/ANDROID_WEB compositions.
- **EVIDENCE:** touch-context captures including keyboard-open state for forms.

### BIDI-01 — Directional semantics
- **INTENT:** composition preserves semantic direction across RTL/LTR (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` Part A).
- **PASS:** logical start/end semantics throughout; directional UI mirrors; fixed-semantics content does not; mixed-script isolation correct.
- **FAIL:** physical left/right assumptions altering meaning; mirrored fixed-semantics content; un-isolated mixed-direction fragments.
- **APPLIES TO:** everything.
- **EVIDENCE:** RTL + LTR rendered pairs.

## 4. Applying the registry

- Reviews cite rule IDs with evidence paths; a FAIL blocks merge/release per `ENGINEERING-GOVERNANCE.md` §3.
- New rules enter via rationale-documented edit with the same five fields; retired rules are marked, never silently deleted.
- The validation harness (`/design-system`, spec in `docs/design-system/VALIDATION-HARNESS.md`) is the future standing surface where these rules are exercised continuously; until it exists, evidence is produced per-change.
