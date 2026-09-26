# Lead / Consultation Contract

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Boundary

V1 includes **consultation/lead capture — not a complete appointment system**. Scheduling/calendars are Phase-2 candidates (`PRODUCT-ROADMAP.md` §2). The lead boundary exists so a future booking/CRM system can consume leads without Core redesign (`INTEGRATION-BOUNDARIES.md` §7–8). The future CRM is **not** designed here.

## 2. Conceptual fields

- name
- mobile/contact
- treatment **or** concern (patient-lingo entry, not clinic taxonomy)
- preferred doctor (if applicable)
- preferred contact/time (if applicable)
- consent where required (`PRIVACY-SECURITY-FOUNDATION.md`)

Least-data applies: no field is collected merely because a future system might want it.

## 3. Future-compatible lead context

The lead model must not assume Persian-speaking domestic patients only. Conceptual context fields (collected or derived, only where genuinely needed):

- `locale` of the request
- preferred contact language
- country/region **if genuinely needed**
- preferred communication method

**Do not** turn V1 lead capture into an international CRM; context is recorded for future consumption, nothing more.

## 4. Form states

Conceptual interaction states:

```text
idle → validating → submitting → success | error
```

All states have accessible, localized representations (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` Part C): labels, error announcements, success confirmation.

## 5. Integration boundary

Submission sits behind an **integration boundary** (`INTEGRATION-BOUNDARIES.md` §2): validated server-side, abuse/spam protection applied (`PRIVACY-SECURITY-FOUNDATION.md` §5), delivered to a configured target. The delivery target is deliberately deferred (`OPEN-DECISIONS.md` P-1) — capture and the boundary are V1; the delivery destination is not designed now.

## 6. Out of scope

Appointment scheduling, calendars, reminders, lead-status workflows, CRM pipelines, international CRM features. Their mention (`PRODUCT-ROADMAP.md`) never expands this contract.
