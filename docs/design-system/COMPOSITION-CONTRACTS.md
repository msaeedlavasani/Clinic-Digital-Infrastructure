# Composition Contracts

**Class:** CANONICAL
**Change process:** Contract changes or additions = rationale-documented edit; changes that alter a pattern's admission boundary require ADR.
**Origin:** DESIGN-SYSTEM-VNEXT-01 — adds the composition-contract layer between tokens/patterns and page implementation (see `DESIGN.md` architecture map).

---

## 1. Purpose and status

Composition contracts define **how each major experience surface is composed** — its subject, hierarchy, media relationship, action relationship, and per-context behavior — while leaving the literal visual design to prototyping and clinic variation. They are contracts, **not frozen page templates**: every contract coexists with Controlled Variation (`CONTROLLED-VARIATION.md`), and a clinic's identity must still vary materially within them.

A composition contract answers: *what must this surface accomplish spatially, and what may never happen to it?* It does not answer: *what does it look like?*

Failure classification: an implementation that invents geometry or composition this document does not authorize, outside an admitted experimental exception, is a design-system violation (`AGENT-CONTRACT.md` §6).

## 2. Composition-stage / page geometry model

Every contract below composes from these semantic geometry authorities (`LAYOUT-RESPONSIVE.md` §2A defines their token mapping):

```text
Viewport
  └── Safe Area                    exclusion region: notch/cutout/home-indicator/browser/system chrome
      └── Composition Stage / Page
          ├── Global Rail          persistent alignment authority shared by major elements
          ├── Content Rail         primary text alignment + readable-measure authority
          ├── Media Rail           authority for visual subjects / bleed
          ├── Action Zone          reserved spatial relationship for primary/secondary actions
          └── Navigation Zone      navigation / justified progress controls
```

- **Global Rail** — the page-level alignment spine (one per composition direction). Major stage landmarks (titles, media frames, action groups) align to it unless a contract deliberately breaks it as art direction.
- **Content Rail** — binds primary text to readable measure (`container-text`, all locales, both directions — `LAYOUT-RESPONSIVE.md` §3).
- **Media Rail** — governs where visual subjects sit and how far media may bleed (`container-editorial`/`container-full`; text never exceeds Content Rail inside a bleed).
- **Action Zone** — the spatial relationship where a decision's actions live (§4 below; not a fixed screen slot).
- **Navigation Zone** — where navigation and justified progress controls live; subordinate to content (`AGENT-CONTRACT`-governed existence rule in `DESIGN-QA.md` PROGRESS-01).
- **Safe Area** — physical/browser/system exclusion region (`PRESENTATION-CONTEXTS.md` §4.1); content/actions respect it.

These are **semantic authorities, not coordinates**: compositions do not force all elements onto identical positions. Two clinics (or two pages) may place their Media Rail differently; both must be able to name which authority each element consumes.

Here, **Composition Stage** means the spatial rails/zones of one composition. It is not the bounded persistent **Experience Stage** that hosts cinematic Scene progression; that runtime contract is defined in `../architecture/EXPERIENCE-RUNTIME-CONTRACT.md`.

## 3. Contract format

Each contract states: PURPOSE · PRIMARY SUBJECT · PRIMARY MESSAGE · HIERARCHY · CONTENT ANCHOR · MEDIA RELATIONSHIP · TEXT-SAFE REGION · ACTION RELATIONSHIP · NAVIGATION RELATIONSHIP · context behaviors (DESKTOP_WEB / IPHONE_WEB / ANDROID_WEB) · RTL/LTR behavior · ALLOWED VARIATION · FORBIDDEN FAILURE MODES. Context shorthand: D / I / A.

## 4. Shared action-zone relationship (applies to every contract)

```text
CONTENT
  ↓  semantic action gap (space-action)
PRIMARY ACTION            ≤1 per surface view (SIGNATURE-PATTERNS.md §7)
  ↓
RELATED SECONDARY ACTIONS  one action system with the primary
  ↓
SAFE BOUNDARY              never colliding with safe regions (SAFE-01)
```

