# CDI Production Visual Recovery 01

**Status:** READY FOR OWNER VISUAL REVIEW; Owner acceptance remains required
**Baseline:** `2ba412798f8fa0a85d2c3a5953aec2b1150ce696`
**Scope:** Home Hero, Treatment Discovery, and their visual/motion continuity only.

## Owner finding and authority

The first production slice passed its technical architecture checkpoint, but the Owner rejected its visual implementation. The rejection identified seven failures: Dark Cinematic was reduced mainly to a color theme; Hero became a conventional two-column composition; media became a rectangular content object; Treatment Discovery became a regular section; continuous-world behavior was not materially expressed; the experience lost ARGON's immersive spatial/editorial character; and Design System compliance was incorrectly treated as evidence of Art Direction compliance.

For this recovery, persisted ARGON is the rendered experience/art-direction reference. Its source, CSS, scripts, and assets remain prohibited from production reuse. Production architecture remains intact. The implementation uses a clearly disclosed abstract editorial illustration because no approved clinic/patient photography exists; it does not imply clinical evidence or a real care provider.

Canonical review distinguishes **DS_COMPLIANCE** (tokens, shared primitives, interaction/accessibility contracts) from **ART_DIRECTION_COMPLIANCE** (world continuity, media integration, spatial composition, typographic authority, motion/transition character, and clinic/treatment expression). Both are required. The governing rule is now in `docs/design-system/EXPERIENCE-DIRECTION.md` §7. This assessment is an engineering/art-direction review, not Owner acceptance.

## Rendered contexts

ARGON and the rejected production page were inspected in a real Chromium browser at 1440×900 desktop and 390×844 mobile. ARGON references include Persian RTL and English LTR. Recovered production was inspected at Persian RTL 1440×900, 390×844, 430×932, and English LTR 1440×900 and 390×844. Both the initial Hero and the Discovery region were captured. Browser emulation does not establish physical safe-area behavior.

See [`evidence/production-visual-recovery-01/README.md`](../../evidence/production-visual-recovery-01/README.md) for the evidence index and review sequence.

## Executive finding

The Home now presents a full-field editorial human-presence illustration rather than a boxed media panel. Copy and actions sit in an art-directed text-safe field; mobile crops are independently positioned for FA RTL and EN LTR. Hero and Discovery share a persistent media/light environment; a gradual surface change carries the field into Discovery, where published, capability-resolved paths appear as large editorial rows rather than cards. Native document flow and links remain intact; the anchor transition is smooth only when reduced motion is not requested. No scroll interception, client scene shell, or ARGON code is used.

The result materially restores the intended visual grammar and is ready for Owner review. The fixture is still an illustration rather than photography, so its evidence validates environment/crop/type relationships, not final photography quality. Owner visual acceptance is explicitly pending.

## Visual World fit

ARGON and the recovered reference fixture both use **Dark Cinematic**. The implementation consumes the existing registered world semantics and does not introduce a new theme or alter token mappings. Continuity is expressed through the media field, tonal depth, overlay, crop, and scene transition rather than changing the palette.

## Scene dispositions

| Element | Disposition | Recovery decision |
|---|---|---|
| Home Hero | REFACTOR | Preserve face-led editorial arrival and spatial authority; rebuild on shared CDI layout/action primitives with semantic server-rendered copy. |
| Treatment Discovery | REFACTOR | Preserve clear list discovery; render published paths from capability/content resolution as editorial rows, not fixed ARGON labels or generic cards. |
| Hero → Discovery | REFACTOR | Preserve continuous-world idea; sticky full-field media and graduated tonal field carry the same environment into the next scene using ordinary scrolling. |
| ARGON state-navigation architecture | REPLACE | Keep semantic URLs, native scroll, deep links, keyboard access, and browser history. |
| ARGON code and assets | RETIRE from production | They remain experimental reference material and are neither imported nor copied. |

## Side-by-side visual fidelity matrix

