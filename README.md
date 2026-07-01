# HIK — HumanIsKind Website

> **Fail Open to Humans. Fail Closed, Zero Trust to Machines.**

The public face of deterministic AI governance.  
This repository contains the website for [humaniskind.com](https://www.humaniskind.com) — the marketing and product front-end for the HIK Zero-Trust Enforcement Platform.

---

## What is HIK?

**Human Is Kind™ (HIK)** is a deterministic AI governance infrastructure that intercepts, validates, and cryptographically audits every AI agent action at the policy boundary — before it reaches the model or your workflow.

Probabilistic guardrails fail. HIK enforces.

- **Gate 1** — Input policy check before the LLM sees the request
- **Gate 2** — Output policy check before the user sees the response
- **Sacred Trace™** — Immutable cryptographic compliance receipt anchored on IPFS + EVM
- **KMIR Kernel** — Zero-Trust, fail-close policy enforcement engine

---

## EU AI Act — Article 50 (August 2, 2026)

The EU Digital Omnibus deferred Annex III high-risk obligations to December 2, 2027 — but **Article 50 Transparency enforcement is locked for August 2, 2026**. No deferral. No grace period.

CISOs relying on probabilistic guardrails will fail audits.

→ [Request a Compliance Demo](mailto:contact@humaniskind.com)

---

## Repository Structure

```
HIK/
├── .emergent/            # Origin fingerprint — Manifesto, Governance, License live here
├── frontend-next/        # Next.js 15 website (canonical, deployed to Cloud Run)
│   ├── src/app/          # App Router pages + metadata + JSON-LD schema
│   ├── src/views/        # Page client components
│   ├── src/components/   # Reusable UI (TopNav, Layout, ContactCTA, Dashboard)
│   └── src/i18n/         # EN / ES / PT translations
├── backend/              # FastAPI + MongoDB governance dashboard API
│   └── server.py         # Enforcement event API, Sacred Trace receipts, PDF export
├── Manifesto.md          # The philosophy
├── GOVERNANCE.md         # The rules
└── frontend/             # Legacy React frontend (deprecated)
```

---

## Core Documents

The HIK platform is governed by the documents maintained in the core infrastructure repository:

| Document | Purpose |
|---|---|
| [Manifesto](./Manifesto.md) | The philosophy — Zero Trust, Fail-Close, human provenance. The paradox of a governance platform built by the AI it governs. |
| [Governance](./GOVERNANCE.md) | Decision-making, licensing model (FCL-1.0), NDA access policy, Apache 2.0 conversion date |
| [License](https://github.com/mriotorto33/HumanIsKind/blob/main/LICENSE.md) | **FCL-1.0-Apache-2.0** — Source Visible under NDA. Apache 2.0 on **July 1, 2027**. Irrevocable. |
| [.emergent/](./emergent/) | The agentic origin folder — holds Manifesto, Governance, and License. The AI built this. The human governed it. |

---

## Infrastructure

| Component | Stack | Hosting |
|---|---|---|
| Frontend | Next.js 15, React 19, TailwindCSS | Google Cloud Run (us-east4) |
| Backend | Python 3.12, FastAPI, Motor (async MongoDB) | Google Cloud Run (us-east4) |
| Database | MongoDB Atlas | mriotorto33 cluster (us-east4) |
| Container Registry | Docker / Artifact Registry | `us-east4-docker.pkg.dev/gen-lang-client-0109704786/hik-repo` |
| DNS | GoDaddy → `ghs.googlehosted.com` | `www.humaniskind.com` |

---

## Local Development

```bash
# Frontend (Next.js)
cd frontend-next
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
npm run dev

# Backend (FastAPI)
cd backend
pip install -r requirements.txt
cp .env.example .env          # set MONGO_URI, DB_NAME
uvicorn server:app --reload --port 8080
```

---

## Deployment

Deploy scripts are **not committed** (contain secrets). Use environment variables:

```powershell
# Required env vars for deploy
$env:MONGO_URI    = "mongodb+srv://..."
$env:DB_NAME      = "hikdb"
$env:CORS_ORIGINS = "https://www.humaniskind.com"
```

See [GOVERNANCE.md](./GOVERNANCE.md) for the deployment decision model.

---

## Licensing

This repository is **Source Visible under NDA**.

- **License:** FCL-1.0-Apache-2.0 (Fair Core License, Version 1.0)
- **This release (v4.0):** Apache 2.0 opens on **July 1, 2027** — 12 months, irrevocable
- **Future releases:** Each carries its own FCL-1.0 term from release date, at founders' discretion
- **Access:** Signed NDA required → [martin@humaniskind.com](mailto:martin@humaniskind.com)

> *The AI governance crisis doesn't wait — neither do we.*

---

## Team

| Name | Role |
|---|---|
| **Martín Riotorto** | Founder & Lead Architect — Montevideo, Uruguay |
| **Matías Mospan** | Co-Founder & Platform Lead — Argentina |
| **Federico Brubacher** | External Strategic Advisor — California, USA |
| **Agustín Ortiz** | Chief Marketing Officer |

---

## Contact

- Website: [humaniskind.com](https://www.humaniskind.com)
- Email: [contact@humaniskind.com](mailto:contact@humaniskind.com)
- Core repo: [github.com/mriotorto33/HumanIsKind](https://github.com/mriotorto33/HumanIsKind)

---

*"The machine is infinite, but the Human Intent is unique. We code to protect the unique."*  
**HumanIsKind™ © 2026** — Martín Riotorto & Matías Mospan
