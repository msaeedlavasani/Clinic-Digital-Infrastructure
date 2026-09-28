# ADR-0001 — Application Framework and Rendering Model

- **Status:** Accepted
- **Date:** 2026-09-28
- **Deciders:** CDI Owner (decision delegated by CDI-ADR-0001); architecture agent (evidence synthesis)
- **Scope:** CDI V1 public application framework and rendering/execution model. This ADR does not select adjacent vendors or application libraries.
- **Class:** ARCHITECTURE

## Context

CDI must deliver one Platform Core across clinics, domains, locales, capability manifests, content, and approved presentations. Public medical/editorial content needs semantic, indexable output. Cinematic interaction is also a canonical experience requirement, but it may not hold critical meaning or actions hostage to client enhancement. CDI therefore needs a clean server/client boundary within one clinic experience, with request-time clinic resolution, publication-aware SEO, tenant-safe cache behavior, and a path to future draft preview and a Design System validation harness.

This decision resolves `OPEN-DECISIONS.md` A-1 using the technology-neutral runtime contract and its framework-evaluation criteria. It is based on CDI constraints, not popularity, agent familiarity, a previous project stack, benchmark rankings, or framework novelty.

The ADR uses these distinctions:

- **CDI requirement** — binding contract from the repository.
- **Implementation evidence** — behavior documented by the framework's official sources examined below.
- **Architectural inference** — expected fit or cost when applying that behavior to CDI; marked as such where it is not a documented guarantee.

## Decision Drivers

1. Stable, practical server-rendered semantic content and metadata.
2. A first-class way to keep static/editorial regions out of unnecessary client execution while composing interactive scenes in the same route.
3. Runtime resolution from host/domain through tenant, locale, entity, capability, publication, and presentation without per-clinic builds or route forks.
4. Tenant- and locale-safe cache partitioning and publication/config invalidation.
5. Correct, publication-aware SEO and authorized preview.
6. Strong React-compatible cinematic composition and lifecycle control without mandating an animation or graphics library.
7. Credible operation on standard server/container infrastructure and room to choose hosting later.
8. A maintainable boundary for portable CDI domain rules and a future `/design-system` harness that uses production primitives.
9. Release/support maturity at the date of decision, including the stability of features needed for required execution boundaries.

## Non-Negotiable Requirements

The selected architecture must support: one Platform Core; multi-clinic resolution; independent domains; configuration-driven clinics; multilingual and bidirectional experience; stable entity identity with localized slugs; capability-derived and publication-aware content; strong indexable rendering and per-clinic/per-locale SEO; server-side integrations; progressive enhancement; scoped client execution; cinematic scenes and lightweight editorial regions; reduced motion; art-directed media; cache partitioning and invalidation; draft preview; WCAG 2.1 AA implementation; the same-production-primitives Design System harness; and configuration/content/assets/domain replication.

The detailed runtime contract remains [RUNTIME-ARCHITECTURE.md](../architecture/RUNTIME-ARCHITECTURE.md). This ADR chooses how to host those responsibilities; it does not revise product, medical, accessibility, or Design System authority.

## Candidates Considered

### Serious candidates

- **Next.js App Router** — evaluated against current 16.x documentation and release family.
- **React Router Framework Mode / Remix lineage** — evaluated at v8 Framework Mode, not legacy Remix v2 assumptions.
- **Astro** — evaluated at 7.x with on-demand rendering and client islands.
- **Nuxt** — added after discovery because its hybrid renderer, request server, and island/lazy-hydration options are plausible CDI contenders; evaluated at 4.x.

### Candidate discovery and exclusions

- **TanStack Start** was examined as a plausible typed full-stack React alternative. Its official documentation identified the framework as Release Candidate at research time, while deferred hydration and React Server Components—the features most relevant to CDI's client boundary—were experimental. This is a release-readiness blocker for a canonical V1 selection, so it was not advanced to the comparative finalist set. Revisit if these features reach supported stable status.
- **SvelteKit** offers SSR, client rendering, prerendering, and code-splitting. The official feature set showed no decisive advantage over the included candidates for CDI's particular combination of React-compatible cinematic scenes, request context, and framework-level component execution boundaries; it was not added to the full matrix.
- **Nuxt** was added rather than expanding into a framework catalog because it offers a genuinely plausible server/client and hybrid rendering approach. Its experimental island status is reflected in the matrix.

## Evidence Sources / Research Date

**Research date:** 2026-09-28. Framework families and official documentation were checked on this date; specific current versions below are evidence snapshots, not version pins for implementation.

