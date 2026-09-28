import { resolveRequestClinic } from "./request-context";
import { resolveLocaleContext } from "./locales";
import type { LocaleContext } from "./model";

export async function resolvePublicPageContext(routeLocale: string): Promise<{
  clinic: import("./model").ClinicContext;
  locale: LocaleContext;
} | null> {
  const clinicResolution = await resolveRequestClinic();
  if (clinicResolution.status !== "KNOWN") return null;
  const locale = resolveLocaleContext(routeLocale, clinicResolution.clinic.supportedLocales);
  if (!locale) return null;
  return { clinic: clinicResolution.clinic, locale };
}
