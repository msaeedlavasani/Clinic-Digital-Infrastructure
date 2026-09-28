import type { ReactNode } from "react";
import "@/app/globals.css";
import "@/design-system/styles/production.css";

export default function EntryRootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" dir="ltr" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
