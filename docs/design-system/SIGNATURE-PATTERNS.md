# Signature Patterns

**Class:** CANONICAL
**Change process:** Rationale-documented edit; pattern-level contract changes require ADR.

---

CDI signature patterns are the differentiating UX vocabulary shared by all clinics. Generic system patterns (buttons, forms, navigation) follow the same rules and are specified here alongside them.

## 1. ConcernExplorer

**Purpose:** patient-centered discovery — the canonical first pathway. Prompt concept: **«چه چیزی دوست دارید بهبود پیدا کند؟»** ("What would you like to improve?") or the localized equivalent per locale.

- **Categories:** Skin · Face · Hair · Body — conceptual, extendable as content (not a hard-coded closure).
- **Concerns:** wrinkles · acne scars · pigmentation · pores · sagging · lip shape · jawline · hair loss · thinning — content-driven, medically governed.
- **Route (canonical):** Concern → Relevant Treatment Options → Evidence/Doctor → Consultation.
- **Language governance:** guidance, not diagnosis. Use **«گزینه‌های مرتبط»** ("related options") — never **«درمان مناسب شما»** ("the right treatment for you"), which implies medical evaluation. No automatic suitability claims (`MEDICAL-TRUST-GOVERNANCE.md`).
- Bidirectional, responsive, keyboard-accessible; categories/concerns are structured content (Concern entity — `CONTENT-MODEL.md`).

## 2. TreatmentFacts

**Purpose:** rapid scanning of the practical shape of a treatment — CDI's signature data pattern.

- **Fields (all content-driven, medically governed):** session duration · expected downtime · result timing · typical longevity · typical session count.
- **No guarantees:** values are described as typical, not promised (`MEDICAL-TRUST-GOVERNANCE.md` §2).
- **Missing fields handled gracefully** — a fact not present in content is simply absent; no filler, no "N/A" noise.
- Numerals/formatting via central locale formatting (`LOCALIZATION-FOUNDATION.md` §9); mixed-script values (e.g. "CO₂ Laser · ۳۰ min") per `TYPOGRAPHY.md` §6.

## 3. TreatmentJourney

**Purpose:** reusable educational narrative pattern.

- **Steps:** overview · what it addresses · consultation · preparation · procedure · recovery · expected progression · aftercare.
- **Selective display:** not every treatment shows every step; content-driven, not locked.
- **Educational UX, not medical advice** — descriptive, calm, no individualized guidance; tone follows `MEDICAL-TRUST-GOVERNANCE.md`.

## 4. BeforeAfterCompare

**Purpose:** evidence-oriented before/after presentation (`PHOTOGRAPHY.md` §4 is binding here).

- **Interaction:** slider or clearly paired imagery; must work with touch, keyboard, and accessible labeling; **evidence must remain understandable without relying solely on interaction** — e.g. paired/sequential imagery or captions carry the comparison even if the slider never operates.
- **Labels:** explicit Before/After (localized); treatment/doctor/session metadata; disclaimer present.
- **RTL/LTR:** the compare interaction direction follows locale direction (directional UI semantics), while imagery itself is never mirrored (semantically fixed).
- **Publication dependency:** only `PUBLISHED` cases; withdrawal removes display everywhere (`MEDICAL-TRUST-GOVERNANCE.md` §4).

## 5. DoctorProfile

**Purpose:** communicate identity, professional title, relevant credentials, treatment areas, professional approach, associated content/results, and a consultation path.

- Avoid: product-card treatment, excessive credential badges, fabricated prestige, reducing doctors to service inventory (`MEDICAL-TRUST-GOVERNANCE.md` §2 — no fabricated credentials).
- Layout supports portrait/working-context imagery (Doctor category, `PHOTOGRAPHY.md` §2), treatment-area links, related articles/cases, consultation CTA.

## 6. ConsultationSurface

