import { CLINIC_FIXTURES } from "./clinic-fixtures";
import type { ClinicContext } from "./model";

export type ClinicResolution =
  | { status: "KNOWN"; clinic: ClinicContext; matchedDomain: string }
  | { status: "UNKNOWN"; normalizedHost: string };

export interface ClinicProvider {
  resolveHost(host: string): ClinicResolution;
  getById(id: string): ClinicContext | null;
}

export function normalizeHost(input: string): string {
  const host = input.trim().toLowerCase().replace(/\.$/, "");
  if (!host) return "";
  if (host.startsWith("[")) return host.slice(1, host.indexOf("]")) || host;
  return host.replace(/:\d+$/, "");
}

export const localFixtureClinicProvider: ClinicProvider = {
  resolveHost(host) {
    const normalizedHost = normalizeHost(host);
    const clinic = CLINIC_FIXTURES.find((candidate) =>
      candidate.domains.some((domain) => normalizeHost(domain) === normalizedHost),
    );
    if (clinic) return { status: "KNOWN", clinic, matchedDomain: normalizedHost };

    if (["localhost", "127.0.0.1", "::1"].includes(normalizedHost)) {
      const fixture = CLINIC_FIXTURES[0];
      return { status: "KNOWN", clinic: fixture, matchedDomain: "localhost (development fixture)" };
    }

    return { status: "UNKNOWN", normalizedHost };
  },
  getById(id) {
    return CLINIC_FIXTURES.find((clinic) => clinic.id === id) ?? null;
  },
};
