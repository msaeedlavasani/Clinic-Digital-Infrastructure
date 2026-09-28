import type { CSSProperties } from "react";
import { ValidationControls } from "./validation-controls";
import { Button, IconButton } from "@/design-system/components/actions";
import { CheckField, SelectField, TextAreaField, TextField } from "@/design-system/components/forms";
import { MediaComposition } from "@/design-system/components/media";
import { Breadcrumbs, Pagination, SiteHeader } from "@/design-system/components/navigation";
import { SectionHeading } from "@/design-system/components/section-heading";
import { COMPOSITION_FIXTURES, LOCALES, STRESS_FIXTURES, TEXT_ROLES } from "@/design-system/fixtures";
import {
  ActionZone,
  ContentRail,
  ContentSection,
  GlobalRail,
  MediaRail,
  NavigationZone,
  SafeArea,
  Stage,
  Viewport,
} from "@/design-system/primitives/layout";
import { INITIAL_WORLD_ID, VISUAL_WORLDS, worldStyleVariables } from "@/design-system/tokens/visual-worlds";

const initialWorld = VISUAL_WORLDS[INITIAL_WORLD_ID];
const initialThemeStyle = worldStyleVariables(initialWorld) as CSSProperties;

const colorSpecimens = [
  { role: "canvas", pairing: "Page background", sample: "Background" },
  { role: "surface", pairing: "Resting content", sample: "Surface" },
  { role: "surfaceElevated", pairing: "Floating / raised", sample: "Elevated" },
  { role: "textPrimary", pairing: "Primary reading", sample: "Primary text" },
  { role: "textSecondary", pairing: "Supporting reading", sample: "Secondary text" },
  { role: "textMuted", pairing: "Metadata / quiet support", sample: "Muted text" },
  { role: "borderDefault", pairing: "Control boundary", sample: "Boundary" },
  { role: "actionPrimary", pairing: "Primary action fill", sample: "Primary action" },
  { role: "actionSecondary", pairing: "Secondary action fill", sample: "Secondary action" },
  { role: "successSurface", pairing: "Success background", sample: "Success surface" },
  { role: "warningSurface", pairing: "Warning background", sample: "Warning surface" },
  { role: "dangerSurface", pairing: "Error background", sample: "Error surface" },
] as const;

const navigationItems = [
  ["foundations", "Foundations"],
  ["typography", "Typography"],
  ["controls", "Controls"],
  ["forms", "Forms"],
  ["navigation", "Navigation"],
  ["layout", "Layout & actions"],
  ["compositions", "Compositions"],
  ["media", "Media"],
  ["patterns", "Signatures"],
  ["motion", "Motion & access"],
  ["stress", "Stress fixtures"],
] as const;

