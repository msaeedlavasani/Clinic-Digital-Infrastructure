# Information Architecture

**Class:** CANONICAL
**Change process:** Rationale-documented edit; IA contract changes require ADR.

---

## 1. Principles

- **Patient-centered discovery** (`PRODUCT-CONSTITUTION.md` §4.1): Concern is a first-class entry point alongside the clinic's service taxonomy.
- IA is **locale-aware**: navigation, slugs, and breadcrumbs are localized; entity identity is not (`LOCALIZATION-FOUNDATION.md` §8).
- IA expresses the canonical journeys: *Concern → Education → Treatment Options → Doctor/Evidence → Consultation* and *Known Treatment → Treatment Detail → Doctor/Evidence → Consultation*.

## 2. Primary navigation model (per locale)

```text
Home
Concerns        →  patient-lingo entry (Concern Explorer)
Services        →  clinical taxonomy (Service Category → Treatment)
Doctors
Before/After
Articles (Magazine)
About  ·  Contact
[LocaleSwitcher when enabled]
```

- Labels are localized per locale; RTL/LTR follow direction machinery.
- Config-tunable: labels, grouping, CTA emphasis, MegaMenu or not (`SIGNATURE-PATTERNS.md` §9) — **IA hierarchy is stable across clinics** (stability is what keeps many sites coherent); expression varies by configuration.
- Mobile drawer carries the same destinations + contact pathways + consultation pathway (`SIGNATURE-PATTERNS.md` §9).

## 3. Homepage information-architecture responsibilities

The Homepage must be **capable of expressing** (no mandatory visual order):

1. clinic positioning
2. primary conversion (ConsultationSurface)
3. concern/treatment discovery (ConcernExplorer)
4. featured services
5. trust
6. doctors
7. Before/After (governed)
8. testimonials where legitimate
9. social/Instagram
10. educational content
11. clinic/location context

Controlled composition reorders/emphasizes within UX constraints (`CONTROLLED-VARIATION.md` §5.5); every homepage carries **positioning, primary conversion, and a discovery pathway** in some order.

## 4. Section hierarchies (conceptual)

- **Concerns:** Concern Explorer (categories: Skin/Face/Hair/Body, extendable) → Concern Detail → related Treatments/Articles.
- **Services:** Service Category → Treatment Detail (typical depth ≤2 from Services root).
- **Doctors:** index → Doctor Detail.
- **Before/After:** index (filterable) → case presentation (or rich index cases; clinic depth decision).
- **Articles:** Magazine index → Article (+ related treatment/concern links).
- Depth discipline: key content ≤3 clicks from Home on mobile; Concern/Treatment/Doctor are the highest-priority destinations.

## 5. SEO-IA alignment

- Per-locale slugs & localized breadcrumbs (`SEO-FOUNDATION.md` §2); entity identity never slug-dependent.
- Hreflang alternates only for published representations (`SEO-FOUNDATION.md` §5); unpublished locale branches do not exist in navigation/sitemaps.
- Multi-clinic duplicate-copy risk applies to IA templates too (`SEO-FOUNDATION.md` §6): structure may repeat; **copy must differentiate**.
- `x-default`/URL-locale strategy remain open (A-5) — IA is shaped by the sub-path working assumption (`/fa/…`, `/en/…`).

## 6. What IA deliberately does not fix

- Exact visual order of homepage sections (composition variant, §3).
- Exact URL naming (A-5; SEO machinery decides at implementation).
- Cross-clinic label wording (content + locale configuration).
