# SEO Foundation

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Principles

SEO machinery is a **Platform Core capability** (clinic-agnostic, locale-aware), driven by clinic configuration and content — never hand-tuned per page. Goals: semantic clarity for search engines, correct canonicalization, honest multilingual relationships, and avoidance of template-content duplication at scale.

## 2. Semantic URLs and per-locale slugs

- URLs are semantic and stable (treatments, concerns, doctors, articles are cleanly addressable).
- **Slugs are per-locale** (`LOCALIZATION-FOUNDATION.md` §8): a Persian treatment may use Persian terminology; `/en/treatments/botox` for English; Arabic/Russian use appropriate localized slugs. Entity identity never depends solely on a localized slug.
- Locale-aware URL structure (conceptually `/fa/…`, `/en/…`, `/ar/…`, `/ru/…`) is canonical in shape; exact identifiers/routing implementation remain architecture decisions (`OPEN-DECISIONS.md` A-5).

## 3. Page-type SEO requirements

Each canonical page type carries locale-appropriate metadata:

| Page type | SEO essentials |
|---|---|
| Treatment | Localized title/description, canonical, hreflang set, structured data boundary (§5) |
| Concern | Same as Treatment; concern pages target patient-lingo queries |
| Doctor | Localized metadata; credential claims honest (`MEDICAL-TRUST-GOVERNANCE.md`) |
| Article | Localized metadata; canonical; publication dates honest |
| Homepage/other | Clinic-level localized metadata |

## 4. Metadata and social sharing

- Locale-specific titles/descriptions; localized OpenGraph/social-sharing metadata.
- Canonical URLs on every page; self-referencing plus cross-locale alternates where they genuinely exist.
- Image metadata: meaningful, localized alt text (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §C.3); descriptive file naming as practice.

## 5. Multilingual SEO (Foundation concern)

Multilingual SEO is not postponed until after implementation:

- **`hreflang` alternate relationships** — conceptually correct alternate-language clusters; **do not emit nonexistent alternate pages**: only published and valid localized representations participate (translation states, `LOCALIZATION-FOUNDATION.md` §5).
- **Sitemap localization** — per-locale sitemap entries reflecting only published representations; incomplete/unpublished localized pages are not exposed to search engines.
- **Structured data localization** — structured data rendered from the active locale's representation.
- **`x-default`** — exact policy is an open SEO architecture decision (A-5).
- **Indexability rules** — missing-translation handling must not create thin/duplicate or misleadingly indexed pages; fallback policy (§6) governs what exists publicly.
- **Duplicate-content prevention** — canonical + hreflang discipline across locales.

## 6. Multi-clinic SEO risk (standing platform constraint)

> Replication across many clinics must **not** result in hundreds of domains publishing effectively identical SEO copy.

This is a **platform-level SEO risk** recorded as a standing constraint (`PLATFORM-BOUNDARIES.md` §5). Requirements:

- Future content strategy must support meaningful clinic-specific/local differentiation.
- Do not solve the risk by creating fake variation or automatically spinning medical copy (`MEDICAL-TRUST-GOVERNANCE.md`).
- Replication Gates should assess content differentiation alongside architecture.

## 7. Breadcrumbs, sitemap, robots

- Breadcrumbs rendered from content structure with locale-appropriate direction (§A.5 of the bidirectional contract) and structured-data representation.
- Sitemap generation from published content only, per-locale aware (§5).
- Robots policy per clinic deployment; unpublished/preview surfaces excluded from indexing.
