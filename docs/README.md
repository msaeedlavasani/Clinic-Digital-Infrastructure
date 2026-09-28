# CDI Documentation Map

**Class:** CANONICAL (this map and its authority assignments); summaries of other docs are informative.

---

## Start here

A future contributor (human or agent) should be able to answer five questions fast:

| Question | Answer |
|---|---|
| **What is binding?** | Documents marked **CANONICAL** below, per `docs/governance/DOCUMENT-AUTHORITY.md` precedence rules |
| **What is the design authority?** | `/DESIGN.md` (repo root) — operational front door into the canonical design-system documents |
| **What is V1?** | `docs/product/V1-SCOPE.md` — the only source of V1 truth |
| **What may I change?** | Anything not canonical, plus canonical docs via the documented change process — see `governance/DOCUMENT-AUTHORITY.md` §4 |
| **What requires an ADR?** | `docs/decisions/README.md` §2 |
| **What is intentionally unresolved?** | `docs/product/OPEN-DECISIONS.md` |

Agents: additionally obey `docs/governance/AGENT-CONTRACT.md` before any implementation.

## Index

| Document | Class | Purpose |
|---|---|---|
| `governance/DOCUMENT-AUTHORITY.md` | CANONICAL | Doc classes, precedence model, change process |
| `governance/PRODUCT-CONSTITUTION.md` | CANONICAL | What CDI is: identity, users, principles, anti-goals |
| `governance/ENGINEERING-GOVERNANCE.md` | CANONICAL | Engineering principles, Definition of Done |
| `governance/AGENT-CONTRACT.md` | CANONICAL | Binding rules for AI implementation agents |
| `governance/DECISION-RECOVERY-LEDGER.md` | GUIDANCE / DECISION LINEAGE | Recovered project context, decision provenance, rejected directions, experimental evidence, and promotion status; canonical contracts remain authoritative |
| `product/V1-SCOPE.md` | CANONICAL | What V1 includes/excludes; V1 done-criteria |
| `product/PRODUCT-ROADMAP.md` | GUIDANCE | Future phases (directional, non-binding) |
| `product/OPEN-DECISIONS.md` | CANONICAL (register) | All unresolved decisions, classified |
| `product/INFORMATION-ARCHITECTURE.md` | CANONICAL | Navigation model, homepage responsibilities, section hierarchies |
| `product/PAGE-ARCHETYPES.md` | CANONICAL | 14 page archetype contracts (intent/content/CTA/SEO/variation) |
| `product/UX-FLOWS.md` | CANONICAL | Canonical flows incl. discovery, consultation, locale switch |
| `product/PROTOTYPE-02-ACCEPTANCE.md` | CANONICAL (gate) | PROTOTYPE-02 acceptance contract (not yet executed) |
| `architecture/PLATFORM-BOUNDARIES.md` | CANONICAL | Core/Config/Content/Integration zones; locale machinery |
| `architecture/MASTER-SERVICE-CATALOG.md` | CANONICAL | Service/treatment/concern ontology; 11 families; taxonomy rules; ownership |
| `architecture/CAPABILITY-RELATIONSHIP-MODEL.md` | CANONICAL | Relationship graph; 3-axis capability state; dependency resolution |
| `architecture/CLINIC-PROVISIONING.md` | CANONICAL | Zero-code clinic provisioning contract; derivation; completeness; replication extension |
| `architecture/RUNTIME-ARCHITECTURE.md` | CANONICAL | Technology-neutral runtime, request resolution, rendering, failure, cache, and deployment requirements |
| `architecture/PRODUCTION-VERTICAL-SLICE-01.md` | IMPLEMENTATION RECORD | First production-shaped clinic/locale/capability/content/rendering/lead architecture proof and its limitations |
| `audits/ARGON-DESIGN-SYSTEM-AUDIT-01.md` | AUDIT / MIGRATION GUIDANCE | Rendered ARGON disposition map against the executable Design System and accepted runtime architecture |
| `audits/PRODUCTION-VISUAL-RECOVERY-01.md` | AUDIT / OWNER REVIEW | Visual recovery record for the Home Hero, Treatment Discovery, and their continuous-world transition |
| `architecture/FRAMEWORK-EVALUATION-CRITERIA.md` | CANONICAL INPUT TO ADR | Priority and risk dimensions plus required comparison record for ADR-0001; no candidates scored |
| `decisions/ADR-0001-APPLICATION-FRAMEWORK-AND-RENDERING.md` | CANONICAL (Accepted ADR) | Selects Next.js App Router and CDI's request-resolved hybrid rendering model |
| `architecture/REPLICATION-CONTRACT.md` | CANONICAL | Fork-free replication, change classification, Replication Gate, Controlled Variation |
| `architecture/LOCALIZATION-FOUNDATION.md` | CANONICAL | Multilingual/bidirectional foundation: locales, localizations, fallback, routing |
| `architecture/INTEGRATION-BOUNDARIES.md` | CANONICAL | Conceptual boundaries for external systems |
| `architecture/SEO-FOUNDATION.md` | CANONICAL | SEO principles incl. multilingual SEO, multi-clinic risk |
| `design-system/DESIGN-SYSTEM-CONSTITUTION.md` | CANONICAL | Experience language, layer model, anti-aesthetics, quality tests |
| `design-system/EXPERIENCE-DIRECTION.md` | CANONICAL | Amended direction: cinematic spatial luxury, continuity contract, DNA vs Visual World, motion amendment |
| `design-system/VISUAL-WORLDS.md` | CANONICAL | Visual Worlds (dark + light first-class); world governance |
| `design-system/DESIGN-TOKENS.md` | CANONICAL | Token spec v0.1 (spacing/type/radius/elevation/motion/breakpoints/layers/colors) |
| `design-system/TYPOGRAPHY.md` | CANONICAL | Roles, Vazirmatn, script-aware criteria, mixed-script rules |
| `design-system/COLOR-THEMING.md` | CANONICAL | Semantic color roles, theme mapping contract, PEARL/MINERAL/OBSIDIAN families |
| `design-system/LAYOUT-RESPONSIVE.md` | CANONICAL | Grid/containers/rhythm, responsive validation matrix |
| `design-system/MOTION-ICONOGRAPHY.md` | CANONICAL | Motion categories + reduced-motion; icon philosophy |
| `design-system/PHOTOGRAPHY.md` | CANONICAL | Photography categories/qualities; Before/After visual contract |
| `design-system/SIGNATURE-PATTERNS.md` | CANONICAL | CDI signature patterns + buttons/forms/nav/trust/social/search/locale-switcher |
| `design-system/CONTROLLED-VARIATION.md` | CANONICAL | Variation grammar, axes, admission rule, reference-clinic directions |
| `design-system/COMPONENT-INVENTORY.md` | CANONICAL | Component taxonomy with V1 status + state contract |
| `design-system/BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` | CANONICAL | Bidirectional + responsive + accessibility contracts (WCAG 2.1 AA) |
| `/DESIGN.md` (repo root) | CANONICAL | Operational design-system front door: map, rules, contract/token index, QA entry point |
| `design-system/PRESENTATION-CONTEXTS.md` | CANONICAL | Presentation contexts (DESKTOP_WEB/IPHONE_WEB/ANDROID_WEB); composition equation; environment contracts |
| `design-system/COMPOSITION-CONTRACTS.md` | CANONICAL | Stage rails/zones; 10 composition contracts; action zone; cinematic/editorial modes; treatment signature |
| `design-system/DESIGN-QA.md` | CANONICAL | Rule-ID'd rendered Design QA (LAYOUT/MEDIA/ACTION/FORM/RESP/TYPE/SPACE/PROGRESS/MOTION/MEDICAL/SAFE/BIDI) |
| `design-system/VALIDATION-HARNESS.md` | CANONICAL | `/design-system` production Design System validation surface; run instructions, fixtures, evidence, and limitations |
| `design-system/IMPLEMENTATION-GAPS.md` | CANONICAL (implementation register) | Reusable Design System contract gaps; DS-IMPL-001 resolved after Owner direction approval and measured token mappings |
| `content/CONTENT-MODEL.md` | CANONICAL (shape) | Conceptual entities/relationships + localization overlay |
| `content/MEDICAL-TRUST-GOVERNANCE.md` | CANONICAL | Medical content integrity, Before/After governance |
| `engineering/LEAD-CONSULTATION-CONTRACT.md` | CANONICAL | V1 lead capture boundary |
| `engineering/ANALYTICS-CONTRACT.md` | CANONICAL | Provider-independent event model + privacy rules |
| `engineering/PERFORMANCE-PRINCIPLES.md` | CANONICAL | Performance as a product property |
| `engineering/PRIVACY-SECURITY-FOUNDATION.md` | CANONICAL | Baseline privacy/security principles |
| `decisions/README.md` | CANONICAL (mechanism) | ADR mechanism and triggers |
| `decisions/ADR-0001-APPLICATION-FRAMEWORK-AND-RENDERING.md` | CANONICAL (Accepted ADR) | Application framework, rendering model, framework boundary, and consequences |
| `decisions/ADR-TEMPLATE.md` | Template | Copy for new ADRs |

