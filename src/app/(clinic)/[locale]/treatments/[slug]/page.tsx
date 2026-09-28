import { notFound } from "next/navigation";
import { ActionLink } from "@/design-system/components/actions";
import { MediaComposition } from "@/design-system/components/media";
import { TreatmentSignature } from "@/design-system/components/treatment-signature";
import { ContentSection, GlobalRail, MediaRail, ContentRail, ActionZone } from "@/design-system/primitives/layout";
import { contentProvider } from "@/cdi/content/provider";
import { clinicMetadata, representationAlternates } from "@/cdi/runtime/metadata";
import { resolvePublicPageContext } from "@/cdi/runtime/page-context";
import { FixtureNotice, PageFrame, ProductionHeader } from "@/cdi/runtime/presentation";
import type { RouteLocale } from "@/cdi/runtime/model";

type Props = { params: Promise<{ locale: string; slug: string }> };

async function getTreatmentPage(localeCode: string, slug: string) {
  const context = await resolvePublicPageContext(localeCode);
  if (!context) return null;
  const result = contentProvider.getTreatmentBySlug(context.clinic, context.locale.routeCode, slug);
  if (!result) return null;
  const capability = context.clinic.capabilityManifest.find((entry) => entry.capabilityId === result.capabilityId);
  if (!capability) return null;
  const doctor = capability.doctorIds.map((id) => contentProvider.getDoctor(context.clinic, context.locale.routeCode, id)).find(Boolean) ?? null;
  const technology = capability.technologyIds.map((id) => contentProvider.getTechnology(context.clinic, context.locale.routeCode, id)).find(Boolean) ?? null;
  const device = capability.deviceIds.map((id) => contentProvider.getDevice(context.clinic, context.locale.routeCode, id)).find(Boolean) ?? null;
  return { ...context, result, capability, doctor, technology, device };
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const page = await getTreatmentPage(locale, slug);
  if (!page) return { robots: { index: false, follow: false } };
  const { representation } = page.result;
  const canonicalPath = `/${locale}/treatments/${encodeURIComponent(representation.slug)}`;
  const alternates = representationAlternates(page.clinic, page.result.entity, "/treatments");
  return clinicMetadata(page.clinic, page.locale, representation.seo.title, representation.seo.description, canonicalPath, alternates);
}

