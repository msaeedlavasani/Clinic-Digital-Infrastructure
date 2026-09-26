# Document Authority Model

**Class:** CANONICAL (governance of documentation itself)
**Change process:** ADR required for changes to precedence rules or document classes; ordinary edits for wording.

---

## 1. Purpose

This document defines the authority classes of CDI documentation, the precedence model used to resolve conflicts between documents, and the process by which documents may change. Every document in `/docs` must carry a **Class** header matching one of the classes below.

A future agent that cannot determine whether a statement is binding has not read this document.

## 2. Document classes

| Class | Meaning | Binding? |
|---|---|---|
| **CANONICAL** | A binding product or system contract. Implementation agents MUST comply. Deviation requires a formal contract change (see §4). | Yes |
| **GUIDANCE** | Recommended direction. Deviation is permitted with a stated, reviewable reason. | Advisory |
| **ADR** | An Architecture Decision Record: a durable decision with context, options, and consequences. Binding once `Accepted`; superseded only by a newer ADR or canonical change. | Yes (scope of the decision) |
| **WORKING NOTE** | Non-binding exploration, scratch reasoning, or draft. Never authoritative. May be deleted without ceremony. | No |

Within CANONICAL documents, a statement is binding in proportion to how explicitly it is stated as an invariant, requirement, or boundary. Descriptive/contextual prose (background, examples, rationale) carries the rationale, not the obligation.

## 3. Precedence model

When two documents conflict, resolve with the first rule that applies:

1. **Explicit newer canonical decision > older canonical decision.** A canonical contract explicitly superseding or amending an earlier one wins. An ADR decision wins over the general prose of an older canonical document within the ADR's declared scope.
2. **ADR > guidance > working note** (within equal recency).
3. **More specific > more general.** A specific boundary document (e.g. the Replication Contract) is more specific than a general constitution.
4. **On genuine conflict between canonical documents of equal specificity and age:** STOP. Do not pick silently. Record the conflict and either (a) file an ADR to resolve it or (b) escalate to the product owner via `OPEN-DECISIONS.md`.

Implementation convenience is **not** a precedence class. "The code was easier this way" resolves nothing.

## 4. Changing documents

- **CANONICAL:** changed only deliberately, via ADR (if a decision with alternatives) or an explicit contract edit with a stated rationale in the document's changelog note. Silent weakening of a canonical contract is a governance violation.
- **GUIDANCE:** may be edited by any agent with a stated reason; ideally noted in the document.
- **ADR:** immutable once `Accepted`; changes are made by a new ADR that supersedes the old one (status: `Superseded by ADR-NNNN`).
- **WORKING NOTE:** free.

## 5. Reading order for new contributors

1. `/docs/README.md` — documentation map (what exists, what is binding)
2. `docs/governance/PRODUCT-CONSTITUTION.md` — what CDI is and is not
3. `docs/governance/AGENT-CONTRACT.md` — how agents must behave
4. `docs/product/V1-SCOPE.md` — what is being built now
5. Then the domain documents relevant to the task at hand.
