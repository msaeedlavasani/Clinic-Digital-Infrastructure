import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync, readdirSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { LOCALES } from "../src/design-system/fixtures";
import { contrastReport } from "../src/design-system/tokens/contrast";
import { RELATIONSHIPS, SPACE } from "../src/design-system/tokens/spacing";
import {
  COLOR_ROLES,
  INITIAL_WORLD_ID,
  listVisualWorlds,
  registerVisualWorld,
  VISUAL_WORLDS,
  worldStyleVariables,
} from "../src/design-system/tokens/visual-worlds";

test("the /design-system route renders server-owned semantic content", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/design-system");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-composition]")).toHaveCount(11);
  await expect(page.getByRole("navigation", { name: "Validation sections" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("primary reading content remains present without client JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/design-system");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText(/A rendered workspace for testing/)).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Validation sections" })).toBeVisible();
  await expect(page.getByLabel("Name")).toBeVisible();
  await context.close();
});

test("the initial locale and all fixture locale changes set lang and direction", async ({ page }) => {
  await page.goto("/design-system");
  await expect(page.locator("html")).toHaveAttribute("lang", "fa-IR");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  for (const [locale, fixture] of Object.entries(LOCALES)) {
    await page.getByTestId("locale-select").selectOption(locale);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", fixture.dir);
  }
  await expect(page.locator("[lang='ar'][dir='rtl']").first()).toBeAttached();
  await expect(page.locator("bdi").first()).toBeAttached();
  await page.getByTestId("locale-select").selectOption("fa-IR");
  await expect(page.locator(".flow-arrow").first()).toHaveCSS("transform", "matrix(-1, 0, 0, 1, 0, 0)");
  await expect(page.locator(".directional-mark").first()).toHaveCSS("transform", "matrix(-1, 0, 0, 1, 0, 0)");
  await page.getByTestId("locale-select").selectOption("en");
  await expect(page.locator(".flow-arrow").first()).toHaveCSS("transform", "none");
  await expect(page.locator(".directional-mark").first()).toHaveCSS("transform", "none");
});

test("all presentation evidence geometries remain free of horizontal overflow", async ({ page }) => {
  for (const [width, height, locale, context] of [
    [320, 568, "fa-IR", "iphone"],
    [390, 844, "fa-IR", "iphone"],
    [430, 932, "en", "android"],
    [1024, 768, "ar", "desktop"],
    [1440, 900, "ru", "desktop"],
    [1728, 1080, "en", "desktop"],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto("/design-system");
    await page.getByTestId("locale-select").selectOption(locale);
    await page.getByTestId("context-select").selectOption(context);
    await page.waitForTimeout(30);
    await expect(page.locator("[data-design-system-root]")).toHaveAttribute("data-context-preview", context);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content, `${width}×${height} / ${locale}`).toBeLessThanOrEqual(dimensions.viewport + 1);
  }
});

test("editorial and cinematic modes share geometry while changing enhancement expression", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/design-system#motion");
  const fixture = page.getByTestId("mode-fixture");
  const initialBounds = await fixture.boundingBox();
  const editorialSurface = await fixture.locator(".mode-fixture__stage").evaluate((element) => getComputedStyle(element).backgroundColor);

  await page.getByTestId("mode-select").selectOption("cinematic");
  await expect(page.locator("[data-design-system-root]")).toHaveAttribute("data-experience-mode", "cinematic");
  await expect.poll(() => fixture.locator(".mode-fixture__stage").evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(editorialSurface);
  await expect(fixture.locator(".signature-light")).toHaveCSS("animation-play-state", "running");
  const cinematicLightOpacity = await fixture.locator(".signature-light").evaluate((element) => Number(getComputedStyle(element).opacity));
  expect(cinematicLightOpacity).toBeGreaterThan(0.4);
  const cinematicBounds = await fixture.boundingBox();
  expect(cinematicBounds && initialBounds && { width: cinematicBounds.width, height: cinematicBounds.height })
    .toEqual(initialBounds && { width: initialBounds.width, height: initialBounds.height });

  await page.getByTestId("mode-select").selectOption("editorial");
  await expect(fixture.locator(".signature-light")).toHaveCSS("opacity", "0");
  await expect(fixture.locator(".mode-fixture__editorial")).toBeVisible();
  const editorialBounds = await fixture.boundingBox();
  expect(editorialBounds && initialBounds && { width: editorialBounds.width, height: editorialBounds.height })
    .toEqual(initialBounds && { width: initialBounds.width, height: initialBounds.height });
});

test("CSS primitive spacing and responsive relationship tokens match their shared token model", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/design-system");
  const mobile = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return {
      space50: style.getPropertyValue("--cdi-space-50").trim(),
      space1000: style.getPropertyValue("--cdi-space-1000").trim(),
      pageInline: style.getPropertyValue("--cdi-space-page-inline").trim(),
      safeAction: style.getPropertyValue("--cdi-space-safe-action").trim(),
    };
  });
  expect(mobile.space50).toBe(`${SPACE[50]}px`);
  expect(mobile.space1000).toBe(`${SPACE[1000]}px`);
  expect(mobile.pageInline).toBe(`${RELATIONSHIPS.mobile.pageInline}px`);
  expect(mobile.safeAction).toBe(`${RELATIONSHIPS.mobile.safeAction}px`);

  await page.setViewportSize({ width: 1440, height: 900 });
  const desktopPageInline = await page.locator("html").evaluate((element) => getComputedStyle(element).getPropertyValue("--cdi-space-page-inline").trim());
  expect(desktopPageInline).toBe(`${RELATIONSHIPS.desktop.pageInline}px`);
});

