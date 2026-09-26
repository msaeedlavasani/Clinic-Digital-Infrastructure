# Replication Contract

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Purpose

This contract defines what it means for CDI to succeed as a *platform*: launching clinic N must not require clinic-specific source code. It is the operational test of the Core/Clinic separation defined in `PLATFORM-BOUNDARIES.md`.

## 2. Successful replication

A second (or thousandth) clinic is launched primarily through:

> **Config + Content + Localized Content + Theme + Controlled Variants + Assets + Integrations + Domain**

**Without** creating a source fork, a new application, or clinic-specific code paths. Localization configuration (`defaultLocale`, `supportedLocales`) is part of Config; localized content is part of Content (`LOCALIZATION-FOUNDATION.md`). No language-specific Core forks, ever.

## 3. Core-change classification

Every change to the repository must be classifiable as exactly one of:

| Class | Definition | Examples |
|---|---|---|
| **Core enhancement** | Generally reusable capability improvement, clinic-agnostic and locale-agnostic | A better lead-form validation rule; improved SEO machinery; a fix in the direction-handling logic |
| **New reusable variant** | A new admitted variant within a Controlled Variation axis | A generally reusable "Featured" Hero variant usable by any clinic |
| **Clinic configuration** | Clinic-specific settings within documented config surface | Brand tokens, supported locales, CTA behavior, domain, selected variants |
| **Clinic content** | Clinic-specific structured content and assets | Treatments, doctors, articles, localized copy, photography |
| **Prohibited clinic-specific Core hack** | Code that branches on clinic identity (or locale identity) to change arbitrary presentation | `if (clinicId === "clinic-b") { hero = … }` |

**The test:** if the same need plausibly arises for another clinic, it is a Core enhancement or reusable variant. If it exists only because *this* clinic is *this* clinic, it is configuration or content. Code that checks `if (clinicId === "clinic-b")` to alter arbitrary presentation normally violates this contract.

**Legitimate exceptions (narrowly):** clinic identity may legitimately select *which configured option applies* (e.g. routing the request for clinic-b's domain to clinic-b's configuration) and compliance-driven cases with no generalizable shape (e.g. a jurisdictionally mandated disclosure for clinics operating in one jurisdiction). Even then, the mechanism must be configuration-driven (e.g. a configured disclosure slot), not presentation code branching on identity. If an implementation cannot express the difference, that is a contract conflict — stop and escalate per `AGENT-CONTRACT.md` §3.

**Locale analogue:** the same classification applies to locales. A new locale is configuration + localized content. `if (locale === "ru")`-style presentation branching is a prohibited hack; direction derivation, script-aware typography, and formatting are *reusable Core machinery* driven by configuration.

## 4. Replication Gate

Before V1 architecture is considered proven, the platform must launch **at least two meaningfully different fictional/reference clinic configurations**. Clinic #2 exists primarily as architectural evidence.

- **PASS** targets: `CONFIG_ONLY` — Clinic #2 launches purely via config + content + localized content + assets + domain — or, where a genuine shared need emerged, `CONFIG_ONLY + approved reusable variant` (the variant must be admitted through §5 and must be usable by any clinic).
- **FAIL:** any clinic-specific source fork; any clinic-identity or locale-identity conditional in Core presentation code; any schema redesign or Core change required merely to add a locale.

Gate results are recorded in an ADR (the evidence artifact).

## 5. Controlled Variation

CDI does not want 2,000 identical sites, nor 2,000 independently designed applications. Clinic differentiation happens inside a bounded, governed space:

### 5.1 Axes

| Axis | What varies | What does not |
|---|---|---|
| **Theme** | Brand color/token values, typography parameters within the script-aware type architecture, imagery treatment | Token *categories*, accessibility floors, direction machinery |
| **Composition** | Approved page/section composition variants (e.g. Hero: Editorial · Clinical · Immersive; Services: Grid · Editorial · Featured; Doctors: Portrait · Minimal · Profile) | Page types, accessibility, RTL/LTR correctness |
| **Content** | Clinic-specific structured content, incl. localized representations | Entity schemas |
| **Media** | Clinic-specific photography/video/illustration | Media governance rules |
| **Density / emphasis** | Bounded emphasis parameters (e.g. how evidence-forward a section is) within design-system rules | Readability, contrast, touch targets |

The variant examples above are **not yet frozen visual designs**; they name the axes. Final variant designs are a DESIGN decision (`OPEN-DECISIONS.md` D-3).

### 5.2 Variant admission

New variants enter Core only when they are:

1. **Generalizable** — expressible without clinic identity ("Editorial hero" not "Clinic B's hero");
2. **Axis-consistent** — they extend a documented axis rather than inventing a one-off;
3. **Contract-compliant** — meet accessibility, bidirectionality, responsiveness, and performance requirements across locales;
4. **Documented** — recorded in the design-system documentation with their variation parameters.

Rejected admission requests become clinic *configuration within existing variants* or are parked as DESIGN decisions. An agent unable to classify a change per §3 must stop and escalate.

## 6. What replication must never require

- A per-clinic application/codebase/branch
- Core code changes to add a clinic, a locale, or a domain
- Schema redesign to add a locale (`LOCALIZATION-FOUNDATION.md`)
- Component forks per direction (`FaButton`/`EnButton`, `RTLHeader`/`LTRHeader`)
- Separate themes per locale to solve direction (`PLATFORM-BOUNDARIES.md` §3)
