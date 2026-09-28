# CDI Runtime Architecture

**Class:** CANONICAL  
**Change process:** ADR or explicit, rationale-documented edit.  
**Scope:** Technology-neutral runtime contract for CDI V1; it does not select an application framework, rendering mechanism, CMS, persistence model, tenancy topology, host, CDN, or integration vendor.

---

## 1. Purpose and governing model

This contract defines what the CDI runtime must do before an implementation framework is selected. It refines (and does not override) the Product Constitution, V1 Scope, Platform Boundaries, capability model, localization and SEO foundations, integration contracts, and Design System authorities.

```text
One Runtime Architecture
  × Clinic Resolution
  × Locale Resolution
  × Capability Resolution
  × Content Resolution
  × Presentation Resolution
  → Independent Clinic Experience
```

The runtime preserves **One Platform Core → Clinic Configuration → Independent Clinic Experience**. Clinic, locale, Visual World, and treatment differences are data/configuration and approved system behavior. None requires a separate application, route tree, source branch, component fork, or deployment codebase. The architecture must permit a shared runtime deployment; it does **not** require one shared deployment. Topology remains an ADR decision.

The runtime is not a second authority for product scope, medical publication, capability semantics, or Design System decisions. It consumes and enforces those contracts at appropriate trusted boundaries.

## 2. Runtime responsibilities and boundaries

The runtime resolves a request into a safe, locale-appropriate, capability-valid public experience; renders its semantic content and approved presentation; and routes user actions through bounded services.

It consumes the four zones defined by `PLATFORM-BOUNDARIES.md`: Platform Core; Clinic Configuration; Clinic Content; and External Integrations. Clinic identity, domain, locale, and capability context remain data/configuration. External systems are reached only through conceptual integration boundaries.

`Capability ≠ Content ≠ Presentation`. Capability says what the clinic can provide and how it may be surfaced; content supplies a clinic's published representation; presentation composes that content through the Design System. These resolve separately and join in request context.

The conceptual downstream context is `ClinicContext`, with references sufficient to scope locale, route/entity, capability, content, presentation, integrations, caching, and telemetry. This is a conceptual boundary, **not a frozen implementation schema**. Clinic identity must be explicit through data access and side-effect boundaries.

## 3. Conceptual request-resolution pipeline

The pipeline describes responsibilities, not framework middleware, network waterfalls, or required process boundaries. Implementations may combine or reorder work when correctness and dependency rules remain intact.

