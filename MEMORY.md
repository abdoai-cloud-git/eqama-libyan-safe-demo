# Project Memory — الإقامة الآمنة Demo

## Project Purpose

This repository is a shipped frontend demo for **الإقامة الليبية الآمنة للخدمات العمالية / LSR**.

The demo shows how the business can move from scattered TikTok/Facebook messages, Gemini-assisted manual replies, Google Sheets, paper procedures, and cash tracking into a simple operating system for residency and workforce-services cases.

This is not the final production system. It is a sales/discovery demo used to explain the workflow and product direction.

## Primary Outcome

The demo should help a non-technical client understand three ideas quickly:

1. The business is broader than a simple qualification bot.
2. Every inquiry can become a trackable case.
3. A worker journey can continue after residency into services, worker profiles, and B2B staffing requests.

The strongest narrative:

TikTok/Facebook inquiry → intake qualification → admin case → pipeline stage → cash deposit tracking → worker profile → post-residency services → B2B request.

## Stack

- Next.js 16.2.5 App Router
- React 19.2.4
- TypeScript
- Tailwind CSS v4
- Zustand demo store
- Vitest for rules/tests
- lucide-react icons
- No backend
- No database
- No authentication
- No real uploads
- No payment integration

## Rules

1. Keep the app Arabic-first and RTL-first.
2. Keep the LSR visual direction: dark glass, gold/orange brand accents, premium but clear.
3. Do not imply final legal approval or guaranteed residency issuance.
4. Do not use AI to make eligibility decisions. Qualification is rule-based and explainable.
5. Do not request payment before preliminary team review.
6. Treat all customer/case data in this repo as dummy demo data.
7. Keep the demo non-destructive. Pipeline movements are local/demo behavior, not real operations.
8. Avoid adding real backend, auth, or external integrations unless the user explicitly asks to move from demo to product.
9. Preserve the tutorial guide pattern when changing key flows; the guide should stay compact, clear, and non-blocking.
10. Future AI agents should read this file, `AGENTS.md`, `README.md`, and `docs/demo-handoff.md` before editing.

## Repo Map

- `src/app/page.tsx` — landing page and main demo entry.
- `src/app/intake/page.tsx` — public intake / qualification flow.
- `src/app/admin/page.tsx` — admin dashboard overview.
- `src/app/admin/cases/[id]/page.tsx` — case details.
- `src/app/pipeline/page.tsx` — kanban-style client pipeline.
- `src/app/status/page.tsx` — client-safe status tracker.
- `src/app/admin/workers/page.tsx` — worker profiles.
- `src/app/admin/services/page.tsx` — post-residency services.
- `src/app/admin/b2b/page.tsx` — B2B worker requests.
- `src/components/tutorial-guide.tsx` — reusable guide UI.
- `src/lib/tutorials.ts` — tutorial copy and steps.
- `src/lib/qualification/rules.ts` — rule-based qualification engine.
- `src/lib/pipeline-demo.ts` — pipeline stages, dummy clients, movement helpers.
- `src/lib/demo-data/*` — dummy data for cases, workers, services, and B2B requests.
- `docs/project-foundation.md` — original business foundation/context.
- `docs/system-requirements-demo-plan.md` — detailed requirements and demo plan.
- `docs/harness/guide-v2-polish/*` — completed harness cycle for tutorial polish.

## Commands

Install:

```bash
npm install
```

Development:

```bash
npm run dev
```

Quality gates:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Recommended before committing any change:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## Deployment

The deployment-connected fork is:

`abdoai-cloud-git/eqama-libyan-safe-demo`

The original/source repository is:

`abdoaiagency-source/eqama-libyan-safe-demo`

In this working copy:

- `origin` points to the original/source repo.
- `deploy` points to the deployment-connected fork.

Push production/demo updates to `deploy main` first.

## Definition of Done

For normal demo changes:

1. Scope is limited to the requested demo/product story.
2. Arabic RTL UI still works.
3. No accidental production claims are added.
4. `npm run lint` passes.
5. `npm run typecheck` passes.
6. `npm test` passes.
7. `npm run build` passes.
8. Browser dogfood is performed for the changed route when UI changed.
9. Commit is pushed to the deployment-connected fork.
10. Final report names the live URL, commit, changed files, and verification.

## Known Risks

- This is a frontend-only demo. It can be mistaken for a production system if the scope is not stated clearly.
- Dummy case data may look real because it uses Arabic names and Libyan phone formats; keep documentation clear that it is fake.
- Pipeline movement is local/demo state and not persisted to a backend.
- The qualification engine is simplified. Real legal/business rules require confirmation from the LSR team.
- Next.js 16 has breaking changes compared with older Next versions; read current docs before relying on old assumptions.
- The live Vercel deployment is connected to the fork, not necessarily the original source repo.
