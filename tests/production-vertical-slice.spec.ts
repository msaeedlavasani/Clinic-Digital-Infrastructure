import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { normalizeHost, localFixtureClinicProvider } from "@/cdi/runtime/clinic-provider";
import { resolveLocaleContext } from "@/cdi/runtime/locales";
import { resolveCapability, canResolvePublicTreatment } from "@/cdi/runtime/capabilities";
import { REFERENCE_CLINIC } from "@/cdi/runtime/clinic-fixtures";
import { contentProvider } from "@/cdi/content/provider";

test("clinic resolution is host-scoped and unknown hosts fail closed", () => {
  expect(normalizeHost(" Clinic-01.CDI.Test:443 ")).toBe("clinic-01.cdi.test");
  expect(localFixtureClinicProvider.resolveHost("localhost:4179").status).toBe("KNOWN");
  expect(localFixtureClinicProvider.resolveHost("clinic-01.cdi.test").status).toBe("KNOWN");
  expect(localFixtureClinicProvider.resolveHost("unknown.example")).toEqual({ status: "UNKNOWN", normalizedHost: "unknown.example" });
});

test("locale metadata and publication are explicit; slugs never become identity", () => {
  expect(resolveLocaleContext("fa", REFERENCE_CLINIC.supportedLocales)).toMatchObject({ languageTag: "fa-IR", direction: "rtl" });
  expect(resolveLocaleContext("en", REFERENCE_CLINIC.supportedLocales)).toMatchObject({ languageTag: "en", direction: "ltr" });
  expect(resolveLocaleContext("ar", REFERENCE_CLINIC.supportedLocales)).toBeNull();
  const fa = contentProvider.getTreatmentBySlug(REFERENCE_CLINIC, "fa", "لیزر-موهای-ناخواسته");
  const en = contentProvider.getTreatmentBySlug(REFERENCE_CLINIC, "en", "light-based-care");
  expect(fa?.entity.id).toBe("TREATMENT.LASER_HAIR_REMOVAL");
  expect(en?.entity.id).toBe(fa?.entity.id);
  expect(contentProvider.getTreatmentBySlug(REFERENCE_CLINIC, "en", "draft-skin-treatment")).toBeNull();
  expect(contentProvider.getTreatmentBySlug(REFERENCE_CLINIC, "fa", "laser-hair-removal")).toBeNull();
});

test("all capability axes affect public surfaces independently", () => {
  const available = REFERENCE_CLINIC.capabilityManifest.find((item) => item.capabilityId === "LASER_HAIR_REMOVAL");
  const hidden = REFERENCE_CLINIC.capabilityManifest.find((item) => item.capabilityId === "BOTULINUM_TOXIN_TREATMENT");
  const unavailable = REFERENCE_CLINIC.capabilityManifest.find((item) => item.capabilityId === "HAIR_TRANSPLANT");
  const comingSoon = REFERENCE_CLINIC.capabilityManifest.find((item) => item.capabilityId === "SKIN_REJUVENATION");
  expect(resolveCapability(available)).toMatchObject({ canOffer: true, canDiscover: true });
  expect(resolveCapability(hidden)).toMatchObject({ canOffer: true, canDiscover: false });
  expect(resolveCapability(unavailable)).toMatchObject({ canOffer: false, canDiscover: false });
  expect(resolveCapability(comingSoon)).toMatchObject({ canOffer: false, canDiscover: false });
  expect(canResolvePublicTreatment(unavailable, true)).toBe(false);
  expect(canResolvePublicTreatment(available, false)).toBe(false);
});

test("home resolves fixture clinic, locale, published discovery, and context metadata", async ({ page }) => {
  await page.goto("/fa");
  await expect(page.locator("html")).toHaveAttribute("lang", "fa-IR");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("آرامش");
  await expect(page.getByText("Validation fixture only", { exact: false })).toBeVisible();
  await expect(page.locator('[data-capability="LASER_HAIR_REMOVAL"]')).toBeVisible();
  await expect(page.locator('[data-capability="BOTULINUM_TOXIN_TREATMENT"]')).toHaveCount(0);
  await expect(page.locator('[data-capability="HAIR_TRANSPLANT"]')).toHaveCount(0);
  await expect(page.locator('[data-capability="SKIN_REJUVENATION"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://clinic-01.cdi.test/fa");
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://clinic-01.cdi.test/en");
  await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.getByText("این بخش تشخیص یا پیشنهاد مناسب‌بودن نیست.", { exact: false })).toBeVisible();
});

test("semantic treatment route keeps medical facts, provider, technology, and device distinct", async ({ page }) => {
  await page.goto("/en/treatments/light-based-care");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { level: 1, name: "Light, focus, precision" })).toBeVisible();
  await expect(page.locator('[data-signature="light-focus-precision"]')).toBeVisible();
  await expect(page.getByText("No real clinical facts are included", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Example clinician" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Light-based technology" })).toBeVisible();
  await expect(page.getByText("Generic equipment platform")).toBeVisible();
  await expect(page.getByText("No clinic device association or ownership is asserted.")).toBeVisible();
  await expect(page.locator('[data-world="dark-cinematic"]')).toBeVisible();
  await expect(page.locator('link[rel="alternate"][hreflang="fa-IR"]')).toHaveAttribute("href", /\/fa\/treatments\//);
  await expect(page.locator("img[loading='lazy']")).toHaveCount(2);
});

