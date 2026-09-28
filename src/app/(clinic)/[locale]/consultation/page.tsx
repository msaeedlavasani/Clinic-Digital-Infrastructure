import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActionLink } from "@/design-system/components/actions";
import { ContentSection } from "@/design-system/primitives/layout";
import { ConsultationForm } from "@/cdi/consultation/consultation-form";
import { contentProvider } from "@/cdi/content/provider";
import { clinicMetadata } from "@/cdi/runtime/metadata";
import { resolvePublicPageContext } from "@/cdi/runtime/page-context";
import { FixtureNotice, PageFrame, ProductionHeader } from "@/cdi/runtime/presentation";
import type { RouteLocale } from "@/cdi/runtime/model";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale: code } = await params;
  const context = await resolvePublicPageContext(code);
  if (!context) return { robots: { index: false, follow: false } };
  const locale: RouteLocale = context.locale.routeCode;
  const copy = locale === "fa"
    ? { title: "درخواست مشاورهٔ نمونه | CDI", description: "فرم نمایشی برای اعتبارسنجی مسیر درخواست مشاوره؛ بدون ذخیره یا ارسال اطلاعات." }
    : { title: "Consultation request fixture | CDI", description: "A reference form for validating a consultation request, without storing or sending contact details." };
  const alternates = Object.fromEntries(context.clinic.supportedLocales.map((supported) => [supported, `/${supported}/consultation`]));
  return clinicMetadata(context.clinic, context.locale, copy.title, copy.description, `/${code}/consultation`, alternates);
}

export default async function ConsultationPage({ params, searchParams }: Props) {
  const [{ locale: localeCode }, query] = await Promise.all([params, searchParams]);
  const context = await resolvePublicPageContext(localeCode);
  if (!context || !context.clinic.contact.consultationEnabled) notFound();
  const locale: RouteLocale = context.locale.routeCode;
  const options = contentProvider.listPublicTreatments(context.clinic, locale).map(({ treatmentId, representation }) => ({ id: treatmentId, label: representation.content.title }));
  const requested = typeof query.treatment === "string" ? query.treatment : undefined;
  const defaultTreatmentId = requested && options.some((option) => option.id === requested) ? requested : undefined;
  const formStatus = typeof query.form === "string" && ["invalid", "success", "unavailable"].includes(query.form) ? query.form : "";
  const invalidFields = typeof query.fields === "string"
    ? query.fields.split(",").filter((field) => ["name", "phone", "treatmentId"].includes(field))
    : [];
  const text = locale === "fa" ? {
    eyebrow: "درخواست مشاوره · نمونهٔ اعتبارسنجی", title: "گفت‌وگویی روشن، بدون تعهد", body: "این فرم فقط مرز اعتبارسنجی سمت سرور و تجربهٔ دسترس‌پذیر را نشان می‌دهد. هیچ داده‌ای ذخیره یا به درمانگاه واقعی ارسال نمی‌شود.",
    boundary: "این مسیر درخواست تماس است؛ رزرو نوبت یا دریافت پروندهٔ پزشکی نیست.", back: "بازگشت به خانه",
  } : {
    eyebrow: "CONSULTATION REQUEST · VALIDATION FIXTURE", title: "A clear conversation, without pressure", body: "This form demonstrates the server validation boundary and accessible interaction. No details are stored or sent to a real clinic.",
    boundary: "This is a request for contact, not appointment scheduling or a medical record.", back: "Back to home",
  };
  const otherLocale: RouteLocale = locale === "fa" ? "en" : "fa";

  return (
    <PageFrame id="top">
      <a className="skip-link" href="#main-content">{locale === "fa" ? "پرش به محتوای اصلی" : "Skip to main content"}</a>
      <ProductionHeader clinic={context.clinic} locale={locale} alternateHref={`/${otherLocale}/consultation`} />
      <FixtureNotice clinic={context.clinic} locale={locale} />
      <main id="main-content" className="cdi-consultation-main">
        <ContentSection className="cdi-production-section cdi-consultation-layout" aria-labelledby="consultation-title">
          <div className="cdi-consultation-intro">
            <p className="type-label cdi-eyebrow">{text.eyebrow}</p>
            <h1 className="type-h1" id="consultation-title">{text.title}</h1>
            <p className="type-body-large">{text.body}</p>
            <p className="cdi-content-boundary">{text.boundary}</p>
            <ActionLink variant="text" href={`/${locale}`}>{text.back}</ActionLink>
          </div>
          <div className="cdi-consultation-form-panel">
            <ConsultationForm clinic={context.clinic} locale={locale} options={options} defaultTreatmentId={defaultTreatmentId} status={formStatus} invalidFields={invalidFields} />
          </div>
        </ContentSection>
      </main>
      <footer className="cdi-production-footer"><span>{context.clinic.fixtureNotice}</span></footer>
    </PageFrame>
  );
}
