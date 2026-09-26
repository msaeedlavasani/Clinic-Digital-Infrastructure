# V1 Scope Contract

**Class:** CANONICAL
**Change process:** Adding to or removing from V1 scope is a contract change (ADR or explicit rationale-documented edit).

---

## 1. Objective

V1 delivers **one replicable, high-quality clinic website platform**: a single application Core that, through configuration + content + localized content + theme + controlled variants + assets + integrations + domain (`REPLICATION-CONTRACT.md` §2), produces independent, credible clinic experiences for aesthetic clinics. V1 succeeds when the Replication Gate passes (see `REPLICATION-CONTRACT.md`).

> **V1 platform capability vs. V1 content requirement.** The V1 *platform* is multilingual and bidirectional by design (`fa-IR`, `en`, `ar`, `ru` as reference locales). The V1 *content* requirement does not demand that the Reference Clinic launch with complete production content in all four languages; a reference clinic may launch with a smaller published locale set. Platform capability ≠ content-production scope.

V1 does **not** include CRM, booking/appointment scheduling, patient accounts, medical records, AI features, marketing automation, international-patient operational tooling, or analytics vendor lock-in. Those are later phases (`PRODUCT-ROADMAP.md`). Their mention anywhere in documentation is never a V1 requirement.

## 2. Public experience (pages)

V1 covers these page types, rendered from structured content:

| Page | Purpose |
|---|---|
| Homepage | Orientation, credibility, primary pathways (by concern, by treatment, by doctor) |
| Services | Service categories overview |
| Treatment details | Individual treatment page: description, expectations, risks, doctors offering it |
| Concerns | Patient-journey entry points organized by concern |
| Doctors | Team listing |
| Doctor details | Credentials, specialties, related treatments, before/after evidence |
| Before/After | Case gallery (governed by `MEDICAL-TRUST-GOVERNANCE.md` and Before/After governance) |
| About | Clinic story, team, facilities |
| Blog / Magazine | Educational article listing |
| Article | Individual educational article |
| FAQ | Clinic and treatment Q&A |
| Contact | Contact information, locations, hours, messaging channels |
| Search | Site content discovery |

Page *types* are canonical; exact URL naming is an implementation/SEO decision recorded later (`SEO-FOUNDATION.md`).

## 3. Conversion

V1 includes lead capture — **not** appointment scheduling:

- Consultation/lead request (governed by `LEAD-CONSULTATION-CONTRACT.md`)
- Phone click-to-call
- WhatsApp or an equivalently configured messaging channel
- Instagram / social navigation

## 4. Platform capabilities

- Clinic configuration (identity, contact, socials, domain, variant selection, `defaultLocale` / `supportedLocales`)
- Branding and theming (tokens; Vazirmatn as primary Persian typeface, script-aware typography architecture for other scripts)
- Controlled layout variants (bounded, approved)
- Structured clinic content (see `CONTENT-MODEL.md`)
- SEO foundation (see `SEO-FOUNDATION.md`)
- Analytics abstraction (provider-independent events; see `ANALYTICS-CONTRACT.md`)
- Instagram integration boundary with cached projection and graceful fallback (see `INTEGRATION-BOUNDARIES.md`)
- CMS-ready content architecture: content is structured and schema-described so a headless CMS can be adopted later **without an ADR-level rework** — CMS selection itself is deferred (see `OPEN-DECISIONS.md`)
- Domain independence: each clinic is independently addressable at its own domain
- Locale-aware routing, localized slugs, localized SEO metadata and alternate-language relationships (see `SEO-FOUNDATION.md` and `LOCALIZATION-FOUNDATION.md`)
- Responsive, mobile-first, native-bidirectional experience (see `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`)

## 5. Explicitly out of V1

- Lead management workflows, appointment scheduling, calendars
- CRM / patient relationship management
- Patient portal, login, medical records
- Marketing automation, campaigns
- AI features of any kind (including AI-assisted content tooling)
- Advanced/proprietary analytics integrations
- Operating every clinic with production content in every locale: the *platform capability* is multilingual by design, but complete per-locale content production is a clinic content decision governed by `LOCALIZATION-FOUNDATION.md` (translation states, fallback policy).
- International-patient operational capabilities (trip planning, coordinator tooling, currency/pricing) — recorded as a future opportunity, not V1 features
- Unrestricted visual page building
- Per-clinic code customization of any kind

This list is a *scope boundary*, not a prohibition on architecture being future-aware (`PRODUCT-ROADMAP.md`).

## 6. Definition of "V1 done"

- Replication Gate passes with at least two meaningfully different reference clinics (`CONFIG_ONLY` or approved-variant extension).
- All V1 page types render from structured content for a reference clinic, in the reference clinic's configured locales, with direction derived from the active locale.
- Lead capture, phone, and messaging channels function end-to-end for a reference clinic.
- Definition of Done (`ENGINEERING-GOVERNANCE.md` §3) applied to the delivered surfaces.
