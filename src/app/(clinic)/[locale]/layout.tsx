import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";
import { INITIAL_WORLD_ID, VISUAL_WORLDS, worldStyleVariables } from "@/design-system/tokens/visual-worlds";
import { resolveRequestClinic } from "@/cdi/runtime/request-context";
import { resolveLocaleContext } from "@/cdi/runtime/locales";
import "@/app/globals.css";
import "@/design-system/styles/production.css";

export default async function ClinicRootLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const resolved = await resolveRequestClinic();
  if (resolved.status !== "KNOWN") notFound();
  const locale = resolveLocaleContext(routeLocale, resolved.clinic.supportedLocales);
  const world = VISUAL_WORLDS[resolved.clinic.visualWorldId] ?? VISUAL_WORLDS[INITIAL_WORLD_ID];
  if (!locale || !world) notFound();
  const theme = worldStyleVariables(world) as CSSProperties;

  return (
    <html lang={locale.languageTag} dir={locale.direction} data-scroll-behavior="smooth">
      <body>
        <div className="design-system-root" data-world={world.id} style={theme}>
          {children}
        </div>
      </body>
    </html>
  );
}
