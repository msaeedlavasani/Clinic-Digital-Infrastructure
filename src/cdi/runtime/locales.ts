import type { LocaleContext, RouteLocale } from "./model";

const LOCALE_CONTEXTS: Record<RouteLocale, LocaleContext> = {
  fa: { routeCode: "fa", languageTag: "fa-IR", direction: "rtl" },
  en: { routeCode: "en", languageTag: "en", direction: "ltr" },
};

export function resolveLocaleContext(
  routeCode: string,
  supportedLocales: RouteLocale[],
): LocaleContext | null {
  if (routeCode !== "fa" && routeCode !== "en") return null;
  if (!supportedLocales.includes(routeCode)) return null;
  return LOCALE_CONTEXTS[routeCode];
}

export function localeContextFor(code: RouteLocale): LocaleContext {
  return LOCALE_CONTEXTS[code];
}
