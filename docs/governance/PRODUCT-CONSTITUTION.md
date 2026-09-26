# CDI Product Constitution

**Class:** CANONICAL
**Change process:** This document defines what CDI *is*. Contract changes require an ADR or an explicit, rationale-documented edit; changes are consequential and rare.

---

## 1. Product identity

**Clinic Digital Infrastructure (CDI) is a reusable, multilingual, bidirectional digital platform for aesthetic clinics — not a collection of bespoke clinic websites.** It serves both domestic and international clinic audiences. Iranian clinics are an initial primary market, and Persian is a first-class reference locale — but Persian-only is not a property of the Core.

The product is organized around a single platform Core that is configured per clinic:

> **One Platform Core → Clinic Configuration → Independent Clinic Experience**

Future clinics must primarily differ through configuration, branding, theme, controlled layout variants, content, doctors, services, media, integrations, and domain — **not** through source-code forks. A repository containing per-clinic application forks (`Clinic A fork + Clinic B fork + Clinic C fork`) is a product failure, regardless of how quickly any one fork shipped.

The long-term ambition is a platform potentially distributed to an organization serving ~2,000 clinics. The immediate goal is deliberately smaller and defined in §2.

## 2. V1 objective

Deliver a credible clinic web platform capable of producing **multiple distinct clinic experiences without application forks** — i.e. a replicable, high-quality Persian clinic website platform. The canonical statement of what V1 includes and excludes is `docs/product/V1-SCOPE.md`; this constitution binds the *shape* of V1, not its exhaustive feature list.

V1 succeeds when the Replication Gate (see `docs/architecture/REPLICATION-CONTRACT.md`) passes.

## 3. Primary users

Three user classes, deliberately kept coarse — detailed personas are intentionally not invented yet:

1. **Prospective patient / site visitor** — an individual, typically on a mobile device, exploring aesthetic concerns and treatments, evaluating credibility, and seeking contact — in any locale the clinic supports (domestic or international patients).
2. **Clinic operator / content manager** — manages clinic configuration and content (services, doctors, articles, cases) without touching source code.
3. **Platform operator** — deploys, configures, and maintains the Core and clinic instances; establishes reusable components and variants.

## 4. Product principles

1. **Patient-centered discovery.** The site must be navigable the way patients think: by concern and goal, not only by the clinic's internal service taxonomy. Canonical journeys: *Concern → Education → Treatment Options → Doctor / Evidence → Consultation*, and *Known Treatment → Treatment Detail → Doctor / Evidence → Consultation*.
2. **Trust and medical credibility.** Presentation, content governance, and behavior must sustain patient trust. See `docs/content/MEDICAL-TRUST-GOVERNANCE.md`.
3. **Performance.** Performance is a product property, not an optimization phase. See `docs/engineering/PERFORMANCE-PRINCIPLES.md`.
4. **Accessibility.** Accessibility is a system requirement, not cleanup work. See `docs/design-system/BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`.
5. **Locale-aware and bidirectional by design.** Persian is a first-class reference locale, not a Core limitation. Localization is part of the content and experience architecture, not a translation utility added after implementation. Additional locales must be addable without Core forks, schema redesign, or duplicated components.
6. **Native bidirectionality.** Layout direction is derived from the active locale; RTL (Persian, Arabic) and LTR (English, Russian) are equal citizens of one design system. Right-to-left is never a patched-afterward mirror, and LTR is never a forked component family.
7. **Responsive / mobile-first.** Mobile is a first-class experience; the design does not define desktop first and shrink it. Most patient traffic is expected on mobile.
8. **Configuration over forks.** Clinic differences are expressed as configuration, content, and assets — never as per-clinic source branches.
9. **Controlled variation over unlimited customization.** Clinics differ within a bounded space of approved variants and tokens. No unrestricted per-clinic visual freedom; no 2,000 identical clones either.
10. **Structured content over hard-coded pages.** Pages are compositions of structured content; clinical facts do not live in JSX/HTML by hand.
11. **Progressive capability expansion.** V1 is a foundation; lead capture, CRM, booking, and AI are later phases. Architecture must avoid unnecessarily blocking them — **without** building them now.
12. **Content is governed.** Medical-adjacent content is reviewable, honest, and non-deceptive by construction (schemas, states, and review flows), not by goodwill alone.

## 5. Explicit anti-goals

The following are **not** goals of CDI in its current phase:

- A bespoke codebase per clinic (the defining failure mode).
- An unrestricted visual page builder — "anyone can draw any layout" is explicitly rejected in favor of controlled variants.
- CRM in V1.
- A patient medical-record system in V1.
- AI diagnosis or AI-generated medical advice in V1.
- Premature microservices / speculative infrastructure for imagined scale.
- Premature vendor lock-in: V1 must not hard-commit the product to a specific CMS, database, analytics provider, translation vendor, or messaging vendor without an ADR.
- A Persian-only / RTL-only Core, or any architecture that assumes exactly one language, one direction, one global slug, or one script of typography.
- Converting every mentioned future capability into a present-day feature requirement.

## 6. Relationship to other contracts

- V1 feature boundary: `docs/product/V1-SCOPE.md`
- Core/Clinic/Content/Integration boundaries: `docs/architecture/PLATFORM-BOUNDARIES.md`
- Replication and controlled variation: `docs/architecture/REPLICATION-CONTRACT.md`
- Future phases: `docs/product/PRODUCT-ROADMAP.md`
