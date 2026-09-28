import type { Metadata } from "next";
import type { ClinicContext, LocaleContext, LocalizedRepresentation, RouteLocale } from "./model";

export function clinicMetadata(
  clinic: ClinicContext,
  locale: LocaleContext,
  title: string,
  description: string,
  path: string,
  availableAlternates: Partial<Record<RouteLocale, string>>,
): Metadata {
  const origin = `https://${clinic.domains[0]}`;
  const canonical = new URL(path, origin).toString();
  const languages = Object.fromEntries(
    Object.entries(availableAlternates).map(([key, localizedPath]) => [key === "fa" ? "fa-IR" : key, new URL(localizedPath!, origin).toString()]),
  );
  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: { title, description, type: "website", url: canonical, locale: locale.languageTag },
    robots: { index: clinic.indexable, follow: clinic.indexable },
  };
}

export function representationAlternates<T>(
  clinic: ClinicContext,
  entity: { representations: Partial<Record<RouteLocale, LocalizedRepresentation<T>>> },
  prefix: string,
): Partial<Record<RouteLocale, string>> {
  return Object.fromEntries(
    clinic.supportedLocales.flatMap((locale) => {
      const representation = entity.representations[locale];
      return representation?.publication === "PUBLISHED"
        ? [[locale, `/${locale}${prefix}/${encodeURIComponent(representation.slug)}`]]
        : [];
    }),
  );
}
