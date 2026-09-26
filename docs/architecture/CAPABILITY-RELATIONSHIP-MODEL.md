# Capability Relationship Model

**Class:** CANONICAL
**Change process:** ADR or explicit rationale-documented edit.

---

## 1. Purpose

Defines the conceptual relationship graph over the Master Service Catalog (`MASTER-SERVICE-CATALOG.md`) and the state models that govern what any clinic's discovery surfaces may expose. Semantics only — no database tables, no implementation.

## 2. Relationship graph

```text
Concern ←(many:many)→ Treatment ←(many:many)→ Modality ←(many:1)→ Technology
                                   ↓
Treatment ↔ Treatment Area        Device (enables, via Modality/Technology)
Treatment ↔ Provider ↔ Location   Content / Evidence / Before-After
Treatment ↔ FAQ                   Consultation intent
```

### 2.1 Semantics

| Relationship | Cardinality | Meaning |
|---|---|---|
| Concern ↔ Treatment | **many-to-many** | `ACNE_SCARS` may connect to several treatments; RF Microneedling may address several concerns. One mapping's absence never implies medical impossibility — only that CDI has not admitted that mapping. |
| Treatment ↔ Modality | many-to-many | Laser Hair Removal may be delivered via Alexandrite/Diode/Nd:YAG; a modality may serve multiple treatments. |
| Modality → Technology | many-to-one | Each modality instantiates one technology class; a technology backs many modalities. |
| Device ↔ Treatment | **many-to-many (via modality/technology)** | A device enables one or more services; a service may be deliverable through multiple devices. Never one-to-one. |
| Treatment ↔ Treatment Area | many-to-many | Area applicability is catalog metadata (e.g. underarms for LHR), extensible. |
| Treatment ↔ Provider ↔ Location | many-to-many, clinic-scoped | Capability varies by location; providers associate per clinic. |
| Treatment ↔ Content/Evidence/FAQ | one-to-many, clinic-scoped | Per `MASTER-SERVICE-CATALOG.md` §7: content belongs to clinic presentation. |
| Treatment → Consultation intent | many-to-one | Enabling a capability derives its consultation context (treatment/concern prefill). |

### 2.2 Capability resolution (Concern Explorer contract)

The Concern Explorer **must resolve from actual clinic capabilities**, never from Master relationships alone:

```text
Concern → (clinic-enabled Treatments, in published locales, at reachable Locations, with eligible Providers)
```

Clinic A may support three treatments for a concern, Clinic B one, Clinic C none:

- supported → displayed as گزینه‌های مرتبط (related options);
- unsupported → **not displayed** — the explorer must never route a user into an impossible treatment path;
- zero supported → the concern page/entry shows the concern content (if published) with a consultation path, never a fake option list.

## 3. Capability state — three independent axes

A single boolean is insufficient. Three orthogonal axes, never collapsed:

### Axis 1 — Clinical availability (can the clinic perform it?)

```text
AVAILABLE · UNAVAILABLE · COMING_SOON
```

### Axis 2 — Content publication state (is the page content ready in this locale?)

The existing translation/editorial states apply per localized representation:

```text
NOT_STARTED → DRAFT → REVIEW_REQUIRED → READY → PUBLISHED
```

(`LOCALIZATION-FOUNDATION.md` §5; medical editorial review per `MEDICAL-TRUST-GOVERNANCE.md` §3.)

### Axis 3 — Navigation/marketing visibility (is it surfaced in discovery?)

```text
VISIBLE · HIDDEN
```

**Worked example (canonical):** a clinic may perform Laser Hair Removal (`AVAILABLE`), with no English treatment page yet (`fa: PUBLISHED`, `en: NOT_STARTED`) and the service `VISIBLE` in Persian navigation but absent from English. All three facts coexist; none implies another.

**HIDDEN** (Axis 3) means "exists, reachable by URL if published, but not surfaced in navigation/discovery" — distinct from `UNAVAILABLE` (Axis 1), which means the clinic cannot perform it.

## 4. Dependency resolution rules

Conceptual rules any implementation must honor:

1. **Service disabled (Axis 1 ≠ AVAILABLE):** must not appear as an available treatment anywhere on that clinic's site; Concern Explorer must not route into it; service discovery must not expose it as consultable; related-treatment surfaces must respect its absence.
2. **Locale unpublished (Axis 2):** do not silently fabricate translated medical content; locale SEO must respect publication state (no hreflang/sitemap entries for unpublished locales — `SEO-FOUNDATION.md` §5); consultation behavior follows the localization fallback contract (`LOCALIZATION-FOUNDATION.md` §6; A-6).
3. **Device disabled:** treatment remains available **iff** another supported delivery path (device+modality) exists for it; otherwise the treatment becomes unavailable for the affected areas/locations. Device↔treatment is never assumed one-to-one.
4. **Provider unavailable:** capability remains clinic-available only if another eligible provider exists; provider-specific pages/evidence follow their own publication states.
5. **Location-scoped disablement:** a capability unavailable at one branch stays available at others; location pages reflect the union correctly.
6. **Derived-surface integrity:** every derived surface (discovery, related services, search, sitemap, hreflang, consultation prefill) must apply rules 1–5 consistently — one derivation engine conceptually, not per-surface special cases.

## 5. Derivation principle

Clinic sites are **derived from capability state**, not hand-assembled page-by-page:

> Given (a) the clinic's capability configuration and (b) the Master relationship graph, the set of valid pages/discovery paths/consultation intents is computable. Manual page creation for a capability is a provisioning smell, not a mechanism (`CLINIC-PROVISIONING.md`).
