import "@fontsource-variable/vazirmatn";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CDI Design System Validation Harness",
  description: "Internal rendered validation surface for shared CDI Design System foundations and composition contracts.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
