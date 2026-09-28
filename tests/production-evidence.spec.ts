import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const evidence = join(process.cwd(), "evidence/production-vertical-slice-01");

async function captureRuntimeSnapshot(page: import("@playwright/test").Page) {
  return page.evaluate(() => ({
    viewport: { width: window.innerWidth, height: window.innerHeight },
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    images: Array.from(document.images).map((image) => ({
      src: new URL(image.currentSrc || image.src, document.baseURI).pathname,
      loading: image.loading,
      fetchPriority: image.fetchPriority,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
    })),
    resources: performance.getEntriesByType("resource").map((entry) => {
      const resource = entry as PerformanceResourceTiming;
      return {
        name: new URL(resource.name).pathname,
        initiatorType: resource.initiatorType,
        durationMs: Math.round(resource.duration),
        transferSize: resource.transferSize,
        encodedBodySize: resource.encodedBodySize,
      };
    }).filter((resource) => resource.name.startsWith("/_next/") || /\.(svg|png|jpg|webp|woff2?)$/i.test(resource.name)),
    clientModuleSources: Array.from(document.scripts).map((script) => script.src).filter(Boolean).map((source) => new URL(source).pathname),
  }));
}

test("capture production vertical slice rendered evidence", async ({ page }) => {
  await mkdir(evidence, { recursive: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fa");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("آرامش");
  await page.screenshot({ path: join(evidence, "fa-home-mobile-390x844.png") });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");
  await page.screenshot({ path: join(evidence, "en-home-desktop-1440x900.png") });
  const initialHomeRuntime = await captureRuntimeSnapshot(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fa/treatments/%D9%84%DB%8C%D8%B2%D8%B1-%D9%85%D9%88%D9%87%D8%A7%DB%8C-%D9%86%D8%A7%D8%AE%D9%88%D8%A7%D8%B3%D8%AA%D9%87");
  await expect(page.locator('[data-signature="light-focus-precision"]')).toBeVisible();
  await page.locator("[data-composition='treatment-signature']").screenshot({ path: join(evidence, "fa-treatment-signature-mobile-390x844.png") });
  await page.locator("#treatment-information").screenshot({ path: join(evidence, "fa-treatment-information-mobile.png") });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/treatments/light-based-care");
  await page.screenshot({ path: join(evidence, "en-treatment-desktop-1440x900.png") });
  const trustSections = page.locator(".cdi-trust-section");
  await trustSections.nth(0).screenshot({ path: join(evidence, "en-doctor-trust-desktop.png") });
  await trustSections.nth(1).screenshot({ path: join(evidence, "en-technology-device-trust-desktop.png") });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fa/consultation");
  await page.screenshot({ path: join(evidence, "fa-consultation-mobile-390x844.png"), fullPage: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/consultation");
  await page.screenshot({ path: join(evidence, "en-consultation-desktop-1440x900.png") });

  await page.setViewportSize({ width: 390, height: 500 });
  await page.goto("/fa/consultation");
  const submit = page.getByRole("button", { name: "ارسال درخواست نمونه" });
  await submit.scrollIntoViewIfNeeded();
  await expect(submit).toBeInViewport();
  await page.screenshot({ path: join(evidence, "fa-consultation-short-height-390x500.png") });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/treatments/light-based-care");
  await page.locator("[data-composition='treatment-signature']").screenshot({ path: join(evidence, "en-treatment-signature-reduced-motion.png") });

  const reducedMotionTreatmentRuntime = await captureRuntimeSnapshot(page);
  await writeFile(join(evidence, "runtime-media-report.json"), `${JSON.stringify({
    capturedAgainst: process.env.CDI_TEST_PORT === "4180" ? "local production build" : "Playwright configured runtime",
    snapshots: {
      initialHome: initialHomeRuntime,
      reducedMotionTreatment: reducedMotionTreatmentRuntime,
    },
  }, null, 2)}\n`);
});
