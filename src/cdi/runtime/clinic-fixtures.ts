import type { ClinicContext } from "./model";

/** Local, non-production provisioning record. Domains are reserved test names. */
export const REFERENCE_CLINIC: ClinicContext = {
  id: "clinic-fixture-01",
  slug: "reference-clinic-01",
  displayName: "CDI Reference Clinic 01",
  fixtureNotice: "Validation fixture only — not a real clinic or care provider.",
  domains: ["clinic-01.cdi.test"],
  defaultLocale: "fa",
  supportedLocales: ["fa", "en"],
  visualWorldId: "dark-cinematic",
  indexable: false,
  brand: { name: "CDI Reference Fixture", mark: "C" },
  contact: { publicPhone: "+98 21 0000 0000", consultationEnabled: true },
  publishedContentReferences: [
    "HOME.REFERENCE_EXPERIENCE",
    "CONCERN.UNWANTED_HAIR",
    "TREATMENT.LASER_HAIR_REMOVAL",
    "TREATMENT.BOTULINUM_TOXIN_TREATMENT",
    "DOCTOR.EXAMPLE_CLINICIAN_01",
    "TECHNOLOGY.LASER",
    "DEVICE.DEMO_LIGHT_PLATFORM",
  ],
  capabilityManifest: [
    {
      capabilityId: "LASER_HAIR_REMOVAL",
      clinicalAvailability: "AVAILABLE",
      visibility: "VISIBLE",
      treatmentId: "TREATMENT.LASER_HAIR_REMOVAL",
      doctorIds: ["DOCTOR.EXAMPLE_CLINICIAN_01"],
      technologyIds: ["TECHNOLOGY.LASER"],
      deviceIds: ["DEVICE.DEMO_LIGHT_PLATFORM"],
    },
    {
      capabilityId: "BOTULINUM_TOXIN_TREATMENT",
      clinicalAvailability: "AVAILABLE",
      visibility: "HIDDEN",
      treatmentId: "TREATMENT.BOTULINUM_TOXIN_TREATMENT",
      doctorIds: ["DOCTOR.EXAMPLE_CLINICIAN_01"],
      technologyIds: [],
      deviceIds: [],
    },
    {
      capabilityId: "HAIR_TRANSPLANT",
      clinicalAvailability: "UNAVAILABLE",
      visibility: "VISIBLE",
      treatmentId: "TREATMENT.HAIR_TRANSPLANT",
      doctorIds: [],
      technologyIds: [],
      deviceIds: [],
    },
    {
      capabilityId: "SKIN_REJUVENATION",
      clinicalAvailability: "COMING_SOON",
      visibility: "VISIBLE",
      treatmentId: "TREATMENT.SKIN_REJUVENATION",
      doctorIds: [],
      technologyIds: [],
      deviceIds: [],
    },
  ],
};

export const CLINIC_FIXTURES: readonly ClinicContext[] = [REFERENCE_CLINIC];
