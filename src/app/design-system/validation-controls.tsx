"use client";

import { useEffect, useState } from "react";
import { LOCALES, type LocaleFixture } from "@/design-system/fixtures";
import { INITIAL_WORLD_ID, listVisualWorlds, VISUAL_WORLDS, worldStyleVariables } from "@/design-system/tokens/visual-worlds";

type ContextFixture = "desktop" | "iphone" | "android";
type ExperienceMode = "editorial" | "cinematic";

export function ValidationControls() {
  const [locale, setLocale] = useState<LocaleFixture>("fa-IR");
  const [world, setWorld] = useState(INITIAL_WORLD_ID);
  const [context, setContext] = useState<ContextFixture>("desktop");
  const [mode, setMode] = useState<ExperienceMode>("editorial");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showMediaMap, setShowMediaMap] = useState(true);
  const [notice, setNotice] = useState("Persian RTL · Dark Cinematic · Desktop Web");

  useEffect(() => {
    const root = document.documentElement;
    const page = document.querySelector<HTMLElement>("[data-design-system-root]");
    if (!page) return;

    const activeLocale = LOCALES[locale];
    root.lang = locale;
    root.dir = activeLocale.dir;
    page.dataset.world = world;
    page.dataset.contextPreview = context;
    page.dataset.experienceMode = mode;
    page.dataset.motionPreview = reducedMotion ? "reduced" : "full";
    page.dataset.mediaMap = showMediaMap ? "visible" : "hidden";

    for (const [name, value] of Object.entries(worldStyleVariables(VISUAL_WORLDS[world]))) {
      page.style.setProperty(name, value);
    }

    setNotice(`${activeLocale.name} · ${VISUAL_WORLDS[world].label} · ${contextLabel(context)} · ${mode} · ${reducedMotion ? "Reduced motion" : "Motion enabled"}`);
  }, [context, locale, mode, reducedMotion, showMediaMap, world]);

  return (
    <section className="validation-console" aria-labelledby="console-title">
      <div className="validation-console__intro">
        <div>
          <p className="type-label">VALIDATION CONTROLS</p>
          <h2 id="console-title" className="type-h3">Change the fixture context</h2>
          <p className="type-small">These controls belong to the harness. The controls change document language and semantic tokens; they do not fork production components.</p>
        </div>
        <p className="validation-console__status" role="status" aria-live="polite">{notice}</p>
      </div>
      <div className="validation-console__controls">
        <label className="fixture-control">
          <span>Visual World</span>
          <select value={world} onChange={(event) => setWorld(event.target.value)} data-testid="world-select">
            {listVisualWorlds(VISUAL_WORLDS).map((definition) => (
              <option key={definition.id} value={definition.id}>{definition.label}</option>
            ))}
          </select>
        </label>
        <label className="fixture-control">
          <span>Locale / direction</span>
          <select value={locale} onChange={(event) => setLocale(event.target.value as LocaleFixture)} data-testid="locale-select">
            {Object.entries(LOCALES).map(([id, fixture]) => (
              <option key={id} value={id}>{id} · {fixture.dir.toUpperCase()}</option>
            ))}
          </select>
        </label>
        <label className="fixture-control">
          <span>Presentation context</span>
          <select value={context} onChange={(event) => setContext(event.target.value as ContextFixture)} data-testid="context-select">
            <option value="desktop">DESKTOP_WEB</option>
            <option value="iphone">IPHONE_WEB</option>
            <option value="android">ANDROID_WEB</option>
          </select>
        </label>
        <label className="fixture-control">
          <span>Experience mode</span>
          <select value={mode} onChange={(event) => setMode(event.target.value as ExperienceMode)} data-testid="mode-select">
            <option value="editorial">EDITORIAL MODE</option>
            <option value="cinematic">CINEMATIC MODE</option>
          </select>
        </label>
        <button
          className="console-toggle"
          type="button"
          aria-pressed={reducedMotion}
          onClick={() => setReducedMotion((current) => !current)}
          data-testid="motion-toggle"
        >
          {reducedMotion ? "Reduced motion preview: on" : "Reduced motion preview: off"}
        </button>
        <button
          className="console-toggle"
          type="button"
          aria-pressed={showMediaMap}
          onClick={() => setShowMediaMap((current) => !current)}
          data-testid="media-toggle"
        >
          {showMediaMap ? "Media overlays: on" : "Media overlays: off"}
        </button>
      </div>
      <p className="validation-console__note">Resize the browser to the evidence geometries below; context selection displays the relevant safe-area fixture and does not claim device emulation.</p>
    </section>
  );
}

function contextLabel(context: ContextFixture) {
  return {
    desktop: "Desktop Web",
    iphone: "iPhone Web",
    android: "Android Web",
  }[context];
}
