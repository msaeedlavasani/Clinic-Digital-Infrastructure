# ARGON Presentation R4 — Design System Audit

Scope: local demo audit and stabilization. This document is an experiment record; it does not amend CDI governance.

## A. Existing canonical rules reviewed

Sources reviewed in the canonical repository:

- `docs/design-system/DESIGN-SYSTEM-CONSTITUTION.md`
- `docs/design-system/DESIGN-TOKENS.md`
- `docs/design-system/TYPOGRAPHY.md`
- `docs/design-system/LAYOUT-RESPONSIVE.md`
- `docs/design-system/BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`
- `docs/design-system/MOTION-ICONOGRAPHY.md`
- `docs/design-system/CONTROLLED-VARIATION.md`
- `docs/design-system/EXPERIENCE-DIRECTION.md`
- `docs/design-system/VISUAL-WORLDS.md`
- `docs/design-system/COMPONENT-INVENTORY.md`
- `docs/design-system/PHOTOGRAPHY.md`
- `docs/design-system/SIGNATURE-PATTERNS.md`
- `docs/product/PAGE-ARCHETYPES.md` and `docs/product/UX-FLOWS.md`

Relevant written contracts:

- **Typography:** semantic Display, H1–H3, Title, Body Large, Body, Small, Caption and Label roles; Vazirmatn is the Persian family. Persian sizing, weight and leading follow Persian metrics, with body leading around 1.8 and no Latin tracking or uppercase assumptions. The documented role ranges include Display 40–72px, H1 32–48px, H2 26–36px, Body 15–17px, Small 13–15px, Caption 12–13px and Label 13–15px.
- **Layout and responsive behavior:** mobile-first composition, no horizontal overflow, symmetric 16px mobile gutters and 24–32px desktop gutters, readable text containers around 640–720px, and meaningful mobile adaptation rather than scaled desktop composition.
- **RTL/accessibility:** direction follows locale; use logical properties and isolate mixed-direction content; honor safe areas where relevant; controls have at least 44×44px targets; keyboard access, visible focus, AA contrast and reduced-motion behavior remain required.
- **Motion:** motion communicates a state change; use the smallest suitable implementation, avoid scroll hijacking, and provide reduced motion. The system describes micro, standard and section transition timing ranges but does not define this demo’s treatment event.
- **Experience and visual worlds:** cinematic/spatial journeys, image and typography composed together, and controlled expression within clinic worlds are permitted. Dark Cinematic is an existing visual-world family; black or dark mineral styling is not itself a violation.
- **Components and variation:** the canonical library covers navigation, buttons, treatment facts, clinician profiles, consultation and mobile navigation patterns. It does not define ARGON’s fixed seven-state, full-screen navigation shell or a persistent scene-progress cluster.

## Audit matrix

| Concern | Canonical rule | ARGON implementation | Status | Classification | Action |
| --- | --- | --- | --- | --- | --- |
| Persian semantic typography | Vazirmatn and Persian role metrics; no Latin tracking | Earlier scene CSS used Georgia/system stacks and positive tracking in several visitor-facing roles | Corrected locally; live computed Persian family is Vazirmatn | IMPLEMENTATION_VIOLATION | Added role tokens, Persian family mapping, zero tracking and Persian line-height overrides |
| Desktop information hierarchy | Use semantic roles and readable text measures | Microcopy and secondary roles were too small in the prior implementation | Corrected locally within documented Body/Small/Caption/Label ranges | IMPLEMENTATION_VIOLATION | Mapped scenes and controls to shared local semantic tokens |
| Portrait mobile composition | Mobile-first, deliberately composed; 16px gutters; avoid compressed desktop | Prior treatment facts, doctor and technology scenes retained desktop positioning/crop | Corrected locally in each scene | IMPLEMENTATION_VIOLATION | Reflowed facts, integrated clinician portrait/copy, repositioned clinic image and built a consistent 3-cell mobile header |
| Technology recognition on mobile | Media must serve the scene and communicate its subject | A suitable treatment-room image was cropped to an ambiguous device fragment | Corrected locally; asset itself is suitable | IMPLEMENTATION_VIOLATION | Changed mobile focal position and composition to show device and room together |
| Doctor portrait relationship | Photography and typography compose together; profile patterns are canonical | Portrait was visually detached from adjacent copy on mobile | Corrected locally | IMPLEMENTATION_VIOLATION | Reorganized portrait and text into one vertical editorial composition with dedicated continuation space |
| Bottom progress/previous/next cluster | Canonical controls and target sizes exist; exact persistent chapter cluster is not specified | ARGON added a floating persistent progress/previous/next control group that collided with subject and CTA | Removed from this experiment | PROTOTYPE_INVENTION | Removed the invented cluster; kept contextual CTAs with the active scene |
| Full-screen state shell | Experience Direction supports cinematic continuity; no full-screen discrete-state/wheel-navigation contract is written | ARGON uses a fixed stage, state changes and intercepted wheel/touch progression | Functional local experiment; governance contract absent | SYSTEM_GAP | Keep local and disposable; candidate future amendment only in section G |
| Mobile safe-area and action zone in a fixed stage | Safe-area handling is required where relevant; exact fixed-stage bottom-zone pattern is not specified | Previously scene CTAs and controls shared the bottom safe-area region | Corrected locally; exact reusable pattern remains undefined | SYSTEM_GAP | Apply env safe-area padding and keep persistent progress removed; later define a full-stage action-zone rule if adopted |
| Laser light/focus effect | Motion must support meaning; avoid spectacle and preserve medical neutrality | Previous narrow transient effect read as lightning; first R4 CSS focus layer was visually ineffective over the WebGL canvas | Replaced by a state-driven focus plane in the existing renderer, with CSS fallback | IMPLEMENTATION_VIOLATION | Use local contrast/illumination over the unchanged portrait; no beam object, outcome change or treatment simulation |
| Treatment/doctor/clinic source assets | Photography should be art-directed and relevant | Existing portrait and clinic-room/device sources are fit for their roles | No source-asset defect found in reviewed demo media | CONTENT_ASSET_PROBLEM | None; corrected crops and spatial relationships locally |
| Exact typography/layout roles for immersive scenes | Semantic type roles exist, but no dedicated full-screen stage grid/role map is specified | The prototype previously inferred its own fixed-stage placement and bottom zones | Partially specified by local semantic mapping; canonical immersive-stage grid absent | SYSTEM_GAP | Keep the local mapping documented; do not treat its geometry as canonical |

