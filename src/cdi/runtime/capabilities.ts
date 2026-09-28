import type { CapabilityManifestEntry, CapabilityResolution, LocalizedRepresentation, RouteLocale } from "./model";

export function resolveCapability(entry: CapabilityManifestEntry | undefined): CapabilityResolution | null {
  if (!entry) return null;
  const canOffer = entry.clinicalAvailability === "AVAILABLE";
  return {
    capabilityId: entry.capabilityId,
    treatmentId: entry.treatmentId,
    canOffer,
    canDiscover: canOffer && entry.visibility === "VISIBLE",
    doctorIds: entry.doctorIds,
    technologyIds: entry.technologyIds,
    deviceIds: entry.deviceIds,
  };
}

export function eligibleRepresentation<T>(
  representations: Partial<Record<RouteLocale, LocalizedRepresentation<T>>>,
  locale: RouteLocale,
): LocalizedRepresentation<T> | null {
  const representation = representations[locale];
  return representation?.publication === "PUBLISHED" ? representation : null;
}

export function canResolvePublicTreatment(
  entry: CapabilityManifestEntry | undefined,
  isPublished: boolean,
): boolean {
  return Boolean(entry && entry.clinicalAvailability === "AVAILABLE" && isPublished);
}
