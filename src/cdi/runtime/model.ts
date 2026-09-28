export type RouteLocale = "fa" | "en";
export type LocaleDirection = "rtl" | "ltr";

export type LocaleContext = {
  routeCode: RouteLocale;
  languageTag: "fa-IR" | "en";
  direction: LocaleDirection;
};

export type ClinicContext = {
  id: string;
  slug: string;
  displayName: string;
  fixtureNotice: string;
  domains: string[];
  defaultLocale: RouteLocale;
  supportedLocales: RouteLocale[];
  visualWorldId: string;
  indexable: boolean;
  brand: { name: string; mark: string };
  contact: { publicPhone: string; consultationEnabled: boolean };
  publishedContentReferences: string[];
  capabilityManifest: CapabilityManifestEntry[];
};

export type ClinicalAvailability = "AVAILABLE" | "UNAVAILABLE" | "COMING_SOON";
export type SurfaceVisibility = "VISIBLE" | "HIDDEN";
export type PublicationState = "NOT_STARTED" | "DRAFT" | "REVIEW_REQUIRED" | "READY" | "PUBLISHED";

export type CapabilityManifestEntry = {
  capabilityId: string;
  clinicalAvailability: ClinicalAvailability;
  visibility: SurfaceVisibility;
  treatmentId: string;
  doctorIds: string[];
  technologyIds: string[];
  deviceIds: string[];
};

export type LocalizedRepresentation<T> = {
  locale: RouteLocale;
  publication: PublicationState;
  slug: string;
  seo: { title: string; description: string };
  content: T;
};

export type LocalizedEntity<T> = {
  id: string;
  representations: Partial<Record<RouteLocale, LocalizedRepresentation<T>>>;
};

export type TreatmentContent = {
  title: string;
  summary: string;
  overview: string;
  concernIds: string[];
  facts: Array<{ label: string; value: string }>;
  sections: Array<{ heading: string; body: string }>;
};

export type DoctorContent = {
  name: string;
  title: string;
  summary: string;
  credentialNotice: string;
};

export type TechnologyContent = {
  name: string;
  summary: string;
};

export type DeviceContent = {
  name: string;
  summary: string;
  ownership: "NOT_ASSERTED" | "CLINIC_CONFIGURED";
};

export type HomeContent = {
  title: string;
  lede: string;
  discoveryTitle: string;
  discoveryPrompt: string;
};

export type ConcernContent = {
  label: string;
  description: string;
};

export type ConcernPath = {
  concernId: string;
  representation: LocalizedRepresentation<ConcernContent>;
  treatments: Array<{ capabilityId: string; treatmentId: string; representation: LocalizedRepresentation<TreatmentContent> }>;
};

export type CapabilityResolution = {
  capabilityId: string;
  treatmentId: string;
  canOffer: boolean;
  canDiscover: boolean;
  doctorIds: string[];
  technologyIds: string[];
  deviceIds: string[];
};