| Stage | Input and responsibility | Output | Failure behavior / cache implications |
|---|---|---|---|
| **Request** | Incoming host, path, query, headers, method, and public request context. Normalize untrusted input and establish a request trace. | Normalized request. | Malformed requests receive an appropriate client error; do not infer clinic or locale from unsafe values. Request-specific values must not contaminate shared cache entries. |
| **Host / domain resolution** | Host plus configured production, preview, or controlled development mappings. Resolve domain from configuration/data. | Domain target and environment/context classification. | Unknown public host → `UNKNOWN_CLINIC`. Domain mapping cache is clinic/config scoped and invalidatable. |
| **Clinic resolution** | Resolved domain target or authorized preview/development fixture. Resolve clinic status/config independently from application code. | `ClinicContext` reference and active/disabled state. | Unknown identity → unknown-clinic/not-found; disabled clinic → unavailable response without public clinic content. Never fall through to another clinic. Cache keys include clinic identity. |
| **Locale resolution** | Clinic `defaultLocale`, `supportedLocales`, locale configuration, URL locale when present, and publication availability. Determine locale, direction, language metadata, and valid localized route mapping. | Locale context with direction and route-language metadata. | Unsupported locale → policy-defined unavailable/redirect behavior; never silently serve another locale's medical/editorial copy. Locale participates in cache keys. URL strategy, default routing, `x-default`, and final fallback policy remain open. |
| **Route / entity resolution** | Resolved clinic, locale, path, and localized slug mapping. Resolve a route to stable entity identity and page archetype, not a hard-coded clinic page. | Route/entity reference or not-found result. | Unknown slug/entity → route-local not found. Slugs are localized presentation/routing data; a slug change does not change entity identity. Cache by clinic, locale, route/entity, and relevant version. |
| **Capability resolution** | Master Capability Definition, clinic capability manifest, relationships, location/provider/device constraints, locale availability, and route/entity. Derive valid capabilities and paths once conceptually. | Resolved capability state for page and derived surfaces. | Disabled or unsupported capability is withheld from public discovery and unavailable as an offered service. Do not duplicate the graph in route code. Cache by clinic and capability/config version; invalidate on manifest/dependency changes. |
| **Publication / visibility resolution** | Locale-specific publication state, medical/editorial approval, clinical availability, and navigation/marketing visibility. Apply independent capability axes. | Public eligibility and surface-specific visibility. | Unpublished representation is not public/indexable. Hidden content may remain directly reachable only where its own contract permits; unavailable capability is not presented as available. Publication changes invalidate route, search, SEO, and derived-surface outputs. |
| **Content resolution** | Stable entity, locale, clinic, approved shared structure, content state, and media references. Resolve only permitted localized content. | Resolved content model with explicit missing-content/media states. | Missing medical/editorial localization is withheld by default rather than silently translated/fallback-rendered. CMS/data outage degrades per content locality and available projections; never leak cross-clinic data. Content caches include clinic and locale. |
| **Presentation configuration** | Clinic brand config, Visual World, approved Controlled Variation, Presentation Context, locale/direction, resolved content, and Treatment Signature where applicable. | Design-System-authorized composition inputs. | Invalid config uses a safe Core default or clear unavailable state; arbitrary clinic CSS or executable presentation config is rejected. Configuration cache is clinic/version scoped. |
| **Rendering** | Eligible semantic content, metadata, actions, and presentation inputs. Produce content-first base experience and optional scoped client enhancement. | Semantic document and enhancement hooks/assets. | Enhancement failure leaves product-critical meaning/actions usable. Render failures are classified at the narrowest safe boundary; no partially resolved clinic may render another tenant's content. |
| **Response** | Rendered result, status, headers, metadata, and observability context. Enforce preview/indexability and cache policy. | Correct public, preview, error, or action response. | Correct status and robots/indexability are required. Response caches vary or partition on every clinic/locale/publication/config dimension affecting output. |

These stages do not imply one blocking request waterfall. Independent content/media work can be prioritized or combined as implementation permits.

## 4. Clinic and domain resolution

Clinic identity is resolved from configured data. Inputs may include production domain, subdomain, preview/staging identifier, or controlled development fixture. A domain association does not encode clinic identity in source routing logic.

- **KNOWN DOMAIN:** resolve exactly one clinic context and continue.
- **UNKNOWN DOMAIN:** return an unknown-clinic/not-found response; never display a default clinic or reuse the preceding request's context.
- **DISABLED CLINIC:** return unavailable and withhold public content, search indexing, sitemap entries, and lead submission as applicable.
- **PREVIEW DOMAIN / CONTEXT:** resolve an explicitly authorized preview context and draft version; keep preview authorization separate from public routing and exclude previews from public indexing/caches.

Adding Clinic #N must be configuration/content/assets/domain/capability work. It must not require source routing edits merely to recognize its domain, clinic-specific deployment code, route tree, or component fork. Domain mappings and clinic status are cacheable configuration with safe invalidation.

## 5. Locale, direction, and route resolution

The clinic supplies `defaultLocale`, `supportedLocales`, and equivalent locale configuration. `fa-IR` RTL, `en` LTR, `ar` RTL, and `ru` LTR are required architectural validation cases, not a closed set. Direction is derived from locale. Locale is a request/composition input and never an application/component fork.

Resolution accounts for URL locale when present, clinic support, default locale, localized route/entity mapping, localized publication state, writing direction, language metadata, and genuine alternate-language availability. The runtime makes correct `lang` and `dir` available at document and relevant fragment boundaries, supports mixed-language fragments, and generates alternates only for real, published localized representations.

