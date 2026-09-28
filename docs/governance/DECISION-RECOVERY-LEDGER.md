# Decision Recovery Ledger

**Class:** GUIDANCE / DECISION LINEAGE  
**Scope:** Recovered product, business, ecosystem, experience, design-research, prototype, and governance context.

> **Authority rule:** This ledger preserves project decision lineage and recovered context. It does **not** override canonical contracts. Canonical documents always win if there is a conflict. When an item is promoted, this ledger must point to its canonical authority. Candidate, rejected, and experimental material is intentionally non-binding. Conversation memory is context, not project authority; repository documentation is project authority.

This ledger exists so that CDI reasoning can be reconstructed without relying on conversational memory. Its status labels describe each item’s current epistemic state. A status does not itself grant authority: only the cited canonical document does.

## Decision recovery index

| ID | Topic | Status | Current Authority | Future Authority | Action |
|---|---|---|---|---|---|
| BUS-01 | Distributor origin and possible reach of ~2,000 clinics | BUSINESS_CONTEXT | This ledger; `PRODUCT-CONSTITUTION.md` §1 for scale ambition | Business strategy, if formalized | RETAIN |
| BUS-02 | Setup plus recurring service model / possible bundle | DIRECTIONAL | This ledger | Business strategy / commercial agreement | VALIDATE |
| BUS-03 | Commercial terms and onboarding model | OPEN_ALREADY_TRACKED | `OPEN-DECISIONS.md` O-2/O-3 | Same register, then commercial authority as decided | KEEP_OPEN |
| PROD-01 | Reusable clinic platform identity | ALREADY_CANONICAL | `PRODUCT-CONSTITUTION.md` §§1–2; `V1-SCOPE.md` | Same | NONE |
| ECO-01 | Roadmap phases and international-patient opportunity | ALREADY_CANONICAL | `PRODUCT-ROADMAP.md` §§2–6; `V1-SCOPE.md` | Same | NONE |
| ECO-02 | Cross-phase CDI ecosystem relationship | DIRECTIONAL | This ledger; `PRODUCT-ROADMAP.md` for phase boundaries | CDI Ecosystem Architecture | EXPAND |
| ECO-03 | Long-term ecosystem architecture work item | DIRECTIONAL | This ledger | `CDI-ECOSYSTEM-ARCHITECTURE-01` deliverable | EXPAND |
| CAP-01 | Master capability ontology and clinic derivation | ALREADY_CANONICAL | `MASTER-SERVICE-CATALOG.md`; `CAPABILITY-RELATIONSHIP-MODEL.md`; `CLINIC-PROVISIONING.md` | Same | NONE |
| EXP-01 | Clinic / treatment / information experience layers | ALREADY_CANONICAL | `DESIGN-SYSTEM-CONSTITUTION.md`; `VISUAL-WORLDS.md`; `COMPOSITION-CONTRACTS.md` §§5, 8 | Same | NONE |
| EXP-02 | Treatment Signature / Information / Evidence separation | ALREADY_CANONICAL | `COMPOSITION-CONTRACTS.md` §8; `DESIGN-QA.md` MEDICAL-01 | Same | NONE |
| EXP-03 | Treatment sensory vocabulary | ALREADY_CANONICAL | `COMPOSITION-CONTRACTS.md` §8; `MOTION-ICONOGRAPHY.md` §4A | Same | NONE |
| EXP-04 | Experience / information / evidence / consultation reasoning | DIRECTIONAL | This ledger; canonical medical and consultation contracts govern execution | Product experience authority, if promoted | VALIDATE |
| EXP-05 | FEEL → UNDERSTAND → TRUST → EVIDENCE → ACT narrative | CANDIDATE | This ledger | TBD | VALIDATE |
| EXP-06 | Cinematic and Editorial modes; no scrolljacking mandate | ALREADY_CANONICAL | `COMPOSITION-CONTRACTS.md` §7; `EXPERIENCE-DIRECTION.md` §4 | Same | NONE |
| R&D-01 | Perceived continuity and persistent-stage research | EXPERIMENTAL_EVIDENCE | This ledger; durable technology-neutral rule in `EXPERIENCE-DIRECTION.md` §2, §4 | Future design research, if needed | ARCHIVE_AS_EVIDENCE |
| R&D-02 | Experience grammar and sensory vocabulary | ALREADY_CANONICAL | `MOTION-ICONOGRAPHY.md` §4A; `SIGNATURE-PATTERNS.md` §§16–17 | Same | NONE |
| EXP-07 | Hero-to-journey visual continuity | ALREADY_CANONICAL | `EXPERIENCE-DIRECTION.md` §2; `COMPOSITION-CONTRACTS.md` §5.1 | Same | NONE |
| TECH-01 | Experience requirement does not mandate technology | ALREADY_CANONICAL | `EXPERIENCE-DIRECTION.md` §2, §4; `SIGNATURE-PATTERNS.md` §16 | Same | NONE |
| HIST-01 | P01 and P01R visual directions | REJECTED | `EXPERIENCE-DIRECTION.md` origin; this ledger for expanded rationale | None; rejection retained as lineage | ARCHIVE_AS_EVIDENCE |
| HIST-02 | P02 technically passed, visually rejected | REJECTED | This ledger | None; rejection retained as lineage | ARCHIVE_AS_EVIDENCE |
| ARGON-01 | ARGON E01 and ARGON-LAYOUT-R1 status | EXPERIMENTAL_EVIDENCE | `prototype/argon-e01/README.md`; this ledger | Owner review for visual acceptance | ARCHIVE_AS_EVIDENCE |
| QA-01 | Owner evidence for experiential/visual acceptance | DECIDED | `AGENT-CONTRACT.md` §7; `DESIGN-QA.md` §1 | Same | PROMOTE |
| ARGON-02 | Component correctness does not guarantee composition correctness | EXPERIMENTAL_EVIDENCE | This ledger; canonical response in vNext authorities | `COMPOSITION-CONTRACTS.md`; `DESIGN-QA.md` | ARCHIVE_AS_EVIDENCE |
| RESP-01 | Responsive re-composition and first-class contexts | ALREADY_CANONICAL | `LAYOUT-RESPONSIVE.md` §1; `PRESENTATION-CONTEXTS.md`; `DESIGN-QA.md` RESP-01 | Same | NONE |
| DEPLOY-01 | Iran deployment imagery art-direction context | DIRECTIONAL | This ledger; legal authority remains `OPEN-DECISIONS.md` L-1/L-3 | Deployment-specific art direction, if adopted | VALIDATE |
| EVID-01 | Optional image comparison; evidence integrity | ALREADY_CANONICAL | `SIGNATURE-PATTERNS.md` §4; `PHOTOGRAPHY.md` §4; `MEDICAL-TRUST-GOVERNANCE.md` §4 | Same | NONE |
| DS-01 | Earlier Design System gap and vNext response | EXPERIMENTAL_EVIDENCE | This ledger; canonical vNext contracts at commit `7af43513c89791da8b68acf5cde0e8970e48d96d` | Current vNext authorities | ARCHIVE_AS_EVIDENCE |
| ARGON-03 | ARGON persistence commit and visual gate | ALREADY_CANONICAL | `prototype/argon-e01/README.md`; commit `7dd68c8788484c78854f3d22ce882fc7c1fc4a4f` | Same | NONE |
| GOV-01 | No material decision may remain only in conversation | DECIDED | `AGENT-CONTRACT.md` §8 | Same | PROMOTE |
| GOV-02 | Consequential decision provenance | DIRECTIONAL | This ledger; `decisions/README.md` and ADR template for accepted ADRs | ADRs where warranted | PROMOTE |
| GOV-03 | ADR use for consequential, hard-to-reverse choices | ALREADY_CANONICAL | `decisions/README.md` §§1–3; `OPEN-DECISIONS.md` | Same | NONE |
| OPEN-01 | Jurisdiction-specific advertising and legal requirements | OPEN_ALREADY_TRACKED | `OPEN-DECISIONS.md` L-1/L-3 | Same register / qualified legal authority | KEEP_OPEN |
| HIST-03 | Closed PEARL/MINERAL/OBSIDIAN theme-family model | SUPERSEDED | `VISUAL-WORLDS.md` §4; `EXPERIENCE-DIRECTION.md` §6 | Current Visual Worlds authority | NONE |
| VNX-01 | Design System vNext contract set | ALREADY_CANONICAL | Commit `7af43513c89791da8b68acf5cde0e8970e48d96d`; `/DESIGN.md` and linked canonical docs | Same | NONE |

