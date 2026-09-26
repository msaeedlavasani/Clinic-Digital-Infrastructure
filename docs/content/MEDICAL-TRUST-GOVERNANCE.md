# Medical Content & Trust Governance

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Purpose

Trust is a core product principle (`PRODUCT-CONSTITUTION.md` §4.2). This policy governs how medical-adjacent content is created, reviewed, published, and maintained on CDI clinic sites. It is deliberately **not** a jurisdiction-specific legal policy: jurisdiction-dependent requirements are flagged for review (`OPEN-DECISIONS.md` L-1–L-3) and must be evaluated against actual operating/deployment markets before production claims of compliance are made.

## 2. Content integrity principles

- **No guaranteed treatment results.** Outcomes vary; language must not promise identical outcomes (this also governs Before/After representation, §4).
- **No fabricated credentials.** Doctor credentials must be real and verifiable; presentation may not invent or inflate them.
- **No invented regulatory claims.** No claim of approval/certification (regulatory bodies, associations, awards) unless genuine and verifiable.
- **No fabricated testimonials.** Testimonials are real, consented, and attributed honestly.
- **No misleading Before/After representation** (§4).
- **Risks/contraindications where appropriate.** Treatment pages include appropriate risk and contraindication information, not marketing copy alone.
- **Educational vs individualized advice.** Educational content is distinguished from individualized medical advice; content must not substitute for consultation.
- **Responsible treatment descriptions.** Procedural reality, recovery expectations, and limitations are described honestly.
- **Reviewability.** Medical claims must be reviewable: attributable to a source/review state, so a reviewer can audit what is published and why.

## 3. Review states for medical content

Medical/editorial content (Treatment, Concern, Article, Doctor profile, FAQ) carries an editorial review state before publication, conceptually:

```text
DRAFT → MEDICAL/EDITORIAL REVIEW → PUBLISHED
```

(Consistent with the translation-state model in `LOCALIZATION-FOUNDATION.md` §5 — publication requires both editorial validity *and*, for localized content, translation validity.)

## 4. Before / After governance

Before/After evidence is a special trust surface with its own rules:

- **Consent** — documented, informed, specific to publication; a publication prerequisite.
- **Publication eligibility** — cases meet defined eligibility criteria before entering the pipeline.
- **Treatment association** — each case is associated with the treatment(s) actually performed.
- **Doctor association** — each case is associated with the doctor(s) who performed it.
- **Date/time context** — captured where relevant to honest representation.
- **No deceptive manipulation** — no retouching/alteration that misrepresents outcomes; lighting/angle/framing must not mislead.
- **No implied guarantees** — presentation must not imply identical results are typical or guaranteed (§2.1).

Conceptual publication states:

```text
DRAFT → CONSENT_VERIFIED → PUBLISHED → (WITHDRAWN)
```

(Names may be improved; the *existence* of consent-gated states is canonical.)

## 5. Testimonials

Real, consented, honestly attributed. Jurisdiction-dependent testimonial rules (what may be shown, by whom) are flagged L-3 and unresolved until jurisdictions are determined.

## 6. Clinic copy and claims

Clinic-authored copy (homepage, about, service descriptions) follows §2. Where a claim is medical (efficacy, safety, outcomes), it belongs to content types with review states (§3), not free-form marketing slots.

## 7. Localization governance

> **A linguistically valid translation is not automatically a medically valid localized publication.**

Localized medical content passes linguistic review *and* medical/editorial review before publication (`LOCALIZATION-FOUNDATION.md` §13). Machine translation is never the unreviewed source of truth for public medical content (`LOCALIZATION-FOUNDATION.md` §14).

## 8. AI-assisted content (future)

AI/machine assistance may later help *draft* content. Under the roadmap's AI boundary (`PRODUCT-ROADMAP.md` §5): assistance tools operate under human medical/editorial review; AI-generated public medical content without review is prohibited; no AI diagnosis or AI-generated individualized medical advice, ever, in any phase of the website product.

## 9. Escalation

Content situations this document does not cover (novel claim types, unusual case presentations, jurisdiction-specific questions) are escalated via `OPEN-DECISIONS.md` (L-class entries) rather than resolved by improvisation.
