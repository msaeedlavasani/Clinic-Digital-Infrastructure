# Localization Foundation

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Direction

CDI is a **multilingual, bidirectional** clinic digital platform designed to support both domestic and international clinic audiences.

- **Persian (`fa-IR`, RTL)** remains a first-class language and will commonly be the primary locale for Iranian clinics — an initial primary market.
- Multilingual capability is a **Foundation requirement**, not a later feature. The architecture must not require redesigning Core when additional languages are introduced.

### Reference locales

The initial architectural validation set — **reference locales, not a hard-coded closed list**:

| Locale | Language | Direction |
|---|---|---|
| `fa-IR` | Persian | RTL |
| `en` | English | LTR |
| `ar` | Arabic | RTL |
| `ru` | Russian | LTR |

Future locales must be addable **without** Core forks, schema redesign, locale-specific application forks, duplicated components, or expanding field sets (`titleDe`, `titleTr`, …). The reference set validates the architecture; it never bounds it (`PLATFORM-BOUNDARIES.md` §2).

## 2. Localization is architecture, not a translation feature

> **Localization is part of the content and experience architecture, not a translation utility added after implementation.**

Locale may affect: language, writing direction, typography, navigation, content, slugs, SEO metadata, imagery where appropriate, CTA wording, formatting, legal/privacy copy, contact expectations, and international-patient information. Do not assume every locale is a literal translation of Persian content; locales may carry genuinely different editorial content where appropriate.

## 3. Clinic locale configuration

Each clinic conceptually defines in its Clinic Configuration:

```text
defaultLocale
supportedLocales
localeConfiguration        # open-ended, deliberately under-modeled here
```

Example combinations the Core must support **without clinic-specific code**:

| Clinic | Locales |
|---|---|
| A | `fa-IR` |
| B | `fa-IR + en` |
| C | `fa-IR + en + ar` |
| D | `fa-IR + en + ru` |
| E | `fa-IR + en + ar + ru` |

Not every clinic is required to support every locale. Potential future locale configuration (typography, localized contact content, locale-specific CTA wording, locale-specific navigation, locale-specific SEO defaults) is acknowledged but deliberately **over-modeling is prohibited** now (`PLATFORM-BOUNDARIES.md` §1; `OPEN-DECISIONS.md` A-5).

## 4. Locale-independent entities + localized representations

**Canonical rule — never model translations as expanding field sets:**

```text
✗ titleFa / titleEn / titleAr / titleRu …
```

Instead:

```text
Locale-independent entity        Localized representation
Treatment                        TreatmentLocalization
  id                               locale
  structural/shared data           title · slug · summary · content
                                   seoTitle · seoDescription
```

- Exact persistence is undecided (`OPEN-DECISIONS.md` A-2/A-3); the *shape* is canonical.
- Entity identity never depends on a localized slug or localized title.
- Structural identifiers and genuinely shared data (e.g. a doctor's photo, a treatment's category assignment, scheduling of publication) may remain locale-independent.
- Not every field must be translated; but every public-facing text field that exists in a locale must come from the localized representation, never from another locale's text at render time.

### Entities requiring localization support

At minimum: Clinic public content · Location/Branch public content · Service Category · Treatment · Concern · Doctor public profile content · Before/After descriptive content · Article · FAQ · Testimonial · Navigation · CTA · Homepage/section content · SEO metadata · accessibility text where applicable.

## 5. Translation completeness

**Never assume that enabling a locale means every entity has content in it.** Each localized representation carries a conceptual translation state:

```text
NOT_STARTED → DRAFT → REVIEW_REQUIRED → READY → PUBLISHED
```

(State names may be improved; the *existence* of states is canonical.)

Rules:

- Only `PUBLISHED` localized representations are publicly exposed.
- Missing translations must be handled **deliberately** per the fallback policy (§6) — never by silently displaying arbitrary machine translation.
- Incomplete localized pages must not be exposed to search engines (`SEO-FOUNDATION.md` §5).