## Ownership / change process

- Canonical docs: change via ADR or explicit rationale-documented edit (`governance/DOCUMENT-AUTHORITY.md` §4).
- Guidance docs (currently `PRODUCT-ROADMAP.md`): editable with stated reason.
- Working notes: free, never authoritative.
- This map must be updated whenever documents are added, removed, or re-classed.

## Founding context

This documentation set is the output of **CDI FOUNDATION-00** (including the multilingual/bidirectional steering delta), **CDI DESIGN-01** (design-system specification), the **FOUNDATION EXTENSION** (SERVICE-CATALOG-01 + CLINIC-PROVISIONING-01 + DESIGN-AMENDMENT-01: Master Service Catalog, zero-code provisioning, experience-direction amendment, Visual Worlds, PROTOTYPE-02 gate), **DESIGN-SYSTEM-VNEXT-01** (canonicalization of the operational design layer), **CDI-RUNTIME-ARCHITECTURE-01**, and **CDI-ADR-0001**. The Design System validation surface is documented in `design-system/VALIDATION-HARNESS.md`; the first production-shaped clinic slice and its fixture limitations are recorded in `architecture/PRODUCTION-VERTICAL-SLICE-01.md`. ADR-0001 selects the application framework and rendering model; CMS, persistence, and tenancy remain open. Prototype status: PROTOTYPE-01 and PROTOTYPE-01R were **visually rejected** (their research informed `EXPERIENCE-DIRECTION.md`; no prototype-specific values are canonical).
