# Analytics Contract

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Principle

Analytics is a **provider-independent event model** owned by the platform Core and consumed through an integration boundary (`INTEGRATION-BOUNDARIES.md` §4). No provider is integrated in FOUNDATION-00 (`OPEN-DECISIONS.md` P-2).

## 2. Core event vocabulary

V1 conceptual events (names indicative, stable-once-adopted):

```text
service_viewed
treatment_viewed        # includes locale context (LOCALIZATION-FOUNDATION.md §12)
concern_viewed
doctor_viewed
before_after_viewed
consultation_started
consultation_submitted
phone_clicked
messaging_clicked
instagram_clicked
```

Locale context (`locale`) is included where useful — e.g. understanding future international demand — without collecting unnecessary sensitive health information.

## 3. Privacy-aware principles

- **Least data.** Events describe interactions with public content and conversion surfaces — not health profiles. Viewing a treatment page is an interaction event, not a medical record; no event vocabulary encodes diagnoses or inferred conditions beyond the page viewed.
- No sensitive health information, precise personal identifiers, or form *values* in analytics payloads.
- Consent/privacy-aware dispatch through the boundary; graceful absence when consent is withheld or no provider configured.
- Provider swappable without event-vocabulary redesign.

## 4. Non-goals

Vendor integration, dashboards, attribution/funnel tooling (Phase-4 direction, `PRODUCT-ROADMAP.md` §4), and any per-clinic analytics customization beyond configuration.
