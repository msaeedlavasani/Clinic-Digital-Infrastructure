# Framework Evaluation Criteria

**Class:** CANONICAL INPUT TO ADR  
**Purpose:** Define the framework/runtime evaluation contract for ADR-0001 without assessing named candidates or selecting an implementation.

---

## 1. Evaluation rule

ADR-0001 derives its decision from CDI product, runtime, localization, SEO, Design System, and operational requirements. Popularity, evaluator familiarity, or the previous AHF stack are not decision criteria by themselves. A candidate is evaluated as an application architecture, including its rendering model and supporting boundaries.

The criteria below are **priority dimensions, not scores**. No candidates have been evaluated here. Must-have gaps require explicit resolution or rejection; high-value dimensions distinguish fit; risk dimensions require mitigation and lifecycle consideration.

## 2. MUST-HAVE dimensions

Each candidate must demonstrate credible support for:

1. **Multi-clinic runtime resolution:** explicit clinic context resolved from data/configuration, with no clinic source forks or clinic-keyed route/component proliferation.
2. **Domain independence:** data-driven independent domains, unknown/disabled clinic handling, and preview/staging context without routing source edits for each clinic.
3. **Multilingual and bidirectional routing:** configurable locale support, localized slugs mapped to stable entity identity, RTL/LTR composition, locale metadata, and no duplicated locale route trees or locale-specific component forks. Stress cases: `fa-IR` RTL, `en` LTR, `ar` RTL, `ru` LTR.
4. **Strong indexable rendering:** meaningful semantic public content, links, and metadata available to users and crawlers without optional cinematic enhancement being necessary.
5. **Metadata and SEO control:** per-clinic/per-locale canonical, alternate/hreflang, robots, sitemap, social metadata, structured data, and publication-aware output.
6. **Progressive enhancement:** a complete critical base experience with optional interaction/cinematic enhancement and safe degradation.
7. **Scoped client execution:** low-interactivity/editorial regions can avoid inheriting heavy client execution solely because another region is interactive.
8. **Accessibility support:** semantic output, keyboard/focus behavior, language/direction, reduced motion, forms, and accessible alternatives are practical to implement to WCAG 2.1 AA.
9. **Media flexibility:** responsive sources, art-directed crop variants and metadata, priority/lazy loading, video/poster/fallback, evidence and Before/After requirements.
10. **Server-side integration boundaries:** secrets stay server-side; lead validation/submission and external providers have service seams; optional failures do not block rendering.
11. **Deployment flexibility:** supports the deployment properties in `RUNTIME-ARCHITECTURE.md` without forcing an unapproved provider or topology.
12. **Caching and invalidation:** clinic/locale/publication/config-scoped output, safe invalidation, and no cross-clinic/locale cache leakage.
13. **Preview capability:** protected drafts/configuration/capability previews excluded from public routing and indexing.
14. **Replication fit:** Clinic #2 can be launched primarily by configuration, content, assets, capability manifest, and domain; no clinic-specific Core code.

## 3. HIGH-VALUE dimensions

Compare the degree and cost of support for:

- cinematic interactions, rich scenes, and accessible/reduced-motion equivalents;
- route-transition flexibility without making route transitions mandatory;
- performance instrumentation and budget enforcement;
- image and media optimization tooling;
- mature ecosystem and durable community support;
- testing and cross-context/internationalization validation;
- observability across server rendering/resolution and client enhancement;
- developer ergonomics for the expected team;
- type safety across route, locale, clinic, content, and integration boundaries;
- compatibility with the future `/design-system` validation harness using the same production primitives and contracts.

## 4. RISK dimensions

Assess each candidate's exposure, mitigation, and remaining cost across:

- framework and vendor lock-in;
- hydration/client payload and client execution spread;
- architectural and operational complexity;
- bespoke runtime requirements outside the framework's natural model;
- multi-tenant context confusion or leakage risk;
- localization and bidirectional routing friction;
- dynamic-domain and host-resolution friction;
- cinematic library/transition friction;
- migration and reversal cost, including content, routing, metadata, and media dependencies.

Risk should include consequences for future clinic replication and deployment options, not only the first clinic's launch speed.

## 5. Required ADR-0001 comparison record

ADR-0001 must document, for the candidates considered:

- candidates and meaningful variants considered;
- rendering model and why its properties fit CDI;
- server/client execution boundary;
- routing and stable entity/localized slug model;
- multi-clinic and independent-domain fit;
- locale, RTL/LTR, and fallback/URL-policy accommodation;
- cache dimensions and invalidation;
- SEO and publication-aware output;
- media handling and optimization;
- editorial preview;
- deployment properties and operational complexity;
- lead and external integration boundaries;
- cinematic enhancement compatibility and failure behavior;
- Design System validation harness compatibility;
- replication proof for a materially different Clinic #2;
- accessibility and reduced-motion implementation path;
- performance measurement path;
- lock-in risks, mitigation, and migration/reversal cost;
- rejected alternatives and rationale.

The ADR records unresolved dependencies rather than silently deciding CMS, persistence, tenancy, hosting, CDN, analytics, search, URL locale policy, fallback policy, translation workflow, non-Persian fonts, animation library, GPU technology, CRM, or booking provider. It must not select a winner until evidence against CDI requirements is recorded.

