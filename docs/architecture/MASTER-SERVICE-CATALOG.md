# Master Service Catalog

**Class:** CANONICAL
**Change process:** Catalog families, entity types, and taxonomy rules = ADR; entries within a documented family = explicit rationale-documented edit.
**Research basis (§18):** Taxonomy synthesized from cross-referenced domain sources — DermNet laser taxonomy, PMC long-pulse Alexandrite review (PMC10661922), IJDVL vascular-laser guidelines, ASPS procedural statistics categories (surgical / minimally-invasive classification), ISHRS hair-restoration technique taxonomy (FUE/FUT/DHI), and representative multi-clinic service menus. Sources informed *structure*, not efficacy claims. Where terminology is regional, branded, ambiguous, or jurisdiction-dependent, ambiguity is **recorded below** rather than resolved by invention. This is product taxonomy modeling, not medical advice.

---

## 1. Purpose and scope

The Master Service Catalog is CDI's shared **capability universe**: the ontology of concerns, treatments, modalities, technologies, devices, and treatment areas that aesthetic/dermatology/hair/body clinics can expose. It exists so that:

- a clinic *configures* its service mix from a governed catalog rather than inventing entities ad hoc;
- the Concern Explorer and all discovery surfaces resolve against **actual clinic capabilities**;
- clinics never redefine global conceptual identity (§5 ownership split);
- the catalog can represent the real breadth of the domain — from Laser Hair Removal to hair transplant to surgical families — without flat-list chaos.

The Catalog covers **capabilities across all phases**, not only V1 (e.g. surgical families are Master entities even though no V1 Noor service is surgical — `V1-SCOPE.md`). Enabling a capability in the catalog is not the same as any clinic offering it.

## 2. Entity types (the ontology)

Every catalog entry is exactly one entity type. Mixing types is the defining catalog failure (`§4`).

| Entity | Definition | Examples |
|---|---|---|
| **Concern** | What the patient wants addressed, in patient language | unwanted hair · wrinkles/expression lines · volume loss · skin laxity · acne · acne scars · pigmentation · melasma · pores/texture · redness/vascular appearance · hair loss · unwanted fat · body contour · cellulite · scars · stretch marks |
| **Treatment / Service** | A patient-facing clinical/aesthetic service | Laser Hair Removal · Dermal Filler · Botulinum Toxin Treatment · HIFU · RF Microneedling · Fractional CO₂ · Microneedling · Chemical Peel · Subcision · PRP · Mesotherapy · Hair Transplant |
| **Modality / Technique** | The clinical/technical method through which a treatment may be delivered | Alexandrite / Diode / Nd:YAG laser modality · FUE / FUT / DHI technique · fractional vs full-field application |
| **Technology** | The underlying physical technology class | laser · radiofrequency · ultrasound · IPL · microneedling · cryolipolysis |
| **Device / Platform** | Specific equipment or platform a clinic may operate | recorded generically (class + attributes); **manufacturer names are never hard-coded into the model** — a device record *may* carry a manufacturer field as clinic data |
| **Treatment Area** | Body region a treatment may be applied to | face · lips · cheeks · chin · jawline · under-eye · forehead · neck · scalp · arms · underarms · legs · abdomen · full body |
| **Provider type** | Permitted practitioner association class | doctor · practitioner class — **no global scope-of-practice rules are defined here**; legal scope is a jurisdiction decision (L-1) recorded per clinic/deployment |

All public-facing text fields follow the Foundation's localized-representation overlay (`LOCALIZATION-FOUNDATION.md` §4); structural identity is a stable locale-independent ID (e.g. `LASER_HAIR_REMOVAL`, `ACNE_SCARS`).

## 3. Family audit (the 11 families)

The audit below accounts for the domain's materially relevant service families. Families group Treatments; they are *not* an extra entity type. Each family lists representative Master entries — **illustrative, not exhaustive**; admission of new entries follows `§6` governance.