## 1. Business origin and commercial context

### BUS-01 — Potential distribution relationship

**Status: BUSINESS_CONTEXT.** CDI emerged from a potential relationship with a company that sells aesthetic/beauty clinic equipment and participates in clinic launches. That relationship may provide access to approximately 2,000 clinics. This is strategic context for reusable platform architecture, consistent with the scale ambition in `PRODUCT-CONSTITUTION.md` §1. It is not evidence of a signed agreement, exclusivity, guaranteed access, or committed clinic volume.

### BUS-02 — Commercial model hypothesis

**Status: DIRECTIONAL.** A setup/onboarding fee plus a recurring platform/service subscription was discussed, potentially bundled with clinic equipment and clinic launch/setup. These are hypotheses for a possible commercial model, not finalized prices, contract terms, or commitments.

### BUS-03 — Commercial and onboarding questions

**Status: OPEN_ALREADY_TRACKED.** Pricing, subscription tiers, revenue share, exclusivity, reseller/white-label arrangements, contractual ownership, and support/SLA remain unresolved under O-2. Onboarding responsibility and self-service versus managed provisioning remain unresolved under O-3. Do not infer answers from the distribution context.

## 2. Product identity and ecosystem direction

### PROD-01 — CDI as reusable clinic infrastructure

**Status: ALREADY_CANONICAL.** `PRODUCT-CONSTITUTION.md` §§1–2 defines CDI as a reusable multilingual, bidirectional platform, organized as **One Platform Core → Clinic Configuration → Independent Clinic Experience**. `V1-SCOPE.md` bounds the immediate product to a replicable clinic website platform. The website is the first major delivery surface; broader vertical infrastructure is a long-term opportunity, not a commitment to every future module. CDI is neither a bespoke website factory nor an unrestricted page builder.