**Purpose:** signature conversion pattern — calm, low-pressure, trustworthy; no aggressive e-commerce language.

- **Primary CTA concept: «درخواست مشاوره»** ("request consultation") — consultation, not immediate treatment purchase.
- Progressive disclosure: request only necessary information (`LEAD-CONSULTATION-CONTRACT.md` §2 least-data).
- All form states (idle/validating/submitting/success/error) have accessible, localized representations (`LEAD-CONSULTATION-CONTRACT.md` §4).
- Placement via composition contract (`CONTROLLED-VARIATION.md`), not hard-coded slots.

## 7. Button system

- **Variants:** Primary · Secondary · Ghost · Text · Icon — hierarchy: Primary ≤1 per surface view; Secondary for alternative actions; Ghost/Text for tertiary; Icon for compact icon-only (localized accessible name mandatory).
- **Sizing:** minimum usable interaction size ≥ 44×44 touch target (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §C.2); label in Label role (`TYPOGRAPHY.md` §2).
- **States:** default/hover/focus/active/disabled/loading per the state contract (`COMPONENT-INVENTORY.md` §3); loading suppresses double-submit.
- **Icons in buttons:** start-positioned in both directions (logical start); directional chevrons follow locale direction (`MOTION-ICONOGRAPHY.md` §6).
- **Pill buttons** only when theme justifies (`DESIGN-TOKENS.md` §5); avoid excessive pills.

## 8. Form system

- **Controls:** text input · phone input · textarea · select · radio · checkbox · consent.
- **Anatomy contract:** label (Label role) + optional help text + error slot; association is programmatic (Foundation §C.2); error identified in text, not color alone.
- **Validation copy:** human-readable and localizable — no generic technical errors (`Invalid input` is prohibited as user-facing copy); errors say what to do ("شماره موبایل را کامل وارد کنید" conceptually).
- **States:** default/focus/error/success/disabled/reading-only; consent is an explicit, un-prechecked control with a link to the privacy note.
- Phone input: locale-aware presentation via central formatting; not over-constrained to one country format.

## 9. Navigation system

### Desktop header
Clinic identity · primary destinations · service discovery · concern discovery · consultation CTA · locale switcher where enabled. **MegaMenu** is conceptual for larger service catalogs (category → links, keyboard navigable, bidirectional); **do not force MegaMenu on small clinics** — simple dropdowns/plain links suffice; the header adapts via configuration, not fork.

### MobileNavigation
Not merely compressed desktop: accessible drawer/full navigation · large usable targets · clear hierarchy · locale switch · contact pathways · consultation pathway · no overcrowding. Drawer slides from the logical start edge; disclosure follows direction (`MOTION-ICONOGRAPHY.md` §6).

### Mobile conversion surface
Restrained: consultation · phone · configured messaging (`INTEGRATION-BOUNDARIES.md` §6). **Not all actions shown simultaneously by default;** configuration chooses the primary action. **Sticky behavior only when:** the page's primary conversion is not yet visible, or the user is deep in a treatment page. **Intrusive when:** it covers content, duplicates visible CTAs, or animates to grab attention. One primary action + reveal for secondaries.

## 10. Trust system

Trust emerges from **credible evidence**, not badges: doctors & verifiable credentials · clinic environment · equipment where relevant · treatment explanations · Before/After (governed) · transparent risks · consultation process explanation · educational content · legitimate testimonials. **No fake trust badges, no unsupported claims** (`MEDICAL-TRUST-GOVERNANCE.md` §2). Layout keeps trust sources contextual (near the decision they support), not badge walls.

## 11. Instagram presentation

Integrated feel, not a foreign widget: visual presentation consistent with the clinic theme (imagery grid/editorial strip), interaction hierarchy below core medical information — social never dominates medical content. **Fallback/empty:** cached-projection rendering (`INTEGRATION-BOUNDARIES.md` §3); graceful absence per locale (`LOCALIZATION-FOUNDATION.md` §11); curated/pinned content first (clinic content concern), fallback = curated cache → hidden section.

