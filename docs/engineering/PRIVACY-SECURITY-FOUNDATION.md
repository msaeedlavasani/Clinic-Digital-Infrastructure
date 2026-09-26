# Privacy / Security Foundation

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Status

Baseline **principles** only — this is not a security architecture, threat model, or legal policy. Jurisdiction-specific requirements are unresolved until deployment markets are known (`OPEN-DECISIONS.md` L-1/L-2).

## 2. Baseline principles

- **Least data collection.** Collect only what the documented feature requires (`LEAD-CONSULTATION-CONTRACT.md` §2). No speculative fields.
- **No medical records in V1.** No patient medical-record storage, processing, or inference of health profiles (`V1-SCOPE.md` §5). Analytics vocabularies stay interaction-level (`ANALYTICS-CONTRACT.md` §3).
- **Secrets never exposed client-side.** All credentials, keys, tokens server-side only (`INTEGRATION-BOUNDARIES.md` §2).
- **Tenant/clinic data boundaries.** Clinic (tenant) data is isolated by construction, not convention; cross-tenant reads are architecture defects, not configuration.
- **Secure integration credentials.** Per-boundary credential handling; rotation and scoping considered at implementation time.
- **Input validation.** All user input validated server-side; client validation is UX only.
- **Abuse/spam protection boundary.** Lead capture and form surfaces have a defined abuse-protection seam (mechanism chosen at implementation; e.g. rate limiting, challenge services behind the boundary).
- **Privacy-aware analytics.** See `ANALYTICS-CONTRACT.md` §3.
- **Data retention decided before production.** Retention schedules for leads, analytics, and case content are decisions that must be made **before real data is stored** (L-2) — not retrofitted.
- **Consent where applicable.** Consent captured where required (leads, testimonials, Before/After publication, analytics where jurisdiction demands).
- **Future role/access controls.** V1 assumes platform-operator/clinic-operator roles; granular RBAC is a later-phase capability (`PRODUCT-ROADMAP.md` §3) — the tenant model must not preclude it.

## 3. Explicitly unresolved (jurisdiction-dependent)

Medical advertising rules · privacy regime incl. cross-border transfer · treatment-claims rules · testimonial rules · Before/After publication rules · international-patient disclosures · pricing/currency presentation. All recorded under L-1/L-2/L-3 in `OPEN-DECISIONS.md`. **No universal legal answer is invented here.**

## 4. Multilingual note

Localized legal/privacy copy is a localization concern (`LOCALIZATION-FOUNDATION.md` §2) — jurisdiction review (L-1) must cover all locales a clinic actually publishes, not only the default locale.
