# Production Vertical Slice 01 — Implementation Record

**Status:** IMPLEMENTED · technical validation evidence in `evidence/production-vertical-slice-01/`  
**Baseline:** `db885828247ca72f29d3e3264f14f5c03920ad00`  
**Scope:** One fictional clinic configuration, Persian and English, Home → treatment detail → consultation request. This is the first production-shaped implementation slice; it is not a deployed clinic and it is not Owner visual acceptance.

## Runtime realization

The slice applies [Runtime Architecture](RUNTIME-ARCHITECTURE.md) and [ADR-0001](../decisions/ADR-0001-APPLICATION-FRAMEWORK-AND-RENDERING.md) on the existing Next.js 16.3.6 App Router foundation. Request headers are read at the server boundary. The clinic provider normalizes `Host`, resolves an exact configured domain or an explicit loopback development fixture, and returns a `ClinicContext`. Unknown hosts return not-found without a default clinic. Routes remain dynamic because host resolution is request-scoped; no clinic HTML response cache is enabled.

The fixture is `clinic-fixture-01` (`reference-clinic-01`), with reserved domain `clinic-01.cdi.test`, loopback development aliases, `fa` default locale, `fa` and `en` supported locales, Dark Cinematic, contact configuration, capability manifest, and published-content references. Its visible notice identifies all fixture content as fictional. The fixture is non-indexable. Domain/content providers receive clinic context explicitly, and content lookups reject a mismatched clinic ID or missing clinic reference.

`/[locale]` is an **implementation validation convention**, not the final CDI locale URL policy. `/` redirects to the fixture's configured default locale only for the controlled fixture host. Locale codes resolve to `fa-IR`/RTL and `en`/LTR document metadata; unsupported locales fail closed. Locale metadata and content representations are keyed by locale rather than one field per language. Arabic and Russian remain compatible with the same locale model but are not provisioned in this fixture.

## Content, capability, and routes

`src/cdi/content/provider.ts` is the application-facing `ContentProvider`; `LocalFixtureContentProvider` is the local implementation. The route tree does not import fixture entity arrays. Stable IDs include `TREATMENT.LASER_HAIR_REMOVAL`, `CONCERN.UNWANTED_HAIR`, `DOCTOR.EXAMPLE_CLINICIAN_01`, `TECHNOLOGY.LASER`, and `DEVICE.DEMO_LIGHT_PLATFORM`. Localized slugs resolve to those IDs.

The fixture exercises the independent capability axes: Laser Hair Removal is `AVAILABLE + VISIBLE`; a second published treatment is `AVAILABLE + HIDDEN` (direct URL only); Hair Transplant is `UNAVAILABLE`; Skin Rejuvenation is `COMING_SOON` with a draft representation. Public discovery derives from capability resolution, clinic content references, and the published localized representation. An unpublished or unavailable direct route returns not-found and is omitted from metadata and links. Concern discovery is a patient-language fixture with a stable concern identity and only the published related option. Hidden, unavailable, unpublished, or draft entities are not added to its option list.

Routes:

- `/fa` and `/en` — clinic Home, face-led fixture composition, published Concern path, capability-derived treatment option.
- `/fa/treatments/لیزر-موهای-ناخواسته` and `/en/treatments/light-based-care` — stable treatment entity with localized slugs, sensory signature, editorial information, example clinician, generic technology and device context.
- `/fa/consultation` and `/en/consultation` — lead request validation surface. Treatment intent may be carried by stable ID in the query string; scheduling is not present.

The Laser signature is a shared Design System component using semantic world tokens and CSS light/focus behavior. Its server-rendered words remain visible without JavaScript; reduced motion removes the moving beam and leaves a static focus field. Treatment information remains semantic and outside the visual effect. No treatment outcome, real clinical fact, Before/After result, doctor credential, device model, or clinic ownership claim is fabricated. No Evidence section is published because this fixture has no governed evidence.

## Presentation, rendering, and media

Production routes compose the existing Design System's semantic buttons/actions, form fields, layout primitives, media composition, theme registry, and typography roles. The clinic selects `dark-cinematic` by registry ID; no component branches on the world name. The fixture identity/theme are data, not clinic-specific route or component code.

Next Server Components render the route, metadata, media, and consultation form. The consultation form uses a native HTML form and a server action, so field semantics and submission do not require client JavaScript. Public slice components contain no client boundary; the client controls remain limited to `/design-system`. Route changes use ordinary links and browser history. No client-only scene state, scroll capture, full-page canvas, scrolljacking, or route-transition dependency is introduced.

