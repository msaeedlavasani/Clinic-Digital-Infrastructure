# Agent Contract

**Class:** CANONICAL
**Change process:** ADR or explicit, rationale-documented edit.

---

## 1. Purpose

AI coding agents (and any contributor) performing implementation work on CDI are bound by this contract. It is deliberately concise: the detailed contracts it references carry the substance.

## 2. Mandatory behavior

Every implementation agent must:

1. **Read canonical governance before implementation** — at minimum `/docs/README.md`, `PRODUCT-CONSTITUTION.md`, `V1-SCOPE.md`, and `AGENT-CONTRACT.md` (this document), plus domain documents relevant to the task (localization work must also read `LOCALIZATION-FOUNDATION.md` and `BIDIRECTIONAL-RESPONSIVE-ACCESSIBILITY.md`).
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
