# CDI Experience Runtime Contract

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.
**Scope:** Technology-neutral presentation/runtime architecture for cinematic Scenes and their handoff to Editorial Information Mode. It does not select an animation library, rendering technology, scene API, or URL policy.

## 1. Purpose and governing model

This contract prevents CDI's cinematic journey from being implemented as conventional vertically stacked page sections. It complements `RUNTIME-ARCHITECTURE.md`: that document resolves clinic, locale, capability, entity, publication, content, and presentation context; this document defines how a resolved experience is presented over time.

```text
EXPERIENCE = WORLD × SCENE × SIGNATURE × TRANSITION

WORLD
  contains a persistent EXPERIENCE STAGE
    presents a sequence of SCENES
      may be influenced by a TREATMENT SIGNATURE
      and connected through a TRANSITION
```

The initial cinematic journey is:

```text
ENTRY / HOME → DISCOVERY → TREATMENT ENTRANCE → TREATMENT SIGNATURE
                                                     ↓
                                           STAGE RELEASE / HANDOFF
                                                     ↓
EDITORIAL INFORMATION → EVIDENCE → DOCTOR → CONSULTATION
```

**Scene progression is the primitive. Scroll is one possible input.** The cinematic sequence is not defined by document section position, a stack of full-viewport sections, or scroll position. Semantic document structure and the visual Stage are separate concerns: semantic/accessibility requirements do not compel the cinematic Scenes to be visually stacked in document flow.

## 2. Two compatible presentation modes

### 2.1 Cinematic Experience Mode

Cinematic Mode is a bounded, persistent Experience Stage that transforms between Scenes while maintaining one Clinic World. A Scene change may alter composition, media, focal subject, typography, depth, light, material, atmosphere, navigation, and action zones. The Stage owns continuity; scenes are distinct states inside it, not independent page sections.

The Stage exists only for the cinematic portion of the journey. It is not a fixed application-wide shell and does not own clinic or medical truth. It has a defined entry, progression, and release boundary.

### 2.2 Editorial Information Mode

At the appropriate information boundary, the Stage releases into a semantic editorial document. Treatment information, risks, contraindications, evidence, doctors, technology, Before/After, FAQ, and consultation prioritize comprehension, medical trust, accessibility, semantic structure, SEO, and conversion. Native document scrolling is expected in this mode.

Editorial Mode retains the resolved Clinic World, locale, route/entity, and treatment context, together with its approved visual-world, typography, material, contrast, and navigation language. Lower runtime intensity does not mean a different visual product or generic SaaS template.

> Experience attracts. Information convinces. Evidence builds trust. Consultation converts.

## 3. Persistent Clinic World and Stage responsibilities

The Stage is a presentation/runtime boundary over context already resolved by the CDI runtime. It may coordinate:

- current, previous, and next Scene where meaningful;
- scene-transition lifecycle and bounded progression inputs;
- persistent media/material environment and scene composition;
- focus movement, accessibility announcements, and visible navigation;
- reduced-motion and enhancement-failure behavior;
- navigation intent and limited scene history where route semantics require it;
- responsive recomposition and the Editorial Mode handoff.

The Stage MUST NOT own or redefine:

- clinic business/configuration data or tenant resolution;
- Master Service Catalog, treatment identity, or medical truth;
- capability, publication, visibility, or locale policies;
- CMS content ownership, SEO entity identity, or consultation services.

Those are resolved and enforced by the canonical CDI runtime and trusted service boundaries. The Stage consumes their result. Clinic, locale, treatment, and Visual World differences do not create Stage or application forks.

## 4. Reusable Scene contract

A Scene is a presentation/runtime state with a semantic purpose. Its identity is independent from route identity and content-entity identity. A Scene definition must be able to express, without requiring every field to vary in every Scene:

| Concern | Scene declaration |
|---|---|
| Identity and intent | Stable scene identity and semantic purpose in the journey. |
| Content | Resolved content payload/reference and its semantic representation; never a new domain entity merely because presentation changes. |
| Composition | Composition intent, focal subject/field, spatial/depth state, and responsive recomposition. |
| Media and material | Media state (present, absent, or failed), media composition intent, and light/material state. |
| Typography and action | Typography state/role and primary/secondary action state and destination. |
| Navigation | Available progression, exit, and route actions; visible accessible alternatives. |
| Treatment influence | Optional Treatment Signature influence derived from the resolved treatment semantics and clinic expression. |
| Lifecycle | Entry and exit transitions, transition interruption/skip behavior, and reduced-motion equivalent. |
| Accessibility | Language/direction, landmark/heading semantics, reading order, focus destination/retention, and announcement need. |
| Direct entry | Whether the Scene can initialize from a route/entity context without replaying earlier Scenes. |

This is an architectural contract, not a framework component API, content schema, or animation-engine specification.

## 5. Scene progression and input

The conceptual flow is:

```text
user input / navigation intent
  → validate against resolved route, capability, and Scene availability
  → resolve next presentation Scene or route/entity destination
  → transform the persistent Stage
  → update focus/announcement only when appropriate
```

For CDI's primary Cinematic Experience journey, wheel, trackpad, and vertical touch progression gestures are first-class, primary natural inputs: a visitor who scrolls within the active Stage should progress through its Scenes without needing to discover a Next control. Keyboard, explicit controls, and assistive-technology-compatible navigation remain available alternative inputs; they do not redefine the intended primary interaction as a presentation deck. A gesture expresses progression intent and is resolved against explicit Scene state. **Scroll position is never Scene authority.** Implementations must normalize input so one gesture advances at most one Scene, serialize transitions, and avoid momentum skips or rapid oscillation. The Stage captures progression gestures only within its bounded active region; at the forward boundary it releases the gesture to native Editorial document scrolling, and at the reverse boundary it must not oscillate between Stage entry and document position. Ordinary document access remains available outside the Stage.

Possible additional inputs include treatment selection, direct route/state entry, and accessible controls. Scroll/touch progression is not the only usable path: keyboard and semantic alternatives remain available, and no input is intercepted outside the bounded Stage or used to prevent ordinary document access.

Progression is not a forced film: users can choose available links/actions, leave or bypass a transition, enter a route directly, use keyboard and assistive technology, and reach Editorial Mode. No transition must finish before another meaningful action is available.

## 6. Scene, route, entity, and document distinctions

These concepts have separate identities and responsibilities:

| Concept | Meaning | Example |
|---|---|---|
| **Route** | Addressable request meaning under the still-applicable URL policy. | Clinic home, Laser treatment, Consultation. |
| **Entity** | Stable domain identity resolved by clinic, capability, locale, and publication. | One Laser Treatment entity. |
| **Scene** | A presentation/runtime state that expresses a purpose within the journey. | Discovery, Treatment Entrance, Treatment Signature. |
| **Document anchor/state** | A semantic document location or task state, especially in Editorial Mode. | Treatment risks heading, consultation form. |
| **Route transition** | Navigation between addressable routes/entities and their response/history behavior. | Home to Treatment route. |
| **Scene transition** | A presentational transformation within the persistent Stage. | Discovery to Treatment Entrance. |
| **Entity transition** | A change in selected/resolved domain entity, subject to capability/publication. | Selecting Laser from available treatments. |

A stable Laser entity may appear in Discovery, Treatment Entrance, Treatment Signature, and Editorial Information without becoming four entities. Direct entry to a treatment initializes the Stage at an appropriate treatment context; it does not require replay of Home/Discovery. URL policy remains governed by `OPEN-DECISIONS.md`. Browser history tracks meaningful route/entity navigation according to route semantics, not every animation frame or purely presentational Scene change.

## 7. Treatment Signature

Treatment Signature influences the shared Stage; it does not replace the Stage. Treatment semantics define sensory behavior and Clinic World configuration defines its expression:

```text
Treatment semantics → Signature identity/behavior → Clinic expression in the persistent Stage
```

For Laser, light, focus, precision, and controlled energy may subtly alter light, focus, texture, atmosphere, or movement. A signature is not a separate microsite, bespoke engine, procedure depiction, targeting UI, or medical outcome simulation. It must not imply efficacy or fabricate evidence. Every treatment may have a sensory identity without requiring a bespoke experience engine.

## 8. Cinematic-to-Editorial handoff