The existing shared fixture media component supplies clearly labeled illustrative assets with focal/crop metadata. Home Hero media is prioritized; treatment clinician/device imagery remains lazy-loaded. A reserved test illustration is used rather than ARGON or clinic photography. Geometry follows the shared viewport/safe-area/rail/action primitives and document flow; the consultation Action Zone is not fixed to the viewport.

## Consultation boundary and data handling

The server action validates clinic/host identity, supported locale, consultation enablement, name, phone syntax/length, and that the selected stable treatment ID is both available and published in that locale. Error codes return through an allowlisted query status; personal fields are never copied into a URL. `LeadSubmissionBoundary` is implemented by an explicit local validation adapter only in development/test; it neither persists nor logs contact details. Other environments fail closed as unavailable. No external vendor, database, lead storage, CRM, booking, rate-limit provider, or credentials are selected. This adapter is an architecture proof, not production lead delivery.

## SEO, caching, and undecided choices

Home and treatment metadata derive from the resolved clinic, locale, published representation, and entity slug. Canonical and alternate URLs use the configured reserved `.test` domain; alternates only include published representations. No `x-default` is emitted. All fixture pages carry `noindex` because the clinic and content are fictional. The content model and metadata builder can emit indexable metadata when a provisioned clinic explicitly permits indexing. Public semantic HTML is server-rendered.

No framework response cache is enabled on clinic routes. Clinic/locale/entity/publication dimensions are explicit in provider calls; adding cached content requires scoped cache keys and invalidation from the canonical runtime contract. The work does not decide the final locale URL/fallback policy, CMS, persistence/database, tenant topology, hosting/CDN, lead delivery/storage, analytics, or search.

## Validation and limitations

Automated checks cover clinic host resolution and unknown host failure; locale/direction; stable IDs/localized slugs; capability/publication filtering; Home, treatment and consultation; server validation and development success; no-JavaScript route/form access; refresh, back/forward and deep links; SEO alternates/robots; reduced motion; axe smoke; horizontal overflow at `390×844`, `430×932`, `1024×768`, `1440×900`; and the `390×500` consultation action. Browser screenshots and their exact contexts are indexed in `evidence/production-vertical-slice-01/README.md`.

The captured production Home requested one critical Hero illustration as `eager`/`high`; treatment and trust imagery was absent from the initial Home document. Treatment imagery is marked lazy and loads when its regions are reached. `runtime-media-report.json` records the two route snapshots. Its local production browser session reported about 133 KB of encoded JavaScript response bodies across five chunks. The browser API reported zero `transferSize` for those responses, so this is not a cold-network transfer measurement or a performance budget. No journey-wide media preload was observed.

The fake clinic and its content are architecture fixtures, not medical copy or clinic assets. Performance observations describe the local production build only, not a deployment budget. Browser viewport emulation does not verify a physical notch, gesture area, dynamic browser chrome, or virtual keyboard; Design System `SAFE-01` remains `NOT_YET_TESTABLE`. Replication architecture is exercised through separable config/provider boundaries, but Clinic #2 is intentionally not built and the formal two-clinic Replication Gate remains open.

**Checkpoint:** technically ready for Owner visual review. Do not start Clinic #2 or production content expansion before that review.

## Owner visual gate history — recovery iteration 01

**Technical architecture:** accepted. **Visual / experience implementation:** rejected. The first slice reduced Dark Cinematic to a dark background with a gold accent and conventional website layouts. Specifically, the Hero read as a two-column page composition; media read as a rectangular content object; Discovery read as a normal section; the Hero-to-Discovery boundary reset the scene; the experience lost the spatial/editorial character evidenced by rendered ARGON; and Design System compliance was incorrectly treated as proof of art-direction compliance.

The recovery scope is limited to Home Hero, Treatment Discovery, and their continuity. Clinic, locale, content, capability, publication, route, metadata, server, consultation, and reduced-motion architecture remain the accepted foundation. ARGON is used only as rendered experience evidence; its implementation and assets remain non-production. The recovered implementation uses native document flow and data-derived editorial discovery, with an illustrated fixture field rather than clinical or clinic photography. Downstream Treatment Information, Doctor, Technology, and Consultation visuals remain pending by design.

The canonical review rule is recorded in `../design-system/EXPERIENCE-DIRECTION.md` §7: Design System compliance does not imply Art Direction compliance. This recovery is ready for Owner visual review only; no Owner visual acceptance is claimed.
