import { notFound, redirect } from "next/navigation";
import { resolveRequestClinic } from "@/cdi/runtime/request-context";

export const dynamic = "force-dynamic";

export default async function EntryPage() {
  const resolved = await resolveRequestClinic();
  if (resolved.status !== "KNOWN") notFound();
  redirect(`/${resolved.clinic.defaultLocale}`);
}