## B. Implementation violations found

- Persian text did not consistently inherit Vazirmatn and Persian-native tracking/leading.
- Desktop microcopy and secondary hierarchy were inconsistently sized.
- Mobile compositions reused desktop grid/crop assumptions instead of prioritizing each scene.
- The technology asset’s mobile crop hid the clinic context and made the equipment unclear.
- The doctor portrait and copy did not form a single mobile composition.
- The previous Laser implementation did not communicate controlled optical focus reliably and included an ineffective overlay path over the active WebGL canvas.

## C. Prototype inventions found

- The persistent right/bottom scene index plus previous/next controls was a local presentation harness pattern, not a canonical CDI component. It competed with content and has been removed. Scene continuation is now contextual.

## D. System gaps found

- Canonical documents do not define a discrete, fixed-stage state-navigation model with wheel/touch input for a cinematic clinic experience. Existing experience guidance supports continuity but does not specify this interaction contract.
- Canonical safe-area guidance exists, but an action/navigation-zone contract for full-screen, non-document-scrolling scenes is not defined.
- Canonical type roles exist, but a full-stage grid for balancing type, photography, touch controls and persistent masthead across cinematic scenes is not defined.

## E. Content / asset problems found

- No image source itself was found to be the cause of the reported doctor or technology failures. The doctor portrait is usable and deployment-appropriate; the treatment-room image communicates both equipment and environment when composed with the updated crop.
- No new source media was introduced.

## F. Local ARGON corrections made

- Mapped Persian visitor-facing text to Vazirmatn with shared semantic size roles, Persian-specific weights/leading and neutral letter spacing. Preserved the ARGON Latin wordmark treatment.
- Re-composed each mobile scene around its primary content; treatment facts are a compact vertical list, doctor image/copy are grouped, and the technology image shows the clinic and device together.
- Replaced the prior Laser effect with a moving focus plane in the existing canvas renderer. It briefly changes local contrast and illumination over the same portrait; the portrait does not change medically. The renderer remains state-driven and idles between updates. CSS is the fallback when WebGL is unavailable.
- Removed the persistent scene-progress/previous/next cluster. Contextual scene actions remain touch and keyboard accessible.
- Kept the three-cell mobile header, logical gutters, dynamic viewport sizing and safe-area insets.

### Mobile scene composition record (390×844)

| State | Primary subject | Primary message | Primary action | Secondary information | Persistent controls | Safe-area allocation |
| --- | --- | --- | --- | --- | --- | --- |
| Hero | Partial face | Premium skin, hair and aesthetic clinic | Explore services / request consultation | Short proposition | Three-cell header | Hero actions above bottom inset |
| Treatments | Treatment selector | Available clinic services | View selected treatment | One-line treatment context | Header only | Content centered between header and lower inset |
| Laser event | Face and moving focus field | Controlled optical focus | Continue to treatment information | Laser title/copy after event | Header only | Copy/action remains within content region |
| Laser information | Treatment title and concise facts | Assessment-led treatment information | Consultation request | Provider and technology links | Header only | Single content block above lower inset |
| Doctor | Clinician portrait | Care begins with assessment/conversation | Explore technology and setting | Specialty, statement and demo disclosure | Header only | Copy/CTA ends above lower inset |
| Technology | Treatment room and visible device | Environment and technology support care | Request consultation | Demo-safe qualifier | Header only | Copy/action anchored above lower inset |
| Consultation | Request form | End action of the journey | Submit demo request | Local-only disclosure and contact routes | Header only | Form ends above lower inset; dynamic viewport used |

## G. Candidate future canonical amendments (recommendation only)

- Define when a clinic experience may use a fixed-stage, discrete state model; specify direct navigation, wheel/touch behavior, focus handling and an escape path without requiring document-scroll hijacking.
- Add an immersive-scene layout recipe covering mobile header geometry, safe-area/content/action zones, minimum readable type roles and image/text composition.
- Clarify when progress markers are justified and how they must coexist with the primary action and protected visual subject.
- No recommendation here canonizes the ARGON colors, imagery, exact local type scale or Laser signature.

## Local verification record

- Live browser viewport used for desktop: 1440×900; mobile emulation: 390×844.
- Persian font check: `document.fonts.check('16px Vazirmatn')` returned true; computed hero, scene, body, navigation and CTA families resolve to `Vazirmatn, Tahoma, sans-serif` in FA mode.
- Horizontal overflow: none in captured desktop/mobile states. Home reset from Treatments, Laser, Laser Information, Doctor, Technology and Consultation returned `data-scene="hero"`, `scrollY === 0`, no hash, no active editorial scene and no residual focus opacity. Keyboard, wheel and emulated touch each advanced a scene without document movement.
- Browser console/runtime/network errors: none observed during the capture run.
- Mobile evidence is browser device emulation; a physical iPhone was not available for this verification pass.