### ECO-01 — Roadmap phases and international patients

**Status: ALREADY_CANONICAL.** Phase 2 lead management/appointments, Phase 3 CRM/patient relationship, Phase 4 campaigns/marketing automation/richer analytics, Phase 5 AI/personalization, and the international patient/medical tourism opportunity are in `PRODUCT-ROADMAP.md` §§2–6. They remain future and directional; `V1-SCOPE.md` is the scope authority and excludes these capabilities from V1 where stated.

### ECO-02 — Cross-phase ecosystem relationship

**Status: DIRECTIONAL.** CDI’s long-term opportunity can be understood as related capabilities spanning:

```text
Public Clinic Experience
        ↓
Lead Capture
        ↓
Lead Management
        ↓
Appointments / Scheduling
        ↓
CRM / Patient Relationship
        ↓
Follow-up / Retention
        ↓
Campaigns / Marketing Automation
        ↓
Analytics / Attribution
        ↓
AI / Personalization / Operational Assistance
```

International-patient capabilities may intersect several layers rather than live only as a website section. This is a conceptual capability relationship, not an implementation pipeline, mandatory data-flow architecture, vendor choice, final domain model, or V1 scope expansion. `PRODUCT-ROADMAP.md` remains phase authority. Future-awareness must not produce speculative V1 infrastructure (`PRODUCT-ROADMAP.md` §1).

### ECO-03 — CDI-ECOSYSTEM-ARCHITECTURE-01

**Status: DIRECTIONAL.** Future work should define the coherent long-term architecture across public experience, identity, leads, appointments, CRM, patient relationship, marketing, analytics, AI, and international-patient capabilities. Detailed architecture has not yet been designed. This ledger records the work item only; it does not perform it.

## 3. Capability and experience contracts already represented

### CAP-01 — Capability model and provisioning

**Status: ALREADY_CANONICAL.** `MASTER-SERVICE-CATALOG.md`, `CAPABILITY-RELATIONSHIP-MODEL.md`, and `CLINIC-PROVISIONING.md` govern the catalog, capability graph, and clinic derivation. The model includes Concern → Treatment → Modality → Technology → Device → Treatment Area, with Provider and Location relationships; separates Catalog from clinic-specific content; distinguishes clinical availability, content publication, and navigation visibility; supports AVAILABLE / UNAVAILABLE / HIDDEN / COMING_SOON; and derives clinic experiences through capability state and configuration. Zero-code provisioning and `CONFIG_ONLY` replication expectations are already defined. No duplicate contract is introduced here.

### EXP-01 — Clinic, treatment, and information layers

