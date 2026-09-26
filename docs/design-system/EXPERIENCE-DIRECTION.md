# Experience Direction

**Class:** CANONICAL
**Change process:** ADR or explicit rationale-documented edit.
**Origin:** DESIGN-AMENDMENT-01 — amends the visual/art-direction principles of `DESIGN-SYSTEM-CONSTITUTION.md` §2–3 and `MOTION-ICONOGRAPHY.md` §1–4 based on Owner-reviewed visual research (PROTOTYPE-01 visually rejected; PROTOTYPE-01R research concluding in Owner-approved directional foundation). Prototype-specific palettes, geometry, imagery, or motion tokens are **not** canonicalized by this document.

---

## 1. Canonical experience direction

> **Cinematic Spatial Luxury × Continuous Scroll Journey × Medical Aesthetics**

The premium experience must not exist only in the Hero. The Hero establishes a visual world; primary homepage sections **evolve that world** rather than abruptly replacing it with a generic website. Luxury is delivered by craft — composition, architecture, cinematography, typography, pacing, motion, materiality, detail — never by decoration (no gold gradients, glow, particle effects, glassmorphism-by-default, generic Web3/tech-demo or crypto aesthetics).

The earlier principle *Clinical Precision × Quiet Luxury × Human Warmth* remains valid **and is hereby interpreted dynamically**: "Quiet Luxury" is restraint in *decoration*, not passivity in *experience*. Luxury may be cinematic, bold, immersive, and visually confident while remaining medically credible and calm enough for medicine.

## 2. Visual continuity contract

> **Above-the-fold luxury must not collapse after the Hero.**

The primary homepage journey reads as progression through **one art-directed environment**:

```text
Arrival → Enter → Discover → Treatments → Technology → Expertise → Evidence → Consultation
```

- **Avoid:** Hero → hard visual reset → generic white section → card grid → unrelated section.
- **Prefer:** staged evolution of the established world — shared surfaces, lighting logic, materiality, typographic scale relationships, and choreographed transitions between major stages.
- This defines **experience continuity, not implementation technology**: it does not require one continuous video, WebGL, scroll-hijacking, or any specific mechanism. Simplest-technology-wins applies (§4).
- Continuity applies to the homepage journey contract; inner pages (treatment detail, doctors, articles) follow their own archetype contracts while remaining inside the clinic's Visual World.

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

Motion may support: visual continuity · scene evolution · scroll choreography · depth · masking · controlled camera/crop movement · spatial transitions · typography transitions · media transformations · continuity between sections.

Avoid as the *primary* luxury language: generic repeated fade-up / slide-up / card-entrance / arbitrary parallax. Choreographed scene transitions are preferred to repeated per-element entrances.

**Constraints (unchanged in force):** `prefers-reduced-motion` delivers a coherent designed experience; no scroll-hijacking; no blocking of information access; motion must survive the accessibility contract. Implementation technology stays open — **WebGL/Three.js is not mandated**; prefer the simplest technology achieving the approved experience with acceptable performance and accessibility (`OPEN-DECISIONS.md` — motion library deferred).

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