## 12. Search experience

Locale-aware search across Treatments · Concerns · Doctors · Articles · FAQ — operating within the locale's corpus (`LOCALIZATION-FOUNDATION.md` §10). Conceptual UX: prominent entry in header; results grouped by type with clear labels; **empty/no-result behavior defined:** acknowledge, suggest categories/ConcernExplorer path, never dead-end. **No search implementation in this task** (P-4).

## 13. Multilingual UX

Validation across `fa-IR` (RTL) · `en` (LTR) · `ar` · `ru`: Arabic script stress · Russian/Cyrillic stress · long labels · long navigation · text expansion · localized CTA length · localized slugs/breadcrumbs · mixed-script treatment names (`TYPOGRAPHY.md` §6). **No component may rely on Persian string lengths** — text expansion tolerance is a component contract (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §B.4). Locale switcher: see §14.

## 14. LocaleSwitcher

Behavior (not implementation), respecting open decisions:

- **Prefer equivalent localized content:** when the user is on a page with a published localized equivalent, switch keeps them on the equivalent page.
- **Never blindly route to an unrelated homepage if an equivalent exists.**
- **Explicit & predictable when unavailable:** if no published localized equivalent exists, behavior is explicit — per the open fallback policy (A-6, `OPEN-DECISIONS.md`), the default is to route to the localized homepage **with a clear, visible acknowledgment**; the final policy is decided when first needed.
- Only published localized representations are offered as switch targets (Foundation §5 translation states; `SEO-FOUNDATION.md` §5).
- Switcher present in header/mobile nav only where the clinic enables >1 locale; single-locale clinics show no switcher.

## 15. Article / education system (ArticleBody)

**Purpose:** educational content feels editorial, not blog-template (`DESIGN-SYSTEM-CONSTITUTION.md` §2).

- **Typography:** Article role set — Title/H2/H3 rhythm from `TYPOGRAPHY.md` §2; body in `container-text` (§5 measures) in every locale; paragraph rhythm from the spacing scale.
- **Headings:** semantic hierarchy (§C.2 Foundation); localized; bidirectional-safe.
- **Media:** Photography categories (`PHOTOGRAPHY.md` §2); reserved space, no layout shift; localized alt text.
- **Callouts:** sparing, tonal surfaces (never decorative gradient boxes) for definitions/cautions — medical cautions follow `MEDICAL-TRUST-GOVERNANCE.md` tone.
- **Related treatment/concern links:** woven contextually (patient journey), not a link-dump footer.
- **Doctor attribution:** where clinically appropriate (authored/reviewed by) — honest, verifiable (`MEDICAL-TRUST-GOVERNANCE.md` §2).
- **Consultation CTA restraint:** education-first; contextual consultation links only — no interstitials, no forced mid-article CTAs; publication dates honest (`SEO-FOUNDATION.md` §3).
- Translation states apply: only `PUBLISHED` localized representations exist (A-6).

## 16. Full-stage experience grammar (runtime contract alignment)

Cinematic experiences use a bounded persistent Experience Stage containing transformable Scenes. Scene progression is the primitive; scroll is one possible input and document section position does not define the Scene sequence. `COMPOSITION-CONTRACTS.md` §2 remains the geometry authority for the visual rails/zones within a composition; this section describes the Design System-facing spatial vocabulary. The complete runtime model is canonicalized in `docs/architecture/EXPERIENCE-RUNTIME-CONTRACT.md`.

