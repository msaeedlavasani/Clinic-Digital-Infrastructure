# Design QA Mapping

Assessment of the executable validation fixtures in this repository. PASS describes the harness implementation and rendered fixture coverage; it does not approve clinic-specific assets or final art direction.

| Canonical ID | Result | Evidence / boundary |
|---|---|---|
| LAYOUT-01 | PASS | Hero and layout fixture name Global Rail, Content Rail, Media Rail, Action Zone, and Navigation Zone; desktop/mobile captures show the shared authorities. |
| LAYOUT-02 | PASS | The negative-space fixture anchors open space to copy, action, and focal point; wide desktop render is captured. |
| MEDIA-01 | PASS | Responsive `<picture>` supplies an alternate mobile crop; focal, protected, text-safe, contrast, and crop overlays are inspectable. The art is an abstract placeholder, not clinical photography. |
| ACTION-01 | PASS | Primary and secondary actions remain grouped in their composition; touch and desktop captures show the action area. |
| FORM-01 | PASS | Visible labels/boundaries, helper/error states, filled/disabled fields, hover and focus behavior; axe and keyboard smoke pass. |
| RESP-01 | PASS | Rendered 390×844, 430×932, 1024×768, and 1440×900 captures; mobile layout changes ordering and media crop. Automated overflow checks also cover 320px and 1728px widths. |
| TYPE-01 | PASS | All implemented semantic roles render with Persian, English, Arabic, and Russian fixtures; Persian uses Vazirmatn. Other families remain system fallbacks pending D-1. |
| SPACE-01 | PASS | Primitive scale and named mobile/desktop relationship values are rendered and automated against the shared token model. |
| PROGRESS-01 | PASS | Journey steps communicate actual sequence; the fixture states decorative `01/05` chrome is not automatically part of composition. |
| MOTION-01 | PASS | A restrained focus/precision field expresses treatment sensory intent; reduced-motion override and OS preference preserve the same semantic content and actions. |
| MEDICAL-01 | PASS | Signature is explicitly sensory; no efficacy simulation or fabricated Before/After evidence is rendered. |
| SAFE-01 | NOT_YET_TESTABLE | Logical safe-area tokens/rails are implemented, but desktop Chromium cannot produce real notch, gesture-inset, browser-chrome, or virtual-keyboard geometry. Device-level validation remains necessary. |
| BIDI-01 | PASS | Same components use logical layout; lang/dir changes, localized fixtures, mixed-script isolates, and responsive overflow are browser-tested. |

The automated browser suite currently has 15 checks, including JavaScript-disabled semantic rendering, contrast, documentation/registry parity, fifth-world extension, mode transition, route console errors, and keyboard navigation. See `contrast-report.json` and the rendered screenshots in this directory.