## 6. Fallback policy

Two regimes, deliberately different:

- **UI/system strings:** controlled fallback to a defined default (typically `defaultLocale`) is acceptable and normal.
- **Medical/editorial content:** silent cross-language fallback is misleading and **must not occur** by default. An English user must not unexpectedly land on Persian medical treatment copy inside an otherwise English page. Default behavior: a missing localized representation means the localized page/entry point does not exist for that locale (withheld from navigation, search, sitemap, hreflang). The final policy is an architecture decision recorded when first needed (`OPEN-DECISIONS.md` A-6).

## 7. Bidirectionality (summary)

Direction derives from the active locale; RTL and LTR are equal citizens of one design system with no component forks. Full rules live in `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`, which governs logical layout, directional semantics, and mixed-script handling.

## 8. Locale-aware routing and slugs

- Routing architecture must support locale-aware URLs (conceptually `/fa/…`, `/en/…`, `/ar/…`, `/ru/…`; e.g. `/fa/services/…`, `/en/services/…`). Exact locale identifiers and routing implementation remain architecture decisions (`OPEN-DECISIONS.md` A-5).
- **Slugs are per-locale.** One global slug is not assumed appropriate for every locale: a Persian treatment may use Persian terminology, English may use `/en/treatments/botox`, Russian and Arabic use appropriate localized slugs.
- Entity identity must **not** depend solely on the localized slug — stable entity identifiers underlie all localizations; slugs are per-locale presentation/routing data.

## 9. Formatting

Locale-aware handling of numbers, dates, times, phone presentation, decimals, percentages, and eventually currency must be available through **central formatting capability**, not scattered manual logic in UI code. Note: Persian digits (e.g. `۳`) vs Latin digits (`30 min`) is a locale/formatting decision, not a hard-coded one. No international treatment pricing is defined in V1 merely because locale support exists.

## 10. Locale-aware search (requirement only)

Future site search must operate over appropriate localized content (within a locale's corpus), not one global text corpus. No search engine is designed now; the architectural requirement is recorded.

## 11. Instagram / external content and locale

External/social content may not exist in every locale. Do not require automatic translation of Instagram content. The architecture permits: original external content as-is · curated localized context where appropriate · graceful absence per locale.

## 12. Analytics locale context

Analytics events conceptually include locale context where useful (e.g. `treatment_viewed { locale }`) to enable future understanding of international demand — without collecting unnecessary sensitive health information (`ANALYTICS-CONTRACT.md`).

## 13. Content governance for localization

> **A linguistically valid translation is not automatically a medically valid localized publication.**

Medical content localization requires linguistic review *and* medical/editorial review before publication. Conceptual future workflow:

```text
Translation → Linguistic Review → Medical/Editorial Review → Publish
```

No workflow tooling is implemented now; the governance requirement is documented (`MEDICAL-TRUST-GOVERNANCE.md` §7).

## 14. Machine translation

Uncontrolled machine translation is **not** the publication source of truth. AI/machine translation may later assist *drafting*, but public medical content requires review/approval before publication. No AI translation system is part of FOUNDATION-00 or V1 implementation scope.

## 15. Language stress and QA

Text expansion/contraction across scripts (Russian/English strings may occupy very different space than Persian/Arabic) is a Design System validation concern: components must not be designed around fixed text lengths. Requirements are codified in `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §5 and the Definition of Done (`ENGINEERING-GOVERNANCE.md` §3).

## 16. Accessibility across languages

Accessibility governance applies per-locale: correct document/page language, correct direction, localized accessible names, meaningful localized alt text, screen-reader-compatible language changes, mixed-language fragments, readable typography across scripts. See `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §4.

## 17. Future-awareness statement

International-patient capabilities are a recorded future opportunity (`PRODUCT-ROADMAP.md` §6) — including multilingual lead context (`LEAD-CONSULTATION-CONTRACT.md` §3) and configured communication channels. **Future-awareness must not cause speculative V1 complexity:** nothing in this section licenses building them now.