| Concept | Definition |
|---|---|
| **Experience Stage** | bounded persistent presentation surface that hosts a sequence of Scenes and owns continuity; released at the Editorial Information handoff |
| **Composition stage** | one spatial composition unit — the rails/zones model (`COMPOSITION-CONTRACTS.md` §2) instantiated within the Experience Stage or an editorial composition; not itself a runtime sequence |
| **Scene** | a presentation/runtime state with semantic purpose, content representation, composition, media, action/navigation, transitions, accessibility, and direct-entry behavior; distinct from Route and Entity identity |
| **Scene Content Region** | region holding the scene's primary content/text (Content Rail authority) |
| **Media Field** | region for the scene's media, subject to the media composition contract (`PHOTOGRAPHY.md` §2A) |
| **Action Field** | the scene's Action Zone instance (`COMPOSITION-CONTRACTS.md` §4) |
| **Navigation Field** | the scene's Navigation Zone instance; progress controls live here only per §17 |
| **Safe Region** | applicable safe-area exclusion respected by content/actions (`PRESENTATION-CONTEXTS.md` §4) |
| **Transition Boundary** | the defined semantic/spatial edge at which one scene ends and the next begins |

- **Continuity:** the Experience Stage may preserve world/media/material context as Scenes transform. Scene-specific content/actions may change; persistent navigation/context must not obscure focal/action regions.
- **Focus:** explicit Scene navigation has a predictable focus destination; passive input may retain focus where moving it would disrupt interaction. Focus is never lost or trapped.
- **Input:** wheel, trackpad, touch, keyboard, explicit action, and direct route entry are possible inputs. No input is mandatory; scroll/touch are not architectural defaults. Do not hijack document behavior outside the bounded Stage.
- **Accessibility:** the active Scene has coherent semantic order; inactive visual Scenes do not create duplicate reading order or focus targets. Reduced motion preserves the same model, content, controls, and hierarchy while simplifying transitions.
- **Mobile re-composition:** a scene re-composes per `LAYOUT-RESPONSIVE.md` §1 — rails/zones re-express per context; the grammar is never desktop-scene shrinking.
- **URL semantics:** routes/URLs and stable entity identities are independent of visual Scene transitions. Meaningful direct entry initializes an appropriate Scene/context without replaying earlier Scenes; animation frames do not become browser-history entries. The visual transition is never load-bearing for content access.
- **Editorial handoff:** after the bounded cinematic sequence, release the Stage into semantic Editorial Information Mode. Information, evidence, doctor, and consultation behavior uses the semantic document and native document scrolling while preserving the Clinic World and resolved context.
- **Progressive enhancement:** without cinematic enhancement, semantic links/routes keep Home intent, discovery, treatment, actions, and information accessible. Enhancement failure is enhancement-only when semantic content remains.
- **Technology-neutral:** no implementation technology is prescribed (`EXPERIENCE-DIRECTION.md` §4).
- Prototypes and implementations must not invent fixed-position scene geometry outside this grammar without an admitted experimental exception (`AGENT-CONTRACT.md` §6). Implementing the primary cinematic journey as vertically stacked document sections is an `EXPERIENCE_ARCHITECTURE_VIOLATION` under `AGENT-CONTRACT.md` §7.1.

## 17. Navigation + progress existence rule (added DESIGN-SYSTEM-VNEXT-01)

> Persistent progress exists only when knowing progress materially improves orientation, comprehension, or task completion.

- Progress is **not decorative luxury chrome**. If the experience remains understandable without persistent progress, omission is preferred.
- Where progress exists, it is: subordinate to primary content; never overlapping the focal subject; never competing with the primary action (`COMPOSITION-CONTRACTS.md` §4); safe-area aware (`PRESENTATION-CONTEXTS.md` §4); RTL/LTR direction-correct (`MOTION-ICONOGRAPHY.md` §6); accessible and understandable without relying on decorative geometry.
- **Scene advancement and progress indication are separate responsibilities** — they are not merged automatically.
- Existing contracts unchanged: sticky mobile conversion follows §9 (action restraint, not progress); journey patterns such as §3 TreatmentJourney decide progress per content need, not per aesthetic. QA: `DESIGN-QA.md` PROGRESS-01.
