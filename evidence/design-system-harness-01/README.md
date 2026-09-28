# CDI Design System Harness — Rendered Evidence

Captured from the shared `/design-system` route with Next.js 16.3.6 / Chromium. These are validation screenshots, not approval of a clinic brand or all visual compositions.

| Evidence | Viewport | Locale / direction | Visual World | Fixture and purpose |
|---|---:|---|---|---|
| `390x844-iphone-fa-rtl-hero.png` | 390×844 | fa-IR / RTL | Dark Cinematic | Hero, responsive recomposition, media and Action Zone |
| `390x844-iphone-fa-rtl-forms.png` | 390×844 | fa-IR / RTL | Dark Cinematic | Form labels, control geometry, error/disabled states, safe action |
| `390x844-iphone-fa-rtl-media.png` | 390×844 | fa-IR / RTL | Dark Cinematic | Responsive crop and protected/text-safe/focal overlays |
| `430x932-android-en-ltr-hero.png` | 430×932 | en / LTR | Dark Cinematic | Android context evidence, hero and mobile crop behavior |
| `430x932-android-en-ltr-forms.png` | 430×932 | en / LTR | Dark Cinematic | LTR controls and form layout |
| `430x932-android-en-ltr-media.png` | 430×932 | en / LTR | Dark Cinematic | LTR media art-direction fixture |
| `1024x768-desktop-ar-rtl-hero.png` | 1024×768 | ar / RTL | Dark Cinematic | Tablet/desktop transition geometry and Arabic direction |
| `1440x900-desktop-ru-ltr-hero.png` | 1440×900 | ru / LTR | Dark Cinematic | Wide desktop hero, type hierarchy, and editorial/media relationship |
| `1440x900-desktop-fa-rtl-typography.png` | 1440×900 | fa-IR / RTL | Dark Cinematic | Semantic typography roles and four-script specimens |
| `1440x900-desktop-fa-rtl-navigation.png` | 1440×900 | fa-IR / RTL | Dark Cinematic | Shared header, breadcrumbs, pagination, and locale fixture relationship |
| `1440x900-desktop-fa-rtl-layout.png` | 1440×900 | fa-IR / RTL | Dark Cinematic | Stage, safe area, rails, action zone, and viewport geometry |
| `1440x900-desktop-fa-rtl-compositions.png` | 1440×900 | fa-IR / RTL | Dark Cinematic | Ten composition contract specimens |
| `1440x900-desktop-fa-rtl-motion-editorial.png` | 1440×900 | fa-IR / RTL | Dark Cinematic | Semantic treatment signature beside editorial information |
| `1440x900-desktop-fa-rtl-motion-cinematic.png` | 1440×900 | fa-IR / RTL | Dark Cinematic | Same motion fixture with the cinematic enhancement active |
| `visual-world-dark-cinematic.png` | 1440×900 | fa-IR / RTL | Dark Cinematic | Shared hero expression comparison |
| `visual-world-luminous-luxury.png` | 1440×900 | fa-IR / RTL | Luminous Luxury | Same content/geometry; light expressive mapping |
| `visual-world-clinical-architectural.png` | 1440×900 | fa-IR / RTL | Clinical Architectural | Same content/geometry; cool architectural mapping |
| `visual-world-natural-prestige.png` | 1440×900 | fa-IR / RTL | Natural Prestige | Same content/geometry; warm botanical mapping |
| `contrast-report.json` | — | — | All four | 180 programmatically calculated AA text, action, focus, feedback, and boundary pair checks |

The four world screenshots use the same hero fixture. Automated checks compare its bounds after every world switch. The evidence script hides the normally offscreen skip link while clipping section captures; a separate keyboard test verifies the link. The fifth-world proof is test-only and is intentionally absent from production options and rendered evidence.
