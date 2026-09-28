import { headers } from "next/headers";
import { localFixtureClinicProvider } from "./clinic-provider";

export async function resolveRequestClinic() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "";
  return localFixtureClinicProvider.resolveHost(host);
}
