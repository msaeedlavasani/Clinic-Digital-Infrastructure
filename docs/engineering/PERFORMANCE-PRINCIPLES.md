# Performance Principles

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Status

Performance is a **product property** (`PRODUCT-CONSTITUTION.md` §4.3), not an optimization phase. These principles bind future implementation; they deliberately do **not** invent numeric budgets without evidence. Measurable budgets become an architecture decision when real content and measurement exist.

## 2. Principles

- **Image optimization.** Responsive imagery, modern formats, correct sizing (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §B.3); media is clinic content served efficiently at all scales.
- **Font loading.** Script-aware type architecture must not become a loading problem: subset per script/locale in use, avoid layout-shifting font swaps, no blocking font chains across locales (`DESIGN-SYSTEM-CONSTITUTION.md` §4).
- **Minimal blocking JS.** Rendering is content-first; JS enhances, it does not gate first paint.
- **Lazy loading** for below-fold and non-critical assets, without hiding content from crawlers or breaking SSR semantics.
- **Layout stability.** Reserved space for media/embeds; text-expansion tolerance across locales prevents reflow (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §B.4).
- **Cached external integrations.** All external surfaces render from cached projections — Instagram availability must never affect render (`INTEGRATION-BOUNDARIES.md`).
- **Mobile network conditions.** Assume constrained, variable networks; most patient traffic is mobile (`PRODUCT-CONSTITUTION.md` §4.7).
- **Measurable budgets later.** Budget definition is deferred until measurable evidence exists; it will be recorded as an ADR, not invented now.

## 3. What performance work must never do

- Trade accessibility floors (contrast, targets) for speed.
- Cache-stale personalized medical-adjacent content in ways that mislead.
- Defer perf work behind "optimize later" for launch-blocking surfaces — perf QA is part of the Definition of Done (`ENGINEERING-GOVERNANCE.md` §3).
