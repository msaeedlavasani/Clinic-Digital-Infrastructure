# Engineering Governance

**Class:** CANONICAL
**Change process:** Contract changes require ADR or an explicit, rationale-documented edit.

---

## 1. Purpose

This document governs *how* engineering work is performed on CDI, independent of any chosen framework, CMS, or database. It binds both human and AI contributors.

## 2. Engineering principles

1. **No clinic-specific forks.** Per-clinic source branches or copies are prohibited. Clinic differences live in configuration, content, and assets (see `REPLICATION-CONTRACT.md`).
2. **No undocumented architecture deviations.** Any deviation from a canonical contract must be documented in the change itself (commit/PR description) and either reverted or promoted via ADR.
3. **Reusable Core before duplication.** When a need appears twice, the third occurrence must be a shared capability, not a third copy. Duplication may be accepted *temporarily* with an explicit note; silent duplication is not.
4. **Configuration over conditional hacks.** Behavior differences are expressed through configuration and variant selection, not through conditionals keyed to clinic identity in presentation code (see `REPLICATION-CONTRACT.md` §4).
5. **Dependencies require justification.** A new dependency must state: the problem it solves, why existing tooling is insufficient, maintenance/abandonment risk, and whether it touches security-sensitive paths. No dependency is added "for later".
6. **No premature abstraction.** Abstract on the second real use case, not the imagined third. A wrong abstraction is more expensive than duplication.
7. **No speculative infrastructure.** Nothing is built because a future phase might need it. Future-awareness informs *boundaries*, never present-day scope (see `PRODUCT-ROADMAP.md`).
8. **Tests proportional to risk.** Critical paths (replication integrity, lead submission, content publication states, locale fallback behavior, direction-sensitive layout logic) warrant tests; static content does not demand ceremony.
9. **Documentation accompanies contract changes.** A change that alters what is binding updates the canonical document in the same change. A canonical document left contradicted by code is a defect.
10. **Integration boundaries are implementation-agnostic.** Anything that talks to an external system sits behind a conceptual boundary defined in `INTEGRATION-BOUNDARIES.md`; vendors are swappable behind it.
11. **Locales are data, not code.** Adding a locale must never require Core modification, new components, or schema migration. Locale-specific behavior is configuration plus locale-independent entities with localized representations (`LOCALIZATION-FOUNDATION.md`). No per-locale component forks (`FaButton`, `EnHeader`, …) and no `titleFa`/`titleEn` field proliferation.
12. **Logical layout over physical.** Direction-sensitive layout uses start/end (inline-start/inline-end, block-start/block-end) semantics, never hard-coded left/right (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`).
13. **Secrets and tenant data.** Secrets never ship client-side; clinic (tenant) data boundaries are respected in code organization, not by convention alone.

## 3. Definition of Done (conceptual)

A unit of V1 implementation work is "done" when all applicable items hold:

- [ ] Build passes
- [ ] Typecheck passes (where types exist)
- [ ] Lint passes
- [ ] Tests pass, proportional to risk
- [ ] Responsive QA: no horizontal overflow, layouts hold across the documented device classes, and hold under text expansion/contraction across the clinic's supported locales (long labels, multi-line buttons)
- [ ] Accessibility QA: keyboard, focus visibility, contrast, labels, correct page language and direction
- [ ] Bidirectional QA: verified in native RTL (Persian reference) *and* native LTR (English or Russian reference), including mixed-script content (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`)
- [ ] Visual QA: consistent with the Design System Constitution and the clinic theme
- [ ] No obvious runtime errors or console noise
- [ ] Documentation impact checked: canonical docs still truthful

CI is intentionally **not** configured by the Foundation task. When CI is introduced, it should enforce this list.

## 4. Work review

Reviewers (human or agent) should treat canonical-contract violations as blocking, regardless of code quality. The question "will this survive the Replication Gate?" applies to every Core change.

## 5. Repository conventions

- Documentation lives under `/docs` with class headers per `DOCUMENT-AUTHORITY.md`.
- Implementation code (when it exists) follows the framework-agnostic rule: Core capabilities are clinic-agnostic; no `clinicId` conditionals in presentation logic.
- Commit messages should state intent; contract changes should be identifiable from history.
