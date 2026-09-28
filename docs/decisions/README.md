# Decision Governance (ADRs)

**Class:** CANONICAL (the mechanism described here); individual ADRs bind within their scope.

---

## 1. What an ADR is

An **Architecture Decision Record** captures a durable decision with context, options considered, and consequences. Once `Accepted`, an ADR binds implementation within its declared scope and changes only by supersession (new ADR + status update on the old one).

## 2. When an ADR is required

An ADR is required for decisions that are hard to reverse or that establish binding technical/product direction, including:

- Framework selection
- CMS selection
- Tenant architecture
- Deployment model
- Domain strategy
- Authentication model
- Persistence model
- Major integration provider selection
- Major Design System architecture change
- Final localization fallback policy (per `LOCALIZATION-FOUNDATION.md` §6)
- Performance budget definition (per `PERFORMANCE-PRINCIPLES.md` §2)
- Resolving any **blocking** entry in `OPEN-DECISIONS.md`

Decisions that merely *add clinic configuration or content* never require an ADR.

## 3. Process

1. Copy `ADR-TEMPLATE.md` → `ADR-NNNN-<slug>.md` (zero-padded, sequential).
2. Fill context honestly — including the options rejected and why.
3. Set status `Proposed` → review → `Accepted` (or `Rejected` with rationale preserved).
4. Update `OPEN-DECISIONS.md`: the entry leaves the register (or points at the ADR).
5. Update any canonical document the decision changes — in the same change.

## 4. Current state

**ADR-0001 is Accepted** and resolves application framework/rendering model A-1. CMS, tenant architecture, deployment topology, domain strategy, persistence, and other decisions in §2 remain unresolved unless their register entries point to an accepted ADR. The register of unresolved decisions lives in `docs/product/OPEN-DECISIONS.md`.
