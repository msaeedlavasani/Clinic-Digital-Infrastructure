# Clinic Digital Infrastructure (CDI)

**Clinic Digital Infrastructure (CDI) is a reusable, multilingual, bidirectional digital platform for aesthetic clinics — not a collection of bespoke clinic websites.**

One Platform Core → Clinic Configuration → Independent Clinic Experience. Clinics differ through configuration, content, localized content, theme, controlled variants, assets, integrations, and domain — never through source-code forks.

- **Status:** Foundation phase. This repository currently contains **governance and contracts only** — no implementation. FOUNDATION-00 (documentation-only) is complete; no framework, CMS, database, or vendor has been selected.
- **First read:** [`docs/README.md`](docs/README.md) — the documentation map (what is binding, what is V1, what requires an ADR, what is unresolved).
- **Primary market:** Iranian aesthetic clinics initially; Persian (`fa-IR`) is a first-class reference locale. The platform is locale-aware and bidirectional by design (RTL: Persian/Arabic · LTR: English/Russian as reference locales) to serve domestic and international clinic audiences.

## Documentation structure

```text
docs/
  README.md            documentation map — start here
  governance/          constitution, authority model, engineering + agent contracts
  product/             V1 scope, roadmap (guidance), open decisions
  architecture/        platform boundaries, replication, localization, integrations, SEO
  design-system/       design system constitution, bidirectional/responsive/accessibility
  content/             content model, medical trust governance
  engineering/         lead capture, analytics, performance, privacy/security
  decisions/           ADR mechanism + template (no ADRs yet)
```

AI implementation agents must read `docs/governance/AGENT-CONTRACT.md` before writing any code.
