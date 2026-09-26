# Product Roadmap — Future Capability Boundary

**Class:** GUIDANCE
**Change process:** Directional, non-binding. Phases may be re-ordered or dropped by the product owner without an ADR.

---

## 1. Purpose and the one rule

This document records *directional* future capabilities so that architecture avoids unnecessarily blocking them. It creates **no present-day implementation obligations**.

> **Future-awareness must not cause speculative V1 complexity.** A capability mentioned here never justifies building infrastructure for it now. The only legitimate present-day effect of this document is on *boundaries* (where integration seams, content schemas, and configuration must not be drawn so narrowly that a future phase requires a Core redesign).

## 2. Phase 2 candidates — Lead management / appointments

- Lead inbox, statuses, assignment (beyond V1 capture)
- Appointment/scheduling capabilities, calendars
- Notifications/reminders (SMS/messaging)
- International consultation and multilingual lead handling (see §5)

## 3. Phase 3 candidates — CRM / patient relationship

- Patient profiles and relationship history
- Post-consultation follow-up flows
- Role/access controls beyond the clinic-operator basics

## 4. Phase 4 candidates — Campaigns / marketing automation / richer analytics

- Campaign management
- Marketing automation journeys
- Deeper analytics, attribution, funnel tooling

## 5. Phase 5 candidates — AI and personalization

- AI-assisted content drafting (with human review; see `MEDICAL-TRUST-GOVERNANCE.md`)
- Personalization
- AI-assisted operations

**AI-assisted drafting and machine translation are assistance tools under human review — never the unreviewed source of truth for public medical content.**

## 6. International Patient / Medical Tourism opportunity

**Recorded as an explicit future product opportunity.** Iranian aesthetic and medical services may have meaningful price competitiveness for international patients, so the platform must not assume every patient is domestic. The multilingual foundation (`LOCALIZATION-FOUNDATION.md`) exists substantially to keep this open.

Potential future capabilities (directional only, **not** V1):

- international consultation; multilingual lead handling
- international patient coordinator workflows
- treatment-trip planning; expected treatment/stay duration
- pre-arrival information; post-treatment follow-up
- travel, accommodation, airport/transport guidance
- remote consultation; currency/pricing presentation
- international messaging channels

## 7. What this document does not do

- It does not put anything in V1 (`V1-SCOPE.md` is the only source of V1 truth).
- It does not license speculative infrastructure (`ENGINEERING-GOVERNANCE.md` §2.7).
- It does not pre-decide vendors, data models, or designs for future phases.