Do not resolve the open decisions in `OPEN-DECISIONS.md`: exact URL locale strategy and identifiers, default routing/redirect policy, `x-default`, or final content fallback policy. The architecture must allow those decisions later without duplicate route trees or schema redesign. UI/system-string fallback may be controlled; medical/editorial content must not receive silent machine-generated or arbitrary cross-language fallback. Missing localized content is withheld by default under the existing localization contract, pending its final ADR policy.

## 6. Entity and route model

Routes resolve domain entities through stable identity and localized slug mappings. At minimum, the runtime supports: Home, Services, Treatment, Concerns, Doctors, Doctor, Before/After, About, Blog/Magazine, Article, FAQ, Contact, Search, and Consultation.

The route resolver supports localized slugs and entity-specific page archetypes, while stable entity identity remains independent of slug and locale. A slug change changes route presentation, not entity identity. Clinic-specific route implementations and locale-specific route trees are prohibited as the default composition model.

## 7. Capability-derived experience

Public experience is derived from:

```text
Master Capability Definition
+ Clinic Capability Manifest
+ Publication State
+ Visibility State
+ Locale Availability
+ applicable provider / device / location relationships
```

The three capability axes remain independent: clinical availability, localized content publication, and navigation/marketing visibility. Derived surfaces include navigation, Concern Explorer, treatment discovery, related entities, search, internal links, consultation intent/prefill, SEO metadata, structured data, and sitemap output.

Every derived surface applies the same conceptual capability rules. Unavailable or unpublished entities must not accidentally surface in navigation, Concern Explorer, treatment discovery, search, SEO, structured data, sitemap, consultation paths, or internal links. Hidden-but-published content follows the capability contract; visibility does not mean clinical unavailability. Do not recreate or partially copy the capability graph in route/page code.

## 8. Content resolution and publication trust

Content resolution joins stable entity identity with a localized representation, publication state, clinic-owned content/presentation, and approved shared structure where permitted. It must not assume every clinic supports every locale or every entity has a translation. Per-locale representation is used instead of expanding fields such as `titleFa`, `titleEn`, `titleAr`, or `titleRu`.

Medical/editorial publication state is enforced at a trusted server-side or equivalent boundary, including preview separation. Draft or review-required content is not made public through alternate routes, search, metadata, structured data, or cached responses. Translation is not publication approval; no silent machine-generated medical fallback is permitted. The runtime consumes medical trust and localization governance rather than replacing it.

## 9. Presentation resolution and Design System authority

Presentation derives from clinic brand configuration, Visual World, approved Controlled Variation, Presentation Context, locale/direction, resolved content, and Treatment Signature where applicable.

`DESKTOP_WEB`, `IPHONE_WEB`, and `ANDROID_WEB` are composition inputs, not separate apps, tenants, route trees, or device-specific component families. The runtime supports responsive re-composition and environment behavior; it avoids user-agent forks where responsive layout and exposed environment capabilities suffice.

The Design System remains authoritative for tokens, composition, typography, media treatment, motion, controlled variation, medical credibility, and QA. Clinic configuration can select approved options and data but cannot inject arbitrary CSS, scripts, or undocumented patterns. Runtime capability does not grant permission to bypass Design System review.

Treatment Signature is derived from treatment semantics/configuration → signature identity → approved sensory behavior → clinic expression. Reusable boundaries are preferred; genuinely specialized treatments may have specialized implementations behind those boundaries. Do not create clinic/treatment `if` forks as the default model or prematurely build a universal effects engine. Sensory behavior must not imply efficacy or fabricate evidence.

## 10. Rendering and progressive enhancement

CDI requires both **content-first/indexable rendering** and **interactive/cinematic enhancement**. The architecture exposes meaningful semantic content, links, metadata, navigation, and primary actions to users and indexing systems without requiring cinematic enhancement to execute. Public medical/editorial information remains linkable, readable, accessible, directionally correct, and usable with reduced motion or enhancement failure.

```text
BASE EXPERIENCE
  content · navigation · primary actions · medical information
  consultation path · locale/direction · accessibility
+ ENHANCEMENT LAYER
  cinematic motion · advanced transitions · GPU effects
  rich media interaction · treatment sensory effects
```

