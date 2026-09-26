# Open Decisions Register

**Class:** CANONICAL (the register itself and its rules); the individual entries are work-in-progress state, not binding decisions.
**Change process:** Entries are added/updated as decisions surface. A decision that would change a canonical contract also requires an ADR.

---

## 1. Purpose

This register records **every known unresolved decision** so that none is silently guessed. Unresolved ≠ blocking: most entries below do not block the next stage. Do not ask the owner questions that can safely remain deferred.

## 2. Classification

| Class | Meaning |
|---|---|
| **OWNER** | Requires business/product judgment. |
| **ARCHITECTURE** | Requires technical evaluation. |
| **DESIGN** | Requires design exploration. |
| **LEGAL/REGULATORY** | Requires jurisdiction/legal input. |
| **DEFERRED** | Intentionally not needed yet. |

Each entry records: **question**, **why it matters**, **latest responsible decision point**, **current default (if a safe one exists)**, and **blocks implementation?** (yes / no / blocks-only-X).

## 3. Register

### Extension decisions (FOUNDATION-EXTENSION IDs)

**FX-1. DECIDED — Master Service Catalog ontology** — six entity types (Concern/Treatment/Modality/Technology/Device/Area); 11 capability families; brand names never Master identity (`MASTER-SERVICE-CATALOG.md`).
**FX-2. DECIDED — Three-axis capability state** — clinical availability ⊥ content publication ⊥ navigation visibility; never collapsed into one flag (`CAPABILITY-RELATIONSHIP-MODEL.md` §3).
**FX-3. DECIDED — Capability-driven derivation** — clinic sites derive from capability state + Master graph; manual per-capability page creation is a provisioning smell (`CAPABILITY-RELATIONSHIP-MODEL.md` §5, `CLINIC-PROVISIONING.md` §3).
**FX-4. DECIDED — Zero-code provisioning invariant** — capability/location/device/provider/locale changes never require Core modification or forks (`CLINIC-PROVISIONING.md` §5).
**FX-5. DECIDED — Provisioning replication test** — Clinic A vs materially-different Clinic B profiles at Stage-2; service-mix-driven Core change = FAIL (`CLINIC-PROVISIONING.md` §6).
**FX-6. DECIDED — Experience direction amendment** — Cinematic Spatial Luxury × Continuous Scroll Journey × Medical Aesthetics; homepage continuity contract (`EXPERIENCE-DIRECTION.md`).
**FX-7. DECIDED — Experience DNA vs Visual World split** — stable shared DNA; clinic-configurable worlds; fork-free differentiation (`EXPERIENCE-DIRECTION.md` §3).
**FX-8. DECIDED — Visual Worlds supersede closed theme families** — four initial worlds; **dark and light equally first-class; luxury ≠ dark mode** (`VISUAL-WORLDS.md`).
**FX-9. DECIDED — Motion principle amendment** — motion as art direction/spatial storytelling; no WebGL mandate; simplest-technology rule (`EXPERIENCE-DIRECTION.md` §4).
**FX-10. DERIVED — Concern Explorer resolves from clinic capabilities** — derived from FX-1/FX-3 + existing patient-discovery principle; no impossible treatment paths (`CAPABILITY-RELATIONSHIP-MODEL.md` §2.2).
**FX-11. DEFERRED — Device/manufacturer database** — structure decided (generic device records); populating an industry device DB deferred until provisioning needs it.
**FX-12. DEFERRED — Catalog initial population** — governance + families decided; exhaustive entry enumeration deferred to catalog-authoring stage (per-family source-cited edits).
**FX-13. OPEN — Noor service mix for PROTOTYPE-02** — representative minimum fixed (B of PROTOTYPE-02-ACCEPTANCE §B); final Noor mix is an Owner selection.
**FX-14. OPEN — Visual World for Reference Clinic #1** — world selection is an Owner decision at PROTOTYPE-02 briefing (dark AND light both must be proven regardless).

### OWNER class

**O-1. Launch locale set per clinic (business)**
- Question: Which locales does each clinic — including the V1 Reference Clinic — actually publish at launch? (`fa-IR`-only, `fa-IR+en`, more?)
- Why: Determines content production scope and launch sequencing; must not be confused with platform capability (all reference locales are supported architecturally).
- Latest responsible point: Reference-clinic content planning, before V1 content production.
- Default: Reference Clinic launches `fa-IR`-first with `en` added when content is ready.
- Blocks: No (platform capability proceeds regardless).

**O-2. Distribution relationship terms**
- Question: What exactly does the ~2,000-clinic distribution relationship assume (pricing, onboarding, exclusivity, support)?
- Why: Shapes scale assumptions and replication economics.
- Latest responsible point: Before any scale-oriented architecture investment.
- Default: Design for "many clinics, modest count" now.
- Blocks: No.