The handoff is a bounded Stage release, not another cinematic Scene that traps information inside the Stage. It transfers the resolved Clinic World, locale/direction, route/entity and treatment context, and relevant navigation context into the semantic Editorial Document. It reduces motion/runtime intensity while keeping visual-world tokens, typography hierarchy, material/contrast language, and clinic identity coherent.

Editorial information remains directly addressable and server-rendered/indexable according to `RUNTIME-ARCHITECTURE.md` and ADR-0001. It does not depend on having completed or replayed the cinematic sequence. Evidence, doctor context, and consultation remain available as ordinary semantic destinations/actions.

## 9. Boundedness and prohibited mechanics

Persistent Stage does not authorize full-page scrolljacking. Implementations MUST NOT:

- hijack all document scrolling or trap users in the Stage;
- require wheel-only, touch-only, or forced animation-completion progression;
- make a fixed cinematic shell span the entire application or Editorial Document;
- turn information-dense medical, evidence, doctor, or consultation content into cinematic scenes;
- make a visual transition load-bearing for route/content access or browser history;
- replace normal keyboard, assistive-technology, link, and form semantics with scene gestures.

Scene progression uses wheel/trackpad/touch as the primary natural inputs only while the bounded Stage is active; normal document behavior remains available outside the Stage and throughout Editorial Mode. At the final cinematic Scene, the next forward progression gesture releases the Stage and continues into native document scrolling. A Stage implementation that is inaccessible or cannot be exited fails this contract.

## 10. Progressive enhancement and failure behavior

The semantic experience and enhancement layer are separate:

| Runtime condition | Required behavior |
|---|---|
| Full enhancement | Persistent Stage, intentional Scene transformations, optional Treatment Signature, and transitions; semantic routes and content remain authoritative. |
| Reduced motion | Same Scene model, journey, content, controls, hierarchy, and destinations; transitions are simplified, shortened, cross-faded, or immediate as appropriate. Reduced motion is not a different product. |
| Cinematic enhancement unavailable | Coherent semantic access remains to Home intent, discovery, treatment, primary actions, and Editorial Information, using links/routes or another accessible non-cinematic progression. No user-facing asset/error diagnostic is required as content. |
| Scene/transition/media/signature failure | `ENHANCEMENT_ONLY` when semantic content remains; preserve navigation and continue or bypass the transition safely. |
| Domain/content/capability/publication failure | Follow the existing runtime's clinic, route-local, content-local, and publication failure contracts; cinematic presentation cannot expose otherwise unavailable content. |

Enhancement availability never changes content truth, publication status, capability, or SEO identity. Editorial content and primary actions cannot disappear with the Stage, animation, canvas, media, or client execution.

## 11. Accessibility and language

The Stage and its Scenes must preserve:

- semantic landmarks/headings and a logical reading order for the active Scene;
- keyboard-operable progression and exit paths, visible focus, and no focus trap;
- accessible names and destinations for actions; touch alternatives where a gesture exists;
- scene-change announcements only when they materially orient the user, without repetitive or unsolicited announcements;
- deliberate focus movement on explicitly requested Scene navigation; retain focus for passive input where moving it would disrupt interaction;
- `lang`, `dir`, mixed-script handling, and direction-aware composition from resolved locale metadata;
- reduced motion, zoom/reflow, and accessible access to semantic content independent of visual media/canvas.

Inactive visual Scenes must not create confusing duplicate reading order or inaccessible focus targets. A visual Stage is never the only carrier of medical meaning, navigation, or primary action. Editorial content remains semantically available without completing cinematic progression.

## 12. Routing, direct entry, and SEO

Route policy remains open where recorded. Regardless of final URL syntax, the runtime must support meaningful direct entry to clinic home, a treatment entity, treatment information, and consultation. A direct treatment request resolves clinic, locale, entity identity, capability, publication, and localized representation first, then initializes an appropriate Stage/Editorial context without replaying earlier scenes.

Route transitions, Scene transitions, entity changes, and document anchors retain their distinct semantics (see §6). Browser history records meaningful navigational state, not animation frames. A meaningful explicit navigation action may create route/history state under existing routing policy; purely presentational progression need not create a new URL.

SEO remains derived from clinic + locale + entity + publication + capability, never from current visual Scene or animation state. Search/indexing does not need to execute or replay the cinematic journey to discover published treatment information. Canonical, alternate-language, robots, sitemap, and structured-data behavior remains defined by the resolved runtime context.

