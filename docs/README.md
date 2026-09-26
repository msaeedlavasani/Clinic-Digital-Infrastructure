# CDI Documentation Map

**Class:** CANONICAL (this map and its authority assignments); summaries of other docs are informative.

---

## Start here

A future contributor (human or agent) should be able to answer five questions fast:

| Question | Answer |
|---|---|
| **What is binding?** | Documents marked **CANONICAL** below, per `docs/governance/DOCUMENT-AUTHORITY.md` precedence rules |
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
| `product/V1-SCOPE.md` | CANONICAL | What V1 includes/excludes; V1 done-criteria |
| `product/PRODUCT-ROADMAP.md` | GUIDANCE | Future phases (directional, non-binding) |
| `product/OPEN-DECISIONS.md` | CANONICAL (register) | All unresolved decisions, classified |
| `product/INFORMATION-ARCHITECTURE.md` | CANONICAL | Navigation model, homepage responsibilities, section hierarchies |
| `product/PAGE-ARCHETYPES.md` | CANONICAL | 14 page archetype contracts (intent/content/CTA/SEO/variation) |
| `product/UX-FLOWS.md` | CANONICAL | Canonical flows incl. discovery, consultation, locale switch |
| `architecture/PLATFORM-BOUNDARIES.md` | CANONICAL | Core/Config/Content/Integration zones; locale machinery |
| `architecture/REPLICATION-CONTRACT.md` | CANONICAL | Fork-free replication, change classification, Replication Gate, Controlled Variation |
| `architecture/LOCALIZATION-FOUNDATION.md` | CANONICAL | Multilingual/bidirectional foundation: locales, localizations, fallback, routing |
| `architecture/INTEGRATION-BOUNDARIES.md` | CANONICAL | Conceptual boundaries for external systems |
| `architecture/SEO-FOUNDATION.md` | CANONICAL | SEO principles incl. multilingual SEO, multi-clinic risk |
| `design-system/DESIGN-SYSTEM-CONSTITUTION.md` | CANONICAL | Experience language, layer model, anti-aesthetics, quality tests |
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
| `content/CONTENT-MODEL.md` | CANONICAL (shape) | Conceptual entities/relationships + localization overlay |
| `content/MEDICAL-TRUST-GOVERNANCE.md` | CANONICAL | Medical content integrity, Before/After governance |
| `engineering/LEAD-CONSULTATION-CONTRACT.md` | CANONICAL | V1 lead capture boundary |
| `engineering/ANALYTICS-CONTRACT.md` | CANONICAL | Provider-independent event model + privacy rules |
| `engineering/PERFORMANCE-PRINCIPLES.md` | CANONICAL | Performance as a product property |
| `engineering/PRIVACY-SECURITY-FOUNDATION.md` | CANONICAL | Baseline privacy/security principles |
| `decisions/README.md` | CANONICAL (mechanism) | ADR mechanism and triggers |
| `decisions/ADR-TEMPLATE.md` | Template | Copy for new ADRs |

## Ownership / change process

- Canonical docs: change via ADR or explicit rationale-documented edit (`governance/DOCUMENT-AUTHORITY.md` §4).
- Guidance docs (currently `PRODUCT-ROADMAP.md`): editable with stated reason.
- Working notes: free, never authoritative.
- This map must be updated whenever documents are added, removed, or re-classed.

## Founding context

This documentation set is the output of **CDI FOUNDATION-00** (including the multilingual/bidirectional steering delta) and **CDI DESIGN-01** (design-system specification; tokens, patterns, IA, archetypes, controlled variation). Both stages are documentation/design-only; no implementation exists yet. The first ADRs (framework, CMS, persistence, tenancy) are deliberately unmade — see `decisions/README.md` §4.
