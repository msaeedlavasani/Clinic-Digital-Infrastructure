# Experience Direction

**Class:** CANONICAL
**Change process:** ADR or explicit rationale-documented edit.
**Origin:** DESIGN-AMENDMENT-01; runtime progression clarified by EXPERIENCE-RUNTIME-CONTRACT-01 — amends the visual/art-direction principles of `DESIGN-SYSTEM-CONSTITUTION.md` §2–3 and `MOTION-ICONOGRAPHY.md` §1–4 based on Owner-reviewed visual research (PROTOTYPE-01 visually rejected; PROTOTYPE-01R research concluding in Owner-approved directional foundation). Prototype-specific palettes, geometry, imagery, or motion tokens are **not** canonicalized by this document.

---

## 1. Canonical experience direction

> **Cinematic Spatial Luxury × Persistent Scene Journey × Medical Aesthetics**

The premium experience must not exist only in the Hero. A bounded persistent Experience Stage presents transformable Scenes inside one Clinic World; Scene progression, not document section position, defines the cinematic journey. The Stage evolves composition, media, focal placement, typography, depth, light/material, navigation, and action relationships rather than resetting into generic stacked sections. Luxury is delivered by craft — composition, cinematography, typography, pacing, motion, materiality, detail — never by decoration (no gold gradients, glow, particle effects, glassmorphism-by-default, generic Web3/tech-demo or crypto aesthetics). The technology-neutral contract is `docs/architecture/EXPERIENCE-RUNTIME-CONTRACT.md`.

The earlier principle *Clinical Precision × Quiet Luxury × Human Warmth* remains valid **and is hereby interpreted dynamically**: "Quiet Luxury" is restraint in *decoration*, not passivity in *experience*. Luxury may be cinematic, bold, immersive, and visually confident while remaining medically credible and calm enough for medicine.

## 2. Visual continuity contract

> **Above-the-fold luxury must not collapse after the Hero.**

The primary cinematic journey reads as progression through **one persistent art-directed environment**:

```text
Entry/Home → Discovery → Treatment Entrance → Treatment Signature
                         Stage release / handoff
                    Information → Evidence → Doctor → Consultation
```

- **Avoid:** Hero → hard visual reset → generic white section → card grid → unrelated section.
- **Prefer:** staged evolution of the established world — shared surfaces, lighting logic, materiality, typographic scale relationships, and choreographed transitions between major stages.
- Scene progression is the primitive; scroll is only one possible bounded input and document section position does not define the cinematic Scene sequence.
- The Experience Stage is bounded and hands off to semantic Editorial Information Mode; it does not span the entire application or cinematicize information-dense content.
- This defines **experience continuity, not implementation technology**: it does not require one continuous video, WebGL, scroll-hijacking, or any specific mechanism. Simplest-technology-wins applies (§4).
- Direct route entry, semantic content, accessibility, and browser history do not require replaying or completing cinematic Scenes. The full contract is `docs/architecture/EXPERIENCE-RUNTIME-CONTRACT.md`.

## 3. Experience DNA vs Visual World

Two layers, deliberately separated:

### 3.1 Stable Experience DNA (shared by all clinics — Core)

- cinematic · premium · spatial · art-directed · continuous
- restrained but distinctive
- medical authority
- strong photography/cinematography
- deliberate typography
- choreographed motion
- human + architecture + medicine + technology
- mobile-aware
- accessible (WCAG 2.1 AA floor unchanged)

### 3.2 Configurable Visual World (clinic-selected — Clinic Expression)

- palette · materiality · lighting · photographic grading · image treatment
- contrast strategy
- approved typography expression **within** the type system (roles/limits fixed; expression varies)
- selected hero composition (Controlled Variation axes)
- controlled motion expression (within the motion contract)
- section emphasis

**A clinic must be capable of looking materially different without forking the Experience Engine.** The Visual World selection is a provisioning choice (`CLINIC-PROVISIONING.md` §2), mapped into semantic tokens and approved variants — the same mapping discipline as the theme contract (`COLOR-THEMING.md` §2), extended with materiality/lighting/motion-expression dimensions.

## 4. Motion principle (amended)

Previous principle: *"Motion is precision, not entertainment."* — retained restraint, **amended** because it was interpreted too conservatively:

> **Motion is part of CDI Art Direction and spatial storytelling, not decorative animation.**

Motion may support: visual continuity · Scene evolution · bounded progression inputs · depth · masking · controlled camera/crop movement · spatial transitions · typography transitions · media transformations · Stage release/handoff. Scroll can be an input, but is not the Scene primitive.

Avoid as the *primary* luxury language: generic repeated fade-up / slide-up / card-entrance / arbitrary parallax. Choreographed scene transitions are preferred to repeated per-element entrances.

**Constraints (unchanged in force):** `prefers-reduced-motion` delivers the same Scene model and coherent designed experience; no full-page scroll hijacking or Stage trapping; no blocking of information access; motion must survive the accessibility contract. Implementation technology stays open — **WebGL/Three.js is not mandated**; prefer the simplest technology achieving the approved experience with acceptable performance and accessibility (`OPEN-DECISIONS.md` — motion library deferred).

## 5. Media / art direction

The approved experience is grounded in the **clinic world**: exceptional clinic architecture · doctors · patients/models where appropriate · natural skin · treatment environments · medical/aesthetic technology · materials · lighting · consultation · evidence.

Avoid: perfume-advertising abstraction · jewelry-advertising luxury · nightclub register · generic spa/wellness · abstract digital art as filler.

Photography remains governed by `PHOTOGRAPHY.md` (categories, qualities, Before/After evidence rules); this amendment raises the *expected bar* — photography and cinematography are first-class art direction, with image crop/composition designed together with typography, not inserted as rectangles after layout.

## 6. Relationship to prior contracts

- `DESIGN-SYSTEM-CONSTITUTION.md` §2 experience language: retained, reinterpreted per §1 here.
- §3 anti-aesthetics: unchanged and reinforced (spectacle-vs-decoration distinction now canonical here).
- `COLOR-THEMING.md` theme families: **superseded as a closed set** by the Visual Worlds model (`VISUAL-WORLDS.md`); the semantic-token mapping contract itself is unchanged.
- `CONTROLLED-VARIATION.md` axes: unchanged; Visual World selection joins the Theme axis as its governing model.
- `MOTION-ICONOGRAPHY.md`: motion philosophy amended per §4 here; that document's reduced-motion and directional rules remain binding.

## 7. Art-direction acceptance

> **Design System compliance does not imply Art Direction compliance.**

Visual review evaluates both independently. A screen must use canonical tokens, components, geometry, and accessibility contracts, and must also express the approved experience direction. Art-direction review considers world continuity, media integration, spatial composition, typographic authority, motion and transition character, and clinic/treatment expression. Correct component usage alone cannot establish visual acceptance; rendered evidence and Owner judgment remain required for subjective acceptance.
