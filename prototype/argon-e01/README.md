# ARGON E01

Status: **EXPERIMENTAL / NON-CANONICAL**

Purpose: An experience/design experiment used to validate CDI interaction, composition, treatment-signature, responsive, and visual-system hypotheses.

Authority: ARGON is evidence, not Design System or Product authority. Canonical authority remains `/DESIGN.md`, `docs/design-system/**`, `docs/governance/**`, `docs/architecture/**`, and `docs/product/**`.

If ARGON conflicts with a canonical CDI contract, the canonical contract wins.

Latest completed repair: **ARGON-LAYOUT-R1**

Validation status:

- `TECHNICAL_GATE: PASS`
- `VISUAL_GATE: OWNER_REVIEW_REQUIRED`

## Run locally

From the repository root:

```sh
python3 -m http.server 4178 --directory prototype/argon-e01
```

Open `http://localhost:4178/`. The prototype has no build step or runtime dependency.

## Experiment controls

- Wheel/trackpad, touch swipe, and the scene advance control navigate the fixed experience without document scrolling.
- Keyboard: Arrow keys navigate; `Home` and `End` jump to the beginning and consultation.
- The desktop masthead provides direct scene navigation. On mobile, use the scene advance control; the desktop section navigation is hidden.
- Treatment choices select a service; Laser enters the treatment experience, while the other entries remain discovery examples.
- Direct state links use `?state=hero`, `?state=treatments`, `?state=laser-event`, `?state=laserDetail`, `?state=doctor`, `?state=technology`, or `?state=consultation`. Add `&event=50` for the Laser midpoint, `&lang=en` for English, or `&reduced=1` for reduced motion.

Consultation data is not transmitted or stored. The clinician and clinic imagery are generated demo assets. Vazirmatn is bundled locally with its OFL license.

The ARGON-LAYOUT-R1 evidence is in `evidence/argon-layout-r1/`. It records implementation evidence only; it is not Owner visual acceptance.
