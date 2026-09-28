import { notFound } from "next/navigation";
import { ActionZone, ContentRail, ContentSection, GlobalRail, MediaRail, SafeArea, Viewport } from "@/design-system/primitives/layout";
import { ActionLink } from "@/design-system/components/actions";
import { MediaComposition } from "@/design-system/components/media";
import { contentProvider } from "@/cdi/content/provider";
import { clinicMetadata } from "@/cdi/runtime/metadata";
import { resolvePublicPageContext } from "@/cdi/runtime/page-context";
import { FixtureNotice, PageFrame, ProductionHeader } from "@/cdi/runtime/presentation";

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
    home: "خانه", treatments: "خدمات", consultation: "درخواست مشاوره", heroEyebrow: "مراقبت، با آگاهی",
    discover: "دیدن گزینه‌های مرتبط", listLabel: "گزینه‌های منتشرشده",
    noTreatments: "در این زبان گزینهٔ منتشرشده‌ای وجود ندارد.", footer: "تجربهٔ مرجع CDI · دادهٔ نمایشی",
  } : {
    home: "Home", treatments: "Treatments", consultation: "Request a consultation", heroEyebrow: "CARE, CONSIDERED",
    discover: "Explore related options", listLabel: "Published options",
    noTreatments: "There are no published options in this language.", footer: "CDI reference experience · fixture data",
  };
  const discoveryCopy = home.content;

  return (
    <PageFrame id="top">
      <a className="skip-link" href="#main-content">{locale === "fa" ? "پرش به محتوای اصلی" : "Skip to main content"}</a>
      <ProductionHeader clinic={context.clinic} locale={locale} />
      <FixtureNotice clinic={context.clinic} locale={locale} />
      <main id="main-content">
        <section className="cdi-production-hero" aria-labelledby="hero-title" data-composition="hero">
          <Viewport>
            <SafeArea>
              <GlobalRail className="cdi-production-hero__grid">
                <ContentRail className="cdi-production-hero__copy">
                  <p className="type-label cdi-eyebrow">{text.heroEyebrow}</p>
                  <h1 className="type-hero" id="hero-title">{discoveryCopy.title}</h1>
                  <p className="type-body-large cdi-production-hero__lede">{discoveryCopy.lede}</p>
                  <ActionZone>
                    <ActionLink href="#treatment-discovery">{text.discover}</ActionLink>
                    <ActionLink variant="secondary" href={`/${locale}/consultation`}>{text.consultation}</ActionLink>
                  </ActionZone>
                  <p className="type-caption cdi-fixture-caption">{context.clinic.displayName} · {locale.toUpperCase()} · {context.clinic.visualWorldId}</p>
                </ContentRail>
                <MediaRail className="cdi-production-hero__media">
                  <MediaComposition kind="landscape" title={locale === "fa" ? "تصویرسازی معماری · رسانهٔ نمایشی" : "Architectural illustration · fixture media"} overlays={false} priority />
                </MediaRail>
              </GlobalRail>
            </SafeArea>
          </Viewport>
        </section>

        <ContentSection id="treatment-discovery" className="cdi-production-section cdi-production-section--surface" aria-labelledby="discovery-title">
          <div className="cdi-section-intro">
            <p className="type-label cdi-eyebrow">{text.listLabel}</p>
            <h2 className="type-h1" id="discovery-title">{discoveryCopy.discoveryTitle}</h2>
            <p className="type-body-large">{discoveryCopy.discoveryPrompt}</p>
          </div>
          <div className="cdi-discovery-feature">
            <p className="type-label">{locale === "fa" ? "دغدغه" : "CONCERN"}</p>
            {concerns.length ? concerns.map((concern) => <article className="cdi-concern-path" key={concern.concernId}>
              <h3 className="type-h2">{concern.representation.content.label}</h3>
              <p className="type-body cdi-concern-description">{concern.representation.content.description}</p>
              <ul className="cdi-treatment-list">
              {concern.treatments.map(({ treatmentId, capabilityId, representation }) => (
                <li key={treatmentId} data-capability={capabilityId}>
                  <a className="cdi-treatment-link" href={`/${locale}/treatments/${encodeURIComponent(representation.slug)}`}>
                    <span><strong className="type-title">{representation.content.title}</strong><span className="type-body cdi-treatment-link__summary">{representation.content.summary}</span></span>
                    <span className="cdi-treatment-link__arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
              </ul>
            </article>) : <p className="type-body">{text.noTreatments}</p>}
          </div>
        </ContentSection>
      </main>
      <footer className="cdi-production-footer"><span>{text.footer}</span><a href={`/${locale}/consultation`}>{text.consultation}</a></footer>
    </PageFrame>
  );
}