### 3.1 Laser & Light-Based
Treatments: laser hair removal · pigmentation treatments · vascular/redness treatments · laser resurfacing · fractional laser · fractional CO₂ · tattoo removal · IPL photorejuvenation. Modalities: Alexandrite (755nm) / Diode (~800–810nm) / Nd:YAG (1064nm) / Erbium (2940nm) / CO₂ (10,600nm) / pulsed dye / picosecond / IPL. Technologies: laser, IPL. *Modality choice is skin-type/indication-dependent — recorded as clinical nuance, not modeled as a rule; no suitability claims are made in the taxonomy.*

### 3.2 Injectables
Treatments: botulinum toxin treatment (generic identity — brand names are clinic presentation, never Master identity) · dermal filler · area filler variants (lip, cheek, chin/jaw, under-eye, temple) as treatment-area applications of Dermal Filler rather than always-independent services · body filler (where applicable) · skin booster · biostimulatory treatment · PRP (autologous) · mesotherapy · fat injection/fat grafting · injectable fat-dissolving treatment (where legally permitted — jurisdiction-dependent, recorded L-1). Technologies: injection.

### 3.3 Skin / Rejuvenation
Treatments: microneedling · RF microneedling · laser resurfacing (cross-family with 3.1) · chemical peel (superficial/medium/deep as modality depth) · microdermabrasion · hydradermabrasion / advanced facial · medical skin cleansing/facial · skin rejuvenation programs · tightening · texture improvement · combination/protocol treatments.

### 3.4 Acne · Scar · Pigmentation
Primarily **Concern**-dense family: acne · acne scars · surgical/traumatic scars · pigmentation · melasma · sun damage · enlarged pores/texture · stretch marks · vascular/redness. Treatments mapping into these concerns: subcision · microneedling/RF microneedling · fractional lasers · peels · vascular lasers · topical/medical programs. *Acne itself is a medical dermatologic condition: concern entries here support clinic education/discovery surfaces only, and treatment must respect medical-trust governance — the explorer guides to consultation, never to self-diagnosis.*

### 3.5 Lifting / Tightening
Treatments: HIFU (ultrasound) · RF-based tightening · ultrasound-based tightening variants · thread lift (PDO and comparable materials recorded generically) · combination lifting protocols. Technologies: ultrasound, RF, device-assisted.

### 3.6 Hair & Scalp
Treatments: hair-loss assessment/consultation · hair restoration programs · PRP for hair · mesotherapy for hair · hair transplant · eyebrow transplant · beard transplant (where applicable) · scalp treatments · scalp micropigmentation (structurally separated — see 3.11 note). Modalities: FUE / FUT / DHI transplant techniques. *Transplant techniques are modalities of Hair Transplant, not competing sibling services.*

### 3.7 Body
Treatments: non-surgical body contouring · fat reduction (non-invasive) · cryolipolysis · RF body treatments · ultrasound/cavitation (where applicable) · cellulite treatment · body tightening · injectable body approaches (where legitimate per jurisdiction) · **surgical body procedures — belong to family 3.9**, not here.

### 3.8 Dermatologic / Minor Procedures
Treatments: mole/lesion-related services (assessment/removal where permitted) · cryotherapy · scar-related procedures · minor procedures commonly offered in clinic settings. *Taxonomy modeling only — no diagnostic/treatment claims; clinical accuracy and legality per deployment jurisdiction (L-1) gate any clinic's enablement.*

### 3.9 Surgical Aesthetics
Capability family for clinics offering surgery: blepharoplasty · rhinoplasty · facelift · neck lift · brow lift · liposuction · body-contour surgery · other cosmetic surgery families. **Master entities exist so mixed surgical/medical clinics are representable. These do not automatically become V1 Noor services.** Surgical capabilities carry additional display requirements (consultation-first journeys, extended consent/evidence governance) recorded as catalog metadata.

### 3.10 Intimate / Specialized Aesthetics
Optional capability families where appropriate; **not assumed supported by every clinic**; enablement per clinic subject to jurisdiction and content-governance review (L-1/L-3).

### 3.11 Cosmetic / Permanent Aesthetic Services
Micropigmentation / permanent makeup and related categories — structurally kept **separate** from medical dermatologic services (different governance, different provider-association expectations) while still representable in the catalog.

## 4. Taxonomy rules (failure prevention)

