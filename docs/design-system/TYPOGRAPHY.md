# Typography

**Class:** CANONICAL
**Change process:** Family selection for non-Persian scripts = decision D-1; role/scale changes = explicit rationale-documented edit.

---

## 1. Canonical Persian typeface

**Vazirmatn** is the canonical Persian typeface — fixed Foundation decision. It is the reference for all Persian type decisions and the anchor for hierarchy harmony across scripts.

## 2. Semantic roles

Ten semantic roles (Foundation's 9 + `Small`):

| Role | Use |
|---|---|
| Display | major editorial statements |
| H1 | page titles |
| H2 | section titles |
| H3 | sub-section titles |
| Title | card titles, list titles |
| Body Large | lede/intro paragraphs |
| Body | default reading text |
| Small | site chrome, metadata, secondary UI text |
| Caption | captions, legal/fine print |
| Label | form labels, buttons, chips, eyebrows |

Sizes/weights/line-heights: `DESIGN-TOKENS.md` §4. Headings use Vazirmatn's heavier weights for Persian; hierarchy must remain coherent **without forcing identical metrics across scripts** (`TYPOGRAPHY.md` §3).

### 2A. Cinematic roles — Hero and Scene Title (added DESIGN-SYSTEM-VNEXT-01)

The continuous journey (`EXPERIENCE-DIRECTION.md` §2) introduced two expressive needs the ten roles could only express ambiguously: the flagship hero statement (display-scale but *identity-bearing*, not any editorial statement) and the immersive scene identity inside staged stages. Both are admitted as **capped cinematic roles** — the role list stays closed unless a genuinely ambiguous need recurs:

| Role | Relationship to existing roles | Use |
|---|---|---|
| **Hero** | Display-scale expression reserved for the primary flagship/hero statement; Display remains the general major-editorial role | Hero composition primary statement (`COMPOSITION-CONTRACTS.md` §5.1) |
| **Scene Title** | H3–H2 optical scale, scene-identity treatment; document hierarchy remains H1/H2/H3 | immersive/cinematic scene identity (`COMPOSITION-CONTRACTS.md` §5.3; full-stage grammar `SIGNATURE-PATTERNS.md` §16) |

Distinction in one line: **Display** = major editorial statement · **Hero** = the flagship hero expression · **Scene Title** = cinematic scene identity · **H1/H2/H3** = document/information hierarchy. Role proliferation guard: cinematic roles may not be reused for generic section headers (that is H2/H3/Display's job), and one view carries at most one Hero and one Scene Title per scene.

Context behavior (bounded/fluid; no per-device pixel freezing):

| | DESKTOP_WEB | IPHONE_WEB / ANDROID_WEB |
|---|---|---|
| Hero | fluid display scale within measure bounds; wraps within Content Rail measure; tight Persian line-height verified against diacritic-free collision | fluid scale bounded by portrait width; wrapping expected and art-directed; never legibility-traded below AA |
| Scene Title | H3–H2 optical range; one line preferred, two allowed | wraps freely; subordinate to scene media |

Line-height, measure, and wrapping follow §4–5 (Persian metrics, balanced wrapping, no mid-word clamping). Persian behavior is the reference; other scripts harmonize optically. No Latin letter-spacing conventions leak into Persian — decorative tracking is a Latin-script device and is not applied to Persian text in any role.

## 3. Script-aware typography architecture

Typography is configured **per script** (`fa-IR`, `ar`, `en`, `ru` reference locales). Each script maps:

```text
script → { family, weight mapping, line-height adjustments, letter-spacing, size tuning }
```

- Semantic roles are shared; per-script metrics may differ where the script demands it.
- Do **not** copy Latin ratios onto Persian (§4) or Persian ratios onto Arabic/Cyrillic.
- Persian is the reference for hierarchy; other scripts harmonize toward it (matching optical scale and rhythm), not the reverse.

### Family selection criteria (for `en`, `ar`, `ru` — D-1, not decided here)

Candidates must satisfy **all** of:

1. **Quality** — professional, contemporary, credible; not decorative.
2. **Readability** — excellent at body sizes on mobile screens.
3. **Coverage** — full Arabic coverage (incl. Persian-distinct glyphs if a locale serves both) or full Cyrillic coverage where applicable.
4. **Weight availability** — at minimum regular/medium/semibold/bold; ideally enough for Display and Label roles.
5. **Web performance** — subsettable, reasonable size, variable-font preferred, no blocking chains (`PERFORMANCE-PRINCIPLES.md`).
6. **Hierarchy compatibility** — supports the ten semantic roles cleanly.
7. **Visual harmony across locale transitions** — switch `fa→en` on the same page must feel like the same brand, not a font swap. Harmony is judged at equal *optical* size, not equal nominal px.

Latin **not** auto-inherited from Vazirmatn: Vazirmatn's Latin may serve as a v0.1 convenience, but a dedicated Latin family is preferred where hierarchy demands it. **No final families are selected in this task** (D-1 remains open; strong justification could resolve it during visual prototyping).

## 4. Persian-first typographic behavior

- **Do not blindly copy Latin ratios.** Persian rendering of the same nominal px renders visually smaller than Latin (different x-height/em-box behavior); Persian body sizes need upward tuning and looser line-height (v0.1: ≈1.8 for Body roles, vs ≈1.6 typical Latin) to preserve the same *reading* size. Tune by visual comparison, not formula.
- Headings: Persian headings tolerate tighter line-heights than body; verify diacritic-free ascender/descender collisions at tight values.
- **Numerals:** numerals are a locale/formatting decision (`LOCALIZATION-FOUNDATION.md` §9), applied through central formatting — Persian digits for Persian contexts, Latin digits for Latin contexts — never hard-coded per string.
- **Proportional vs tabular figures** for treatment-facts data (e.g. "30 min") — chosen per context; tabular for aligned data columns.

## 5. Typographic measures

- **Heading line length** — bounded to reading comprehension: Display/H1 wrap within `container-text` (or narrower); a heading line far wider than the body measure is a defect.
- **Body line length** — 45–75 characters Latin-equivalent, enforced by `container-text` (~640–720) across all locales (`DESIGN-TOKENS.md` §9).
- **Paragraph rhythm** — paragraph spacing derived from the spacing scale (≈`space-300`–`400`); rhythm consistent within a locale, may differ between scripts.
- **Label hierarchy** — eyebrow (Small/Caption + accent, sparse) → Label role → value; eyebrow use is restrained (anti-aesthetic rule).
- **Metadata** — Small role, `text-muted`, never a primary content carrier.

## 6. Mixed-script content

`RF Microneedling`, `CO₂ Laser`, `PRP`, `HIFU`, `۳ جلسه`, `30 min` must coexist cleanly with localized text. Rules:

1. **Semantic isolation for mixed-direction fragments** — conceptually `bdi`/direction isolation wherever a Latin fragment sits in RTL text or vice versa (Foundation: `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §A.4).
2. **Directional embedding for full sentences/labels** — where an entire label's order must be controlled (e.g. mixed label in a button), directional isolation at the label boundary.
3. **Optical harmony** — Latin fragments inside Persian text get size/weight tuning toward optical parity (Latin renders visually larger at equal nominal size); tuned once at component level, not per string.
4. **Numbers in mixed strings** — follow the active locale's numeral convention via central formatting.
5. **Latin device/treatment names are content, not chrome** — they may keep Latin casing/branding (content's job), while typography keeps them optically integrated.
6. **Long localized strings** — no component may rely on Persian string lengths (`CONTROLLED-VARIATION` §4; `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §B.4): wrapping is always permitted, truncation is deliberate (max 1 line + title attribute / disclosure), never mid-word glyph clamping in RTL, and truncation never hides safety-relevant content (risks/consents are never truncated).
7. **Cyrillic** — same isolation/optical-harmony rules; Cyrillic case (upper/lower) affects optical size more than Persian, so harmonization is by visual comparison.

## 7. Subsetting & performance posture

Per-script subsetting expected at implementation; Vazirmatn subsets must include the Latin range used in Persian text (device names etc.). Variable fonts preferred where quality allows. Font loading must not block render or cause layout shift (`PERFORMANCE-PRINCIPLES.md`).
