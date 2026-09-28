# Production Vertical Slice 01 — Evidence

Screenshots are rendered from the fictional `clinic-fixture-01` configuration. They are implementation evidence, not clinic photography, clinical claims, or Owner visual approval.

| File | Viewport | Locale / state | Purpose |
|---|---:|---|---|
| `fa-home-mobile-390x844.png` | 390×844 | `fa-IR`, RTL | Home Hero and concern-led discovery continuity |
| `en-home-desktop-1440x900.png` | 1440×900 | `en`, LTR | Wide Home composition and published treatment entry |
| `fa-treatment-signature-mobile-390x844.png` | 390×844 | `fa-IR`, RTL | Light / focus / precision sensory signature |
| `fa-treatment-information-mobile.png` | composition capture | `fa-IR`, RTL | Semantic content boundary, fixture disclaimer, no fabricated facts/evidence |
| `en-treatment-desktop-1440x900.png` | 1440×900 | `en`, LTR | Treatment route, trust content and Dark Cinematic continuity |
| `en-doctor-trust-desktop.png` | composition capture | `en`, LTR | Fictional clinician profile and non-asserted credentials |
| `en-technology-device-trust-desktop.png` | composition capture | `en`, LTR | Technology/device distinction and unasserted ownership |
| `fa-consultation-mobile-390x844.png` | full page | `fa-IR`, RTL | Native lead request form and normal document flow |
| `en-consultation-desktop-1440x900.png` | 1440×900 | `en`, LTR | Desktop form composition |
| `fa-consultation-short-height-390x500.png` | 390×500 | `fa-IR`, RTL, scrolled to action | Submit remains reachable in a short viewport |
| `en-treatment-signature-reduced-motion.png` | composition capture | `en`, LTR, reduced motion | Static focus equivalent with content preserved |
| `runtime-media-report.json` | production route | `en`, LTR, reduced motion | Browser resource/image loading and local transfer observations |

These are browser-emulated contexts. They do not close physical-device `SAFE-01` validation for notch, gesture area, dynamic browser chrome, or virtual keyboard behavior.

To regenerate after a build, run the Next.js production server on port `4180`, then execute:

```sh
CDI_TEST_PORT=4180 npx playwright test tests/production-evidence.spec.ts --workers=1
```
