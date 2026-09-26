# Integration Boundaries

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Principle

Every external system is reached through a **conceptual integration boundary**: a server-side seam that owns credentials, caching, fallback, and failure behavior. No vendor implementation is selected or implemented in FOUNDATION-00; boundaries below are contracts for future implementation.

```text
External Provider → Server-side Integration Boundary → Cache/Stored Projection → Website
```

## 2. General rules

- **Credentials stay server-side.** Secrets, keys, and tokens are never exposed to the client (`PRIVACY-SECURITY-FOUNDATION.md`).
- **The public website must not depend on any external system's availability.** An external outage must never break clinic pages — rendering continues from cached/stored projections.
- **Cache/stored projection first.** Anything shown from an external system is served from a stored projection with defined refresh behavior.
- **Loading/fallback/empty states** are defined for every integration surface.
- **Rate limits are respected** by the boundary, not by each page render.
- **Vendors are swappable** behind the boundary; clinic-facing behavior does not encode vendor shapes.

## 3. Instagram / Meta

Conceptual boundary for social content:

- Public site renders from a **cached projection** (per `CONTENT-MODEL.md`, Social/Instagram Item) — never live-fetches Instagram during page render.
- External outage degrades gracefully (curated cache → hidden section), never breaks the page.
- Loading/fallback/empty states defined.
- Rate limits respected; credentials server-side.
- **Curation/pinning** of items must remain possible (curation is a clinic content concern, not vendor-shaped).

## 4. Analytics provider

Provider-independent (see `ANALYTICS-CONTRACT.md`). The boundary owns: provider loading, consent/privacy-aware dispatch, and graceful absence when no provider is configured or consent is withheld. Analytics must never block render (`PERFORMANCE-PRINCIPLES.md`).

## 5. Maps

Location/branch display via a maps boundary; failure/absence degrades to textual address/hours (which are always available from content). Provider not selected.

## 6. Messaging channels

Configured, clinic-level channels (phone, WhatsApp or equivalent, others as configured). The boundary is channel-*abstract*: domestic and international patients may prefer different channels, so channels are **configured per clinic**, never hard-coded to one provider (`LOCALIZATION-FOUNDATION.md` §17). No provider implementation now.

## 7. Future booking

A booking/scheduling system is a Phase-2 candidate (`PRODUCT-ROADMAP.md` §2). V1 lead capture must sit behind an integration boundary (`LEAD-CONSULTATION-CONTRACT.md`) so a future booking/CRM system can consume leads without Core redesign. No booking implementation now.

## 8. Future CRM

CRM consumption of leads/consultations is Phase-3 (`PRODUCT-ROADMAP.md` §3). The lead boundary (§7) is the seam. No CRM design or implementation now.

## 9. Prohibitions

- No direct external calls from Core rendering paths (`PLATFORM-BOUNDARIES.md` §2).
- No vendor commitment without an ADR (`ENGINEERING-GOVERNANCE.md` §2.5 context; `OPEN-DECISIONS.md` P-2/P-5).
- No speculative integration scaffolding for future phases (`ENGINEERING-GOVERNANCE.md` §2.7).