test("hidden published treatment is directly addressable but absent from discovery; draft stays private", async ({ page }) => {
  await page.goto("/en/treatments/botulinum-toxin-fixture");
  await expect(page.getByRole("heading", { name: "Hidden treatment fixture" })).toBeVisible();
  await page.goto("/en/treatments/draft-skin-treatment");
  await expect(page.getByRole("heading", { name: "This page is unavailable" })).toBeVisible();
  await expect(page.getByText("Unpublished fixture", { exact: false })).toHaveCount(0);
  await page.goto("/en/treatments/hair-transplant");
  await expect(page.getByRole("heading", { name: "This page is unavailable" })).toBeVisible();
});

test("consultation rejects invalid server input and accepts a local validation request", async ({ page }) => {
  await page.goto("/fa/consultation?treatment=TREATMENT.LASER_HAIR_REMOVAL");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("گفت‌وگویی");
  await page.locator("form").evaluate((form: HTMLFormElement) => { form.noValidate = true; });
  await page.getByRole("button", { name: "ارسال درخواست نمونه" }).click();
  await expect(page.locator(".cdi-form-status[role='alert']")).toContainText("موارد مشخص‌شده");
  await expect(page.locator("#consultation-name")).toHaveAttribute("aria-invalid", "true");
  await page.getByLabel("نام").fill("نمونهٔ کاربر");
  await page.getByLabel("شماره تماس").fill("+98 912 345 6789");
  await page.getByLabel("موضوع موردنظر").selectOption("TREATMENT.LASER_HAIR_REMOVAL");
  await page.getByRole("button", { name: "ارسال درخواست نمونه" }).click();
  await expect(page.getByRole("status")).toContainText("هیچ اطلاعاتی ذخیره یا ارسال نشده است");
});

test("consultation form progressively submits without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/en/consultation");
  await expect(page.getByRole("heading", { name: "A clear conversation, without pressure" })).toBeVisible();
  await page.getByLabel("Name").fill("Validation person");
  await page.getByLabel("Contact number").fill("+1 415 555 0198");
  await page.getByLabel("What would you like to discuss?").selectOption("TREATMENT.LASER_HAIR_REMOVAL");
  await page.getByRole("button", { name: "Submit validation request" }).click();
  await expect(page.locator(".cdi-form-status[role='status']")).toContainText("No details were stored or sent");
  await context.close();
});

test("Home, treatment, doctor, and technology information are present without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/fa");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("آرامش");
  await page.goto("/en/treatments/light-based-care");
  await expect(page.getByRole("heading", { name: "Light-based care" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Example clinician" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Light-based technology" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Request a consultation" }).first()).toHaveAttribute("href", /\/en\/consultation/);
  await context.close();
});

test("browser history, direct deep links, and refresh work across semantic routes", async ({ page }) => {
  await page.goto("/fa");
  await page.locator('[data-capability="LASER_HAIR_REMOVAL"] a').click();
  await expect(page).toHaveURL(/\/fa\/treatments\//);
  await page.reload();
  await expect(page.getByRole("heading", { name: "نور، تمرکز، دقت" })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/fa$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/fa\/treatments\//);
});

test("Home, treatment, and consultation stay overflow-free in both locales at every required viewport", async ({ page }) => {
  test.setTimeout(60_000);
  const viewports = [
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ];
  const routes = [
    { locale: "fa", direction: "rtl", path: "/fa" },
    { locale: "en", direction: "ltr", path: "/en" },
    { locale: "fa", direction: "rtl", path: "/fa/treatments/%D9%84%DB%8C%D8%B2%D8%B1-%D9%85%D9%88%D9%87%D8%A7%DB%8C-%D9%86%D8%A7%D8%AE%D9%88%D8%A7%D8%B3%D8%AA%D9%87" },
    { locale: "en", direction: "ltr", path: "/en/treatments/light-based-care" },
    { locale: "fa", direction: "rtl", path: "/fa/consultation" },
    { locale: "en", direction: "ltr", path: "/en/consultation" },
  ];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route.path);
      await expect(page.locator("html")).toHaveAttribute("lang", route.locale === "fa" ? "fa-IR" : "en");
      await expect(page.locator("html")).toHaveAttribute("dir", route.direction);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route.path} at ${viewport.width}px`).toBe(true);
    }
  }
});

test("the 390 by 500 consultation remains in normal flow with a reachable submit action", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 500 });
  await page.goto("/fa/consultation");
  const submit = page.getByRole("button", { name: "ارسال درخواست نمونه" });
  await submit.scrollIntoViewIfNeeded();
  const box = await submit.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeLessThan(500);
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeGreaterThan(500);
});

test("reduced motion preserves signature meaning and core content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/treatments/light-based-care");
  await expect(page.getByRole("heading", { name: "Light, focus, precision" })).toBeVisible();
  await expect(page.locator('[data-signature="light-focus-precision"]')).toBeVisible();
  const animation = await page.locator(".cdi-treatment-signature__beam").evaluate((node) => getComputedStyle(node).animationName);
  expect(animation).toBe("none");
});

test("production routes expose semantic landmarks, labels, focus and no serious axe violations", async ({ page }) => {
  await page.goto("/fa/consultation");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByLabel("نام")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus-visible")).toHaveCount(1);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations.filter((item) => item.impact === "critical" || item.impact === "serious")).toEqual([]);
});

test("clinic resolver rejects an unknown request host", async ({ request }) => {
  const response = await request.get("/fa", { headers: { host: "unknown.example" } });
  expect(response.status()).toBe(404);
});
