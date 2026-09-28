# Agent Contract

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Purpose

AI coding agents (and any contributor) performing implementation work on CDI are bound by this contract. It is deliberately concise: the detailed contracts it references carry the substance.

## 2. Mandatory behavior

Every implementation agent must:

1. **Read canonical governance before implementation** — at minimum `/docs/README.md`, `PRODUCT-CONSTITUTION.md`, `V1-SCOPE.md`, and `AGENT-CONTRACT.md` (this document), plus domain documents relevant to the task — for UI/design-affecting work this starts at `/DESIGN.md`, the operational design-system front door — (localization work must also read `LOCALIZATION-FOUNDATION.md` and `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`).
   - **Application/runtime implementation must also read `architecture/RUNTIME-ARCHITECTURE.md`, `architecture/FRAMEWORK-EVALUATION-CRITERIA.md`, and the applicable accepted application ADR (currently `decisions/ADR-0001-APPLICATION-FRAMEWORK-AND-RENDERING.md`) before implementation.**
2. **Identify affected contracts** before changing code or schemas; name them in the plan or commit/PR description.
3. **Not silently override canonical decisions.** If a task seems to require contradicting a canonical document, that is a conflict, not permission.
4. **Distinguish requirement from assumption.** Requirements trace to canonical documents or the task; everything else is an assumption and must be labeled as such.
5. **Preserve Core / Clinic separation** per `PLATFORM-BOUNDARIES.md`.
6. **Avoid clinic-specific and locale-specific hacks.** No `if (clinicId === …)` or `if (locale === …)` conditionals in Core presentation logic; classify every change per `REPLICATION-CONTRACT.md` §4; locale behavior is configuration + localized representation, not branching code.
7. **Report conflicts** between task instructions and canonical contracts rather than resolving them silently.
8. **Verify before declaring completion** — per the Definition of Done in `ENGINEERING-GOVERNANCE.md` §3, as applicable to the change.
9. **Update documentation when a canonical contract legitimately changes**, in the same change.
10. **Not expand scope merely because future capabilities are mentioned** in docs or in a task. Future-awareness informs boundaries only.

## 3. Stop-and-escalate rule

An agent **MUST STOP and escalate** (surface the conflict to the human operator, and/or record it in `OPEN-DECISIONS.md`) when any of the following occurs:

- Implementation as specified would violate a canonical invariant (e.g. a requested clinic-specific hack, a fork, a V1-boundary breach).
- Two canonical documents conflict on a point that decides the implementation.
- A task requires a decision in `OPEN-DECISIONS.md` that is marked **blocking** and has no recorded safe default.
- Required context (canonical docs, task definition) is missing or illegible.

Escalation is a *successful* outcome of this contract, not a failure of the agent. Shipping a violation quietly is the failure mode this contract exists to prevent.

## 4. What agents may change freely

- Guidance-class documents (with a stated reason).
- Working notes.
- Implementation details that no canonical contract constrains, subject to the Definition of Done.

## 5. What agents may never do without escalation

- Create a clinic fork or clinic-keyed conditional in Core.
- Create locale-keyed component forks (`FaButton`/`EnButton`, `RTLHeader`/`LTRHeader`) or `titleFa`-style per-locale field expansion instead of localized representations (`LOCALIZATION-FOUNDATION.md`).
- Introduce a vendor commitment (CMS, database, analytics, translation, messaging) without an ADR.
- Weaken an accessibility, bidirectional, localization, medical-trust, or privacy principle "temporarily".
- Claim completion while a canonical contract is violated.

## 6. Design enforcement (added DESIGN-SYSTEM-VNEXT-01)

For any UI/design-affecting change, agents are additionally bound by the rendered-design QA layer (`DESIGN-QA.md`) entered through `/DESIGN.md`. The following prohibitions are hard:

- **NO RAW DESIGN VALUES** — when an approved token or semantic relationship exists (`DESIGN-TOKENS.md`, including §3A semantic spacing), raw values must not be used.
- **NO NEW TOKEN** — without a documented reusable semantic need.
- **NO PAGE-SPECIFIC CSS FIX** — when the underlying requirement is reusable; fix the system, not the page.
- **NO DEVICE-SPECIFIC COMPONENT FORK** — responsive re-composition solves context differences (`PRESENTATION-CONTEXTS.md` §5); no `IPhoneButton`/`AndroidButton`/`DesktopButton`.
- **NO MAGIC POSITIONING** — every composition aligns to a named authority (`COMPOSITION-CONTRACTS.md` §2); QA `DESIGN-QA.md` LAYOUT-01.
- **NO NEW PATTERN** — when an existing signature/system pattern satisfies the requirement (`SIGNATURE-PATTERNS.md`).
- **NO VISUAL PASS** — from computed CSS, DOM inspection, or automated assertions alone; rendered evidence is mandatory (`DESIGN-QA.md` §1).
- **NO RESPONSIVE PASS** — without rendered evidence across the required presentation contexts (`PRESENTATION-CONTEXTS.md` §2; `LAYOUT-RESPONSIVE.md` §6).
- **NO DESIGN-SYSTEM PASS** — when a prototype or implementation has invented undocumented geometry or interaction grammar; inventions must be classified (§6.1), never passed silently.

### 6.1 Classification route for unexpected design needs

Before inventing a local fix, the agent classifies the need:

| Class | Meaning | Consequence |
|---|---|---|
| `IMPLEMENTATION_VIOLATION` | a canonical contract exists; the implementation broke it | fix the implementation to the contract |
| `SYSTEM_GAP` | a reusable requirement with no canonical answer | propose an additive contract/token extension via rationale-documented edit |
| `CONTENT_ASSET_PROBLEM` | the design is sound; the content/asset fails the contract | fix the content/asset, not the layout |
| `NEW_REUSABLE_PATTERN` | a genuinely new recurring pattern | propose admission per `CONTROLLED-VARIATION.md` §3 |
| `EXPERIMENTAL_EXCEPTION` | a deliberate, bounded experiment | label explicitly, keep outside Core, never canonical by default |

Inventing a local fix before classification violates this contract. Genuine owner-level conflicts route through §3 (stop-and-escalate).

## 7. Experiential and visual acceptance

For experiential or visual acceptance that requires Owner judgment, real-device Owner evidence is authoritative; an agent cannot self-certify visual acceptance. Automated checks, screenshots, DOM assertions, computed CSS, and viewport inspection can establish technical properties, but cannot independently establish premium quality, composition quality, art-direction success, perceived motion quality, or Owner acceptance. Objective engineering failures remain failures and must be resolved; Owner visual judgment does not waive engineering requirements. See `DESIGN-QA.md` §1 for the rendered-evidence rule and `prototype/argon-e01/README.md` for the current ARGON gate.

## 8. Project decision persistence

Important CDI decisions and context must not remain solely in conversational history. When Owner or workstream decisions materially change product scope, architecture, Design System, business assumptions, governance, experience direction, roadmap, or acceptance criteria, the responsible workstream must persist the result in repository documentation before that workstream is considered closed. Casual conversation does not need to be recorded.

Conversation memory is context, not project authority. Repository documentation is project authority. Preserve consequential decision provenance—status, rationale, relevant rejected/superseded alternatives, canonical authority, and unresolved dependencies—in the appropriate canonical document, decision register, recovery ledger, or ADR. Do not turn canonical contracts into chronological diaries; use `DECISION-RECOVERY-LEDGER.md` and `decisions/README.md` for lineage and ADR process.