The base experience may use the selected framework's server, build, or client capabilities; this contract does not require a universal SSR/SSG/ISR/CSR label or mandate that every visual effect work without JavaScript. Product-critical meaning and action cannot disappear when enhancement is unavailable. Reduced motion is a complete alternate presentation of the same content and navigation, consistent with `MOTION-ICONOGRAPHY.md`.

**CINEMATIC MODE** may justify richer client/runtime enhancement for heroes, discovery moments, treatment entrances/signatures, selected transitions, and immersive storytelling. **EDITORIAL MODE** minimizes unnecessary runtime cost and preserves complete semantic rendering for treatment facts, risks, FAQ, evidence, doctor credentials, Before/After, long-form education, and forms. A route or page may move between both modes within one application and route system; Visual World continuity persists across the boundary.

The future `/design-system` validation harness must be hostable within the selected application architecture and use the same production Design System primitives/components and token/contract source, not a disconnected documentation implementation. Harness implementation remains deferred. Application framework/rendering A-1 is resolved by [ADR-0001](../decisions/ADR-0001-APPLICATION-FRAMEWORK-AND-RENDERING.md); this requirement did not select a framework by itself.

## 11. Client execution boundary

Client execution is scoped to components, interactions, or scenes that require client behavior. Static/editorial content must not inherit a heavy client runtime solely because another region is cinematic. The architecture supports low-interactivity regions alongside high-interactivity islands/scenes within one experience, preserving shared composition, routing, accessibility, and Visual World.

Framework candidates that cannot express sensible execution boundaries, or make full-client rendering the easiest path for public content, are a poor CDI fit and must be penalized under `FRAMEWORK-EVALUATION-CRITERIA.md`. No hydration mechanism is selected here.

## 12. Media architecture

Media is structured content with presentation metadata, not a single binary blindly cropped to fit. The runtime and content boundary accommodate:

- responsive source selection, size, format/optimization, and priority/lazy-loading behavior;
- art-directed crops, including materially different mobile and desktop crops;
- focal subject, protected subject region, text-safe region, crop envelope, and contrast-region metadata;
- image, video, poster, and fallback media with accessible alternatives;
- evidence imagery and governed Before/After pairing, labels, metadata, disclaimers, and publication state;
- doctor portrait/profile imagery and technology/device imagery;
- reserved layout space and resilient media-missing behavior.

The Design System's photography and evidence authorities determine acceptable composition and integrity. Missing non-critical media uses an approved fallback or omits the media region without breaking meaning/layout; missing required evidence or required publication media makes that content ineligible for publication rather than fabricating it. Media provider/CDN is not selected.

## 13. Performance and prioritized loading

Performance is an architecture requirement. No unsupported numeric budgets are frozen here; measurable budgets are a later ADR informed by evidence. Framework and implementation choices must be measurable across: server response/initial delivery, primary content render, largest critical media, interaction readiness, JavaScript cost, cinematic payload, image/video payload, layout stability, and route-transition cost.

The runtime distinguishes **Critical experience** (usable initial page, clinic identity/branding, primary semantic content, primary navigation, and primary action where relevant) from **Deferred experience** (cinematic enhancement, non-critical video, below-the-fold rich media, secondary analytics, and non-essential integrations).

| Tier | Responsibility |
|---|---|
| **0** | Resolve clinic, locale, and route. |
| **1** | Deliver critical semantic content and critical media. |
| **2** | Enable interaction required for the immediate experience. |
| **3** | Load cinematic enhancement. |
| **4** | Load secondary content, integrations, and analytics. |

These are priorities, not required network waterfalls. Independent work may run concurrently. Implementations avoid blocking first content on analytics or optional external services, reserve media space for layout stability, load below-fold/non-critical media lazily, and account for mobile network variability and script-aware fonts. Preserve accessibility and medical trust while meeting future budgets.

## 14. Failure and degradation model

Classify failure at the narrowest boundary that preserves safe behavior:

