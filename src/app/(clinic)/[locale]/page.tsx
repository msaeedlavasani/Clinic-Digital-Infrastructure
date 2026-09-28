import { notFound } from "next/navigation";
import { ActionZone, ContentRail, ContentSection, GlobalRail, SafeArea, Viewport } from "@/design-system/primitives/layout";
import { ActionLink } from "@/design-system/components/actions";
import { contentProvider } from "@/cdi/content/provider";
import { clinicMetadata } from "@/cdi/runtime/metadata";
import { resolvePublicPageContext } from "@/cdi/runtime/page-context";
import { PageFrame, ProductionHeader } from "@/cdi/runtime/presentation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: code } = await params;
  const context = await resolvePublicPageContext(code);
  if (!context) return { robots: { index: false, follow: false } };
  const home = contentProvider.getHome(context.clinic, context.locale.routeCode);
  if (!home) return { robots: { index: false, follow: false } };
  const alternates = Object.fromEntries(context.clinic.supportedLocales.map((locale) => [locale, `/${locale}`]));
  return clinicMetadata(context.clinic, context.locale, home.seo.title, home.seo.description, `/${code}`, alternates);
}

export default async function ClinicHomePage({ params }: Props) {
  const { locale: code } = await params;
  const context = await resolvePublicPageContext(code);
  if (!context) notFound();
  const locale = context.locale.routeCode;
  const home = contentProvider.getHome(context.clinic, locale);
  if (!home) notFound();
  const concerns = contentProvider.listPublicConcernPaths(context.clinic, locale);
  const text = locale === "fa" ? {
    consultation: "درخواست مشاوره", heroEyebrow: "زیبایی، با شناخت روشن‌تر",
    discover: "دیدن مسیرهای مرتبط", listLabel: "مسیرهای منتشرشده",
    noTreatments: "در این زبان گزینهٔ منتشرشده‌ای وجود ندارد.", footer: "تجربهٔ مرجع CDI · دادهٔ نمایشی",
    fixtureLabel: "نسخهٔ اعتبارسنجی CDI · تصویرسازی، نه تصویر بیمار یا درمانگاه",
    fixtureQualifier: "Validation fixture only",
    scrollCue: "ورود به مسیرهای درمان",
  } : {
    consultation: "Request a consultation", heroEyebrow: "MEDICAL AESTHETICS · CONSIDERED",
    discover: "Explore treatment paths", listLabel: "PUBLISHED TREATMENT PATHS",
    noTreatments: "There are no published options in this language.", footer: "CDI reference experience · fixture data",
    fixtureLabel: "Validation fixture only · CDI illustration, not patient or clinic photography",
    fixtureQualifier: "",
    scrollCue: "Enter the treatment journey",
  };
  const discoveryCopy = home.content;

  return (
    <PageFrame id="top">
      <div className="cdi-home-journey" data-locale={locale}>
        <div className="cdi-home-ambient" aria-hidden="true">
          <img src="/fixtures/editorial-face-field.svg" alt="" width="1800" height="1300" fetchPriority="high" />
        </div>
        <a className="skip-link" href="#main-content">{locale === "fa" ? "پرش به محتوای اصلی" : "Skip to main content"}</a>
        <ProductionHeader clinic={context.clinic} locale={locale} immersive />
        <main id="main-content" className="cdi-home-main">
          <section className="cdi-home-hero" aria-labelledby="hero-title" data-composition="hero">
            <Viewport className="cdi-home-hero__viewport">
              <SafeArea className="cdi-home-hero__safe-area">
                <GlobalRail className="cdi-home-hero__rail">
                  <ContentRail className="cdi-home-hero__copy" dir={locale === "fa" ? "rtl" : "ltr"}>
                    <p className="type-label cdi-home-hero__eyebrow">{text.heroEyebrow}</p>
                    <h1 className="type-hero" id="hero-title">{discoveryCopy.title}</h1>
                    <p className="type-body-large cdi-home-hero__lede">{discoveryCopy.lede}</p>
                    <ActionZone className="cdi-home-actions">
                      <ActionLink href="#treatment-discovery" variant="text" className="cdi-home-action cdi-home-action--primary">
                        <span>{text.discover}</span><span className="cdi-home-action__arrow" aria-hidden="true">↗</span>
                      </ActionLink>
                      <ActionLink href={`/${locale}/consultation`} variant="text" className="cdi-home-action">
                        <span>{text.consultation}</span>
                      </ActionLink>
                    </ActionZone>
                    <p className="type-caption cdi-home-hero__fixture">{text.fixtureLabel}{text.fixtureQualifier && <> · <span lang="en" dir="ltr">{text.fixtureQualifier}</span></>}</p>
                  </ContentRail>
                </GlobalRail>
                <a className="cdi-home-scroll-cue" href="#treatment-discovery">
                  <span aria-hidden="true" className="cdi-home-scroll-cue__line" />
                  <span>{text.scrollCue}</span>
                </a>
              </SafeArea>
            </Viewport>
          </section>

          <section id="treatment-discovery" className="cdi-home-discovery" aria-labelledby="discovery-title" data-composition="treatment-discovery">
            <ContentSection className="cdi-home-discovery__content">
              <div className="cdi-home-discovery__intro" dir={locale === "fa" ? "rtl" : "ltr"}>
                <p className="type-label cdi-home-discovery__eyebrow">{text.listLabel}</p>
                <h2 className="type-h1" id="discovery-title">{discoveryCopy.discoveryTitle}</h2>
                <p className="type-body-large">{discoveryCopy.discoveryPrompt}</p>
              </div>
              <div className="cdi-home-discovery__paths">
                {concerns.length ? concerns.map((concern) => <article className="cdi-home-concern" key={concern.concernId} dir={locale === "fa" ? "rtl" : "ltr"}>
                  <p className="type-label cdi-home-concern__label">{concern.representation.content.label}</p>
                  <p className="type-body cdi-home-concern__description">{concern.representation.content.description}</p>
                  <ul className="cdi-editorial-treatment-list">
                    {concern.treatments.map(({ treatmentId, capabilityId, representation }) => (
                      <li key={treatmentId} data-capability={capabilityId}>
                        <a className="cdi-editorial-treatment" href={`/${locale}/treatments/${encodeURIComponent(representation.slug)}`}>
                          <span className="cdi-editorial-treatment__body">
                            <strong className="type-title">{representation.content.title}</strong>
                            <span className="type-body cdi-editorial-treatment__summary">{representation.content.summary}</span>
                          </span>
                          <span className="cdi-editorial-treatment__action"><span>{text.discover}</span><span aria-hidden="true">↗</span></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>) : <p className="type-body">{text.noTreatments}</p>}
              </div>
            </ContentSection>
          </section>
        </main>
        <footer className="cdi-home-footer"><span>{text.footer}</span><a href={`/${locale}/consultation`}>{text.consultation}</a></footer>
      </div>
    </PageFrame>
  );
}