## 13. Responsive and bidirectional contract

Desktop, iPhone Web, and Android Web use the same Scene identities and journey semantics. Responsive behavior is recomposition: a Scene may substantially change focal placement, media role, type relationship, action placement, density, and progression affordance by context. It must not be a shrunken desktop Stage followed by a vertical stack of the same Scenes. FA/AR RTL and EN/RU LTR affect composition and reading order; direction does not fork the Stage or Scene model.

## 14. Technology neutrality and client boundary

This contract does not select CSS, DOM, Canvas, WebGL/WebGPU, an animation library, or a state-management library. Later implementation decisions must justify technology against actual Scene requirements, performance tiers, accessibility, and reversal cost. A full-screen Stage or GPU renderer is not presumed.

Server/semantic rendering remains the default under ADR-0001. Client execution is scoped to behavior that needs browser state or cinematic enhancement. Editorial information, route semantics, metadata, forms, and public content must not inherit a heavy client runtime solely because the Stage supports richer Scenes.

## 15. ARGON and prior experimental work

ARGON is experimental/non-canonical. It demonstrated a persistent experience state, Scene transformation, treatment-specific sensory moments, and journey continuity. It did not canonicalize its fixed shell, implementation, CSS, assets, navigation mechanics, or prototype state model. **Preserve the experience principle; replace the prototype implementation.**

ARGON Design System Audit, Production Visual Recovery, Golden Experience Path, Visual Composition Spike, Experience Grammar Study, and Art Direction Reset are historical audit/implementation/research records, not competing runtime authorities. Some records describe an earlier scroll-region or normal-document-flow interpretation based on superseded wording; those descriptions are non-canonical. Their recurring implementation failure was representing cinematic Experience Scenes as vertically stacked document sections and treating improved media/composition as sufficient to repair that architecture. A rejected or frozen record remains evidence; future implementation follows this contract. The next Art Direction or Golden Path work must mount visual expression on this runtime model, not use styling changes to compensate for a stacked-scene architecture.

## 16. Architectural walkthroughs

These walkthroughs validate the contract without selecting URL syntax or implementation technology. All retain runtime-resolved clinic, locale, capability, publication, and entity truth.