| Failure | Class | Required behavior |
|---|---|---|
| `UNKNOWN_CLINIC` | **FATAL** to request | Return unknown-clinic/not-found; never default to another clinic. |
| `CLINIC_DISABLED` | **FATAL** to public clinic request | Return unavailable; withhold content, indexing, and actions. |
| `UNSUPPORTED_LOCALE` | **ROUTE_LOCAL** | Return policy-defined unavailable/redirect response; no silent medical/editorial language substitution. |
| `UNPUBLISHED_ENTITY` | **ROUTE_LOCAL** | Treat as unavailable/not found publicly; exclude from discovery, SEO, and public caches. |
| `MISSING_LOCALIZED_CONTENT` | **CONTENT_LOCAL** or **ROUTE_LOCAL** when page cannot exist | Withhold affected medical/editorial representation by default; UI strings may use controlled fallback. No silent machine translation. |
| `MISSING_MEDIA` | **CONTENT_LOCAL** | Use approved accessible fallback or omit optional media; required evidence/media blocks publication eligibility. |
| `CMS_UNAVAILABLE` | **CONTENT_LOCAL** where usable published projections exist; otherwise **ROUTE_LOCAL** | Continue from safe cached/stored published projection where available; otherwise surface bounded unavailable state. Never leak another clinic's data. |
| `OPTIONAL_INTEGRATION_UNAVAILABLE` | **INTEGRATION_ONLY** | Use cached/stored projection or defined empty/text fallback; page remains usable. |
| `CINEMATIC_ENHANCEMENT_FAILURE` | **ENHANCEMENT_ONLY** | Preserve base content, navigation, primary actions, and reduced-motion equivalent. |
| `ANALYTICS_FAILURE` | **INTEGRATION_ONLY** | Drop/queue according to boundary policy; never block render or behavior. |
| `INSTAGRAM_FAILURE` | **INTEGRATION_ONLY** | Serve cached/curated projection or hide section; never live-fetch as a render dependency. |
| `CONSULTATION_SUBMISSION_FAILURE` | **ROUTE_LOCAL** action failure | Preserve form state where safe, present localized accessible error/retry path, and do not claim success. Validate server-side. |

**FATAL** means no safe clinic experience can be resolved. Other classes are local to route, content, enhancement, or integration. Optional failure never collapses product-critical experience. Existing Instagram cached/server-side projection and no-live-render-fetch requirement is binding.

## 15. SEO output

SEO output is generated from fully resolved clinic, locale, entity, publication, capability, and route context, not scattered page hardcoding. The runtime produces correct per-clinic/per-locale title, description, canonical URL, genuine `hreflang`/alternate relationships, robots/indexability, sitemap entries, Open Graph/social metadata, localized URL, and publication-aware structured data.

Only valid, published, capability-eligible localized representations may enter public metadata, structured data, sitemap, or alternate clusters. Preview, disabled clinic, unsupported locale, unpublished entity, and unavailable capability outputs must not accidentally become indexable. Canonical and alternate URLs are clinic/domain aware. Exact `x-default` and URL locale policy remain open under A-5.

## 16. Consultation, analytics, search, and integration boundaries

- **Consultation:** V1 captures a lead, not CRM or appointment scheduling. Browser requests pass through a server-side/service boundary for validation, abuse protection, and configured delivery. Provider credentials remain server-side. The contract leaves room for future lead management, appointments, CRM, and international-patient workflows without redesigning the public experience; it does not implement them now.
- **Analytics:** Components emit semantic, provider-independent product events (for example, treatment viewed, concern explored, doctor viewed, consultation started/submitted) through an abstraction. This is not a final taxonomy and follows privacy/consent rules. Failure does not affect product behavior.
- **Search:** Search resolves within clinic and locale and filters by publication, visibility, and capability availability. It must not surface inaccessible entities. Index/provider/database choice remains open.
- **External systems:** All external calls use server-side conceptual integration boundaries that own credentials, cache/projection, rate limits, and fallback. Public rendering does not directly depend on provider uptime.

## 17. Cache and tenancy safety

