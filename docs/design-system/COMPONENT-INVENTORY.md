# Component Inventory

**Class:** CANONICAL (inventory + classifications); component specs live in `SIGNATURE-PATTERNS.md` and future pattern docs.
**Change process:** Classification changes = rationale-documented edit; additions via variant admission (`CONTROLLED-VARIATION.md` §3).

---

## 1. Inventory

Legend: **V1 REQUIRED** (needed for V1 page types) · **V1 OPTIONAL** (config-dependent) · **FUTURE** (not V1; listed to show boundary).

### Foundation
| Component | Status | Notes |
|---|---|---|
| Typography (roles) | V1 REQUIRED | `TYPOGRAPHY.md` |
| Icon | V1 REQUIRED | `MOTION-ICONOGRAPHY.md` §5–7 |
| Image | V1 REQUIRED | responsive, localized alt, lazy policy `PHOTOGRAPHY.md`, `PERFORMANCE-PRINCIPLES.md` |

### Actions
| Component | Status | Notes |
|---|---|---|
| Button | V1 REQUIRED | 5 variants; `SIGNATURE-PATTERNS.md` §7 |
| IconButton | V1 REQUIRED | accessible name mandatory |
| Link | V1 REQUIRED | incl. in-text links; bidirectional semantics |

### Forms
| Component | Status | Notes |
|---|---|--- |
| Input | V1 REQUIRED | |
| Textarea | V1 REQUIRED | |
| Select | V1 REQUIRED | native-first approach |
| Radio / Checkbox | V1 REQUIRED | |
| Consent control | V1 REQUIRED | un-prechecked, links privacy note |
| PhoneInput | V1 REQUIRED | locale-aware presentation |

### Navigation
| Component | Status | Notes |
|---|---|---|
| Header | V1 REQUIRED | adaptive via config |
| MegaMenu | V1 OPTIONAL | larger catalogs only |
| MobileNavigation | V1 REQUIRED | drawer pattern |
| Breadcrumb | V1 REQUIRED | logical direction; localized slugs |
| Pagination | V1 REQUIRED | directional semantics |
| LocaleSwitcher | V1 OPTIONAL | multi-locale clinics only |

### Content
| Component | Status | Notes |
|---|---|--- |
| SectionHeader | V1 REQUIRED | |
| ServicePresentation (3 families) | V1 REQUIRED | `CONTROLLED-VARIATION.md` §5.2 |
| DoctorPresentation (3 families) | V1 REQUIRED | §5.3 |
| ArticlePreview | V1 REQUIRED | |
| FAQ (accordion) | V1 REQUIRED | disclosure semantics |
| Testimonial | V1 OPTIONAL | consent-gated; L-3 |
| InstagramSurface | V1 OPTIONAL | multi-locale clinics; `INTEGRATION-BOUNDARIES.md` |
| SearchInput + SearchResults | V1 REQUIRED | UX specified, implementation deferred (P-4) |
| ArticleBody | V1 REQUIRED | `SIGNATURE-PATTERNS.md` §15 |

### CDI Signature
| Component | Status | Notes |
|---|---|---|
| ConcernExplorer | V1 REQUIRED | signature discovery pattern |
| TreatmentFacts | V1 REQUIRED | signature data pattern |
| TreatmentJourney | V1 REQUIRED | educational narrative |
| BeforeAfterCompare | V1 REQUIRED | evidence-first |
| DoctorProfile | V1 REQUIRED | profile pattern |
| ConsultationSurface | V1 REQUIRED | signature conversion |
| MobileConversionSurface | V1 REQUIRED | restrained sticky actions |

### Feedback
| Component | Status | Notes |
|---|---|--- |
| Loading | V1 REQUIRED | incl. form submitting state |
| Empty | V1 REQUIRED | incl. search no-results |
| Error | V1 REQUIRED | human-readable, localized |
| Success | V1 REQUIRED | consultation success state |
| SkipLink | V1 REQUIRED | always first focusable |

## 2. Deliberately excluded / future

| Component | Status | Reason |
|---|---|---|
| VideoPlayer | FUTURE | Immersive hero video is later; image-led V1 |
| MapEmbed | V1 OPTIONAL | maps boundary, graceful textual fallback (`INTEGRATION-BOUNDARIES.md` §5) |
| Chat widget | FUTURE | messaging boundary later |
| Booking/Calendar | FUTURE | Phase-2 (`PRODUCT-ROADMAP.md` §2) |
| CRM/lead-status UI | FUTURE | Phase-3 |
| AI features | FUTURE | prohibited in V1 |
| Carousel (generic) | V1 OPTIONAL | only where content-equal, evidence carousels never auto-advance (`MOTION-ICONOGRAPHY.md` §3) |

## 3. Component state contract

For relevant interactive components (buttons, inputs, selects, disclosure/accordion, drawer, locale switcher, search input, consultation form, compare interaction):

```text
default · hover · focus · active · disabled · loading · error · selected
```

- Not every state applies to every component — e.g. Link: default/hover/focus/active; accordion: default/expanded/selected; form controls: all except selected.
- **focus** always visible (`focus-ring` token, `DESIGN-TOKENS.md` §11) — never suppressed.
- **loading** suppresses re-submission (forms/buttons).
- **error** state pairs with human-readable localized copy (`SIGNATURE-PATTERNS.md` §8); error association is programmatic.
- **selected** for choice controls and compare-slider position announcements.
- Touch target floor (≥44×44) applies wherever interaction exists.

## 3A. Form-field affordance contract (added DESIGN-SYSTEM-VNEXT-01)

Minimalism must never make an interactive field indistinguishable from static text. A field must be discoverable as interactive **before** focus. The affordance states below map onto the §3 generic state contract and apply to all form controls (Input, Textarea, Select, Radio/Checkbox, Consent, PhoneInput, SearchInput):

| Affordance state | §3 contract state | Requirement |
|---|---|---|
| rest | default | visibly interactive before focus: label present (Label role) and at least one boundary/surface/placeholder affordance distinguishes the interactive region from surrounding static content in every Visual World (`VISUAL-WORLDS.md`) |
| hover | hover | pointer affordance where pointer input exists |
| focus | focus | visible focus ring (`focus-ring` token, `DESIGN-TOKENS.md` §11) — never suppressed |
| filled | (value present) | value + label relationship persists — no disappearing-label ambiguity; filled state remains distinguishable from rest |
| invalid | error | error identified in localized text, not color alone (`SIGNATURE-PATTERNS.md` §8); association programmatic |
| disabled | disabled | unambiguous non-interactivity |

`loading` and `success` continue per §3/§8. Minimalist Visual Worlds may not trade away rest-state affordance: quiet styling changes the treatment, never removes the affordance.

**Touch interaction envelope (added DESIGN-SYSTEM-VNEXT-01):** for touch presentation contexts (`PRESENTATION-CONTEXTS.md` §2), the preferred usable interaction envelope is **48 × 48 CSS px**; the accessibility floor (≥44×44) remains the minimum. The envelope may be provided by the hit area rather than enlarging the visible control — do not mechanically enlarge every visible control to 48×48.

**No device forks:** affordance states are presentation-context-invariant; context-specific behavior exists only where the environment materially changes composition (e.g. virtual-keyboard relationships, `PRESENTATION-CONTEXTS.md` §4). QA: `DESIGN-QA.md` FORM-01.