export default function DesignSystemPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">پرش به محتوای اصلی / Skip to main content</a>
      <div className="harness-shell">
        <header className="tool-header">
          <a className="tool-mark" href="#top" aria-label="CDI Design System Validation Harness home">
            <span className="tool-mark__glyph" aria-hidden="true">C</span>
            <span><strong>CDI</strong><small>DESIGN SYSTEM / VALIDATION</small></span>
          </a>
          <p className="tool-header__status"><span className="status-dot" /> Shared system · rendered evidence surface</p>
          <span className="tool-header__version">FOUNDATION 01</span>
        </header>

        <ValidationControls />

        <nav className="tool-navigation" aria-label="Validation sections">
          {navigationItems.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <div
          className="design-system-root"
          data-design-system-root
          data-world={INITIAL_WORLD_ID}
          data-media-map="visible"
          style={initialThemeStyle}
        >
          <main id="main-content">
            <section className="hero-fixture" id="top" aria-labelledby="harness-title" data-composition="hero" data-geometry-sample>
              <Viewport>
                <SafeArea>
                  <GlobalRail>
                    <div className="hero-fixture__copy">
                      <p className="type-label eyebrow">CDI · SYSTEM VALIDATION / 01</p>
                      <h1 id="harness-title" className="type-hero"><bdi lang="en" dir="ltr">A shared system,</bdi><br /><span lang="en" dir="ltr">expressed with intent.</span></h1>
                      <p lang="en" dir="ltr" className="type-body-large hero-fixture__lede">A rendered workspace for testing how one production Design System holds its shape across language, context, composition and Visual World.</p>
                      <ActionZone>
                        <Button variant="primary" type="button"><span lang="en" dir="ltr">Explore the validation system</span><span aria-hidden="true" className="directional-mark">↗</span></Button>
                        <Button variant="text" type="button"><span lang="en" dir="ltr">Read the system contract</span></Button>
                      </ActionZone>
                      <p lang="en" dir="ltr" className="hero-fixture__note">Fixture content only · no clinic, treatment claim, or consultation flow</p>
                    </div>
                    <MediaRail>
                      <MediaComposition kind="landscape" title="Hero · subject and text-safe relationship" priority />
                    </MediaRail>
                  </GlobalRail>
                </SafeArea>
              </Viewport>
              <NavigationZone aria-label="Hero composition note">
                <span>COMPOSITION AUTHORITY · CONTENT RAIL + MEDIA RAIL + ACTION ZONE</span>
                <span>ONE PRIMARY ACTION</span>
              </NavigationZone>
            </section>

            <ContentSection id="foundations" className="system-section">
              <SectionHeading index="01" eyebrow="FOUNDATIONS" title="Roles first. Expression follows." description="Semantic roles connect shared components to an extensible Visual World registry. The surface below changes through token mappings while the component geometry stays shared." />
              <div className="foundation-layout">
                <div className="swatch-grid" aria-label="Semantic color role specimens">
                  {colorSpecimens.map((specimen) => (
                    <article className="swatch-specimen" key={specimen.role}>
                      <span className={`swatch-specimen__color swatch--${specimen.role}`} aria-hidden="true" />
                      <div><strong>{specimen.sample}</strong><small>{specimen.role} · {specimen.pairing}</small></div>
                    </article>
                  ))}
                </div>
                <aside className="token-aside">
                  <p className="type-label">TOKEN RELATIONSHIP</p>
                  <h3 className="type-h3">Meaning is stable.<br />Material can vary.</h3>
                  <p className="type-body">A button consumes action roles. A page consumes canvas and surface roles. Neither component knows a world name or a raw color value.</p>
                  <div className="token-aside__sample"><span className="type-label">ACTION PRIMARY</span><Button variant="primary" type="button">One clear action</Button></div>
                  <p className="type-caption">Feedback, borders, focus and all component states use the complete role map documented in the registry.</p>
                </aside>
              </div>
              <div className="relationship-board">
                <div className="relationship-board__heading"><p className="type-label">SPACING RELATIONSHIPS</p><p className="type-small">The gap names a relationship; responsive context selects its primitive.</p></div>
                <div className="relationship-lines">
                  <RelationshipExample name="space-content-group" gap="var(--cdi-space-content-group)" label="Heading to group" />
                  <RelationshipExample name="space-media-copy" gap="var(--cdi-space-media-copy)" label="Media to copy" />
                  <RelationshipExample name="space-action" gap="var(--cdi-space-action)" label="Decision to action" />
                  <RelationshipExample name="space-control" gap="var(--cdi-space-control)" label="Label to control" />
                </div>
                <div className="primitive-ruler" aria-label="Spacing primitives from 4 to 160 pixels">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((step) => (
                    <span key={step}><i style={{ width: `var(--cdi-space-${step})` }} /><small>{step}</small></span>
                  ))}
                </div>
              </div>
            </ContentSection>

            <ContentSection id="typography" className="system-section system-section--soft">
              <SectionHeading index="02" eyebrow="TYPOGRAPHY" title="One hierarchy. Four writing systems." description="Vazirmatn is used for Persian. Other scripts use the system fallback stack until D-1 selects dedicated families. Each specimen retains its own lang and dir." />
              <div className="locale-sample-grid">
                {Object.entries(LOCALES).map(([locale, fixture]) => (
                  <article className="locale-sample" key={locale} lang={locale} dir={fixture.dir}>
                    <header><span className="type-label">{locale}</span><span className="locale-sample__direction">{fixture.dir.toUpperCase()}</span></header>
                    <p className="type-h3">{fixture.name} · ۱۲۳ / 123</p>
                    <p className="type-body">{fixture.short}</p>
                    <p className="type-small">{fixture.long}</p>
                    <p className="type-small">Mixed script: <bdi>RF Microneedling</bdi> · <bdi>CO₂ Laser</bdi> · <bdi>30 min</bdi></p>
                  </article>
                ))}
              </div>
              <div className="type-role-list">
                {TEXT_ROLES.map(({ role, className }, index) => {
                  const sample = LOCALES["fa-IR"].short;
                  return <div className="type-role-row" key={role} lang="fa-IR" dir="rtl"><span>{String(index + 1).padStart(2, "0")} / {role}</span><p className={className}>{sample}</p></div>;
                })}
              </div>
              <p className="system-note">Persian uses local Vazirmatn variable font files. Arabic, English, and Russian use system fallbacks pending the open D-1 family decision; no non-Persian font is selected here.</p>
            </ContentSection>

            <ContentSection id="controls" className="system-section">
              <SectionHeading index="03" eyebrow="CONTROLS" title="Clear actions, visible states." description="The five shared button variants use semantic action roles. Hover is an enhancement; keyboard focus and pressed/disabled states remain visible." />
              <div className="control-board">
                <div className="control-board__row"><span className="type-label">DEFAULT</span><Button type="button">Primary</Button><Button variant="secondary" type="button">Secondary</Button><Button variant="ghost" type="button">Ghost</Button><Button variant="text" type="button">Text action</Button><IconButton label="Open validation detail" type="button">↗</IconButton></div>
                <div className="control-board__row"><span className="type-label">DISABLED</span><Button disabled type="button">Primary</Button><Button variant="secondary" disabled type="button">Secondary</Button><Button variant="ghost" disabled type="button">Ghost</Button><Button variant="text" disabled type="button">Text action</Button><IconButton label="Unavailable validation detail" disabled type="button">↗</IconButton></div>
                <div className="control-board__row"><span className="type-label">ACTIVE / PRESSED</span><Button aria-pressed="true" type="button">Selected</Button><Button variant="secondary" aria-pressed="true" type="button">Alternative selected</Button><Button variant="ghost" type="button">Neutral option</Button><Button variant="text" type="button">View details</Button><IconButton label="Close validation detail" type="button">×</IconButton></div>
                <div className="control-board__row control-board__row--long"><span className="type-label">LONG LABEL</span><Button type="button">{LOCALES["fa-IR"].button}</Button><Button variant="secondary" type="button">{LOCALES.en.button}</Button></div>
                <p className="type-caption">Focus probe: use Tab to reach this control. On touch contexts the hit envelope is 48×48px; 44×44px remains the minimum floor.</p>
                <Button variant="ghost" type="button" data-testid="focus-probe">Keyboard focus-visible probe</Button>
              </div>
            </ContentSection>

            <ContentSection id="forms" className="system-section system-section--soft">
              <SectionHeading index="04" eyebrow="FORMS" title="Interactive before focus." description="Native controls retain their own keyboard behavior. Labels, helper text, errors, values, and disabled state stay explicit." />
              <form className="form-fixture" aria-label="Design system form states">
                <TextField id="name-default" label="Name" placeholder="Type a name" helper="Visible label and neutral helper state." />
                <TextField id="phone-filled" label="Phone" type="tel" defaultValue="+98 912 345 6789" helper="Mixed-direction number is isolated." />
                <TextField id="email-error" label="Email" type="email" defaultValue="not-an-email" error="Enter a valid email address." />
                <TextField id="name-disabled" label="Disabled field" defaultValue="Read-only fixture" disabled />
                <TextAreaField id="message" label="Textarea" rows={4} placeholder="Long content wraps without clipping." helper="Validation fixture only; no submission." />
                <SelectField id="choice" label="Select" options={["Editorial", "Immersive", "Clinical"]} helper="Native-first controlled choice." />
                <CheckField id="consent" label="Unchecked consent specimen — optional and never preselected." />
                <div className="form-fixture__submit"><Button variant="primary" type="button">Preview the form action</Button><p className="type-caption">No data is collected or submitted.</p></div>
              </form>
            </ContentSection>

            <ContentSection id="navigation" className="system-section">
              <SectionHeading index="05" eyebrow="NAVIGATION" title="A clear path across contexts." description="The production navigation primitives share link semantics and recompose between desktop and touch layouts. The mobile disclosure uses native keyboard-operable details; locale routing remains an external route concern." />
              <div className="navigation-fixtures">
                <div className="navigation-fixtures__header">
                  <p className="type-label">SITE HEADER · DESKTOP / TOUCH</p>
                  <SiteHeader
                    brand={<><span className="navigation-brand__mark" aria-hidden="true">C</span><span>Shared identity</span></>}
                    items={[{ label: "Services", href: "#compositions" }, { label: "People", href: "#patterns" }, { label: "Journal", href: "#stress" }]}
                    action={{ label: "Contact", href: "#forms" }}
                  />
                </div>
                <div className="navigation-fixtures__lower">
                  <div><p className="type-label">BREADCRUMB</p><Breadcrumbs items={[{ label: "Home", href: "#top" }, { label: "Services", href: "#compositions" }, { label: "Current page", href: "#navigation", current: true }]} /></div>
                  <div><p className="type-label">PAGINATION</p><Pagination previous={{ label: "Previous", href: "#forms" }} pages={[{ label: "1", href: "#navigation", current: true }, { label: "2", href: "#media" }, { label: "3", href: "#patterns" }]} next={{ label: "Next", href: "#media" }} /></div>
                  <div><p className="type-label">LOCALE FIXTURE</p><p className="type-body">The harness locale selector above changes document `lang` and `dir`. Public localized routes remain a framework adapter decision and are not asserted by this specimen.</p><a className="cdi-link" href="#typography">Compare script fixtures</a></div>
                </div>
              </div>
            </ContentSection>

            <ContentSection id="layout" className="system-section">
              <SectionHeading index="06" eyebrow="LAYOUT + ACTION ZONE" title="Position follows composition authority." description="A stage names its rails and zones. Content, media, and actions stay related without arbitrary screen offsets." />
              <div className="layout-demo" data-geometry-sample>
                <div className="layout-demo__viewport">
                  <div className="layout-demo__safe">Viewport · safe region</div>
                  <Stage className="layout-demo__global">
                    <GlobalRail className="layout-demo__rail">
                      <ContentRail className="layout-demo__content"><span className="type-label">CONTENT RAIL</span><h3 className="type-h3">A heading anchors the message.</h3><p className="type-body">The same composition contract remains understandable in either direction and every context.</p></ContentRail>
                      <MediaRail className="layout-demo__media"><span className="type-label">MEDIA RAIL</span><MediaComposition kind="portrait" title="Portrait crop envelope" overlays={false} /></MediaRail>
                    </GlobalRail>
                    <ActionZone className="layout-demo__actions"><span className="type-label">ACTION ZONE</span><Button type="button">One primary action</Button><Button variant="secondary" type="button">Related secondary</Button><small>Safe action boundary · no detached CTA</small></ActionZone>
                    <NavigationZone className="layout-demo__navigation"><span>NAVIGATION ZONE · progress only when it aids orientation</span></NavigationZone>
                  </Stage>
                </div>
                <div className="layout-relationship-list" aria-label="Layout hierarchy">
                  <span>Viewport</span><b className="flow-arrow" aria-hidden="true">→</b><span>Safe Area</span><b className="flow-arrow" aria-hidden="true">→</b><span>Stage / Page</span><b className="flow-arrow" aria-hidden="true">→</b><span>Rails + Zones</span>
                </div>
              </div>
              <div className="viewport-matrix" aria-label="Rendered evidence viewport geometries">
                {[[390, 844, "IPHONE_WEB"], [430, 932, "ANDROID_WEB"], [1024, 768, "DESKTOP_WEB / standard"], [1440, 900, "DESKTOP_WEB / wide"]].map(([width, height, context]) => (
                  <div key={`${width}`}><strong>{width} × {height}</strong><span>{context}</span></div>
                ))}
              </div>
              <p className="type-caption">These are validation geometries, not canonical breakpoints or device-model claims.</p>
            </ContentSection>

            <ContentSection id="compositions" className="system-section system-section--soft">
              <SectionHeading index="07" eyebrow="COMPOSITION CONTRACTS" title="Ten fixtures, one continuous world." description="Each specimen names intent and a spatial relationship. These are neutral contract tests, not finished clinic sections." />
              <div className="composition-grid">
                {COMPOSITION_FIXTURES.map((fixture, index) => (
                  <article className="composition-fixture" key={fixture.id} data-composition={fixture.id}>
                    <div className="composition-fixture__header"><span className="type-label">{String(index + 1).padStart(2, "0")}</span><h3 className="type-h3">{fixture.label}</h3></div>
                    {fixture.media && <MediaComposition kind={fixture.media} title={`${fixture.label} · neutral fixture`} overlays={false} />}
                    <p className="type-body">{fixture.intent}</p>
                    <div className="composition-fixture__relationship"><span>CONTENT</span><span>MEDIA / TEXT</span><span>ACTION</span></div>
                  </article>
                ))}
              </div>
            </ContentSection>

            <ContentSection id="media" className="system-section">
              <SectionHeading index="08" eyebrow="MEDIA ART DIRECTION" title="A crop carries meaning." description="Fixture metadata makes focal, protected, text-safe, contrast, and crop regions inspectable. The responsive picture deliberately supplies a different portrait crop." />
              <div className="media-grid">
                <MediaComposition kind="landscape" title="Landscape · mobile art-directed source" />
                <MediaComposition kind="portrait" title="Portrait · protected subject" />
                <MediaComposition kind="technology" title="Technology · device legibility" />
                <MediaComposition kind="missing" title="Missing optional media" />
              </div>
              <div className="negative-space-fixture">
                <div className="negative-space-fixture__copy"><p className="type-label">NEGATIVE SPACE / PURPOSE</p><h3 className="type-h2">Room around a focal subject.</h3><p className="type-body">Here, the open region separates the message from the visual anchor and leaves an unobstructed text-safe field.</p><ActionZone><Button type="button">Related action</Button></ActionZone></div>
                <div className="negative-space-fixture__field" aria-label="Reserved media field with focal point"><span>FOCAL SUBJECT</span><i /></div>
              </div>
            </ContentSection>

            <ContentSection id="patterns" className="system-section system-section--soft">
              <SectionHeading index="09" eyebrow="SIGNATURE PATTERNS" title="Pattern roles stay distinct." description="These compact specimens exercise the defined pattern boundaries without implementing clinic data or unsupported pattern APIs." />
              <div className="signature-grid">
                <article className="signature-fixture"><p className="type-label">CONCERN EXPLORER</p><h3 className="type-h3">Start with a concern.</h3><div className="choice-list"><Button variant="secondary" type="button">Skin texture</Button><Button variant="secondary" type="button">Hair density</Button><Button variant="secondary" type="button">Visible redness</Button></div><p className="type-caption">Fixture choices · no diagnosis or suitability claim</p></article>
                <article className="signature-fixture"><p className="type-label">TREATMENT FACTS</p><h3 className="type-h3">An information hierarchy.</h3><dl className="fact-list"><div><dt>Typical duration</dt><dd>Context-dependent</dd></div><div><dt>Session context</dt><dd>Set by clinical review</dd></div><div><dt>Important boundary</dt><dd>Individual assessment required</dd></div></dl></article>
                <article className="signature-fixture"><p className="type-label">TREATMENT JOURNEY</p><h3 className="type-h3">Meaningful steps, no ornament.</h3><ol className="journey-list"><li><span>01</span><div><strong>Understand</strong><small>Read the shared information.</small></div></li><li><span>02</span><div><strong>Discuss</strong><small>Review questions with a professional.</small></div></li><li><span>03</span><div><strong>Decide</strong><small>Choose an appropriate next step.</small></div></li></ol><p className="type-caption">This sequence communicates task order; no persistent 01/05 chrome is needed.</p></article>
                <article className="signature-fixture"><p className="type-label">DOCTOR PROFILE</p><h3 className="type-h3">Identity and verifiable context.</h3><div className="doctor-fixture"><MediaComposition kind="portrait" title="Protected portrait fixture" overlays={false} /><div><strong>Profile content fixture</strong><p className="type-small">Credential and approach copy stays beside or below the protected subject region.</p><Button variant="text" type="button">Related action</Button></div></div></article>
                <article className="signature-fixture signature-fixture--wide"><p className="type-label">BEFORE / AFTER COMPARE</p><h3 className="type-h3">Evidence geometry without fabricated evidence.</h3><div className="comparison-placeholders"><div><strong>Before</strong><span>Evidence slot · intentionally empty</span></div><div><strong>After</strong><span>Evidence slot · intentionally empty</span></div></div><p className="type-caption">No treatment imagery, outcomes, or efficacy claims are shown in this fixture.</p></article>
                <article className="signature-fixture"><p className="type-label">CONSULTATION SURFACE</p><h3 className="type-h3">Request, consent, reassurance.</h3><p className="type-body">A calm form hierarchy preserves a single action and puts context beside it.</p><ActionZone><Button type="button">Preview consultation action</Button></ActionZone><p className="type-caption">No lead is submitted.</p></article>
              </div>
            </ContentSection>

            <ContentSection id="motion" className="system-section">
              <SectionHeading index="10" eyebrow="MOTION + ACCESSIBILITY" title="Motion is an enhancement, never the content." description="The fixture moves a small light field to communicate focus and precision. Reduced motion keeps the same message, sequence, and actions in a still composition." />
              <div className="mode-fixture" data-testid="mode-fixture">
                <div className="mode-fixture__stage signature-stage">
                  <span className="type-label">TREATMENT SIGNATURE · SENSORY METAPHOR</span>
                  <div className="signature-light" aria-hidden="true" />
                  <h3 className="type-scene-title">Light · focus · precision</h3>
                  <p className="type-body">A restrained sensory identity. It does not depict a procedure or result.</p>
                  <ActionZone><Button type="button">Continue to information</Button></ActionZone>
                </div>
                <div className="mode-fixture__editorial">
                  <span className="type-label">TREATMENT INFORMATION · EDITORIAL</span>
                  <h3 className="type-h3">Complete information stays present.</h3>
                  <p className="type-body">Facts, limitations, evidence context, and actions remain ordinary semantic content when motion is enabled, reduced, or unavailable.</p>
                  <a href="#compositions">Read the composition fixtures</a>
                </div>
              </div>
              <div className="motion-grammar" aria-label="Motion hierarchy">
                <span>Experience intent</span><b className="flow-arrow" aria-hidden="true">→</b><span>Treatment signature</span><b className="flow-arrow" aria-hidden="true">→</b><span>Transition grammar</span><b className="flow-arrow" aria-hidden="true">→</b><span>Motion primitive</span><b className="flow-arrow" aria-hidden="true">→</b><span>Duration + easing</span>
              </div>
              <p className="type-caption">No route transition, scroll hijack, automatic carousel, or full-page motion system is introduced.</p>
            </ContentSection>

            <ContentSection id="stress" className="system-section system-section--soft">
              <SectionHeading index="11" eyebrow="STRESS FIXTURES" title="Designed to find the edge." description="Long scripts, missing media, focus, and narrow geometry are part of the baseline validation—not special cases hidden after launch." />
              <div className="stress-grid">
                {STRESS_FIXTURES.map((fixture) => <span key={fixture} className="stress-chip">{fixture}</span>)}
              </div>
              <div className="stress-copy-grid">
                <article lang="fa-IR" dir="rtl"><span className="type-label">LONG_PERSIAN</span><p className="type-body-large">{LOCALES["fa-IR"].long} {LOCALES["fa-IR"].long}</p></article>
                <article lang="ru" dir="ltr"><span className="type-label">RUSSIAN_CYRILLIC</span><p className="type-body">{LOCALES.ru.long} {LOCALES.ru.long}</p></article>
                <article lang="ar" dir="rtl"><span className="type-label">ARABIC_RTL</span><p className="type-body">{LOCALES.ar.long}</p></article>
                <article lang="en" dir="ltr"><span className="type-label">MIXED_SCRIPT</span><p className="type-body">A mixed fragment remains isolated: <bdi>HIFU · RF Microneedling · ۳ جلسه · 30 min</bdi> beside Persian/Arabic copy.</p></article>
              </div>
              <div className="qa-id-list"><p className="type-label">DESIGN QA RULES EXERCISED</p><span>LAYOUT-01</span><span>LAYOUT-02</span><span>MEDIA-01</span><span>ACTION-01</span><span>FORM-01</span><span>RESP-01</span><span>TYPE-01</span><span>SPACE-01</span><span>PROGRESS-01</span><span>MOTION-01</span><span>MEDICAL-01</span><span>SAFE-01</span><span>BIDI-01</span></div>
            </ContentSection>
          </main>

          <footer className="system-footer"><span>CDI · SHARED PRODUCTION DESIGN SYSTEM</span><span>Rendered validation fixture · not a clinic website</span></footer>
        </div>
      </div>
    </>
  );
}

function RelationshipExample({ name, gap, label }: { name: string; gap: string; label: string }) {
  return (
    <div className="relationship-example" style={{ gap }}>
      <strong>{label}</strong><span>{name}</span>
    </div>
  );
}
