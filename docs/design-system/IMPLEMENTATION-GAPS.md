# Design System Implementation Gaps

**Class:** CANONICAL (implementation blocker register)  
**Purpose:** Record reusable Design System contract gaps discovered while implementing the shared production system and its validation harness. This register is for missing authority, not implementation bugs.

---

## DS-IMPL-001 — Literal semantic token mappings for Visual Worlds

- **Observed During:** CDI-DESIGN-SYSTEM-HARNESS-01, before application implementation.
- **Classification:** `SYSTEM_GAP`.
- **Canonical Contract Involved:** `VISUAL-WORLDS.md` §§1–3; `COLOR-THEMING.md` §2; `DESIGN-TOKENS.md` §11; `VALIDATION-HARNESS.md` §§3, 6.
- **Why Existing Contract Was Insufficient:** The four worlds had art-direction descriptions and a semantic role inventory, but no approved literal mappings for the full role set. The original implementation attempt correctly stopped rather than inventing production values. PEARL/MINERAL/OBSIDIAN and prototype values did not authorize mappings.
- **Implementation Blocked?:** No — resolved for the initial validation set.
- **Owner Decision Required?:** No — the Owner supplied the four direction approvals and authorized derived literal values with WCAG validation.
- **Owner Decision:** `APPROVED_DIRECTION` — Dark Cinematic, Luminous Luxury, Clinical Architectural, and Natural Prestige are the initial canonical validation set; four is not a platform maximum.
- **Resolution:** Derived complete semantic mappings are recorded in `VISUAL-WORLDS.md` and implemented in the registry at `src/design-system/tokens/visual-worlds.json`. The 136-pair report at `evidence/design-system-harness-01/contrast-report.json` passes required text, action, focus, feedback, and meaningful boundary checks. The registry and a test-only fifth-world proof establish N-world extension without component changes.
- **Status:** `RESOLVED`.
- **History:** The original stop was correct at the time: no colors were treated as approved before the Owner decision. This record is closed only after derived values and measured validation were produced.