| Dimension | ARGON reference | Rejected production | Recovered production |
|---|---|---|---|
| Hero visual field | PASS — full viewport portrait/environment; desktop and mobile evidence | FAIL — ordinary page canvas with separated media panel | PASS — illustration occupies a full viewport field and continues behind the next region |
| Media integration | PASS — portrait is part of the spatial composition | FAIL — rectangular fixture object | PASS — edge-to-edge ambient field with crop and tonal overlays; fixture illustration limitation remains |
| Typographic authority | PASS — large editorial headline uses open negative space | PARTIAL — large type, but assigned to a conventional copy column | PASS — scale and line breaks form the text-safe editorial field in both scripts |
| Depth | PASS — portrait, light, and dark field layer together | FAIL — flat panel beside copy | PASS — layered subject, vignette, overlay, and persistent environmental field |
| Negative space | PASS — deliberate open field around text and portrait | FAIL — spacing belongs to page/grid structure, not the scene | PASS — open field separates text from focal subject; illustration makes final photography review pending |
| Action Zone | PARTIAL — legible actions, but prototype state navigation limits production semantics | PARTIAL — generic CTA pair below copy | PASS — shared ActionZone semantics expressed as integrated editorial text actions |
| Discovery presentation | PASS — clear hierarchy/list over the same environment | FAIL — standard section treatment | PASS — large editorial hierarchy and rows over the transitioning environment |
| World continuity | PASS — Hero and Treatment Discovery share portrait and atmosphere | FAIL — visible scene/section reset | PASS — sticky media and graduated tonal transition preserve one world |
| Motion / transition | PARTIAL — cinematic state transitions, but coupled to prototype navigation | FAIL — no deliberate scene transition | PASS — restrained image arrival, native smooth anchor progression, and reduced-motion static equivalent |
| Mobile recomposition | PASS — portrait-led composition persists at mobile size | FAIL — stacked conventional layout | PASS — dedicated FA/EN focal crops and bottom-weighted text/action composition at 390 and 430 widths |

## Design System compliance

The Hero uses the shared `Viewport`, `SafeArea`, `GlobalRail`, `ContentRail`, and `ActionZone` primitives and existing semantic type/action roles. Discovery still derives its content from the runtime content/capability provider and uses semantic lists and localized routes. No component contains clinic- or Visual-World-specific branches. Home remains a Server Component; the ambient image is decorative and all key content is semantic HTML. The production illustration is a separate fixture asset and is explicitly described as non-clinical validation media.

## Responsive, RTL/LTR, and continuity review

At 1440×900, text occupies the left editorial field in English and the opposite side in Persian while the portrait owns the other half of the environment. At 390×844 and 430×932, the media crop and copy/action composition are independently constrained; they are not a stacked desktop grid. `lang`/`dir` remain runtime-derived. Mobile focal positioning differs by locale to protect the copy field without duplicating components. Discovery retains the shared visual field, large type, and row rhythm; it does not revert to a card grid or generic background.

The continuity handoff is **PASS for this top-of-journey scope**: Hero → Discovery reads as the same environment moving to a new scene. Later Home regions are not part of this iteration and are not assessed here.

## Motion and reduced motion

The image field has a restrained arrival scale/opacity transition; the scroll cue draws attention toward Discovery; native anchor navigation can move smoothly. None conveys treatment efficacy or blocks reading. Under `prefers-reduced-motion: reduce`, the arrival/cue animation is removed and anchor scrolling becomes automatic; the same content, layout, action links, and environmental composition remain.

## Downstream regions

Treatment Information, Doctor, Technology, and Consultation were not redesigned. Their visual recovery is pending by design. The existing treatment and consultation routes/architecture remain unchanged.

## Technical and system gaps

No Design System gap was required. The former rejection was an implementation/art-direction failure: shared constraints had been treated as a ready-made visual composition. The recovery composes existing production primitives and the already canonical continuous-world direction. No semantic token mapping changed.

## Owner decisions and risks

- Owner visual acceptance is required; this document does not self-approve subjective quality.
- The illustrated profile proves media-as-environment composition only. Premium clinic photography, final crop art direction, and its fidelity remain to be reviewed when governed assets exist.
- Browser viewport evidence does not validate physical notch/gesture safe areas or browser chrome.
- Downstream visual treatment remains pending.

## Exit decision

**PRODUCTION_VISUAL_RECOVERY_READY_FOR_OWNER** for Home Hero, Treatment Discovery, and their continuity. No downstream visual implementation should begin until the Owner reviews the evidence package.
