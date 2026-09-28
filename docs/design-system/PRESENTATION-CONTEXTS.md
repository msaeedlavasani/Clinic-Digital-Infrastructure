# Presentation Contexts

**Class:** CANONICAL
**Change process:** Context additions or reclassifications = ADR-level design decision; behavioral definitions = rationale-documented edit.
**Origin:** DESIGN-SYSTEM-VNEXT-01 — operationalizes the responsive contract (`LAYOUT-RESPONSIVE.md`, `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` Part B) with a presentation-context model.

---

## 1. Purpose

Viewport width is an input, **not** a design authority. Two devices at the same width behave materially differently: one has a Dynamic Island and a home indicator, the other a display cutout and gesture navigation; one has precise hover pointers, the other a virtual keyboard that resizes the viewport. Width-only responsive rules cannot express those differences, so implementations silently invent per-device hacks.

This document defines the **presentation contexts** that close that gap. Contexts are *composition inputs* — they are **not** separate applications, **not** permission to fork components (`iPhoneButton`/`AndroidButton`/`DesktopButton` are prohibited), and **not** device-model bindings.

## 2. Canonical contexts (minimum set)

| Context | Class | Environment that materially changes composition |
|---|---|---|
| **DESKTOP_WEB** | CANONICAL | Wide and standard desktop geometries; pointer + keyboard input; large negative-space risk; readable measure responsibility; intentional media/content balance; hover-adjacent affordances. |
| **IPHONE_WEB** | CANONICAL | Safe-area insets (notch / Dynamic Island), home-indicator region, dynamic browser chrome (collapsing/expanding URL bar changing usable viewport height), virtual keyboard, portrait composition as primary, precise-touch + gesture environments. |
| **ANDROID_WEB** | CANONICAL | Display cutouts, variable browser/system chrome, gesture navigation **and** possible three-button navigation environments, virtual keyboard, wider aspect-ratio and device variance, portrait composition as primary. |

A tablet context may be added later via the change process above; until then tablets validate as mobile-class compositions at tablet widths per the validation matrix (`LAYOUT-RESPONSIVE.md` §6).

## 3. Canonical composition equation

Responsive re-composition (`LAYOUT-RESPONSIVE.md` §1) is expressed through:

> **Composition = viewport geometry × presentation context × content × script/direction × Visual World × approved variation**

Every composition contract (`COMPOSITION-CONTRACTS.md`) defines behavior in terms of this equation. A composition that varies by width alone is incomplete; a composition that forks components per context is a violation (§5).

## 4. Environment contracts per context

### 4.1 Safe-area behavior (IPHONE_WEB · ANDROID_WEB)

- **Safe Area** is the physical/browser/system exclusion region: notch/cutout, Dynamic Island, home indicator, gesture bars, and browser chrome.
- Primary content and **all primary actions** must respect the safe region; collision of a CTA or navigation control with the home-indicator/cutout region is a QA failure (`DESIGN-QA.md` SAFE-01).
- Where the platform exposes safe-area values (e.g. env-safe-area insets), implementations consume them; hard-coded pixel guesses for specific devices are prohibited.
- Full-bleed media may extend under safe regions (edge-to-edge imagery is desirable); **content and controls may not**, unless the composition contract explicitly art-directs a text-over-safe-region treatment with validated contrast (`COMPOSITION-CONTRACTS.md` text-safe region rules; `DESIGN-QA.md` MEDIA-01).

### 4.2 Changing usable viewport height (IPHONE_WEB · ANDROID_WEB)

- Dynamic browser chrome and the virtual keyboard change usable height continuously. Compositions must not assume a fixed viewport height: pinned scenes and scroll choreography re-anchor, never break, when usable height changes.
- Forms and their primary actions must remain reachable while the keyboard is open; hiding the submit action behind the keyboard is a SAFE-01 failure.
- The virtual keyboard is a **presentation state**, not a layout error: it may compress stage geometry; it may not trap content or controls.

### 4.3 Navigation environments (ANDROID_WEB)

- Gesture navigation (edge swipe regions) and three-button navigation both exist. Bottom-anchored actions must remain reachable in both; edge-anchored gestures/controls must not conflict with system back-gesture zones.
- Variable system chrome heights are treated like dynamic browser chrome (§4.2).

### 4.4 Pointer/keyboard duality (DESKTOP_WEB)

- Compositions may use hover for *enhancement* only; every hover affordance has a keyboard/touch equivalent (`BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §C.2).
- Large canvases raise negative-space risk: empty regions must carry compositional purpose (`COMPOSITION-CONTRACTS.md` negative-space rule; `DESIGN-QA.md` LAYOUT-02).
- Readable measure is a desktop responsibility too: wide canvases bind text to `container-text` (`LAYOUT-RESPONSIVE.md` §3).

### 4.5 Portrait composition (IPHONE_WEB · ANDROID_WEB)

- Portrait is the primary composition for touch contexts, not a scaled desktop (`LAYOUT-RESPONSIVE.md` §1 re-composition rule).
- Vertical rhythm, media crop, action placement, and navigation presentation are re-composed per the active composition contract; landscape/orientation changes are validated per `LAYOUT-RESPONSIVE.md` §6.

## 5. Component integrity rule

Platform-specific **behavior** exists only where the platform environment creates a real behavioral constraint (safe area, keyboard, chrome, pointer). Everything else remains context-invariant:

- One component architecture serves all contexts (Constitution §7; `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md` §A.1).
- Context-specific behavior is expressed as responsive re-composition + environment adaptation inside the same component, never as context-named forks.
- A "context" never changes the Visual World, the clinic theme, or the locale machinery (`PLATFORM-BOUNDARIES.md` §3; `VISUAL-WORLDS.md` §4).

## 6. Relationship to other contracts

- `LAYOUT-RESPONSIVE.md` — width-class validation matrix remains binding; contexts add the environmental axis width cannot express.
- `COMPOSITION-CONTRACTS.md` — contracts reference contexts for their per-context behavior sections.
- `DESIGN-QA.md` — SAFE-01, RESP-01 and context evidence expectations enforce this document.
- `AGENT-CONTRACT.md` §6 (vNext) — agents must identify the active presentation context(s) for any UI change; device-model-named CSS/geometry is an implementation violation.