Forbidden across all contracts: detached CTA islands; CTAs floating in unrelated negative space; primary actions competing with navigation; duplicated sticky + inline primary actions without a justified conversion contract (`SIGNATURE-PATTERNS.md` §9 mobile conversion rules).

## 5. The contracts

### 5.1 Hero

- **PURPOSE:** establish the Visual World and the clinic's positioning in one cinematic statement; launch the continuous Scene journey inside the persistent Experience Stage (`EXPERIENCE-DIRECTION.md` §2; `architecture/EXPERIENCE-RUNTIME-CONTRACT.md`).
- **PRIMARY SUBJECT:** the positioning statement (typography-led) **or** an art-directed media field (immersive) — per Hero family (`CONTROLLED-VARIATION.md` §5.1).
- **PRIMARY MESSAGE:** who the clinic is, in patient language, medical register.
- **HIERARCHY:** Hero/Display statement → supporting lede → discovery affordance/primary CTA.
- **CONTENT ANCHOR:** statement locked to Content Rail; never centered-by-default drift.
- **MEDIA RELATIONSHIP:** media field may full-bleed (Media Rail); imagery art-directed with typography, not a rectangle behind text (`PHOTOGRAPHY.md` §2A).
- **TEXT-SAFE REGION:** statement and CTA sit in a contrast-valid region (veil/grading or calm field); MEDIA-01 applies to the focal subject.
- **ACTION RELATIONSHIP:** ≤1 primary CTA; discovery affordance is part of the same action system (§4).
- **NAVIGATION RELATIONSHIP:** none inside the Hero beyond the persistent header.
- **D:** generous stage-pad; media/typography balance per family. **I/A:** portrait re-composition; statement remains the anchor; CTA above safe bottom boundary; crop per media contract.
- **RTL/LTR:** mirrored rail alignment; typography per script; media semantics fixed.
- **ALLOWED VARIATION:** Hero families; media/typography dominance; Visual World expression.
- **FORBIDDEN:** hero→hard-reset continuity break; decorative glow/gradient theatrics; CTA colliding with home indicator; headline covering focal subject; two primary CTAs.

### 5.2 Treatment Discovery (ConcernExplorer surface / Services entry)

- **PURPOSE:** patient-language discovery — start from concern/goal, not internal taxonomy.
- **PRIMARY SUBJECT:** the concern space (categories → concerns) as structured content.
- **PRIMARY MESSAGE:** «چه چیزی دوست دارید بهبود پیدا کند؟» register; guidance, not diagnosis (`SIGNATURE-PATTERNS.md` §1).
- **HIERARCHY:** prompt → categories → concerns → related-options pathway.
- **CONTENT ANCHOR:** explorer anchored in Content Rail; categories form one navigation system.
- **MEDIA RELATIONSHIP:** optional per-category imagery, subordinate to labels.
- **TEXT-SAFE REGION:** option labels never overlaid by decorative media.
- **ACTION RELATIONSHIP:** concern selection is the interaction; consultation remains a calm side-path, never a gate (`UX-FLOWS.md` §1).
- **NAVIGATION RELATIONSHIP:** breadcrumb/section context allowed; no progress ornament.
- **D:** may render as editorial explorer composition. **I/A:** re-composed as stacked disclosure/selection list; 48×48 interaction envelope (`COMPONENT-INVENTORY.md` §3A).
- **RTL/LTR:** selection affordances follow direction; content is text-first, direction-agnostic.
- **ALLOWED VARIATION:** presentation family; category emphasis; density.
- **FORBIDDEN:** diagnosis language; automatic suitability claims; card-grid anti-pattern; hiding concerns behind decorative imagery.

### 5.3 Treatment Experience (signature/cinematic treatment moment)