export default async function TreatmentPage({ params }: Props) {
  const { locale: localeCode, slug } = await params;
  const page = await getTreatmentPage(localeCode, slug);
  if (!page) notFound();

  const locale: RouteLocale = page.locale.routeCode;
  const otherLocale: RouteLocale = locale === "fa" ? "en" : "fa";
  const translated = page.result.entity.representations[otherLocale];
  const alternateHref = translated?.publication === "PUBLISHED"
    ? `/${otherLocale}/treatments/${encodeURIComponent(translated.slug)}`
    : `/${otherLocale}`;
  const detail = page.result.representation.content;
  const text = locale === "fa" ? {
    back: "بازگشت به خانه", signatureEyebrow: "امضای حسی · نمونهٔ غیرپزشکی", signatureTitle: "نور، تمرکز، دقت",
    information: "اطلاعات آموزشی", infoDisclaimer: "محتوای نمونه؛ فاقد تأیید پزشکی و توصیهٔ درمانی.",
    noFacts: "اطلاعات بالینی واقعی در این نمونهٔ اعتبارسنجی ارائه نشده است.", doctor: "پروفایل پزشک نمونه",
    technology: "زمینهٔ فناوری", device: "زمینهٔ دستگاه", noEvidence: "در این نمونه مورد تأییدشده‌ای برای شواهد بالینی منتشر نشده است.",
    ask: "درخواست مشاوره", aboutProvider: "هویت و صلاحیت حرفه‌ای واقعی در این دادهٔ نمونه ارائه نشده است.",
    deviceNotice: "وابستگی دستگاه یا مالکیت درمانگاه ادعا نمی‌شود.",
  } : {
    back: "Back to home", signatureEyebrow: "SENSORY SIGNATURE · NON-CLINICAL FIXTURE", signatureTitle: "Light, focus, precision",
    information: "Educational information", infoDisclaimer: "Fixture content; not medically reviewed and not treatment advice.",
    noFacts: "No real clinical facts are included in this validation fixture.", doctor: "Example clinician profile",
    technology: "Technology context", device: "Device context", noEvidence: "No reviewed clinical evidence case is published in this fixture.",
    ask: "Request a consultation", aboutProvider: "No real identity or professional qualification is represented in this fixture.",
    deviceNotice: "No clinic device association or ownership is asserted.",
  };
  const requestHref = `/${locale}/consultation?treatment=${encodeURIComponent(page.result.entity.id)}`;

  return (
    <PageFrame id="top">
      <a className="skip-link" href="#main-content">{locale === "fa" ? "پرش به محتوای اصلی" : "Skip to main content"}</a>
      <ProductionHeader clinic={page.clinic} locale={locale} alternateHref={alternateHref} />
      <FixtureNotice clinic={page.clinic} locale={locale} />
      <main id="main-content">
        <nav className="cdi-page-breadcrumb" aria-label={locale === "fa" ? "مسیر صفحه" : "Breadcrumb"}>
          <a href={`/${locale}`}>{text.back}</a><span aria-hidden="true">/</span><span aria-current="page">{detail.title}</span>
        </nav>
        <section className="cdi-signature-scene" aria-labelledby="signature-title" data-composition="treatment-signature">
          <GlobalRail className="cdi-signature-scene__grid">
            <ContentRail className="cdi-signature-scene__copy">
              <p className="type-label cdi-eyebrow">{text.signatureEyebrow}</p>
              <h1 className="type-scene-title" id="signature-title">{text.signatureTitle}</h1>
              <p className="type-body-large">{detail.summary}</p>
              <ActionZone><ActionLink href="#treatment-information" variant="secondary">{text.information}</ActionLink></ActionZone>
            </ContentRail>
            <MediaRail className="cdi-signature-scene__media">
              <TreatmentSignature label={text.signatureTitle} words={locale === "fa" ? ["نور", "تمرکز", "دقت"] : ["Light", "Focus", "Precision"]} />
            </MediaRail>
          </GlobalRail>
        </section>

        <ContentSection id="treatment-information" className="cdi-production-section cdi-production-section--surface" aria-labelledby="treatment-title">
          <div className="cdi-section-intro cdi-section-intro--narrow">
            <p className="type-label cdi-eyebrow">{text.information}</p>
            <h2 className="type-h1" id="treatment-title">{detail.title}</h2>
            <p className="type-body-large">{detail.overview}</p>
            <p className="cdi-content-disclaimer" role="note">{text.infoDisclaimer}</p>
          </div>
          <div className="cdi-article-flow">
            {detail.facts.length > 0 && <dl className="cdi-treatment-facts">{detail.facts.map((fact) => <div key={fact.label}><dt className="type-label">{fact.label}</dt><dd className="type-body">{fact.value}</dd></div>)}</dl>}
            {detail.facts.length === 0 && <p className="cdi-content-boundary">{text.noFacts}</p>}
            {detail.sections.map((section) => <section className="cdi-article-section" key={section.heading}><h3 className="type-h2">{section.heading}</h3><p className="type-body">{section.body}</p></section>)}
            <p className="cdi-content-boundary">{text.noEvidence}</p>
            <ActionZone><ActionLink href={requestHref}>{text.ask}</ActionLink></ActionZone>
          </div>
        </ContentSection>

        {page.doctor && <ContentSection className="cdi-production-section cdi-trust-section" aria-labelledby="doctor-title">
          <GlobalRail className="cdi-trust-grid">
            <MediaRail><MediaComposition kind="portrait" title={text.doctor} overlays={false} /></MediaRail>
            <ContentRail className="cdi-trust-copy">
              <p className="type-label cdi-eyebrow">{text.doctor}</p>
              <h2 className="type-h1" id="doctor-title">{page.doctor.content.name}</h2>
              <p className="type-title">{page.doctor.content.title}</p>
              <p className="type-body">{page.doctor.content.summary}</p>
              <p className="cdi-content-disclaimer">{page.doctor.content.credentialNotice} {text.aboutProvider}</p>
            </ContentRail>
          </GlobalRail>
        </ContentSection>}

        {page.technology && <ContentSection className="cdi-production-section cdi-production-section--surface cdi-trust-section" aria-labelledby="technology-title">
          <GlobalRail className="cdi-trust-grid cdi-trust-grid--technology">
            <ContentRail className="cdi-trust-copy">
              <p className="type-label cdi-eyebrow">{text.technology}</p>
              <h2 className="type-h1" id="technology-title">{page.technology.content.name}</h2>
              <p className="type-body">{page.technology.content.summary}</p>
              {page.device && <><h3 className="type-title cdi-device-heading">{text.device}: {page.device.content.name}</h3><p className="type-body">{page.device.content.summary}</p><p className="cdi-content-disclaimer">{text.deviceNotice}</p></>}
            </ContentRail>
            <MediaRail><MediaComposition kind="technology" title={locale === "fa" ? "تصویرسازی دستگاه عمومی · نمونه" : "Generic equipment illustration · fixture"} overlays={false} /></MediaRail>
          </GlobalRail>
        </ContentSection>}
      </main>
      <footer className="cdi-production-footer"><span>{page.clinic.fixtureNotice}</span><a href={requestHref}>{text.ask}</a></footer>
    </PageFrame>
  );
}
