# Future AI Agent Instructions

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses Next.js 16.2.5 and React 19.2.4. APIs and conventions may differ from older training data. Before changing framework behavior, check the installed docs in `node_modules/next/dist/docs/` or verify against the actual package version.
<!-- END:nextjs-agent-rules -->

## Read First

Before making changes, read these files in order:

1. `MEMORY.md` — compact project context and rules.
2. `README.md` — current demo scope, routes, and commands.
3. `docs/demo-handoff.md` — handoff/status and product narrative.
4. `docs/project-foundation.md` — Arabic business foundation.
5. `docs/system-requirements-demo-plan.md` — detailed demo requirements.

## Project Identity

This repo is a frontend demo for **الإقامة الليبية الآمنة للخدمات العمالية / LSR**.

It demonstrates an operating-system style workflow for residency and workforce-services cases:

TikTok/Facebook inquiry → intake qualification → admin case → pipeline stage → cash deposit tracking → worker profile → post-residency services → B2B request.

It is not a production system.

## Non-Negotiable Product Rules

- Arabic-first, RTL-first UX.
- LSR brand direction: dark glass, gold/orange, premium but practical.
- Qualification logic is deterministic/rule-based, not AI decision-making.
- Never imply guaranteed legal approval.
- Never request payment before preliminary team review.
- Treat all data as fake demo data.
- Do not add real integrations, backend persistence, or auth unless explicitly requested.
- Preserve client-safe separation: public/status pages must not expose internal notes.

## Technical Rules

- Use TypeScript and existing app-router patterns.
- Prefer small, scoped changes.
- Keep reusable UI in `src/components` and business/demo logic in `src/lib`.
- Keep dummy datasets under `src/lib/demo-data` or existing demo-specific files.
- Do not introduce large dependencies for simple UI/demo behavior.
- Preserve tutorial guide behavior when editing pages that use it.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

Quality gate before commit:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## Deployment / Git Remotes

The deployment-connected fork is:

`abdoai-cloud-git/eqama-libyan-safe-demo`

The original/source repository is:

`abdoaiagency-source/eqama-libyan-safe-demo`

Expected remotes in this working copy:

- `origin` → original/source repo.
- `deploy` → deployment-connected fork.

Push shipped demo changes to `deploy main` first.

If using token auth in this Hermes environment, `GITHUB_API_TOKEN` may be available. Do not permanently embed tokens in git remotes.

## Important Files

- `src/app/page.tsx` — landing.
- `src/app/intake/page.tsx` — intake flow.
- `src/app/admin/page.tsx` — dashboard.
- `src/app/admin/cases/[id]/page.tsx` — case detail.
- `src/app/pipeline/page.tsx` — pipeline board.
- `src/app/status/page.tsx` — client status.
- `src/components/tutorial-guide.tsx` — guide UI.
- `src/lib/tutorials.ts` — guide copy.
- `src/lib/qualification/rules.ts` — eligibility rules.
- `src/lib/pipeline-demo.ts` — pipeline stages and demo clients.

## Completed Harness Cycle

A previous agentic-engineering cycle improved the tutorial guide from 7.5/10 to 8.5/10.

Evidence:

- `docs/harness/guide-v2-polish/WORK_ORDER.md`
- `docs/harness/guide-v2-polish/cycle-001.md`
- `docs/harness/guide-v2-polish/results.tsv`

When making similar UI polish changes, keep the same bounded cycle style: define goal, candidate, quality gates, decision, and result.

## Final Response Expectations

When reporting to the user, include:

- What changed.
- What was intentionally not changed.
- Verification commands run.
- Commit hash.
- Whether it was pushed to the deployment fork.
- Whether the local demo server is running or stopped.