- **PURPOSE:** the treatment's sensory signature — experiential identity inside the journey (`§6` signature rules).
- **PRIMARY SUBJECT:** the signature scene (media/choreography-led).
- **PRIMARY MESSAGE:** the treatment's sensory vocabulary — **never** an outcome claim (`MEDICAL-TRUST-GOVERNANCE.md`).
- **HIERARCHY:** scene identity (Scene Title) → sensory signature → pathway to Treatment Information.
- **CONTENT ANCHOR:** Scene Title + one line bound to Content Rail within the scene.
- **MEDIA RELATIONSHIP:** media is the composition's core (Media Rail full authority); text is art-directed into the text-safe region.
- **TEXT-SAFE REGION:** planned with photography/cinematography; never improvised over a focal subject.
- **ACTION RELATIONSHIP:** optional single continuation affordance (to information/evidence); ≤1 primary.
- **NAVIGATION RELATIONSHIP:** journey continuity per the full-stage grammar (`SIGNATURE-PATTERNS.md` §16); persistent progress only if PROGRESS-01 justifies it.
- **D:** full cinematic treatment. **I/A:** signature moment re-composed for portrait; safe-area-aware; reduced-motion static per §6 rules.
- **RTL/LTR:** mirrored choreography directions; media fixed semantics.
- **ALLOWED VARIATION:** treatment signature vocabulary; Visual World motion expression; scene duration.
- **FORBIDDEN:** efficacy simulation; wrinkle-disappearing proof theatrics; content trapped behind failed animation; progress ornament; scroll-hijacking.

### 5.4 Treatment Information (facts/education surface)

- **PURPOSE:** medically governed explanation — the credibility core of a treatment page.
- **PRIMARY SUBJECT:** TreatmentFacts + explanatory sections (`SIGNATURE-PATTERNS.md` §2–3).
- **PRIMARY MESSAGE:** what the treatment is, typical shape, honest boundaries.
- **HIERARCHY:** treatment identity → facts → explanation (overview/how it works/journey) → boundaries (risks/care).
- **CONTENT ANCHOR:** body copy in Content Rail / `container-text`, every locale.
- **MEDIA RELATIONSHIP:** explanatory imagery subordinate to facts; no evidence theatre.
- **TEXT-SAFE REGION:** n/a (editorial mode surfaces are text-led).
- **ACTION RELATIONSHIP:** consultation CTA in Action Zone relationship (§4); contextual, calm.
- **NAVIGATION RELATIONSHIP:** related-treatment links woven, not dumps.
- **D:** editorial two-region compositions allowed. **I/A:** single-column re-composition; facts remain scannable.
- **RTL/LTR:** logical layout; numerals via central formatting; mixed-script isolation (`TYPOGRAPHY.md` §6).
- **ALLOWED VARIATION:** Service Presentation families; section selection/emphasis per content.
- **FORBIDDEN:** guaranteed-result framing; missing-state filler ("N/A" noise); truncation of risks/consents; data-table aesthetic drift.

### 5.5 Doctor

- **PURPOSE:** clinician credibility and fit.
- **PRIMARY SUBJECT:** the doctor — portrait/working context (`PHOTOGRAPHY.md` §2 Doctor category).
- **PRIMARY MESSAGE:** identity, title, verifiable credentials, approach.
- **HIERARCHY:** portrait → identity/title → credentials → treatment areas → related evidence → consultation.
- **CONTENT ANCHOR:** identity block anchored to Content Rail beside/over the portrait per presentation family.
- **MEDIA RELATIONSHIP:** portrait is a protected subject region — text never obscures the face (MEDIA-01).
- **TEXT-SAFE REGION:** credential text on calm/tonal region; art-directed overlay allowed with validated contrast.
- **ACTION RELATIONSHIP:** consultation with this doctor where clinically meaningful; ≤1 primary.
- **NAVIGATION RELATIONSHIP:** team context (index/back) contextual.
- **D:** Profile family may use two-region composition. **I/A:** portrait-led stack; credentials below.
- **RTL/LTR:** mirrored; credentials never depend on direction-specific layout.
- **ALLOWED VARIATION:** Doctor Presentation families; evidence-forward emphasis.
- **FORBIDDEN:** product-card treatment; fabricated prestige/badges; face-covering text; service-inventory reduction.

### 5.6 Technology / Environment

