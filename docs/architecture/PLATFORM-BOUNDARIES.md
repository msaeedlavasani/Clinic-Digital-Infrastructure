# Platform Boundaries Contract

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. The boundary model

CDI separates everything into four zones. **Platform Core** and **Clinic Configuration** must never blur:

```text
┌────────────────────────────────────────────────────────────┐
│                    PLATFORM CORE                           │
│  design system · rendering/composition rules · content     │
│  schemas · SEO machinery · locale & direction machinery    │
│  analytics abstraction · integration boundaries ·          │
│  validation · reusable behavior                            │
└──────────────────────────┬─────────────────────────────────┘
                           │ reads
┌──────────────────────────▼─────────────────────────────────┐
│                CLINIC CONFIGURATION                        │
│  identity · logo · brand · theme · contact · locations ·   │
│  hours · social accounts · defaultLocale ·                 │
│  supportedLocales · localeConfiguration · configured CTA   │
│  behavior · domain · selected variants                     │
└──────────────────────────┬─────────────────────────────────┘
                           │ references
┌──────────────────────────▼─────────────────────────────────┐
│                   CLINIC CONTENT                           │
│  services · treatments · concerns · doctors · articles ·   │
│  FAQ · testimonials · before/after · clinic copy & media   │
│  (+ localized representations of all public-facing         │
│  entities per LOCALIZATION-FOUNDATION.md)                  │
└──────────────────────────┬─────────────────────────────────┘
                           │ via
┌──────────────────────────▼─────────────────────────────────┐
│           EXTERNAL INTEGRATIONS (conceptual boundaries)    │
│  Instagram/Meta · analytics · maps · messaging · future    │
│  booking · future CRM                                      │
└────────────────────────────────────────────────────────────┘
```

- **Platform Core** — shared, clinic-agnostic capabilities: design system; rendering/composition rules; content schemas; SEO machinery; locale & direction machinery; analytics abstraction; integration boundaries; validation; reusable behavior; **Master Service Catalog + capability derivation engine** (`MASTER-SERVICE-CATALOG.md`, `CAPABILITY-RELATIONSHIP-MODEL.md`, `CLINIC-PROVISIONING.md`).
- **Clinic Configuration** — clinic-specific settings that select and parameterize Core capabilities: identity, logo, brand, theme, contact, locations, hours, social accounts, `defaultLocale` / `supportedLocales` / `localeConfiguration`, configured CTA behavior, domain, selected variants.
- **Clinic Content** — the clinic's structured, locale-aware content: entities plus their localized representations (`LOCALIZATION-FOUNDATION.md`).
- **External Integrations** — external systems reached only through conceptual boundaries (`INTEGRATION-BOUNDARIES.md`).

**Invariant:** no clinic-specific or locale-specific code in the Platform Core. Clinic differences are expressed as configuration, content, assets, and integrations. Locale differences are expressed as localized representations behind locale-independent entities and as configuration — never as code branches or component forks.

## 2. What never crosses boundaries

1. Clinic content is never hard-coded into Core components; Core renders whatever the configuration + content define.
2. Clinic configuration never redefines Core behavior through code overrides — only through documented configuration and variant selection.
3. External systems are never called directly from Core rendering paths — only through integration boundaries with cache/fallback behavior (`INTEGRATION-BOUNDARIES.md`).
4. Locales are never hard-coded in Core. The set of locales that exist in the world is not Core knowledge; a clinic's chosen set is configuration. The reference set (`fa-IR`, `en`, `ar`, `ru`) validates the architecture; it does not bound it.

## 3. Design Variation vs Localization

Two different mechanisms, never conflated:

- **Design Variation** (a `REPLICATION-CONTRACT.md` axis) changes visual/compositional *personality between clinics* via theme + approved variants.
- **Localization** adapts the experience for language/script/direction via localized content + Core locale/direction machinery.

A single Clinic Theme must work across all of that clinic's supported locales. Do **not** use separate clinic themes merely to solve RTL/LTR. A legitimate localized design requirement, where one arises, is expressed within the theme/token architecture — not as a second theme or a locale fork.

## 4. Locale & direction machinery (Core-owned)

Locale handling is a Core capability, driven entirely by clinic configuration:

- direction (RTL/LTR) derived from the active locale — never hard-coded (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`);
- script-aware typography selection and fallback (`DESIGN-SYSTEM-CONSTITUTION.md` §6);
- locale-aware routing and slug handling with entity identity independent of any localized slug (`LOCALIZATION-FOUNDATION.md` §8);
- locale-aware formatting (numbers, dates, phone presentation) through a central formatting capability, not scattered manual logic (`LOCALIZATION-FOUNDATION.md` §9);
- publication/visibility of a localized page governed by translation state and fallback policy (`LOCALIZATION-FOUNDATION.md` §5–6).

Adding a locale to the world must require **zero Core changes**: no new components, no schema migration, no code branches. If it does, the Core has violated this contract.

## 5. Multi-clinic SEO risk

Replication at scale must not produce "hundreds of domains publishing effectively identical SEO copy" (see `SEO-FOUNDATION.md` §6). This risk is a standing constraint on replication, content tooling, and any future bulk-content capability.

## 6. A minimal clinic profile

A clinic is fully described by: **configuration** (identity, contact, locales, theme, variants, domain) + **content** (entities + localized representations) + **assets** + **integrations** (+ a domain). If a new clinic cannot be described this way — if something requires a Core edit — the Core is missing a *reusable* capability. Resolve it by admitting a reusable variant or capability per `REPLICATION-CONTRACT.md` §4, never by forking.
