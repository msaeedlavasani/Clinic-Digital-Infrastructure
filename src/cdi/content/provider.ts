import { eligibleRepresentation, resolveCapability } from "../runtime/capabilities";
import type { ClinicContext, ConcernPath, DeviceContent, DoctorContent, HomeContent, LocalizedEntity, LocalizedRepresentation, RouteLocale, TechnologyContent, TreatmentContent } from "../runtime/model";
import { concernEntities, deviceEntities, doctorEntities, homeContent, homeSeo, technologyEntities, treatmentEntities } from "./fixture-content";
import { REFERENCE_CLINIC } from "../runtime/clinic-fixtures";

export interface ContentProvider {
  getHome(clinic: ClinicContext, locale: RouteLocale): { content: HomeContent; seo: { title: string; description: string } } | null;
  listPublicTreatments(clinic: ClinicContext, locale: RouteLocale): Array<{ capabilityId: string; treatmentId: string; representation: LocalizedRepresentation<TreatmentContent> }>;
  listPublicConcernPaths(clinic: ClinicContext, locale: RouteLocale): ConcernPath[];
  getTreatmentBySlug(clinic: ClinicContext, locale: RouteLocale, slug: string): { capabilityId: string; entity: LocalizedEntity<TreatmentContent>; representation: LocalizedRepresentation<TreatmentContent> } | null;
  getTreatmentById(clinic: ClinicContext, locale: RouteLocale, id: string): LocalizedRepresentation<TreatmentContent> | null;
  getDoctor(clinic: ClinicContext, locale: RouteLocale, id: string): LocalizedRepresentation<DoctorContent> | null;
  getTechnology(clinic: ClinicContext, locale: RouteLocale, id: string): LocalizedRepresentation<TechnologyContent> | null;
  getDevice(clinic: ClinicContext, locale: RouteLocale, id: string): LocalizedRepresentation<DeviceContent> | null;
}

function published<T>(entities: readonly LocalizedEntity<T>[], id: string, locale: RouteLocale) {
  const entity = entities.find((candidate) => candidate.id === id);
  if (!entity) return null;
  return eligibleRepresentation(entity.representations, locale);
}

export class LocalFixtureContentProvider implements ContentProvider {
  getHome(clinic: ClinicContext, locale: RouteLocale) {
    if (clinic.id !== REFERENCE_CLINIC.id || !clinic.publishedContentReferences.includes("HOME.REFERENCE_EXPERIENCE")) return null;
    return { content: homeContent[locale], seo: homeSeo[locale] };
  }

  listPublicTreatments(clinic: ClinicContext, locale: RouteLocale) {
    if (clinic.id !== REFERENCE_CLINIC.id) return [];
    return clinic.capabilityManifest.flatMap((entry) => {
      if (!resolveCapability(entry)?.canDiscover) return [];
      if (!clinic.publishedContentReferences.includes(entry.treatmentId)) return [];
      const entity = treatmentEntities.find((candidate) => candidate.id === entry.treatmentId);
      const representation = entity && eligibleRepresentation(entity.representations, locale);
      return entity && representation ? [{ capabilityId: entry.capabilityId, treatmentId: entity.id, representation }] : [];
    });
  }

  listPublicConcernPaths(clinic: ClinicContext, locale: RouteLocale): ConcernPath[] {
    if (clinic.id !== REFERENCE_CLINIC.id) return [];
    const discoverable = this.listPublicTreatments(clinic, locale);
    return concernEntities.flatMap((entity) => {
      if (!clinic.publishedContentReferences.includes(entity.id)) return [];
      const representation = eligibleRepresentation(entity.representations, locale);
      if (!representation) return [];
      const related = discoverable.filter((treatment) => treatment.representation.content.concernIds.includes(entity.id));
      return related.length > 0 ? [{ concernId: entity.id, representation, treatments: related }] : [];
    });
  }

  getTreatmentBySlug(clinic: ClinicContext, locale: RouteLocale, slug: string) {
    if (clinic.id !== REFERENCE_CLINIC.id) return null;
    let localizedSlug = slug;
    try { localizedSlug = decodeURIComponent(slug); } catch { /* invalid encoding resolves to no entity */ }
    const entity = treatmentEntities.find((candidate) => candidate.representations[locale]?.slug === localizedSlug);
    if (!entity) return null;
    if (!clinic.publishedContentReferences.includes(entity.id)) return null;
    const entry = clinic.capabilityManifest.find((capability) => capability.treatmentId === entity.id);
    const representation = eligibleRepresentation(entity.representations, locale);
    const capability = resolveCapability(entry);
    if (!capability?.canOffer || !representation) return null;
    return { capabilityId: capability.capabilityId, entity, representation };
  }

  getTreatmentById(clinic: ClinicContext, locale: RouteLocale, id: string) {
    if (clinic.id !== REFERENCE_CLINIC.id || !clinic.publishedContentReferences.includes(id)) return null;
    return published(treatmentEntities, id, locale);
  }

  getDoctor(clinic: ClinicContext, locale: RouteLocale, id: string) {
    if (clinic.id !== REFERENCE_CLINIC.id || !clinic.publishedContentReferences.includes(id)) return null;
    return published(doctorEntities, id, locale);
  }

  getTechnology(clinic: ClinicContext, locale: RouteLocale, id: string) {
    if (clinic.id !== REFERENCE_CLINIC.id || !clinic.publishedContentReferences.includes(id)) return null;
    return published(technologyEntities, id, locale);
  }

  getDevice(clinic: ClinicContext, locale: RouteLocale, id: string) {
    if (clinic.id !== REFERENCE_CLINIC.id || !clinic.publishedContentReferences.includes(id)) return null;
    return published(deviceEntities, id, locale);
  }
}

export const contentProvider: ContentProvider = new LocalFixtureContentProvider();