- **PURPOSE:** clinical substance through environment and technology — trust via authenticity.
- **PRIMARY SUBJECT:** the clinical environment / technology in working context.
- **PRIMARY MESSAGE:** capability and standards, shown not claimed.
- **HIERARCHY:** environment/technology media field → concise capability statement → optional protocol detail.
- **CONTENT ANCHOR:** statement in Content Rail; media in Media Rail.
- **MEDIA RELATIONSHIP:** focal subject = device/room; crop must keep the technology legible (crop envelope).
- **TEXT-SAFE REGION:** capability text on calm region of the media field.
- **ACTION RELATIONSHIP:** pathway onward (treatments/consultation), subordinate.
- **NAVIGATION RELATIONSHIP:** journey continuity; no standalone progress.
- **D:** wide editorial compositions. **I/A:** vertical media rhythm; device detail preserved in crop.
- **RTL/LTR:** media fixed; statement mirrored.
- **ALLOWED VARIATION:** emphasis/density; world lighting expression.
- **FORBIDDEN:** generic stock-equipment cliché; institutional ambience; decorative tech-glow.

### 5.7 Evidence

- **PURPOSE:** legitimate outcome evidence — governed Before/After and clinical context.
- **PRIMARY SUBJECT:** the governed case (imagery is evidence, `PHOTOGRAPHY.md` §4).
- **PRIMARY MESSAGE:** honest, contextualized result presentation.
- **HIERARCHY:** comparison → metadata (treatment/doctor/session context) → disclaimer.
- **CONTENT ANCHOR:** metadata/disclaimer in Content Rail adjacent to the comparison.
- **MEDIA RELATIONSHIP:** comparison imagery never mirrors, never theatrically filtered; interaction follows locale direction (`SIGNATURE-PATTERNS.md` §4).
- **TEXT-SAFE REGION:** labels never overlap the clinical comparison region.
- **ACTION RELATIONSHIP:** consultation low-pressure, evidence-adjacent.
- **NAVIGATION RELATIONSHIP:** case filters/index contextual.
- **D:** slider/paired compositions at editorial width. **I/A:** paired/stacked precedence; comparison understandable without interaction (evidence-first).
- **RTL/LTR:** interaction direction follows locale; imagery semantics fixed.
- **ALLOWED VARIATION:** density; gallery emphasis.
- **FORBIDDEN:** dramatic filters/zoom; implied guarantees; interaction-only comprehension; missing disclaimer.

### 5.8 Before / After (as a composition within Evidence)

- Shares §5.7; additionally: the comparison interaction is one action system; the divider/slider affordance is direction-aware; labels Before/After are explicit, localized, permanently visible; the comparison region itself is the protected subject region. **FORBIDDEN:** fabricated comparison behavior; auto-advancing evidence carousels (`MOTION-ICONOGRAPHY.md` §3).

### 5.9 Consultation

- **PURPOSE:** signature conversion — calm, trustworthy request surface.
- **PRIMARY SUBJECT:** the consultation request (least-data form, `LEAD-CONSULTATION-CONTRACT.md` §2).
- **PRIMARY MESSAGE:** «درخواست مشاوره» register; what happens next.
- **HIERARCHY:** invitation → form → consent → reassurance (success state).
- **CONTENT ANCHOR:** form fields in Content Rail; single-column at touch contexts.
- **MEDIA RELATIONSHIP:** optional calm environment imagery; never competes with the form.
- **TEXT-SAFE REGION:** submit action always above safe bottom boundary (SAFE-01), including keyboard-open state (`PRESENTATION-CONTEXTS.md` §4.2).
- **ACTION RELATIONSHIP:** one primary action (submit/request); secondary contact pathways part of the same action system.
- **NAVIGATION RELATIONSHIP:** none competing; reassurance content replaces navigation noise.
- **D:** may pair editorial reassurance region with the form. **I/A:** single column; 48×48 envelopes; no sticky duplicate of the visible submit.
- **RTL/LTR:** logical field order; localized validation copy; numeral formatting.
- **ALLOWED VARIATION:** placement per archetype; reassurance emphasis.
- **FORBIDDEN:** aggressive e-commerce language; pre-checked consent; color-only errors; CTA under the keyboard.

### 5.10 Editorial Content (article/education)