**Status: ALREADY_CANONICAL.** The clinic’s Visual World governs clinic-wide expression (palette, materiality, lighting, photographic grading, contrast, and controlled motion expression: `EXPERIENCE-DIRECTION.md` §3 and `VISUAL-WORLDS.md`). Treatment Signature governs treatment sensory behavior; Treatment Information carries medical explanation; Treatment Evidence carries governed proof (`COMPOSITION-CONTRACTS.md` §§5, 8). The recovered shorthand **“Clinic defines expression. Treatment defines behavior.”** is represented by these authorities and is not a second Design System rule.

### EXP-02 — Treatment Signature is distinct from information and evidence

**Status: ALREADY_CANONICAL.** `COMPOSITION-CONTRACTS.md` §8 defines the three responsibilities and states: “We are not reconstructing the treatment; we are creating a recognizable sensory language for the treatment.” Sensory metaphor must not imply efficacy or outcome. `DESIGN-QA.md` MEDICAL-01 and `MEDICAL-TRUST-GOVERNANCE.md` govern the medical boundary. Signature language must not imply guaranteed results, anatomical transformation, Before/After outcomes, or medical outcomes.

### EXP-03 — Sensory vocabulary

**Status: ALREADY_CANONICAL.** The current canonical vocabulary is in `COMPOSITION-CONTRACTS.md` §8: Laser—Light, Focus, Precision, Controlled Energy; Filler—Volume, Contour, Soft Deformation; Botox—Precision, Stillness, Micro-motion; Skin Rejuvenation—Texture, Light, Renewal; Hair Transplant—Density, Direction, Emergence. `MOTION-ICONOGRAPHY.md` §4A makes its broader vocabulary non-mandatory reasoning language, not an effects catalog. Current canonical wording wins over older variants such as “controlled motion” or “luminosity.”

### EXP-04 — Experience and trust reasoning

**Status: DIRECTIONAL.** “Experience attracts. Information convinces. Evidence builds trust. Consultation converts.” is an experience-design reasoning model for considering how expressive moments, clear information, credible evidence, and consultation relate. It is not a guaranteed marketing or behavioral funnel and does not supersede `PRODUCT-CONSTITUTION.md`, medical-trust governance, or V1 conversion scope.

### EXP-05 — Candidate narrative

**Status: CANDIDATE.** `FEEL → UNDERSTAND → TRUST → EVIDENCE → ACT` is a possible narrative lens for future design exploration. It requires validation before promotion and must not force every treatment page into five scenes, fullscreen panels, or a fixed sequence.

### EXP-06 — Cinematic and Editorial modes

**Status: ALREADY_CANONICAL.** `COMPOSITION-CONTRACTS.md` §7 governs Cinematic Mode for Hero/discovery/treatment entrance/signature/selected transitions and Editorial Mode for facts, risks, FAQ, doctor evidence, Before/After, long-form information, and forms. The clinic’s Visual World persists across mode changes. `EXPERIENCE-DIRECTION.md` §4 explicitly rejects scroll-hijacking and blocking information access; cinematic direction does not make information harder to reach.

### EXP-07 — Visual continuity

**Status: ALREADY_CANONICAL.** `EXPERIENCE-DIRECTION.md` §2 states that above-the-fold luxury must not collapse after the Hero and the homepage should evolve one art-directed environment. This item is recovered as already canonical, not duplicated as a new rule.

### TECH-01 — Technology neutrality

**Status: ALREADY_CANONICAL.** `EXPERIENCE-DIRECTION.md` §§2, 4 separates experience continuity from implementation technology, rejects a WebGL/Three.js mandate, and prefers the simplest adequate technology with acceptable performance and accessibility. The durable requirement is perceived continuity; WebGL, WebGPU, Three.js, GSAP, persistent GPU canvases, and scrolljacking are not mandated.

## 4. Research and prototype lineage

### R&D-01 — Continuity research

**Status: EXPERIMENTAL_EVIDENCE.** Research explored the perception of moving through a digital environment where content happens, rather than reading a conventional document. A simple wheel-to-next-fullscreen-panel interaction was judged insufficient and at risk of feeling like a polished slide deck. Persistent visual-stage/canvas techniques were explored as one possible way to strengthen continuity. This is evidence about a desired perception and a limitation observed in a simple interaction model; it does not prescribe an implementation. The durable technology-neutral direction is recorded in `EXPERIENCE-DIRECTION.md`.

### R&D-02 — Experience grammar

