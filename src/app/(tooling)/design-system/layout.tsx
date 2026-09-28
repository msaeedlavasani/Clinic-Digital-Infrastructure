import type { ReactNode } from "react";
import "@/app/globals.css";

export const metadata = {
  title: "CDI Design System Validation Harness",
  description: "Internal rendered validation surface for shared CDI Design System foundations and composition contracts.",
  robots: { index: false, follow: false },
};

export default function HarnessRootLayout({ children }: { children: ReactNode }) {
  return <html lang="fa-IR" dir="rtl" data-scroll-behavior="smooth"><body>{children}</body></html>;
}
