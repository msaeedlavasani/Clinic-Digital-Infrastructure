# Content Model (Conceptual)

**Class:** CANONICAL (entity/relationship shape); implementation-neutral.
**Change process:** Entity/relationship changes require ADR; field-level additions within an entity's documented concept may be explicit rationale-documented edits.

---

## 1. Status

This document defines **conceptual schemas/entities and relationships** only. No database schemas are implemented here; persistence is undecided (`OPEN-DECISIONS.md` A-2/A-3).

## 2. Localization overlay (applies to every public-facing entity)

Per `LOCALIZATION-FOUNDATION.md` §4, every public-facing entity follows:

```text
Locale-independent entity  ←→  Localized representation (per locale)
```

Never `titleFa`/`titleEn`-style expanding field sets. The localized representation typically carries title, slug, summary, body/content, SEO metadata, and accessibility text; entity identity is stable and locale-independent. A localized representation carries a translation state (`NOT_STARTED → DRAFT → REVIEW_REQUIRED → READY → PUBLISHED`); only `PUBLISHED` is publicly exposed.

## 3. Entities

### Clinic
The tenant root. Owns: identity, branding/theme, contact, locations, social accounts, `defaultLocale`/`supportedLocales`/`localeConfiguration`, configured CTA behavior, domain, selected variants. Referenced by (or scopes) all other entities.

### Location / Branch
Physical branches of a Clinic. Public-facing fields (name, address, hours, contact) are localizable; operational data may remain locale-independent. A clinic may have many branches.

### Service Category
Clinic-facing taxonomy grouping Treatments (e.g. injectables, laser, hair restoration). Used for clinical-organization navigation; **not** the primary patient-discovery entry point (that is Concern — §4).

### Treatment
A specific clinical service (e.g. botox, laser resurfacing). Localizable. Relates to: Service Category (belongs to), Concern (addresses), Doctor (performed by), BeforeAfterCase (evidences), Article (educates about).

### Concern
A patient-lingo entry point (e.g. "acne scars", "hair loss") that may map to multiple Treatments. **First-class discovery entity** — a patient should not need to know a treatment name to discover relevant information. Relates to: Treatments (addresses it), Articles (explains it), Doctors (treats it).

### Doctor
Clinician profile: credentials, specialties, biography. Public profile content is localizable; verifiable credential facts are locale-independent and governed by `MEDICAL-TRUST-GOVERNANCE.md` (no fabricated credentials). Relates to: Treatments (performs), BeforeAfterCase (performed by), Articles (authored/reviewed by), Concerns (treats).

### BeforeAfterCase
A governed evidence artifact: consent + eligibility + treatment association + doctor association + publication state (`DRAFT / CONSENT_VERIFIED / PUBLISHED / WITHDRAWN` — names may be improved). Descriptive content is localizable; imagery and consent records are locale-independent. Full governance: `MEDICAL-TRUST-GOVERNANCE.md` §4.

### Article
Educational/blog content supporting the patient journey. Localizable; medical/editorial review governed by `MEDICAL-TRUST-GOVERNANCE.md` (translation review path: `LOCALIZATION-FOUNDATION.md` §13). Relates to: Concerns, Treatments, Doctors.

### FAQ
Question/answer pairs, scoped to clinic, service, treatment, or concern. Localizable.

### Testimonial
Patient feedback. Consent-gated; publication governed by `MEDICAL-TRUST-GOVERNANCE.md` (no fabricated testimonials; jurisdiction-dependent rules flagged L-3). Localizable.

### Social/Instagram Item
A cached projection of external social content — never a live dependency (`INTEGRATION-BOUNDARIES.md` §3). May exist per-locale as curated localized context or be absent per locale (`LOCALIZATION-FOUNDATION.md` §11).

### Navigation
Structured navigation (menus, footers) as configuration+content, localizable (including locale-specific navigation where configured).

### CTA
Configured call-to-action semantics (consultation request, phone, messaging channel, social). Wording is localized; behavior is configured per clinic.

## 4. Core discovery relationships

```text
Concern
   ↓ addresses
Treatments
   ↓ performed by
Doctors          (+ BeforeAfterCase as evidence)
```

The patient-centered journeys these serve (canonical product principles):

- **Concern → Education → Treatment Options → Doctor / Evidence → Consultation**
- **Known Treatment → Treatment Detail → Doctor / Evidence → Consultation**

The site must not be structured *solely* around the clinic's internal service taxonomy; Concern is a first-class, patient-lingo entry point. The clinic's internal taxonomy (Service Category) remains available for clinical organization and secondary navigation.

## 5. Modeling notes

- Relationships above are conceptual; cardinality details are implementation decisions.
- Every localized representation follows §2's overlay; locale-independent fields are those whose meaning does not vary by locale (identifiers, structural relations, consent records, credential facts, media binaries).
- Media/assets are clinic content; localized imagery is permitted where a locale genuinely needs different imagery (`LOCALIZATION-FOUNDATION.md` §2).