- **PURPOSE:** education-first reading experience.
- **PRIMARY SUBJECT:** the article body (`SIGNATURE-PATTERNS.md` §15).
- **PRIMARY MESSAGE:** trustworthy, calm explanation.
- **HIERARCHY:** title → lede → structured body → attribution → contextual links.
- **CONTENT ANCHOR:** strict `container-text` measure, all locales and scripts.
- **MEDIA RELATIONSHIP:** reserved-space imagery; no layout shift; localized alt.
- **TEXT-SAFE REGION:** reading measure is the safe region — no floating chrome inside it.
- **ACTION RELATIONSHIP:** contextual consultation links only; no interstitials.
- **NAVIGATION RELATIONSHIP:** breadcrumbs/related woven contextually.
- **D:** measured single column with optional wide media breaks (Media Rail). **I/A:** single column throughout.
- **RTL/LTR:** full logical layout; mixed-script isolation; per-script rhythm.
- **ALLOWED VARIATION:** media emphasis; pacing/length.
- **FORBIDDEN:** blog-template aesthetic; forced mid-article CTAs; deceptive dates.

## 6. Negative space contract (all compositions)

> Empty space without compositional purpose is unresolved layout, not luxury.

Negative space is legitimate when it deliberately provides: subject isolation · hierarchy · tension · visual rhythm · text-safe region · cinematic depth · breathing room. Large unused regions produced by weak anchoring or undersized content are **not** premium by definition. Desktop review explicitly inspects negative-space purpose (`DESIGN-QA.md` LAYOUT-02); a unique composition may justify an unusual spatial decision, but the justification must be stateable in one sentence of composition rationale — otherwise it is an accident.

## 7. Experience modes — CINEMATIC vs EDITORIAL

| | CINEMATIC MODE | EDITORIAL MODE |
|---|---|---|
| Appropriate for | Hero · discovery moments · treatment entrance/signature moments · selected major transitions · immersive brand storytelling | treatment facts · detailed medical information · risks · FAQ · evidence · doctor credentials/context · Before/After · long-form education · consultation forms |
| Interaction density | low, choreographed, scene-led | reading/task-led, standard controls |
| Information behavior | sparse, high-impact | complete, scannable |

**Critical rule:** a mode transition must not feel like leaving the clinic's Visual World — the world persists while interaction density and information behavior change. Neither mode is "the real site"; both are the same system. Editorial facts are never cinematic-degraded (risks stay fully readable); cinematic moments are never editorial-cluttered.

Full-stage grammar for cinematic sequences (persistent Experience Stage, Scene/Media Field/Action Field/Navigation Field/Safe Region/Transition Boundary, progression inputs, focus, keyboard/touch, mobile re-composition, reduced-motion, direct entry, and URL semantics) is specified in `SIGNATURE-PATTERNS.md` §16 and `architecture/EXPERIENCE-RUNTIME-CONTRACT.md`. No mode mandates scrolljacking, WebGL, or any library — simplest-technology-wins (`EXPERIENCE-DIRECTION.md` §4). Native document scrolling belongs to Editorial Information Mode; it does not define cinematic Scene progression.

## 8. Treatment Signature — canonical distinction

Three separate responsibilities:

- **TREATMENT SIGNATURE** — sensory identity / experiential metaphor of a treatment.
- **TREATMENT INFORMATION** — medically governed explanatory content (`§5.4`).
- **TREATMENT EVIDENCE** — legitimate evidence: governed Before/After + clinical context (`§5.7`).

Canonical rules:

> We are not reconstructing the treatment; we are creating a recognizable sensory language for the treatment.
> Sensory metaphor must not imply treatment efficacy or outcome.

Initial conceptual signature vocabulary (non-literal behavioral direction, not procedure depiction):

| Treatment family | Sensory vocabulary |
|---|---|
| Laser | Light · Focus · Precision · Controlled Energy |
| Filler | Volume · Contour · Soft Deformation |
| Botox | Precision · Stillness · Micro-motion |
| Skin Rejuvenation | Texture · Light · Renewal |
| Hair Transplant | Density · Direction · Emergence |

Avoid: hair→hairless transformation as laser efficacy simulation; wrinkles disappearing as botox proof; face-shape morphing as guaranteed filler outcome; fabricated Before/After behavior (MEDICAL-01). These vocabularies guide motion/media art direction; they make no claims about literal procedure appearance or results.