Conceptual cache domains are **PLATFORM-STABLE**, **CLINIC-CONFIG**, **CONTENT**, **MEDIA**, **CAPABILITY**, **INTEGRATION**, and **PERSONAL/REQUEST-SPECIFIC**. No TTL is set here. Cache design must partition/vary keys by every output-affecting dimension, including clinic, locale, route/entity, publication/config/capability version, and preview/public state as applicable; prevent Clinic A/B and locale A/B cross-contamination; invalidate or safely revalidate publication, configuration, domain mapping, and capability changes; degrade safely when optional integration caches are stale/unavailable; and prevent request-specific data from entering shared public caches.

Clinic boundaries are security and correctness boundaries regardless of future database tenancy model. Clinic context must be explicit enough to scope data resolution, content, media, leads, cache keys, and analytics context. Framework and deployment decisions must not make later tenant isolation unnecessarily difficult. This contract does not choose database tenancy or cache/CDN vendor.

## 18. Security and trust boundary

This is not a full security architecture. The runtime preserves: secrets and integration credentials remain server-side; untrusted content/data is safely handled; clinic configuration cannot inject executable code; publication and medical/editorial eligibility are enforced at a trusted boundary; lead input receives server-side validation and abuse protection; public rendering does not expose private operational data; clinic-scoped reads and side effects cannot cross tenant boundaries.

## 19. Accessibility runtime requirements

The runtime supports the canonical **WCAG 2.1 AA** baseline. It provides semantic DOM/content, keyboard operation, logical focus order, correct document/fragment `lang` and `dir`, mixed-language isolation, reduced-motion alternatives, accessible/localized form state, accessible media alternatives, and equivalent access when cinematic enhancement is reduced or unavailable. Canvas or GPU visuals cannot be the sole carrier of product-critical information. Focus, navigation, content order, and actions remain understandable across locale direction and presentation contexts.

## 20. Deployment and observability

Deployment is vendor- and topology-neutral. Required properties: one Platform Core can serve many clinics; clinic onboarding does not require source forks; independent clinic domains and preview/staging contexts are supported; configuration rollout is safe; deployed version is observable; rollback is possible; environments are separated; secrets are managed outside public client assets; media and integration configuration are separable. A shared runtime deployment is permitted, not required; tenancy/deployment topology remains open for ADR evaluation.

Minimum observability categories: request/route failure, clinic-resolution failure, locale-resolution failure, content-resolution failure, lead-submission failure, integration failure, cinematic client enhancement failure, and performance signals. Diagnostic telemetry should carry clinic, locale, route/entity, and runtime version where available, while avoiding unnecessary sensitive lead data and form values. Vendor selection and detailed event taxonomy remain open.

## 21. Preview and editorial workflow

The architecture supports authorized previews of unpublished content, clinic configuration, locale representation, Visual World/configuration, and capability changes. Preview authorization is conceptually separate from public routing. Draft content cannot leak through public domains, shared caches, search, metadata, structured data, or sitemaps. The CMS preview mechanism is not selected.

## 22. Replication proof and implementation constraint

The runtime supports the existing Replication Proof. Clinic #2 should be launchable primarily from configuration, catalog/capability manifest, content, assets, providers/devices/locations where applicable, and domain. Adding that clinic must not require clinic-specific Core code. If a framework/runtime makes clinic-specific route or component forks the easiest path, it is a poor CDI fit.

## 23. Framework neutrality and authority

This document specifies required properties, not SSR/SSG/ISR/CSR as universal answers and not a framework, CMS, database, tenancy model, hosting provider, CDN, analytics vendor, search implementation, lead vendor, animation library, or GPU technology. ADR-0001 records the selected application framework and rendering model against this contract and `FRAMEWORK-EVALUATION-CRITERIA.md`.

The runtime must not expand V1 into CRM, booking, patient accounts, treatment simulation, scrolljacking, a full-client-rendering mandate, persistence architecture, or ARGON promotion. ARGON remains experimental/non-canonical evidence only for rich transitions, interactive regions, sensory effects, responsive recomposition, and reduced-motion equivalents.