**Status: ALREADY_CANONICAL.** The reasoning model `Experience = World × Scene × Signature × Transition` and the material/perceptual, motion, spatial, and transition vocabularies are represented by `MOTION-ICONOGRAPHY.md` §4A and `SIGNATURE-PATTERNS.md` §§16–17. They remain descriptive, non-mandatory vocabulary rather than a required effects catalog.

### HIST-01 — PROTOTYPE-01 and PROTOTYPE-01R

**Status: REJECTED.** PROTOTYPE-01 was technically usable but did not meet the required premium, luxury, or cinematic visual direction. PROTOTYPE-01R explored Cinematic Immersion, Editorial Luxury, and Digital Sculptural directions; none achieved the required premium/mesmerizing character. The owner’s expectation moved toward stronger Hero impact, cinematography, layering, premium typography, choreographed transitions, a continuous visual world, and motion as part of Art Direction. The reusable lesson is that technical motion alone does not create luxury. `EXPERIENCE-DIRECTION.md` records the origin and approved direction; no palette, layout, asset, or motion value from those prototypes is canonical.

### HIST-02 — PROTOTYPE-02 visual outcome

**Status: REJECTED.** PROTOTYPE-02 passed technical checks but its implementation did not achieve the intended experiential/art-direction target. Its visual output is rejected; the technical pass does not approve its visual direction. No prototype-specific palette, layout, asset, or other design detail is promoted.

### ARGON-01 — ARGON E01 and ARGON-LAYOUT-R1

**Status: EXPERIMENTAL_EVIDENCE.** ARGON E01 is a persisted experiment, not canonical product or Design System authority (`prototype/argon-e01/README.md`). ARGON-LAYOUT-R1 has `TECHNICAL_GATE: PASS` and `VISUAL_GATE: OWNER_REVIEW_REQUIRED`. Repository presence, technical status, generated assets, and implementation evidence do not imply Owner visual approval. No ARGON palette, layout, scene count, portrait, doctor, technology composition, treatment implementation, timing, form, navigation, or Noor-specific detail becomes canonical through this ledger.

### QA-01 — Owner visual acceptance evidence

**Status: DECIDED.** For experiential/visual acceptance that requires Owner judgment, real-device Owner evidence is authoritative over an agent’s self-certified visual pass. Automated tests, screenshots, DOM assertions, computed CSS, and viewport checks can establish technical properties; they cannot independently establish premium quality, composition quality, art-direction success, perceived motion quality, or real-device Owner acceptance. This rule does not waive objective engineering requirements: technical failures remain failures. `DESIGN-QA.md` §1 already prohibits visual pass from automated evidence alone; `AGENT-CONTRACT.md` §7 records the additional acceptance/provenance rule.

### ARGON-02 — Composition lesson

**Status: EXPERIMENTAL_EVIDENCE.** ARGON showed that local token/component compliance can coexist with an incoherent overall composition when geometry and composition authority are insufficient. Observed failure classes included arbitrary spacing, weak alignment, detached CTA islands, accidental dead space, text/actions colliding with focal subjects, desktop/mobile composition mismatch, weak crop control, unclear form affordance, unnecessary progress/navigation chrome, and treatment effects that missed their intended sensory identity. Reusable lesson: **component correctness does not guarantee composition correctness.** The canonical response is the vNext geometry, composition, media, action, responsive, and QA authority; ARGON-specific CSS is not governance.

### RESP-01 — Responsive re-composition

**Status: ALREADY_CANONICAL.** `LAYOUT-RESPONSIVE.md` §1, `PRESENTATION-CONTEXTS.md`, and `DESIGN-QA.md` RESP-01 define responsive work as re-composition rather than scaling, with DESKTOP_WEB, IPHONE_WEB, and ANDROID_WEB as first-class validation contexts. No duplicate rule is created here.

### DEPLOY-01 — Iran deployment imagery context

**Status: DIRECTIONAL.** For Iranian deployment art direction, women may appear in clinic imagery. Recurring Hero/signature imagery should avoid unnecessary exposure that could create avoidable cultural or regulatory friction. Where compositionally appropriate, facial features/skin, hair/scalp, hands, devices, clinic architecture, or abstract materials may be preferred; be more conservative with unnecessary recurring emphasis on exposed shoulders, upper chest, or collarbone-heavy compositions. This is an art-direction consideration, not legal advice, a compliance finding, or a claim that other imagery is prohibited. Jurisdiction-specific requirements remain open under `OPEN-DECISIONS.md` L-1/L-3. The existing canonical `PHOTOGRAPHY.md` remains unchanged.