**O-3. Clinic onboarding / self-serve model**
- Question: Who configures a new clinic — platform operator, clinic operator via tooling, or both?
- Why: Determines what "configuration" means operationally (files/DB/panel) and what tooling V1 needs.
- Latest responsible point: Before tenant-management implementation.
- Default: Platform-operator-assisted configuration for V1.
- Blocks: No (V1 can launch with operator-assisted config).

**O-4. Reference clinic selection**
- Question: Which fictional/reference clinic profiles (specialty, positioning, content depth) serve as the V1 Replication Gate pair?
- Why: The Replication Gate needs two *meaningfully different* configurations.
- Latest responsible point: Before replication validation begins.
- Default: An aesthetic/dermatology clinic and a hair-transplant-focused clinic as candidates.
- Blocks: Blocks replication validation only.

### ARCHITECTURE class

**A-1. Framework / rendering model**
- Question: Which web framework and rendering approach (SSR/SSG/ISR/hybrid) for clinic sites?
- Why: Defines repo structure, hosting constraints, and SEO/Perf trade-offs.
- Latest responsible point: First implementation ADR.
- Default: None chosen; SEO + performance + multilingual routing requirements constrain the choice.
- Blocks: Blocks all website implementation until decided.

**A-2. CMS / content source**
- Question: Headless CMS vs. structured files vs. database-first?
- Why: Determines how clinic operators edit content and how localized representations are stored.
- Latest responsible point: Before content-pipeline implementation.
- Default: Content architecture is CMS-ready but vendor-neutral (`CONTENT-MODEL.md`).
- Blocks: Blocks content-management implementation; not the site render itself if content is seeded.

**A-3. Persistence model**
- Question: Database/storage approach for content, leads, and configuration?
- Why: Affects hosting, tenancy, and localization storage.
- Latest responsible point: With A-2 or immediately after.
- Default: None.
- Blocks: With A-2.

**A-4. Tenancy model**
- Question: Single multi-tenant deployment with config-per-tenant, or deployment-per-clinic?
- Why: Influences isolation, domains, CI/CD, and cost.
- Latest responsible point: Before V1 infrastructure build.
- Default: None; must support independent clinic domains either way.
- Blocks: Blocks deployment architecture; not UI/component work.

**A-5. URL locale strategy**
- Question: Sub-path (`/fa/...`) confirmed? Cookie/accept-language redirects? `x-default` behavior?
- Why: SEO and UX of multilingual routing.
- Latest responsible point: First routing ADR.
- Default: Sub-path locale prefixes are the working assumption (`LOCALIZATION-FOUNDATION.md` §8); other details open.
- Blocks: No (conceptual requirement fixed; exact policy later).

**A-6. Localization fallback policy (final rule)**
- Question: Exact per-content-type fallback behavior for missing translations (esp. medical/editorial content)?
- Why: Misleading fallback damages trust; policy affects routing, SEO, and sitemaps.
- Latest responsible point: When the first clinic enables a second locale.
- Default: UI strings may fall back to `defaultLocale`; editorial/medical content does *not* silently fall back — pages/links are withheld (details in `LOCALIZATION-FOUNDATION.md` §6, final rule = ADR).
- Blocks: No until a second locale is actually published.

**A-7. Translation completeness workflow**
- Question: Who manages `NOT_STARTED → DRAFT → REVIEW_REQUIRED → READY → PUBLISHED` states, and with what tooling?
- Why: Ties localized publication to the translation-state model.
- Latest responsible point: With A-2.
- Default: Conceptual states fixed; tooling deferred.
- Blocks: No.

**A-8. Internationalization of lead storage**
- Question: Where leads are stored in V1 and how locale/contact-language context is persisted.
- Why: Lead data outlives the site; migration cost is real.
- Latest responsible point: Lead-capture implementation.
- Default: Store the conceptual context fields from `LEAD-CONSULTATION-CONTRACT.md` §3; delivery target deferred (P-1).
- Blocks: No.

**A-9. Accessibility target upgrade (WCAG 2.2 AA)** — PROPOSED, not adopted
- Question: Move the canonical accessibility target from WCAG 2.1 AA to WCAG 2.2 AA?
- Why: 2.2 adds focus-appearance, target-size (min), dragging-alternatives criteria largely aligned with CDI's existing design floors; adoption strengthens the contract.
- Latest responsible point: Before UI implementation (cheap to adopt before code exists).
- Default: **WCAG 2.1 AA remains canonical** (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §C.5) until formally changed via ADR; design specs already exceed parts of 2.2.
- Blocks: No.

### DESIGN class

