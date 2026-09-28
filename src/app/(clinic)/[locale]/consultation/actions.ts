"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { localValidationLeadAdapter } from "@/cdi/consultation/lead-boundary";
import { contentProvider } from "@/cdi/content/provider";
import { localFixtureClinicProvider } from "@/cdi/runtime/clinic-provider";
import { resolveCapability } from "@/cdi/runtime/capabilities";
import { resolveLocaleContext } from "@/cdi/runtime/locales";
import type { RouteLocale } from "@/cdi/runtime/model";

export async function submitConsultation(
  clinicId: string,
  routeLocale: RouteLocale,
  formData: FormData,
): Promise<void> {
  const requestHeaders = await headers();
  const resolution = localFixtureClinicProvider.resolveHost(requestHeaders.get("host") ?? "");
  if (resolution.status !== "KNOWN" || resolution.clinic.id !== clinicId) redirect(`/${routeLocale}/consultation?form=unavailable`);
  if (!resolveLocaleContext(routeLocale, resolution.clinic.supportedLocales)) redirect(`/${routeLocale}/consultation?form=unavailable`);
  if (!resolution.clinic.contact.consultationEnabled) redirect(`/${routeLocale}/consultation?form=unavailable`);

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const treatmentId = String(formData.get("treatmentId") ?? "").trim();
  const errors: string[] = [];

  if (name.length < 2 || name.length > 80) errors.push("name");
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 18 || !/^[+\d() .-]+$/.test(phone)) errors.push("phone");

  const entry = resolution.clinic.capabilityManifest.find((item) => item.treatmentId === treatmentId);
  const content = resolveCapability(entry)?.canOffer
    ? contentProvider.getTreatmentById(resolution.clinic, routeLocale, treatmentId)
    : null;
  if (!content) errors.push("treatmentId");

  if (errors.length > 0) {
    const query = new URLSearchParams({ form: "invalid", fields: [...new Set(errors)].join(",") });
    redirect(`/${routeLocale}/consultation?${query.toString()}`);
  }
  const result = await localValidationLeadAdapter.submit({ clinicId, locale: routeLocale, name, phone, treatmentId });
  redirect(`/${routeLocale}/consultation?form=${result.accepted ? "success" : "unavailable"}`);
}