### EVID-01 — Before/After comparison

**Status: ALREADY_CANONICAL.** `SIGNATURE-PATTERNS.md` §4 permits a slider or clearly paired imagery and requires the evidence to remain understandable without relying only on interaction. `PHOTOGRAPHY.md` §4 and `MEDICAL-TRUST-GOVERNANCE.md` §4 govern consent, evidence, publication, labeling, metadata, and non-misleading presentation. A draggable divider is optional, not a universal treatment-page requirement; a conceptual comparison must never masquerade as clinical evidence.

### DS-01 — Design System gap and vNext response

**Status: EXPERIMENTAL_EVIDENCE.** Earlier CDI Design System work established substantial foundations in tokens, components, Visual Worlds, RTL/LTR, accessibility, and medical trust, but did not make composition geometry and rendered visual enforcement sufficiently explicit. Repeated prototype repair exposed gaps around content/media/action relationships, mobile re-composition, focal and text-safe regions, purposeful negative space, action zones, justified progress, and rendered QA. The Foundation was not discarded; Design System vNext added the missing operational composition layer. The vNext canonicalization is persisted in commit `7af43513c89791da8b68acf5cde0e8970e48d96d` and is authoritative through `/DESIGN.md` and the linked Design System contracts. This history does not make prototype-specific details canonical.

### ARGON-03 — Persisted experiment status

**Status: ALREADY_CANONICAL.** ARGON E01 is persisted at `prototype/argon-e01/`; its persistence commit is `7dd68c8788484c78854f3d22ce882fc7c1fc4a4f`. The README labels it EXPERIMENTAL / NON-CANONICAL and records the technical pass with visual Owner review still required.

## 5. Open items and superseded history

### OPEN-01 — Jurisdiction-specific legal and advertising requirements

**Status: OPEN_ALREADY_TRACKED.** Applicable jurisdiction(s), medical advertising rules, and Before/After publication requirements remain unresolved under `OPEN-DECISIONS.md` L-1 and L-3. DEPLOY-01 does not answer or replace them.

Commercial/open questions under BUS-03 remain in O-2/O-3. Other product and technical questions remain in `OPEN-DECISIONS.md`; this ledger does not duplicate or resolve them. No new open question was necessary to preserve the recovered material in this task.

### HIST-03 — Closed theme-family model

**Status: SUPERSEDED.** The earlier PEARL/MINERAL/OBSIDIAN closed theme-family model is superseded by the Visual Worlds model. `VISUAL-WORLDS.md` §4 retains the supersession lineage; the current world authority wins. Historical literal values remain prototype evidence only.

### VNX-01 — vNext authority map

**Status: ALREADY_CANONICAL.** Design System vNext at `7af43513c89791da8b68acf5cde0e8970e48d96d` canonicalized Presentation Contexts, responsive re-composition, Stage/Page geometry, semantic spacing, cinematic typography roles, Composition Contracts, Media Composition, Action Zone, progress existence, Cinematic/Editorial modes, Treatment Signature separation, motion grammar, Design QA IDs, agent enforcement, root `DESIGN.md`, and the Validation Harness specification. This ledger points to those authorities and does not reproduce their contracts.

## 6. Decision provenance and ADR use

For consequential decisions, preserve enough provenance to understand the decision, its status, rationale, materially relevant rejected or superseded alternatives, canonical authority, and unresolved dependency. Keep canonical contracts focused on current rules; use this ledger or future ADRs for lineage rather than turning contracts into chronological diaries.

**Directional ADR guidance:** use an ADR for consequential architecture choices when alternatives materially matter, reversal cost is significant, or the rationale would not be obvious from the resulting contract. `decisions/README.md` remains the canonical ADR mechanism. Application/framework architecture (A-1) is a future ADR candidate only when that decision is ready; this ledger does not decide A-1. No unnecessary ADR is created by this recovery.

## 7. Recovery completeness

This ledger is a map of recovered lineage, not a replacement for the current authorities. Read `docs/README.md` for the authority index; `PRODUCT-CONSTITUTION.md` for product identity; `V1-SCOPE.md` for V1; `PRODUCT-ROADMAP.md` for future phases; `OPEN-DECISIONS.md` for unresolved items; the architecture contracts for capability/provisioning boundaries; `/DESIGN.md` and its linked canonical documents for experience/design authority; and `prototype/argon-e01/README.md` for the experiment’s current gate.