**D-1. Typography families beyond Persian**
- Question: Final Arabic, Latin, and Cyrillic typefaces (and Vazirmatn fallback behavior)?
- Why: Vazirmatn is fixed for Persian; other scripts must not assume Vazirmatn metrics or Cyrillic coverage.
- Latest responsible point: During Design System implementation.
- Default: Script-aware typography architecture required (`DESIGN-SYSTEM-CONSTITUTION.md` §6); families undecided.
- Blocks: Blocks final visual design for non-Persian locales only.

**D-2. Visual direction concretization** — PARTIALLY RESOLVED by DESIGN-01
- Resolved (specification level): experience language (Clinical Precision × Quiet Luxury × Human Warmth); token spec v0.1 (`DESIGN-TOKENS.md`); theme families PEARL/MINERAL/OBSIDIAN (`COLOR-THEMING.md` §3); pattern contracts (`SIGNATURE-PATTERNS.md`); page archetypes & UX flows.
- Remaining: literal color values per family, and final visual designs of components/variant families — produced at **visual prototyping** (next stage).
- Blocks: Blocks UI implementation (not visual prototyping, not contracts).

**D-3. Approved V1 variant set** — RESOLVED by DESIGN-01
- Decision: Hero — Editorial · Clinical · Immersive; Services — Editorial Service · Compact Treatment · Featured Treatment; Doctors — Portrait · Minimal · Profile; plus Section Emphasis parameters and homepage section-composition choices. Recorded in `CONTROLLED-VARIATION.md` §5 with the admission rule (§3).
- Blocks: Nothing (variant families are named, not yet visually designed).

**D-4. Design System validation gate execution**
- Question: When/how the locale stress test (RTL Persian + LTR English/Russian + Arabic/Cyrillic stress) is executed.
- Why: Persian screenshots alone cannot validate the Design System (`DESIGN-SYSTEM-CONSTITUTION.md` §9).
- Latest responsible point: Design System validation stage.
- Default: Gate content now fully specified (responsive validation matrix `LAYOUT-RESPONSIVE.md` §6; language stress `TYPOGRAPHY.md` §6; quality tests Constitution §10); execution pending until artifacts exist to validate.
- Blocks: Blocks Design System sign-off only.

**D-5. Icon system source**
- Question: Which icon set/production approach (custom, curated open-source, variable-font icons)?
- Why: One coherent system is required (`MOTION-ICONOGRAPHY.md` §5); incompatible mixes are prohibited; affects bundle/performance.
- Latest responsible point: UI implementation stage.
- Default: Philosophy/criteria fixed; no library selected (deliberate).
- Blocks: Blocks UI implementation only.

### LEGAL/REGULATORY class

**L-1. Jurisdiction determination** — Which operating/deployment jurisdictions apply (Iran first; international-patient markets later)? **Needed before** medical advertising/claims rules, privacy regime (incl. cross-border data), testimonial/Before-After rules, international-patient disclosures, pricing/currency presentation rules are finalized. Default: conservative, honest-content baseline in `MEDICAL-TRUST-GOVERNANCE.md`. Blocks: No (baseline principles suffice for V1 build; blocks production claims of compliance).

**L-2. Privacy regime & data retention** — Applicable privacy law(s) and retention schedules for leads/analytics/cases. Default: least-data principles + retention flag as unresolved (`PRIVACY-SECURITY-FOUNDATION.md`). Blocks: No for build; **yes** for production data collection (retention must be decided before storing real leads).

**L-3. Medical advertising & Before/After publication rules** — Jurisdiction-specific advertising constraints, Before/After depiction rules, consent requirements. Default: conservative governance states in `MEDICAL-TRUST-GOVERNANCE.md` §4. Blocks: No for V1 build; yes for publishing real Before/After content.

### DEFERRED class

**P-1. Lead delivery target** — Where consultation requests land (email/messaging/inbox tooling) — intentionally deferred until Phase-2 lead management is scoped. Does not block V1 lead *capture*.
**P-2. Analytics provider** — Event model is fixed; provider selection deferred until real traffic exists. Does not block.
**P-3. International-patient capabilities** — Entirely deferred (roadmap §6). Does not block anything.
**P-4. Search implementation** — Locale-aware search is an architectural requirement recorded in `LOCALIZATION-FOUNDATION.md` §10; implementation deferred. Does not block.
**P-5. Messaging channel providers** — Channel *abstraction* is contractual; provider choices deferred. Does not block.

## 4. Register hygiene

- New decision discovered during work → add an entry here, then proceed on the safe default if one exists.
- A "blocking" entry with no default halts only the work that requires it, per `AGENT-CONTRACT.md` §3.
- Decisions leave this register by becoming ADRs, or (for design-stage decisions) by being recorded as design decisions in the governing document — the entry is updated to point at the decision.