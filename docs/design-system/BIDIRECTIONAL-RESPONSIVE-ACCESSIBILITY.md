# Bidirectional, Responsive & Accessibility Contract

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

This document combines three interlocking contracts: the **Bidirectional Design Contract**, the **Responsive Contract**, and the **Accessibility Contract**.

## Part A — Bidirectional Design Contract

### A.1 Direction derives from locale

Direction (RTL/LTR) is **derived from the active locale**, never hard-coded. RTL (Persian `fa-IR`, Arabic `ar`) and LTR (English `en`, Russian `ru`) are equal citizens of one design system. The same component architecture serves all directions — no `PersianButton`/`EnglishButton`, no `RTLHeader`/`LTRHeader`, no direction-specific component forks.

### A.2 Logical layout

Prefer logical layout semantics over hard-coded physical ones wherever direction matters:

```text
start/end · inline-start/inline-end · block-start/block-end   ← preferred
left/right                                                    ← prohibited where direction matters
```

Applies to: margins, padding, alignment, positioning, borders, icons, navigation, drawers, breadcrumbs, carousels, pagination, forms, and directional transitions. Future components are audited against this principle.

### A.3 Directional semantics vs fixed content

Not every visual element mirrors mechanically. Two classes:

- **Directional UI** — usually follows writing direction: back/forward, breadcrumbs, pagination, next/previous, drawers, navigation affordances, directional chevrons.
- **Semantically fixed content** — may **not** mirror merely because locale changes: media controls, universally understood symbols, brand marks, charts/data, clinical imagery, and before/after semantics where chronology or labeling determines meaning.

Future implementations must distinguish semantic direction from decorative mirroring.

### A.4 Mixed-script content

Mixed content is normal in this domain: Persian/Arabic/Russian + Latin terms like `RF Microneedling`, `CO₂ Laser`, `PRP`, `HIFU`, or `۳ جلسه` / `30 min`. Handling must be **deliberate**, not accidental:

- Page-level `dir` alone is insufficient; mixed-direction fragments require semantic isolation (conceptually `bdi`/direction isolation where content requires it).
- Mixed-script fragments are a documented, auditable pattern — not per-developer improvisation.

No implementation is required now; the requirement is binding on future implementation.

### A.5 RTL coverage checklist (from the RTL contract, now bidirectional)

Rules cover: document direction · logical start/end · navigation · breadcrumbs · arrows · forms · carousels · drawers · pagination · directional icons · mixed Persian/Latin content (extended: mixed *any* content) · numbers where applicable.

## Part B — Responsive Contract

### B.1 Principle

**Mobile is a first-class experience.** The experience is not defined on desktop and shrunk.

### B.2 Device classes (conceptual)

Narrow mobile · common mobile · tablet · desktop · large desktop. Exact breakpoint numbers remain implementation/design decisions — avoid locking arbitrary values unless necessary; the token category exists (`DESIGN-SYSTEM-CONSTITUTION.md` §5).

### B.3 Fluid behavior rules

- Fluid layout behavior; no horizontal overflow at any supported width.
- Readable line lengths (bounded measure) across scripts — noting text expansion/contraction across locales (§B.4).
- Responsive imagery, appropriate to device and locale where imagery is localized.
- Usable touch interaction; safe-area awareness where relevant.
- Layout must not assume desktop pointer precision or mobile-only constraints.

### B.4 Language stress

Components must not be designed around fixed text lengths. Validation must include long navigation labels, long treatment names, multi-line buttons where policy permits, headings, metadata, cards, breadcrumbs, form labels/errors. A layout that only works when text is Persian is a defect.

## Part C — Accessibility Contract

### C.1 Status

Accessibility is a **system requirement**, not cleanup work. The WCAG 2.1 **Level AA** target is adopted as the canonical requirement-level decision (rationale in §C.5). No unsupported compliance claims are made — this is a target and a QA basis, not a certification.

### C.2 Principles

- **Semantic structure** — headings, landmarks, lists used for meaning, not appearance.
- **Keyboard navigation** — every interactive element operable by keyboard in logical order.
- **Visible focus** — focus indicators never suppressed; they must survive theming.
- **Contrast** — meets the AA floor; theming must preserve it (`REPLICATION-CONTRACT.md` §5).
- **Touch target usability** — adequate target sizes on touch devices.
- **Form labels/errors** — programmatic association; errors announced and identified in text, not color alone.
- **Reduced motion** — respect user preference; motion is enhancement, never the sole carrier of meaning.
- **Meaningful image alt text** — localized; decorative imagery hidden from AT.
- **Accessible interactive components** — dialogs, drawers, carousels, tabs built with correct roles, states, and keyboard behavior.
- **RTL/LTR accessibility** — reading order, focus order, and directional semantics remain correct in both directions; mirrored affordances mirrored consistently; fixed-semantics content (§A.3) announced correctly.

### C.3 Accessibility across languages

Correct document/page language (`lang`), correct direction, localized accessible names, localized alt text, screen-reader-compatible language changes mid-page (mixed-language fragments), and readable typography across scripts.

### C.4 Testing expectation

Accessibility QA is part of the Definition of Done (`ENGINEERING-GOVERNANCE.md` §3), including bidirectional and language-stress scenarios, and the locale-stress validation gate (`DESIGN-SYSTEM-CONSTITUTION.md` §9).

### C.5 Decision record — WCAG 2.1 AA

- **Decision:** Target WCAG 2.1 Level AA as the canonical accessibility requirement.
- **Rationale:** AA is the internationally recognized baseline for public-facing services, achievable without exotic tooling, strict enough to protect real patients (contrast, keyboard, labels), while AAA's full set includes criteria inappropriate as blanket requirements for a marketing/content platform. AA is also the common anchor for future regulated-market expectations.
- **Status:** Adopted as canonical. Claims of *compliance* remain QA-verified per release; this document asserts a target, not an achieved certification.
- **Revisit trigger:** Jurisdiction determination (L-1) may impose stricter local requirements.
