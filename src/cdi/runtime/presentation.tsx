import type { ReactNode } from "react";
import { SiteHeader } from "@/design-system/components/navigation";
import type { ClinicContext, RouteLocale } from "./model";

const labels = {
  fa: { home: "خانه", treatments: "خدمات", consultation: "درخواست مشاوره", locale: "زبان" },
  en: { home: "Home", treatments: "Treatments", consultation: "Request a consultation", locale: "Language" },
} as const;

export function ProductionHeader({
  clinic,
  locale,
  alternateHref,
}: {
  clinic: ClinicContext;
  locale: RouteLocale;
  alternateHref?: string;
}) {
  const text = labels[locale];
  const homeHref = `/${locale}`;
  const consultationHref = `/${locale}/consultation`;
  const alternate = locale === "fa" ? "en" : "fa";
  const localeName = locale === "fa" ? "English" : "فارسی";
  return (
    <div className="cdi-production-header">
      <SiteHeader
        brand={<><span className="navigation-brand__mark" aria-hidden="true">{clinic.brand.mark}</span><span>{clinic.brand.name}</span></>}
        brandHref={`${homeHref}#top`}
        items={[
          { label: text.home, href: homeHref },
          { label: text.treatments, href: `${homeHref}#treatment-discovery` },
        ]}
        action={{ label: text.consultation, href: consultationHref }}
        trailing={<nav className="cdi-locale-switch" aria-label={text.locale}>
        <a href={alternateHref ?? `/${alternate}`} lang={alternate === "fa" ? "fa-IR" : "en"} dir={alternate === "fa" ? "rtl" : "ltr"}>
          {localeName}
        </a>
      </nav>}
      />
    </div>
  );
}

export function FixtureNotice({ clinic, locale }: { clinic: ClinicContext; locale: RouteLocale }) {
  return <p className="cdi-fixture-notice" role="note">{clinic.fixtureNotice}{locale === "fa" ? " · بدون ادعای ارائهٔ خدمات واقعی" : " · No real care is offered."}</p>;
}

export function PageFrame({ children, id }: { children: ReactNode; id?: string }) {
  return <div className="cdi-production" id={id}>{children}</div>;
}

export function BackToHome({ locale, label }: { locale: RouteLocale; label: string }) {
  return <a className="cdi-link" href={`/${locale}`}>{label}</a>;
}
