# Page Archetypes

**Class:** CANONICAL (archetype contracts); final visuals are prototyping-stage.
**Change process:** Rationale-documented edit; contract changes require ADR.

---

Each archetype defines: **user intent · primary content · primary CTA · supporting patterns · SEO role · likely variation opportunities.** Archetypes are contracts, not screens — sequences are content-responsibility orders, not mandatory visuals (`CONTROLLED-VARIATION.md` §5.5 governs composition variation).

## Home
- **Intent:** orient, evaluate credibility, find a pathway.
- **Primary content:** positioning statement; discovery (ConcernExplorer); featured services; trust evidence; doctors; Before/After; education. Full responsibility list: `INFORMATION-ARCHITECTURE.md` §3.
- **Primary CTA:** ConsultationSurface.
- **Supporting patterns:** ServicePresentation, DoctorPresentation, InstagramSurface, ArticlePreview.
- **SEO role:** clinic-level hub; localized metadata; internal-link hub.
- **Variation:** Hero family; section order/emphasis; theme expression.

## Services (index)
- **Intent:** browse the clinical taxonomy; land from service-category searches.
- **Primary content:** Service Categories → treatments, per-locale slugs.
- **Primary CTA:** consultation (secondary to browsing).
- **Supporting patterns:** ServicePresentation families; SectionHeader; Breadcrumb.
- **SEO role:** category hub pages; localized metadata.
- **Variation:** presentation family; featured-category emphasis.

## Treatment Detail
- **Intent:** evaluate a specific treatment honestly.
- **Primary content:** canonical section pool — Hero · TreatmentFacts · Overview · Concerns addressed · Treatment areas · How it works · Treatment Journey · Before/After · Doctor(s) · Risks/contraindications · Before-care · After-care · FAQ · Related Treatments · Consultation CTA — assembled per content, no mandatory identical sequence (`SIGNATURE-PATTERNS.md` §2–3).
- **Primary CTA:** consultation (calm, «درخواست مشاوره» register).
- **Supporting patterns:** TreatmentFacts, TreatmentJourney, BeforeAfterCompare, DoctorProfile.
- **SEO role:** highest-value landing surface; localized metadata; structured-data boundary (`SEO-FOUNDATION.md` §3).
- **Variation:** section selection/emphasis by content; emphasis parameters.

## Concerns (index)
- **Intent:** start from a body/goal concern without knowing treatment names.
- **Primary content:** ConcernExplorer categories (Skin/Face/Hair/Body) → concerns.
- **Primary CTA:** consultation (restrained).
- **Supporting patterns:** ConcernExplorer; ArticlePreview (education-first support).
- **SEO role:** patient-lingo query capture; localized metadata.
- **Variation:** category emphasis; explorer presentation within contract.

## Concern Detail *(justified where content exists)*
- **Intent:** understand a concern and its related options.
- **Primary content:** concern explanation; related treatments («گزینه‌های مرتبط» register — never "the right treatment for you"); related doctors/articles/evidence.
- **Primary CTA:** consultation.
- **Supporting patterns:** ConcernExplorer path; TreatmentFacts where appropriate.
- **SEO role:** long-tail patient-lingo landing.
- **Variation:** education- vs evidence-led emphasis.

## Doctors (index)
- **Intent:** evaluate the team; find a doctor.
- **Primary content:** doctor list (presentation family), specialties, treatment areas.
- **Primary CTA:** consultation path.
- **Supporting patterns:** DoctorPresentation families; SectionHeader.
- **SEO role:** doctor queries; honest credential presentation.
- **Variation:** presentation family (Portrait/Minimal/Profile).

## Doctor Detail
- **Intent:** evaluate one clinician's credibility and fit.
- **Primary content:** DoctorProfile pattern (§5 `SIGNATURE-PATTERNS.md`): identity, title, verifiable credentials, treatment areas, approach, related cases/articles.
- **Primary CTA:** consultation with this doctor (where clinically meaningful) or clinic consultation.
- **Supporting patterns:** BeforeAfterCompare (doctor-attributed cases); ArticlePreview (authored/reviewed).
- **SEO role:** name queries; credential honesty (`MEDICAL-TRUST-GOVERNANCE.md`).
- **Variation:** presentation family; evidence-forward emphasis.

## Before/After (index)
- **Intent:** evaluate real outcomes as evidence.
- **Primary content:** governed case gallery — treatment/doctor filters; metadata + disclaimer always (`PHOTOGRAPHY.md` §4).
- **Primary CTA:** consultation (evidence-adjacent, low-pressure).
- **Supporting patterns:** BeforeAfterCompare; treatment/doctor links.
- **SEO role:** treatment+results queries; must respect medical-claims rules (no guaranteed-result framing).
- **Variation:** filter emphasis; presentation density; clinic depth (index vs case pages).

## About
- **Intent:** assess the clinic's story, standards, environment.
- **Primary content:** story, values, team, facilities (Clinic photography).
- **Primary CTA:** consultation.
- **Supporting patterns:** DoctorPresentation; editorial imagery.
- **SEO role:** brand queries; E-E-A-T support.
- **Variation:** editorial emphasis; theme expression.

## Blog / Magazine (index)
- **Intent:** learn; enter the patient journey from education.
- **Primary content:** article listings by concern/treatment themes; editorial rhythm.
- **Primary CTA:** none forced (education-first; consultation links contextual).
- **Supporting patterns:** ArticlePreview; SectionHeader.
- **SEO role:** topical authority; localized metadata.
- **Variation:** editorial density; feature-story emphasis.

## Article
- **Intent:** read a specific educational piece.
- **Primary content:** ArticleBody pattern (`SIGNATURE-PATTERNS.md` §15): reading measure, headings, media, callouts, related treatment/concern links, doctor attribution where appropriate.
- **Primary CTA:** contextual consultation link — restrained (`SIGNATURE-PATTERNS.md` §15).
- **Supporting patterns:** ArticlePreview (related).
- **SEO role:** long-tail education queries; honest publication dates.
- **Variation:** media emphasis; article length/pacing.

## FAQ
- **Intent:** quick trustworthy answers.
- **Primary content:** clinic and treatment FAQs, grouped; disclosure pattern.
- **Primary CTA:** consultation for unanswered questions.
- **Supporting patterns:** FAQ accordion; SearchInput.
- **SEO role:** question queries; structured-data boundary.
- **Variation:** grouping by clinic area vs treatment.

## Contact
- **Intent:** reach the clinic; plan a visit.
- **Primary content:** locations/branches (address/hours/phone — locale-aware formatting), configured messaging channels, map (optional, graceful fallback).
- **Primary CTA:** consultation; phone/messaging pathways.
- **Supporting patterns:** form patterns (`SIGNATURE-PATTERNS.md` §8); InstagramSurface (optional).
- **SEO role:** local intent queries; branch data consistency.
- **Variation:** single vs multi-branch emphasis; map presence.

## Search
- **Intent:** find anything fast.
- **Primary content:** grouped results (Treatments/Concerns/Doctors/Articles/FAQ) within the active locale (`SIGNATURE-PATTERNS.md` §12).
- **Primary CTA:** none (utility); consultation only contextually.
- **Supporting patterns:** SearchInput, Empty/no-results (with ConcernExplorer rescue path).
- **SEO role:** internal utility — noindexed.
- **Variation:** minimal (utility archetype).