test("shared navigation recomposes from desktop links to a keyboard-operable mobile drawer", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/design-system#navigation");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary mobile" })).toBeHidden();

  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.locator(".cdi-mobile-navigation summary");
  await expect(menu).toBeVisible();
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".cdi-mobile-navigation")).toHaveAttribute("open", "");
  await expect(page.getByRole("navigation", { name: "Primary mobile" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Pagination" })).toBeVisible();
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".cdi-mobile-navigation")).not.toHaveAttribute("open", "");
});

test("Visual World selection is registry-driven and preserves shared geometry", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/design-system");
  const worldSelect = page.getByTestId("world-select");
  await expect(worldSelect.locator("option")).toHaveCount(Object.keys(VISUAL_WORLDS).length);
  const geometryBefore = await page.locator("#top").boundingBox();

  for (const world of Object.keys(VISUAL_WORLDS)) {
    await worldSelect.selectOption(world);
    await expect(page.locator("[data-design-system-root]")).toHaveAttribute("data-world", world);
    const geometryAfter = await page.locator("#top").boundingBox();
    expect(geometryAfter).toEqual(geometryBefore);
  }
  expect(Object.keys(VISUAL_WORLDS)).toEqual([
    "dark-cinematic",
    "luminous-luxury",
    "clinical-architectural",
    "natural-prestige",
  ]);
});

test("a fifth registered world receives the same semantic token adapter without component edits", () => {
  const base = VISUAL_WORLDS[INITIAL_WORLD_ID];
  const testWorld = {
    ...base,
    id: "extensibility-proof",
    label: "Extensibility Proof",
    colors: { ...base.colors, canvas: "#F4F4F4" as const },
  };
  const expanded = registerVisualWorld(VISUAL_WORLDS, testWorld);
  expect(Object.keys(expanded)).toHaveLength(Object.keys(VISUAL_WORLDS).length + 1);
  expect(listVisualWorlds(expanded).map(({ id }) => id)).toContain(testWorld.id);
  expect(COLOR_ROLES.every((role) => testWorld.colors[role])).toBe(true);
  expect(worldStyleVariables(expanded[testWorld.id])["--cdi-canvas"]).toBe("#F4F4F4");
  expect(Object.keys(VISUAL_WORLDS)).not.toContain(testWorld.id);
});

test("canonical Visual World documentation matches the production registry values", () => {
  const documentText = readFileSync(join(process.cwd(), "docs/design-system/VISUAL-WORLDS.md"), "utf8");
  const ids = Object.keys(VISUAL_WORLDS);
  for (const role of COLOR_ROLES) {
    const row = documentText.split("\n").find((line) => line.startsWith(`| \`${role}\` |`));
    expect(row, `missing canonical mapping row for ${role}`).toBeDefined();
    const values = row!.split("|").slice(2, 6).map((value) => value.trim());
    expect(values, `stale documented mapping for ${role}`).toEqual(ids.map((id) => VISUAL_WORLDS[id].colors[role]));
  }
});

test("shared components and route have no Visual World name branches", () => {
  const sourceRoots = [
    join(process.cwd(), "src/design-system/components"),
    join(process.cwd(), "src/design-system/primitives"),
    join(process.cwd(), "src/app/design-system"),
  ];
  const files: string[] = [];
  const collect = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) collect(path);
      else if (/\.(tsx?|css)$/.test(entry.name)) files.push(path);
    }
  };
  sourceRoots.forEach(collect);
  files.push(join(process.cwd(), "src/app/globals.css"));
  const ids = ["dark-cinematic", "luminous-luxury", "clinical-architectural", "natural-prestige"];
  const violations = files.flatMap((file) => {
    const source = readFileSync(file, "utf8");
    return ids.filter((id) => source.includes(id)).map((id) => `${file}: ${id}`);
  });
  expect(violations).toEqual([]);
});

test("contrast mappings meet AA text and non-text pairings", async () => {
  const report = contrastReport(Object.values(VISUAL_WORLDS));
  const evidenceDirectory = join(process.cwd(), "evidence/design-system-harness-01");
  await mkdir(evidenceDirectory, { recursive: true });
  await writeFile(join(evidenceDirectory, "contrast-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  expect(report.failures, JSON.stringify(report.failures, null, 2)).toEqual([]);
});

test("focus, reduced motion, and accessible forms retain their meaning", async ({ page }) => {
  await page.goto("/design-system");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toHaveClass(/skip-link/);

  const input = page.getByLabel("Name");
  await expect(input).toBeVisible();
  const borderAtRest = await input.evaluate((element) => getComputedStyle(element).borderColor);
  await input.hover();
  const borderOnHover = await input.evaluate((element) => getComputedStyle(element).borderColor);
  expect(borderOnHover).not.toBe(borderAtRest);
  await expect(page.getByLabel("Email")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();

  const motion = page.getByTestId("motion-toggle");
  await motion.click();
  await expect(page.locator("[data-design-system-root]")).toHaveAttribute("data-motion-preview", "reduced");
  await expect(page.locator("#motion").getByRole("heading", { name: /Complete information stays present/ })).toBeVisible();
  await expect(page.locator("#motion").getByRole("button", { name: "Continue to information" })).toBeVisible();
  const duration = await page.locator(".signature-light").evaluate((element) => getComputedStyle(element).animationDuration);
  expect(duration).toBe("1e-05s");
  await page.getByTestId("focus-probe").focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  const focusOutline = await page.getByTestId("focus-probe").evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(focusOutline).toBe("solid");
});

test("the validation route has no serious or critical axe violations", async ({ page }) => {
  await page.goto("/design-system");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});