### Next.js — 16.x, current patch observed 16.3.6 (Active LTS)

- The official [Server and Client Components guide](https://nextjs.org/docs/app/getting-started/server-and-client-components) describes Server Components as the default for pages/layouts, with Client Components layered where state, handlers, lifecycle, or browser APIs are needed. This directly supports CDI's semantic/server plus scoped-interaction requirement.
- The [multi-tenant guide](https://nextjs.org/docs/app/guides/multi-tenant) documents a single Next.js app serving multiple tenants. The [Proxy reference](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) documents request interception/rewrites; the [headers API](https://nextjs.org/docs/app/api-reference/functions/headers) exposes incoming request headers in server rendering. **CDI inference:** resolve a trusted host to clinic configuration at the request boundary; Next.js does not provide CDI's tenant registry or isolation policy.
- The [internationalization guide](https://nextjs.org/docs/app/guides/internationalization) documents URL sub-path and domain routing patterns plus dynamic locale route segments. CDI still owns supported-locale validation, localized entity-slug lookup, and SEO alternate eligibility.
- The [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) supports route-derived metadata. [Draft Mode](https://nextjs.org/docs/app/api-reference/functions/draft-mode) supplies a server-side draft preview switch. CDI must still enforce publication, clinic authorization, robots, sitemap, and cache behavior.
- [Self-hosting](https://nextjs.org/docs/app/guides/self-hosting) and [deployment to platforms](https://nextjs.org/docs/app/guides/deploying-to-platforms) document Node/server operation and a stable adapter API. Next.js does not require Vercel. Its [support policy](https://nextjs.org/support-policy) listed 16.x as Active LTS. The official release blog listed 16.3.6 as current Active LTS on 2026-09-22 and announced a 16.3.7 security release for 2026-09-30; implementation must pin the newest patched supported release then available.
- The same self-hosting guide documents a consequential cache risk: caches are local by default and multi-instance revalidation requires shared cache/tag coordination; CDN cache-key variability must be correct. This is a known cost, not an assumption that Next.js automatically provides safe tenant caching.
- Official [instrumentation](https://nextjs.org/docs/app/guides/instrumentation) and [bundle analysis tooling](https://nextjs.org/docs/app/guides/package-bundling) provide a path for framework-level observability and client/server payload review; CDI still defines its own tenant-aware signals and budgets.

### React Router Framework Mode / Remix lineage — v8.4.0

- Official [rendering strategies](https://reactrouter.com/start/framework/rendering) include SSR, static prerendering, and CSR. [Middleware](https://reactrouter.com/how-to/middleware) passes request-scoped typed context through the server middleware/loader chain; [route modules](https://reactrouter.com/start/framework/route-module) provide data loading, actions, error boundaries, route headers, and metadata integration.
- [Deployment guidance](https://reactrouter.com/start/framework/deploying) includes Node/Docker and multiple host templates. The [official changelog](https://reactrouter.com/changelog) recorded v8.4.0 on 2026-09-15. The same changelog labels React Server Components Framework Mode unstable; the standard Framework Mode remains the production basis considered here.
- React Router's [Instrumentation API](https://reactrouter.com/how-to/instrumentation) supports server/client logging, error reporting, and performance tracing without binding CDI to an observability vendor.
- **CDI inference:** request context and standard response headers are a natural fit for domain resolution and explicit HTTP cache policy. The standard React Router framework renders a React app; route chunking and lazy scene imports can isolate large scene code, but it does not provide a stable default component-level Server Component/island model comparable to Next.js or Astro.

### Astro — 7.x, current release observed 7.3

- The official [islands architecture guide](https://docs.astro.build/en/concepts/islands/) describes server-rendered HTML with explicitly hydrated client islands. [On-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/) and [middleware locals](https://docs.astro.build/en/guides/middleware/) support request-time rendering and request-scoped context when an adapter is installed.
- Astro's [i18n routing guide](https://docs.astro.build/en/guides/internationalization/) offers configured locales, localized path folders, and domain mapping for locales. That model is project-level routing configuration; CDI would use its own runtime resolver to handle clinic-specific supported locales, stable entity IDs, and localized slugs without separate locale route trees.
- [View transitions](https://docs.astro.build/en/guides/view-transitions/) support persistent elements and reduced-motion behavior, while warning that client-side navigation swaps body content and may require script/state reinitialization. [Route caching](https://docs.astro.build/en/guides/caching/) is available to on-demand rendered pages. [Actions](https://docs.astro.build/en/guides/actions/) provide validated server calls and native form submission options.
- [Astro 7](https://astro.build/blog/astro-7/) shipped 2026-06-22; the official blog listed Astro 7.3 on 2026-09-03. Its official [on-demand rendering documentation](https://docs.astro.build/en/guides/on-demand-rendering/) lists Node and several platform adapters.
- **CDI inference:** Astro has the strongest stable low-client baseline. A React-based production Design System/cinematic layer is possible through framework integrations, but adds a second composition/lifecycle boundary; dynamic multi-tenant routing would be CDI-owned rather than provided by built-in i18n.

### Nuxt — 4.x, current patch observed 4.5.2

- Official [rendering modes](https://nuxt.com/docs/4.x/guide/concepts/rendering) and [Nitro deployment](https://nuxt.com/docs/4.x/getting-started/deployment) support SSR, prerendering, hybrid rules, and multiple server targets. The [server components guide](https://nuxt.com/docs/4.x/guide/concepts/server-components) states that island components and selective client hydration remain experimental; the default app hydrates the page. The [mostly-static recipe](https://nuxt.com/docs/4.x/guide/recipes/mostly-static-sites) describes per-component lazy hydration and no-script routes, with important limits when a route also needs interactive widgets.
- Official Nuxt release information lists 4.5.2 and the July 2026 4.5 line in the [Nuxt blog](https://nuxt.com/blog). **CDI inference:** Nitro is a flexible server boundary; however, the feature that most cleanly separates server and client regions is still experimental, and the framework's Vue component ecosystem would be a separate Design System/cinematic implementation choice.

### Candidate discovery: TanStack Start and SvelteKit

- TanStack Start's [overview](https://tanstack.com/start/latest/docs/framework/react/overview) marked it Release Candidate. Its [deferred hydration guide](https://tanstack.com/start/latest/docs/framework/react/guide/deferred-hydration) and [RSC guide](https://tanstack.com/start/latest/docs/framework/react/guide/server-components) mark the relevant execution features experimental. This is insufficient stability for the V1 framework decision's must-have execution boundary.
- SvelteKit's official [introduction](https://svelte.dev/docs/kit/introduction) documents SSR, CSR, prerendering, and code-splitting. Those are credible capabilities, but discovery found no CDI-specific differentiator sufficient to justify a broader evaluation set after Next.js, React Router, Astro, and Nuxt were compared.

### Important uncertainty

Official feature documentation proves mechanisms exist, not that CDI's implementation will be secure, accessible, fast, tenant-isolated, or operationally sound. No production implementation or benchmark was run. Cache-key design, server adapters, metadata correctness, animation cleanup, and locale/publication behavior require implementation validation. Release status and APIs can change; re-check current support and advisories when implementation begins.

## Hard-Gate Results

No selected finalist has a **BLOCKING** result on a CDI must-have. All four fully evaluated frameworks are viable in principle, with different degrees of framework-native support. Viable does not mean equally well suited.

| Candidate | Status | Hard-gate finding |
|---|---|---|
| Next.js App Router | **VIABLE** | Stable Server/Client Component boundary, request-time resolution, and standalone operation meet the required shape. Cache coordination and framework coupling require explicit controls. |
| Astro | **VIABLE** | Stable HTML/client-island model fits editorial/runtime separation. Dynamic tenant/locale/entity resolution and rich React scene continuity need more CDI-owned composition work. |
| React Router Framework Mode | **VIABLE** | Strong request context, SSR, route data, and deployment flexibility. Its standard stable mode has weaker component-level server/client isolation; lazy route/scene chunks mitigate but do not remove the app hydration baseline. |
| Nuxt | **VIABLE** | Hybrid SSR/server APIs and Vue lazy hydration can satisfy the overall product. Server-component/selective-island facilities most relevant to reducing per-region client code are experimental, increasing execution-boundary risk. |
| TanStack Start | **NOT ADVANCED** | Officially Release Candidate; the directly relevant deferred-hydration and RSC paths are experimental. Those maturity risks make it premature for this decision, though this short discovery pass does not establish a fundamental failure of CDI's must-have requirements. Re-evaluate when those capabilities are supported stable features. |

## Comparative Evidence Matrix

Classification reflects documented capability and CDI fit, not a numeric score. `STRONG` means the supported framework model directly expresses the need; `ACCEPTABLE` means supported with normal CDI domain/configuration work; `WEAK` means possible but meaningfully awkward or dependent on less mature pieces; `UNCERTAIN` means evidence is insufficient. There are no `BLOCKING` cells for the four viable candidates.

| CDI dimension | Next.js App Router | React Router Framework | Astro | Nuxt |
|---|---|---|---|---|
| Multi-clinic/domain request resolution | STRONG — official single-app multi-tenant pattern; CDI registry still custom | ACCEPTABLE — server middleware context; tenant lookup custom | ACCEPTABLE — SSR middleware locals; tenant lookup custom | ACCEPTABLE — Nitro request middleware; tenant lookup custom |
| Locale/direction + localized entity slugs | ACCEPTABLE — flexible dynamic locale segment/domain routing; clinic policy custom | ACCEPTABLE — flexible route params/loaders; all localization semantics custom | WEAK — built-in locale folders/config are global; CDI custom resolver needed | ACCEPTABLE — dynamic routes support custom resolver; locale policy custom |
| Semantic/indexable output + SEO metadata | STRONG — server components and metadata API | STRONG — SSR, route metadata, response headers | STRONG — HTML-first static/on-demand output | STRONG — SSR by default and metadata support |
| Capability/publication-derived content | ACCEPTABLE — portable CDI resolver in server component/data layer | ACCEPTABLE — portable resolver in loaders/actions | ACCEPTABLE — portable resolver in middleware/page render | ACCEPTABLE — portable resolver in Nitro/data fetch layer |
| Scoped client execution | STRONG — stable server/client component boundaries | WEAK — route/code splitting available; stable default hydrates the React application | STRONG — stable explicit client islands | WEAK — lazy hydration available; component-island/selective-client path remains experimental |
| Cinematic scenes and transitions | STRONG — React client scenes, persistent layouts, server-rendered surrounding content | ACCEPTABLE — React effects and route transitions possible; less server/client partitioning | ACCEPTABLE — arbitrary islands and view transitions; body swap/state lifecycle must be managed | ACCEPTABLE — interactive Vue regions; built-in view-transition and island options include experimental parts |
| Cache partitioning/invalidation | ACCEPTABLE — explicit scopes/tags; multi-instance coordination and CDN variability are easy to misconfigure | ACCEPTABLE — explicit response headers and application cache; more CDI-owned plumbing | ACCEPTABLE — route cache API plus custom cache/provider policy | ACCEPTABLE — Nitro route rules/cache; request/tenant variation still CDI-owned |
| CMS draft/preview | STRONG — built-in Draft Mode primitive plus CDI authorization rules | ACCEPTABLE — implement preview context/session in server middleware | ACCEPTABLE — implement authorized preview in SSR middleware | ACCEPTABLE — implement authorized preview through server context/session |
| Media and art direction | STRONG — responsive image tools; CDI crop/focal semantics remain content metadata | ACCEPTABLE — flexible media, no framework-specific art-direction model | STRONG — image service/tooling plus flexible markup | STRONG — image module ecosystem; CDI art-direction metadata remains custom |
| Server-side integrations | STRONG — Route Handlers/Server Actions and server components; credentials server-only by design | STRONG — server loaders/actions and request middleware | STRONG — server actions/endpoints and middleware | STRONG — Nitro APIs/middleware |
| Deployment flexibility | ACCEPTABLE — Node/Docker self-hosting and stable adapter API; verify feature support per adapter | STRONG — standard Node/Docker path and multiple hosting templates | STRONG — official Node and platform adapters | STRONG — Nitro Node, static, edge/serverless presets |
| Accessibility and reduced motion | ACCEPTABLE — semantic React output; application owns WCAG/reduced-motion behavior | ACCEPTABLE — semantic React output; application owns WCAG/reduced-motion behavior | ACCEPTABLE — semantic output and reduced-motion handling for built-in view transitions; custom scenes remain application-owned | ACCEPTABLE — semantic output and Vue a11y tooling; application owns WCAG/reduced-motion behavior |
| Validation harness / replication | STRONG — same React primitives/components in site and `/design-system`; shared app/data model | STRONG — same React primitives; shared loaders/context | ACCEPTABLE — same React library can be integrated, but Astro/React composition must be governed | STRONG — one Vue primitive system across routes/harness; clinic logic remains config-driven |
| Testing and cross-context QA | ACCEPTABLE — broad React ecosystem; domain resolver and multi-domain behavior need explicit fixtures/E2E coverage | ACCEPTABLE — route/loaders and server boundaries are testable; clinic and locale matrix remains CDI-owned | ACCEPTABLE — component and browser testing are possible; island navigation/scene lifecycle needs explicit coverage | ACCEPTABLE — component/server testing is supported; clinic and locale matrix remains CDI-owned |
| Performance and observability | STRONG — server/client bundle analysis and OpenTelemetry integration available; CDI still defines budgets and tenant-aware signals | ACCEPTABLE — React/server instrumentation is available; CDI owns route and tenant attribution | ACCEPTABLE — build/runtime diagnostics and adapter telemetry are available; island payload attribution is CDI-owned | ACCEPTABLE — Nitro server observability and performance hooks are available; tenant attribution is CDI-owned |
| Type safety and domain boundary | STRONG — TypeScript-first route/server/client modules; portable CDI types can remain outside framework APIs | STRONG — typed route modules and request context; CDI rules can remain in portable packages | ACCEPTABLE — TypeScript supported across Astro and framework islands; cross-runtime contracts require discipline | STRONG — TypeScript and typed server context; Vue/Nitro types remain framework-specific at adapters |
| Operational complexity / bespoke runtime | ACCEPTABLE — integrated server/render/cache model, but tenant-safe cache coordination needs deliberate operations | ACCEPTABLE — explicit request/response model, with more CDI-owned composition and client-boundary plumbing | ACCEPTABLE — simple static path, but dynamic tenant routing and React scene lifecycle add composition work | ACCEPTABLE — integrated Nitro deployment model, with experimental component isolation increasing future change risk |
| Lock-in and reversal | ACCEPTABLE — high framework API coupling; portable domain boundaries and React UI reduce, but do not remove, reversal work | STRONG — standards-oriented request/response model; React UI reusable, route/data layer still migrates | ACCEPTABLE — content and UI can be portable; Astro routing/templates/island lifecycle need replacement | ACCEPTABLE — portable domain logic possible; Vue UI and Nuxt/Nitro routing/data APIs increase cross-framework migration |
| Maturity and forward risk | STRONG — 16.x Active LTS; active security patch stream; cache/API complexity remains | ACCEPTABLE — stable v8, but major release is recent and RSC remains unstable | ACCEPTABLE — stable 7.x, recent major with evolving cache/routing features | ACCEPTABLE — stable 4.x; island/server component features still experimental |

### Comparative interpretation

- **Next.js** most directly combines a strong public semantic renderer with stable component-level server/client execution for complex cinematic regions. It also has CDI-relevant multi-tenant documentation and a clear standalone Node deployment mode. Its principal cost is framework-specific rendering/cache behavior and the associated need for exact tenant-aware cache design.
- **Astro** best minimizes client execution for editorial output. It remains viable and is the closest alternative. CDI would need to own more of the runtime routing model because the built-in locale scheme is project-configured, and React-based scene composition introduces a separate client lifecycle inside Astro's navigation model. That cost is meaningful for a product whose homepage continuity and future rich scene work are first-class, even though Astro can implement it.
- **React Router Framework Mode** has an attractive request/response model and standard deployment options. It is a credible choice if route/data control were the primary differentiator. For CDI, however, the lack of a stable first-party component-level server/client boundary leaves more baseline React application hydration on semantic routes and makes the most cinematic surfaces less isolated.
- **Nuxt** has compelling full-stack and hybrid deployment capability. Its ideal static/editorial plus client-scene boundary currently leans on experimental server-component/island behavior or route-level compromises, making it a weaker foundation for the required execution split.

## Decision A — Application Framework

**Selected: Next.js App Router (Next.js 16.x supported stable line at decision date).**

### Why selected

Next.js is the best fit for CDI's combined requirement: one request-resolved multi-clinic public platform that serves complete semantic content while selectively admitting high-interactivity cinematic regions. Its stable Server/Client Component model allows editorial and medical content to remain server-rendered without shipping their component implementations to the browser, while client scenes can own only the state, events, browser APIs, and graphics they need. A dynamic segment and server request context can serve clinic-specific localized routes from one codebase; clinic and locale identity remain CDI data, not framework route forks.

Next.js also has a documented multi-tenant pattern, dynamic metadata and Draft Mode primitives, and self-hosting/deployment adapters. Those features reduce framework-specific scaffolding without selecting Vercel or another host.

### Why not the other finalists

- **Astro:** strongest alternative and better at minimal JavaScript for sites whose center of gravity is static/editorial pages with discrete widgets. CDI's route runtime and homepage continuity put more weight on a unified React server/client composition model. Astro can support this but needs more explicit routing and client lifecycle integration around tenant-configured locale/entity resolution and persistent scenes. The decision is not based on Astro being unable to render CDI.
- **React Router Framework Mode:** its typed request context and SSR/actions are sound. The standard stable rendering architecture hydrates a React application rather than providing Next's stable Server Component boundary. CDI can lazy-load cinematic code, but keeping the surrounding low-interactivity application out of client execution is less natural.
- **Nuxt:** capable and deployment-flexible, but its default app hydration and experimental status of server-component/selective-island paths make the desired boundary less stable. Selecting it would also place the Design System and cinematic experience in Vue rather than reuse one React component composition model.
- **TanStack Start:** not a finalist because its official release status and required hydration/RSC features were still RC/experimental at the research date.

### Known risks

1. **Cache complexity and tenant leakage.** Next's framework cache, router cache, server-instance cache, and external CDN do not automatically coordinate all tenant dimensions. Official self-hosting guidance documents per-instance caches and the need for shared tag coordination.
2. **Framework lock-in.** Server Components, route conventions, metadata hooks, Draft Mode, and cache tags are Next-specific APIs.
3. **Full route dynamicity.** Reading host/request headers to resolve a clinic makes tenant routes request-dependent. Incorrect optimization attempts could cache one clinic under another host or sacrifice freshness.
4. **Adapter variance.** Next's stable adapter API improves portability, but each deployment adapter may not support every feature identically.
5. **Release/security cadence.** Next.js 16.3.7 was announced for a security update on 2026-09-30; implementation must use the latest supported patched release rather than pinning the research snapshot.
6. **Client boundaries can still sprawl.** React providers or `use client` declarations placed too high can expand the client tree and payload.

### Mitigations

- Resolve host to a validated clinic identifier on each request. Trust only the deployment's verified host/forwarded-host boundary; never select tenant from an untrusted client-controlled context value.
- Keep portable CDI functions independent of Next APIs. When caching, read request values outside cached functions and pass explicit clinic ID, locale, stable entity ID, publication/config versions, and public/preview mode into domain cache calls. Treat preview and request/personal data as uncacheable unless a later reviewed contract says otherwise.
- Begin with request-rendered clinic pages and cache only deliberately scoped public data. Do not place HTML in a shared CDN cache until domain/locale/preview variation is proven end-to-end. Coordinate invalidation across application instances; invalidate content, configuration, and capability-derived surfaces after publication/config changes.
- Keep server components as the default. Put client execution behind narrow interactive boundaries, lazy-load expensive scene/media code where appropriate, and do not place clinic-wide providers at the application root unless a demonstrated requirement needs that scope.
- Use one React component/design-system source for production pages and `/design-system`; keep clinic/locale/capability/publication/SEO policy in portable CDI domain modules.
- Use server-rendered links and native forms/server endpoints for critical navigation and lead submission. Cinematic failure and reduced motion must expose the same meaning/actions.
- Keep the runtime deployable on standard Node/Docker infrastructure. Use verified adapters only after feature support and cache semantics are reviewed; do not rely on private host APIs.
- Before implementation, recheck current LTS patch, release notes, and security advisories, particularly the announced 2026-09-30 patch.

## Decision B — Rendering Model

**Selected: request-resolved hybrid rendering with server-rendered semantic output, selective build/cache reuse, and narrowly scoped client enhancement.** This is a separate decision from selecting Next.js and does not mandate one rendering label across every page or region.

1. **Initial response:** Resolve trusted host/domain → clinic → locale → route/entity → capability and publication → content/presentation on the server. Produce semantic HTML, correct document language/direction, primary navigation/actions, medical/editorial information, and per-request metadata before optional client enhancement is ready.
2. **Dynamic resolution:** Clinic/domain and clinic-supported locale selection are request-context operations. Use one dynamic application route model and data lookups by stable entity identity and localized slug; never generate a clinic/locale-specific route tree or application build as the normal onboarding mechanism.
3. **Static/pre-render opportunities:** Pre-render platform-stable assets and truly invariant output. Public clinic output may be cached or generated on demand only when its key includes all clinic, locale, entity, publication/config/capability, domain/canonical-origin, and public/preview dimensions. Clinic onboarding must not require a clinic code fork or a clinic-only deployment build.
4. **Server work:** Resolve publication state and metadata at a trusted server boundary; perform CMS/content reads and server-side integration work there. Public rendering uses cached/stored projections for integrations, never live-fetches Instagram. Lead submission and future service calls remain server-side.
5. **Client regions:** Hydrate only Client Components needing interaction, scene state, browser APIs, or rich media. Keep FAQ, facts, risks, doctors, evidence, articles, and SEO content in server-rendered regions. A cinematic hero or Treatment Signature may use substantial client execution without making unrelated editorial content a client application.
6. **Streaming:** Use streaming where it helps deliver a ready semantic shell while a non-critical region is pending. Do not use a stream boundary that withholds medical content, metadata required for the response, navigation, or a primary action behind a cinematic or optional integration boundary.
7. **Caching/revalidation:** Begin with request-safe SSR for clinic pages. Cache public data/results in explicit clinic/locale/entity/version scopes. Revalidate or invalidate on content publication, clinic configuration, domain mapping, or capability changes. Treat preview, leads, and personal/request-specific information as private and bypass shared caches. CDN/server output caching is enabled only after host-aware cache variation and invalidation are verified.
8. **Preview:** Use an authorized server-side preview context to resolve draft content/configuration. Keep preview output out of public caching, search, sitemaps, structured data, robots/indexing, and unauthenticated routes.
9. **Degradation:** Server HTML carries product-critical meaning and links. JavaScript enhances interaction and cinematic motion. A failed client scene, reduced-motion preference, missing optional media, or unavailable analytics/integration cannot remove the underlying information or primary action.

## Framework Boundary

### Portable CDI domain logic

Keep these concerns outside Next-specific APIs wherever practical:

- clinic configuration and domain-to-clinic resolution policy;
- `ClinicContext`/`LocaleContext` conceptual types and validation;
- stable entity identity and localized slug lookup;
- capability graph derivation, publication, and visibility rules;
- content eligibility and missing-locale behavior;
- presentation configuration resolution;
- SEO eligibility and metadata values;
- lead, analytics, search, and external integration interfaces;
- cache dimensions/tags and cache invalidation intent;
- Treatment Signature semantics and reduced-motion decisions.

Pure domain functions should receive explicit scoped inputs and be testable without a framework request object. Do not introduce a database, ORM, CMS client, animation package, or hosting SDK in this ADR.

### Next-specific adapters

Next-specific modules may own incoming request/header extraction; mapping the request to portable clinic/locale context; route parameter integration; server rendering lifecycle; Server/Client Component composition; Route Handlers/actions; metadata and sitemap hooks; Draft Mode adapter; framework cache API tags; and deployment adapters. Next-specific code must not become the source of truth for clinic capability, publication, or content rules.

## Consequences

### Positive Consequences

- One framework can render both indexable medical/editorial output and cinematic interactions without separate applications or route trees.
- The server/client boundary aligns with CDI's critical/deferred loading tiers and progressive-enhancement contract.
- Domain, locale, entity, capability, publication, and presentation logic can remain framework-independent and tenant-explicit.
- Dynamic domains and CMS preview can be introduced without selecting one hosting vendor or generating one codebase per clinic.
- The Design System harness can use the exact production React components and token/contract sources.

### Negative Consequences / Costs

- The team must learn and govern Server/Client Component boundaries, Next route APIs, and multiple cache layers.
- Public clinic HTML is not automatically a static asset; request-time tenant resolution and cache invalidation are first-order runtime responsibilities.
- Metadata, route errors, and cache revalidation need deliberate composition with clinic/locale/publication state.
- Framework APIs are more coupled than a plain React/router architecture; portable domain modules reduce but do not remove migration effort.

## Risks

| Risk | Severity | Mitigation / validation |
|---|---|---|
| Cache key omits clinic or locale and leaks/cross-serves content | High | Explicit scoped cache inputs; host-aware CDN variation; isolation scenarios in implementation QA. |
| Publication changes leave stale sitemap, SEO, or discovery results | High | Shared capability/publication invalidation intent; invalidate derived caches and metadata outputs together. |
| Root-level client provider expands hydration across editorial routes | Medium | Keep providers and Client Components deep; review client bundle and route output. |
| A cinematic region traps content behind hydration or animation | High | Server semantic base, native links/forms, reduced-motion and enhancement-failure acceptance. |
| Self-hosted multi-instance cache invalidation diverges | Medium/High | Shared handler/tag coordination or disable shared response cache until configured; deployment acceptance. |
| Next release/security change alters APIs before implementation | Medium | Re-evaluate current Active LTS patch/support and official migration notes before version pin. |
| Framework-specific APIs spread into domain rules | Medium | Import-direction rule: portable domain modules cannot import Next APIs; audit at implementation review. |

## Rejected Alternatives

- **Astro:** rejected as the selected application framework, not rejected as non-viable. Its client-island model is excellent for editorial-first sites, but CDI's combined dynamic clinic routing and continuous cinematic React composition fit more directly in a unified stable Server/Client Component framework.
- **React Router Framework Mode:** not selected because its stable client runtime is less granular for a mixed editorial/cinematic route. It remains viable if a later decision values portability and request/response control over framework-native server/client component separation.
- **Nuxt:** not selected because its relevant component-island/server-component path remains experimental at the decision date, and it would require a separate Vue Design System/cinematic implementation.
- **TanStack Start:** excluded from this decision date's viable production options because its official documentation marks the framework RC and its differentiating deferred hydration/RSC support experimental.
- **SvelteKit:** no decisive CDI-specific advantage emerged in the short candidate-discovery pass.
- **Static-only generation:** does not by itself support arbitrary dynamic clinic domains/configuration and content publication changes without build coupling; retained only for invariant assets or individually proven safe outputs.
- **Full client-rendered SPA:** violates the requirement that product-critical public medical/editorial content be semantic and indexable without client execution.

## Reversal Strategy

**Reversal cost: MODERATE.**

CDI domain logic, content/capability shapes, localization, integration interfaces, and Design System tokens/components must stay portable. This keeps the clinic model and rules reusable. Routing declarations, Server Component conventions, metadata hooks, Draft Mode, cache APIs, and server actions remain Next-specific and would require a new framework adapter and rendering composition in a migration. Existing React components and client scenes would reduce UI rewrite, but would not make a migration automatic. Avoid framework APIs in shared packages and preserve framework-neutral request/resolution contracts.

## Validation Requirements

All scenarios were architecturally walked against official capabilities and the portable CDI boundary; this is not implementation or runtime test evidence.

| Scenario | Result | Reason |
|---|---|---|
| 1. Clinic A, domain A, `fa-IR`, Dark Cinematic, Laser available | PASS | Host lookup returns A; Persian locale derives RTL; manifest enables Laser; theme/Visual World is configuration. |
| 2. Clinic B, different domain, `en` + `ru`, Luminous Luxury, Laser unavailable, Hair Transplant available | PASS | Same route model resolves B; clinic locale list, capability graph, and Visual World drive output. |
| 3. Arabic RTL clinic locale | PASS | Locale context provides `ar` and RTL direction; no locale component/route fork required. |
| 4. Unpublished treatment translation | PASS | Server eligibility withholds route/content and excludes it from metadata, alternate links, search, and sitemap. |
| 5. CMS unavailable | PASS | Use an eligible cached/stored published projection or show a bounded local failure; do not cross clinics. |
| 6. Cinematic enhancement fails | PASS | Initial server semantic content, navigation, and primary actions remain usable. |
| 7. Reduced-motion user | PASS | Render the complete same content/navigation with motion suppressed or replaced by a designed static/state-change equivalent. |
| 8. Draft content preview | PASS | Authorized preview context reads draft state; public requests and shared cache/indexing remain isolated. |
| 9. Clinic #2 replication without Core changes | PASS | New configuration, capability manifest, content, assets, and domain use the same runtime resolution path. |
| 10. Future CRM integration | PASS | Lead service boundary is extensible; no CRM is selected or included in V1. |
| 11. Future booking integration | PASS | Consultation boundary can be consumed later; no booking or appointment scheduler is introduced. |
| 12. Future `/design-system` harness | PASS | Same React production components/tokens/contracts can render under an application route. Harness remains deferred. |
| 13. Multiple clinic updates without cache leakage | PASS | Explicit tenant/locale/version cache dimensions and coordinated invalidation are required; no shared key is based on path alone. |

## Follow-up Decisions

The following remain open and are not resolved by this ADR: CMS/provider (A-2), persistence/database (A-3), tenancy/deployment topology (A-4), exact locale URL/default/`x-default` policy (A-5), final content fallback policy (A-6), translation workflow (A-7), lead storage (A-8), non-Persian typefaces, search implementation, analytics provider, hosting/CDN, animation library, WebGL/WebGPU/Three.js, CRM, booking provider, and performance budgets.

## Canonical References

- `docs/architecture/RUNTIME-ARCHITECTURE.md`
- `docs/architecture/FRAMEWORK-EVALUATION-CRITERIA.md`
- `docs/architecture/PLATFORM-BOUNDARIES.md`
- `docs/architecture/INTEGRATION-BOUNDARIES.md`
- `docs/architecture/CAPABILITY-RELATIONSHIP-MODEL.md`
- `docs/architecture/CLINIC-PROVISIONING.md`
- `docs/product/V1-SCOPE.md`
- `docs/product/OPEN-DECISIONS.md` (A-1 resolved by this ADR; adjacent decisions unchanged)
- `docs/design-system/VALIDATION-HARNESS.md` (harness remains specified-only; this ADR supersedes its A-1 status snapshot without changing the harness contract)
- `docs/design-system/COMPOSITION-CONTRACTS.md`
- `docs/design-system/PRESENTATION-CONTEXTS.md`
- `docs/design-system/MOTION-ICONOGRAPHY.md`
