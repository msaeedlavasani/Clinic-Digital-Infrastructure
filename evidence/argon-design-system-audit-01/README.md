# ARGON Design System Audit 01 — Evidence

This evidence records the **persisted, unmodified** `prototype/argon-e01/` state served from its documented Python static server on 2026-09-28. Audit report: [`docs/audits/ARGON-DESIGN-SYSTEM-AUDIT-01.md`](../../docs/audits/ARGON-DESIGN-SYSTEM-AUDIT-01.md).

## Screenshots (20)

All captures used Chromium with WebGL active. Images are direct browser screenshots; no visual repairs or source modifications were applied.

| Viewport | Locale / direction | State | Evidence |
|---|---|---|---|
| 390×844 | fa-IR / RTL | Hero | `390x844-fa-rtl-hero.png` |
| 390×844 | fa-IR / RTL | Treatment Discovery | `390x844-fa-rtl-discovery.png` |
| 390×844 | fa-IR / RTL | Laser sensory event at direct midpoint query | `390x844-fa-rtl-laser-midpoint.png` |
| 390×844 | fa-IR / RTL, reduced motion preference | Static Laser event midpoint | `390x844-fa-rtl-laser-reduced-motion.png` |
| 390×844 | fa-IR / RTL | Treatment Information | `390x844-fa-rtl-treatment-information.png` |
| 390×844 | fa-IR / RTL | Doctor | `390x844-fa-rtl-doctor.png` |
| 390×844 | fa-IR / RTL | Technology | `390x844-fa-rtl-technology.png` |
| 390×844 | fa-IR / RTL | Consultation | `390x844-fa-rtl-consultation.png` |
| 430×932 | fa-IR / RTL | Hero | `430x932-fa-rtl-hero.png` |
| 1024×768 | fa-IR / RTL | Hero and Consultation | `1024x768-fa-rtl-hero.png`, `1024x768-fa-rtl-consultation.png` |
| 1440×900 | fa-IR / RTL | Hero, Discovery, Laser midpoint, Treatment Information, Doctor, Technology, Consultation | `1440x900-fa-rtl-*.png` |
| 390×844 | en / LTR | Hero | `390x844-en-ltr-hero.png` |
| 1440×900 | en / LTR | Treatment Information | `1440x900-en-ltr-treatment-information.png` |

## Runtime observations

- [`runtime-captures.json`](runtime-captures.json) records capture viewport, scene, document locale/direction, overflow dimensions, WebGL status, and browser errors. All 12 initial captures had no console/page errors and no horizontal overflow.
- [`interaction-report.json`](interaction-report.json) records the six-state interactive journey, URL/history behavior, locale switch, home reset, and focus after advancing. The focus remained in the Laser scene after that scene became hidden/inert.
- [`accessibility-report.json`](accessibility-report.json) records axe scans for seven FA states: zero reported violations; image-backed color contrast was incomplete, and this does not certify WCAG conformance.
- [`reduced-motion-report.json`](reduced-motion-report.json) records the live reduced-motion media preference and the static Laser focus state.
- The initial local-browser resource entries totaled approximately 957 KB transferred. Later doctor and technology media were fetched on the initial page because ARGON preloads them. This is observational evidence, not a benchmark.
- A `390×500` viewport-height emulation of Consultation placed the submit button at y=510–562 and the status below the visible viewport. The document remained non-scrollable. This models reduced usable height; it is not physical keyboard or device evidence.
- Capture states use direct `?state=` query fixtures. During actual scene interaction, ARGON leaves the URL unchanged.

`SAFE-01` remains not yet testable on physical iPhone/Android hardware. The captures do not reproduce cutouts, home/gesture areas, browser chrome, or a real virtual keyboard.
