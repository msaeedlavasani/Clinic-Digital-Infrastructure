# Photography

**Class:** CANONICAL
**Change process:** Rationale-documented edit; Before/After rules bind implementation.

---

## 1. Status

Photography is part of the Design System. Direction: **natural, credible, people-centered** — fake perfection is an anti-pattern. Subject to `MEDICAL-TRUST-GOVERNANCE.md` throughout; Before/After additionally binds `SIGNATURE-PATTERNS.md` §4.

## 2. Categories

| Category | Content | Typical use |
|---|---|---|
| **Clinic** | architecture, environment, equipment | About, Contact, trust moments |
| **Doctor** | professional portrait, working context | Doctors, Doctor Detail, treatment pages |
| **Treatment** | procedure, technology, details | Treatment Detail, Services |
| **Human** | natural patient moments | warmth/editorial moments |
| **Editorial** | brand/storytelling imagery | Hero (Editorial/Immersive), About |
| **Before/After** | evidence-oriented clinical comparison | Before/After surfaces — evidence rules (§4) |

## 2A. Media composition contract (added DESIGN-SYSTEM-VNEXT-01)

Photography gains spatial semantics binding art direction to layout (`COMPOSITION-CONTRACTS.md`; enforced by `DESIGN-QA.md` MEDIA-01):

| Concept | Meaning |
|---|---|
| **FOCAL SUBJECT** | what the image is *of* — face, clinically relevant anatomy, treatment/device, environment subject |
| **PROTECTED SUBJECT REGION** | the region that must remain unobscured and legible across crops/overlays (face; clinical focal region) |
| **TEXT-SAFE REGION** | the planned region where text/controls may sit (calm field, veil, grading) |
| **CROP ENVELOPE** | the allowed crop range per context that preserves subject meaning — mobile crop may differ **materially** from desktop crop, deliberately |
| **CONTRAST REGION** | the tonal region guaranteeing AA contrast for text/controls placed on the image |

Rules:

- Text placement is planned **with** photography at art-direction time, never improvised after layout; intentional text-over-image compositions are allowed and must be art-directed + contrast-valid.
- A composition fails when a headline, CTA, progress control, or decorative element **unintentionally** competes with or obscures the focal subject.
- `object-fit: cover` is implementation behavior, **not** art direction — the crop envelope, not the CSS property, decides what the viewer sees.
- Medical/human imagery: the face may be a protected subject region; clinically relevant anatomy protected; treatment/device focal subjects must remain legible; crop must preserve intended meaning (e.g. an evidence comparison never crops away the comparison region).

## 3. Preferred qualities & prohibitions

**Preferred:** natural skin texture · restrained retouching · soft controlled light · credible environments · consistent grading per clinic theme · diversity appropriate to the clinic's audience · high-quality composition.

**Avoid:** fake perfection · excessive retouching · generic stock-beauty clichés · deceptive Before/After lighting/composition · atmosphere that intimidates (generic-hospital anti-aesthetic).

## 4. Before/After visual contract

Before/After imagery is **evidence, not theatre**. Presentation requirements:

1. **Clear Before / After labels** — explicit, localized, never implied.
2. **Comparison interaction** — slider or clearly paired imagery (`SIGNATURE-PATTERNS.md` §4); comparison method consistent clinic-wide.
3. **Treatment metadata** — treatment shown; associated doctor; where relevant session count/timeframe context.
4. **Disclaimer** — individual results vary; localized; present wherever cases display.
5. **State dependency** — only cases in `PUBLISHED` state display (`MEDICAL-TRUST-GOVERNANCE.md` §4); presentation depends on consent-verified publication, never raw marketing assets.
6. **No theatrical effects** — no dramatic lighting/filter/zoom effects that reduce evidentiary clarity; no implied guarantee of identical results (Foundation §2.1 medical trust); no deceptive composition.

## 5. Locale & direction

- Photography is **semantically fixed** content — never mirrored with direction (chronology/labeling determines meaning; `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §A.3), except Before/After ordering which follows its own evidence-first rules (§4 above; interaction direction semantics in `SIGNATURE-PATTERNS.md` §4).
- Imagery may vary per locale where a locale genuinely needs different imagery (`LOCALIZATION-FOUNDATION.md` §2); grading stays consistent within a theme.
- Alt text: meaningful and localized (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §C.3); decorative imagery hidden from assistive tech.
