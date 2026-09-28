import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { VISUAL_WORLDS } from "../src/design-system/tokens/visual-worlds";

const evidenceRoot = join(process.cwd(), "evidence/design-system-harness-01");

test("capture the compact responsive and Visual World evidence set", async ({ page }) => {
  await mkdir(evidenceRoot, { recursive: true });
  for (const [width, height, id, locale, context] of [
    [390, 844, "390x844-iphone-fa-rtl", "fa-IR", "iphone"],
    [430, 932, "430x932-android-en-ltr", "en", "android"],
    [1024, 768, "1024x768-desktop-ar-rtl", "ar", "desktop"],
    [1440, 900, "1440x900-desktop-ru-ltr", "ru", "desktop"],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("/design-system");
    await page.getByTestId("locale-select").selectOption(locale);
    await page.getByTestId("context-select").selectOption(context);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.addStyleTag({ content: ".skip-link:not(:focus) { visibility: hidden !important; }" });
    await page.locator("#top").screenshot({ path: join(evidenceRoot, `${id}-hero.png`) });
    if (width <= 430) {
      await page.locator("#forms").screenshot({ path: join(evidenceRoot, `${id}-forms.png`) });
      await page.locator("#media").screenshot({ path: join(evidenceRoot, `${id}-media.png`) });
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/design-system");
  await page.getByTestId("locale-select").selectOption("fa-IR");
  await page.getByTestId("context-select").selectOption("desktop");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.addStyleTag({ content: ".skip-link:not(:focus) { visibility: hidden !important; }" });
  for (const [id, filename] of [
    ["typography", "1440x900-desktop-fa-rtl-typography.png"],
    ["navigation", "1440x900-desktop-fa-rtl-navigation.png"],
    ["layout", "1440x900-desktop-fa-rtl-layout.png"],
    ["compositions", "1440x900-desktop-fa-rtl-compositions.png"],
    ["motion", "1440x900-desktop-fa-rtl-motion-editorial.png"],
  ] as const) {
    await page.locator(`#${id}`).screenshot({ path: join(evidenceRoot, filename) });
  }
  await page.getByTestId("mode-select").selectOption("cinematic");
  await expect(page.locator("[data-design-system-root]")).toHaveAttribute("data-experience-mode", "cinematic");
  await page.locator("#motion").screenshot({ path: join(evidenceRoot, "1440x900-desktop-fa-rtl-motion-cinematic.png") });

  await page.goto("/design-system");
  await page.getByTestId("locale-select").selectOption("fa-IR");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.addStyleTag({ content: ".skip-link:not(:focus) { visibility: hidden !important; }" });
  for (const [id, world] of Object.entries(VISUAL_WORLDS)) {
    await page.getByTestId("world-select").selectOption(id);
    await expect(page.locator("[data-design-system-root]")).toHaveAttribute("data-world", id);
    await page.locator("#top").screenshot({ path: join(evidenceRoot, `visual-world-${id}.png`) });
  }
});