| Rule | Prohibition | Correct model |
|---|---|---|
| **No flat service soup** | "Laser", "Candela", "Botox", "Acne", "Jawline", "PRP" as equivalent siblings | They are Device / Treatment / Concern / Treatment Area / Treatment respectively — different entity types (`§2`) |
| **Brand ≠ treatment** | Commercial product/device names as canonical generic-treatment identity | Master identity is generic (`BOTULINUM_TOXIN_TREATMENT`); brands live in clinic/device presentation data |
| **Concern ≠ treatment** | "Acne scars" as a sibling of "RF Microneedling" | Concern ↔ Treatment is a many-to-many *relationship*: one concern maps to several treatments; one treatment addresses several concerns (`CAPABILITY-RELATIONSHIP-MODEL.md`) |
| **Device ≠ service** | Device-as-service or one-to-one device↔treatment | A device *enables* services via modality/technology; a service may be deliverable through multiple devices/modalities |
| **No locale fields in schema** | `titleFa` / `titleEn` / `titleAr` | Locale-independent entity + localized representation (`LOCALIZATION-FOUNDATION.md` §4) |
| **No clinic ownership of Master identity** | Clinics redefining global conceptual identity | Clinics configure availability/presentation of a Master capability (`§5`) |

## 5. Master vs clinic-specific ownership

| Belongs to **CDI Master** | Belongs to **Clinic Configuration** |
|---|---|
| Stable capability identity (ID, entity type) | enabled/disabled state (capability state, `CAPABILITY-RELATIONSHIP-MODEL.md` §3) |
| Entity type + semantic category | clinic display preference (naming surface, emphasis) |
| Generic taxonomy relationships (concern↔treatment↔modality/technology, area applicability) | availability by location |
| Allowable metadata structure | associated doctors/providers |
| Localization/content schema (fields + requirements) | associated devices |
| Capability dependencies (e.g. HIFU requires ultrasound technology) | consultation routing (which intent, which channel) |
| Medically reviewed reusable content primitives where legitimate (`§7`) | pricing visibility policy |
| Terminology guidance | featured status / ordering |
| — | imagery, clinic editorial content |
| — | localized publication state |
| — | evidence / FAQs association |
| — | SEO presentation choices |
| — | clinic-specific availability notes (e.g. "performed at branch X") |

**A clinic never duplicates the entire Master entity.** The clinic holds a thin configuration referencing the Master ID plus clinic-scoped overlays above.

## 6. Catalog governance

- **Catalog Authority:** Platform operator owns Master entries; clinics cannot add Master entries. Clinic requests for missing capabilities go through catalog admission (like variant admission: reusable need, domain-verified, ontology-compliant).
- **New family** = ADR. **New entry within a family** = rationale-documented edit with a domain source reference.
- **Deprecation:** Master entries are never deleted once referenced; they are deprecated (hidden from new clinic provisioning, existing references preserved).
- **Versioning:** Master catalog is versioned; clinic provisioning records the catalog version it was built against, so capability-relationship evolution never silently rewrites a live clinic's semantics.
- **Terminology ambiguity log:** known regional/branded/ambiguous terms are recorded in an appendix maintained with the catalog (initial entries: "HIFU vs ultrasound tightening" overlap; "skin booster" spans multiple product classes; "mesotherapy" composition varies by jurisdiction; hair-transplant technique naming (FUE/FUT/DHI) is marketing-regional).

## 7. Content ≠ Capability

> **Capability Definition → Approved Content Structure → Clinic Presentation**

CDI knowing `LASER_HAIR_REMOVAL` exists does **not** mean 2,000 clinics publish identical treatment copy.

- **Master provides:** content structure (required/optional fields), medically reviewed reusable primitives where legitimate (safety framing, procedural-structure text), editorial/safety requirements, terminology guidance.
- **Clinic presentation provides (differentiated):** editorial copy, doctors, equipment story, imagery, evidence, FAQs, positioning, localized SEO content.
- The multi-clinic duplicate-copy SEO risk (`SEO-FOUNDATION.md` §6) applies *specifically* here: derived treatment pages must be clinic-authored or explicitly differentiated; Master primitives are a floor, not the published text.
- Medical review/publication states (`MEDICAL-TRUST-GOVERNANCE.md` §3, `LOCALIZATION-FOUNDATION.md` §5) apply unchanged to all clinic-published capability content.
