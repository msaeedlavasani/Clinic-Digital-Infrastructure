# Clinic Provisioning Contract

**Class:** CANONICAL
**Change process:** ADR or explicit rationale-documented edit.

---

## 1. Purpose

Defines the contract that makes a clinic website **assemblable without code**: an authorized operator selects Master capabilities and provides configuration/content/assets, and CDI derives the site. This document defines the target operator workflow and its enabling contract — **it does not build the wizard**, select installer UI technology, or decide persistence (`OPEN-DECISIONS.md` A-2/A-3/A-4 remain open).

## 2. Target workflow (conceptual stages)

```text
Create Clinic
→ Identity / Brand            name, logo, positioning, contact
→ Visual World                world selection + theme mapping (VISUAL-WORLDS.md)
→ Locales                     defaultLocale, supportedLocales (per clinic — §3 of LOCALIZATION-FOUNDATION)
→ Locations                   branches, hours, contact, location-scoped capabilities
→ Services                    Master capability selection + per-capability state (3-axis)
→ Devices                     device records (generic class + clinic data) + modality associations
→ Doctors / Providers         roster, credentials (verifiable), capability associations
→ Content / Assets            clinic editorial, localized content, imagery, evidence
→ Contact / Consultation      channels, CTA behavior, consent configuration
→ Domain                      domain assignment
→ Preview                     staged review (published-state preview without public exposure)
→ Publish                     go-live
```

Stages are a contract, not a mandated wizard sequence; implementations may interleave. Every stage writes **configuration or content** — never Core code.

## 3. Capability-selection contract

When an operator enables a Master capability (e.g. `LASER_HAIR_REMOVAL`) and supplies its clinic configuration, CDI must be capable of **deriving** — without any per-clinic page/component implementation:

- treatment discovery entry (service listing membership)
- concern relationships (resolved per `CAPABILITY-RELATIONSHIP-MODEL.md` §2.2)
- treatment-page eligibility (template renders when content publication allows)
- search membership
- navigation/discovery placement
- related-services surfaces (both directions of the graph)
- doctor relationships (from provider associations)
- device relationships (from device associations)
- consultation intent (prefill context)
- SEO/content eligibility (localized, publication-gated)
- localized availability (per the 3-axis state model)

Derivation is **state-driven**: surfaces appear/disappear as states change, per the dependency rules (`CAPABILITY-RELATIONSHIP-MODEL.md` §4).

## 4. Configuration completeness contract

A clinic profile is **provisioning-complete** when it consists of:

```text
Config (identity, brand, visual world, locales, contact/consultation, domain)
+ Catalog selections (capabilities + 3-axis states + associations)
+ Content (clinic editorial + localized representations, publication states)
+ Assets (imagery, media — clinic-licensed)
+ Providers & Devices & Locations (associations)
```

**Completeness checks (pre-publish):**

- every `VISIBLE` capability has a published representation in `defaultLocale`;
- every published locale's navigation resolves (no dead branches);
- consultation configuration names at least one delivery channel (`INTEGRATION-BOUNDARIES.md` §6);
- required medical/trust surfaces exist for enabled capabilities (risks/contraindications where required — `MEDICAL-TRUST-GOVERNANCE.md`);
- imagery meets the photography standard (`PHOTOGRAPHY.md`) and is clinic-licensed;
- domain + locale routing configuration valid (`LOCALIZATION-FOUNDATION.md` §8).

Failed checks block publish with actionable messages; they never silently degrade.

## 5. Zero-code invariant

> **Enabling a capability, adding a location, swapping a device, adding a provider, or publishing a new locale must never require Platform Core modification, a clinic fork, or per-clinic code.**

If an operator need cannot be expressed as configuration/content within this contract, the resolution route is: reusable Core enhancement (via `REPLICATION-CONTRACT.md` §3 classification) — never a clinic-specific hack. This contract inherits and operationalizes the no-fork invariant; it does not amend it.

## 6. Replication acceptance extension

Added to the Replication Gate (`REPLICATION-CONTRACT.md` §4) as the **provisioning test**, applied at the Stage-2 proof:

- **Clinic A — profile:** Laser Hair Removal · Botox · Fillers · HIFU/RF · Skin Rejuvenation.
- **Clinic B — materially different profile:** Hair Transplant · PRP · Dermatology · Laser · selected surgical capabilities.
- Clinic B must be launchable primarily through: configuration + catalog selections + content + assets + provider/device/location associations + domain.
- **If Clinic B requires clinic-specific modifications to Platform Core merely because its service mix differs: REPLICATION PROOF = FAIL.**
- Both profiles draw from the Master Catalog; differing mixes prove derivation breadth (including the surgical-family metadata path), not two codebases.

This extends — not replaces — the existing Gate: two visually differentiated clinics (design-level proof) **and** two capability-mix-differentiated clinics (provisioning-level proof).