| # | Scenario / resolved context | Scene and Stage behavior | Route implication | Accessibility and failure behavior | Editorial handoff |
|---|---|---|---|---|---|
| 1 | FA RTL desktop; clinic home with Laser available and published. | Initialize Entry/Home; Discovery and Laser scenes transform within the same Stage, with RTL composition. | Home route remains semantic; treatment selection is meaningful navigation. | `lang`/`dir` resolve from FA; keyboard/actions navigate; failed enhancement leaves routes/content available. | Laser information is a direct semantic destination with the same clinic/treatment context. |
| 2 | EN LTR desktop; direct request for the stable Laser entity. | Initialize at Treatment Entrance/Signature; do not replay Home or Discovery. | Use the valid localized route under provisional/final URL policy; entity identity remains stable. | LTR reading/focus order; unavailable entity becomes route-local unavailable/not-found per runtime. | Treatment Information is directly addressable and indexable. |
| 3 | Mobile; same clinic progresses Home → Discovery → Treatment. | Same Scene identities; independently recompose focal field, media, actions, and navigation. | Links/routes remain real; no separate mobile route semantics. | Vertical touch progression is a first-class natural input within the bounded Stage; semantic controls and keyboard/assistive alternatives remain, and reduced motion preserves the same model. | Stage releases at its boundary; editorial document scrolls normally. |
| 4 | Reduced-motion preference; any supported clinic/locale/treatment. | Same Scenes and hierarchy; transitions become simplified or immediate. | Route/entity destinations unchanged; history not tied to animation. | Focus and announcements follow explicit action only; no meaning/action depends on motion. | Same information and evidence links remain available. |
| 5 | Cinematic enhancement unavailable (no JS/runtime failure). | No persistent animated Stage required; expose a coherent semantic journey/navigation fallback. | Home, discovery, treatment, and consultation destinations remain navigable. | No inaccessible visual-only content; enhancement failure is enhancement-only. | Editorial routes/content render independently. |
| 6 | Direct deep link to Treatment Information for a published entity. | Stage may be skipped or initialized contextually; signature is not required. | Direct route resolves entity and localized representation. | Heading/landmarks begin at the requested content; no forced replay or hidden prerequisite. | Already in Editorial Mode; normal document behavior. |
| 7 | User presses Back from a Treatment context. | If a meaningful route/entity navigation occurred, return according to browser history; visual-only Scene frames do not create history entries. | Preserve ordinary history semantics, not animation-frame history. | Focus/scroll restoration follows route behavior; transition may be bypassed. | Return to the prior route/context; no accidental loss of direct information access. |
| 8 | Unknown or capability-unavailable treatment request. | Do not initialize a treatment Scene from an invalid entity; no stale previous Stage content. | Unknown entity/slug or unavailable capability follows runtime route/capability failure behavior. | Clear not-found/unavailable response; no discovery action suggests it is available. | No unpublished/unavailable medical content is handed off or indexed. |
| 9 | Locale switch while the Laser entity is active; alternate may or may not be published. | Preserve semantic entity and initialize corresponding Scene only if localized representation is valid. | Locale switch resolves the localized route/slug; if unavailable, follow current locale/publication policy without inventing fallback. | New `lang`/`dir` updates; focus context is preserved or moved to a clear status. | Published alternate information remains direct; unavailable locale is not fabricated. |
| 10 | Treatment Signature enhancement fails after valid Laser resolution. | Keep current scene identity/content; bypass failed sensory effect/transition and continue. | Route/entity unchanged unless user navigates. | Failure remains enhancement-only; title, actions, and route links stay usable. | Treatment facts and risks remain normal semantic content. |
| 11 | Stage media is missing or fails. | Render deliberate media-absent Scene composition without stale/cross-clinic media or broken-state decoration. | No URL/entity change. | Decorative media failure is not announced as content; meaningful image alternatives remain semantic. | Information and evidence eligibility follow content/media publication rules independently. |
| 12 | User enters Consultation from treatment context. | Exit/release Stage before or during semantic route navigation; do not place form inside a cinematic trap. | Consultation is a meaningful route/action with treatment context only when allowed by the lead contract. | Form labels, errors, focus, keyboard, and reduced-motion behavior remain standard. | Consultation is Editorial/Conversion Mode within the same Clinic World. |
| 13 | Future clinic with multiple available treatments. | Discovery resolves available entries from capability/content; each selection may enter its supported Scene/signature behavior within shared Stage. | Each entity retains stable identity and valid localized route. | Unavailable/unpublished items never appear as available controls; no scene-engine fork per treatment. | Each treatment's information independently follows publication/SEO. |
| 14 | Future approved additional Visual World. | Same Stage/Scene contract consumes registry-driven expression; only approved world data/variation changes. | Routes and entity resolution unchanged. | Shared controls, direction, focus, and fallback behavior remain invariant. | Editorial continuity uses the same selected world with lower intensity. |
| 15 | Clinic #2 with different branding and capability manifest. | Resolve clinic context first; Stage uses its configured world and only valid Scenes, without Clinic #1 assumptions. | Domain/config mapping selects clinic; no per-clinic route tree or build required. | Clinic boundary propagates to assets/content/cache; unknown/disabled clinics fail closed. | Same Editorial handoff contract, clinic-specific published content only. |

## 17. Authority and implementation gate

This contract refines the presentation responsibilities in `RUNTIME-ARCHITECTURE.md` and the full-stage visual composition grammar in `docs/design-system/SIGNATURE-PATTERNS.md` §16. Design System composition contracts remain visual/compositional authorities; they do not turn a Scene into a document section. ADR-0001 continues to govern framework and rendering model. Product Constitution, scope, medical publication, capability, localization, accessibility, SEO, and open decisions remain in force.

Before any cinematic implementation proceeds, its architecture/design review must explicitly identify the persistent Stage boundary, Scene progression model, direct-entry and semantic fallback, input alternatives, Editorial handoff, reduced-motion behavior, and failure path. A primary cinematic journey implemented as `Hero → document scroll → Discovery → document scroll → Treatment` is an `EXPERIENCE_ARCHITECTURE_VIOLATION`; do not refine its styling. Stop and correct the runtime/presentation model unless a later canonical decision explicitly changes this contract.
