import type { RouteLocale } from "../runtime/model";

export type ConsultationPayload = {
  clinicId: string;
  locale: RouteLocale;
  name: string;
  phone: string;
  treatmentId: string;
};

export interface LeadSubmissionBoundary {
  submit(payload: ConsultationPayload): Promise<{ accepted: boolean; reference?: string }>;
}

/** Local validation adapter. It intentionally neither persists nor logs contact details. */
export const localValidationLeadAdapter: LeadSubmissionBoundary = {
  async submit() {
    if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
      return { accepted: false };
    }
    return { accepted: true, reference: "LOCAL-VALIDATION-ONLY" };
  },
};
