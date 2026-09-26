# UX Flows

**Class:** CANONICAL (flow contracts); final visuals are prototyping-stage.
**Change process:** Rationale-documented edit; flow contract changes require ADR.

---

Flows express the canonical patient journeys (`PRODUCT-CONSTITUTION.md` §4.1) as UX contracts. Every flow is locale-aware and validated per the responsive matrix (`LAYOUT-RESPONSIVE.md` §6).

## 1. Concern discovery flow (signature)

```text
ConcernExplorer prompt («چه چیزی دوست دارید بهبود پیدا کند؟»)
  → Category (Skin/Face/Hair/Body)
  → Concern
  → Concern Detail: education + «گزینه‌های مرتبط» (related treatment options)
  → Treatment Detail(s)
  → Doctor/Evidence (DoctorProfile · BeforeAfterCompare)
  → ConsultationSurface
```

Rules: no diagnosis; no automatic suitability claims (`SIGNATURE-PATTERNS.md` §1); every step offers consultation as a calm side-path, never a gate.

## 2. Known-treatment flow

```text
Search / Services / Instagram · Article · referral
  → Treatment Detail
  → Doctor/Evidence
  → ConsultationSurface
```

Rules: Treatment Detail must surface doctors + governed evidence (archetype contract); consultation CTA present on treatment pages.

## 3. Doctor-led flow

```text
Doctors index (or search)
  → Doctor Detail (credentials, approach, treatment areas, cases, articles)
  → Consultation (with doctor where clinically meaningful)
```

## 4. Consultation flow (signature conversion)

```text
Any ConsultationSurface entry
  → Form: name → mobile/contact → treatment OR concern (patient-lingo)
          → preferred doctor (optional) → preferred contact/time (optional)
          → consent (un-prechecked)            [least-data: LEAD-CONSULTATION-CONTRACT §2]
  → states: idle → validating → submitting → success | error
  → success: clear, calm confirmation + what-happens-next
```

Rules: progressive disclosure; human-readable localized validation copy; no aggressive e-commerce language; locale + contact-language context recorded conceptually (`LEAD-CONSULTATION-CONTRACT.md` §3).

## 5. Locale switch flow

```text
LocaleSwitcher (only enabled locales shown)
  → equivalent localized page exists (published)?  → yes: navigate to equivalent page
                                                   → no:  localized homepage + explicit acknowledgment
```

Rules: never blindly to an unrelated homepage when an equivalent exists; only published representations offered (A-6 fallback default; `SIGNATURE-PATTERNS.md` §14).

## 6. Cross-cutting state handling

Every flow must define graceful behavior for:

- **Loading** — calm skeleton/feedback, no layout shift (`MOTION-ICONOGRAPHY.md` §3).
- **Empty** — e.g. search no-results: acknowledge + suggest categories/ConcernExplorer rescue path; Instagram absent per locale: section gracefully hidden (`SIGNATURE-PATTERNS.md` §11).
- **Error** — human-readable, localized, actionable; never generic technical copy (`SIGNATURE-PATTERNS.md` §8); form errors programmatic + text-identified.
- **Missing content** — facts/steps/translations withheld deliberately (TreatmentFacts §2; fallback policy A-6); never silently substituted from another locale.
- **Reduced motion** — all flows remain fully usable with animations disabled (`MOTION-ICONOGRAPHY.md` §3).
