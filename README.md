# الإقامة الليبية الآمنة للخدمات العمالية — Demo

Interactive frontend demo for a residency/workforce-services operating system for **الإقامة الليبية الآمنة للخدمات العمالية / LSR**.

The goal is to show the difference between:

- a simple qualification chat, and
- a case-management operating system that tracks intake, eligibility, cash deposit status, worker profiles, post-residency services, and B2B worker requests.

## Current Status

This repo is in demo/handoff mode.

- Local development server: should be stopped unless actively working.
- Hosted demo may still be live on Vercel unless explicitly disabled in the deployment provider.
- This is not a production system and should not be presented as one.

Live demo used during development:

https://eqama-libyan-safe-demo.vercel.app/

## Read First for Future AI Agents

Before editing this repo, read:

1. `MEMORY.md`
2. `AGENTS.md`
3. `docs/demo-handoff.md`
4. `docs/project-foundation.md`
5. `docs/system-requirements-demo-plan.md`

## Demo Scope

Built:

- Arabic RTL landing page
- Interactive intake/qualification flow
- Rule-based qualification engine, no AI decision-making
- Result screen with guidance for non-startable cases
- Admin dashboard with dummy residency cases
- Case detail page with status, payment, notes, and convert-to-worker actions
- Pipeline board with staged client cards and demo movement
- Client-safe status tracker
- Workers page with dummy worker profiles
- Post-residency services page with dummy service requests
- B2B requests page with dummy company requests
- Compact tutorial guides for key pages

Not built intentionally:

- No real backend
- No real database
- No authentication/roles
- No real payment
- No document uploads
- No WhatsApp/TikTok/Facebook API integration
- No AI eligibility decision
- No legal final approval promises

## Stack

- Next.js 16.2.5 / React 19.2.4
- TypeScript
- Tailwind CSS v4
- Zustand demo store
- Vitest for qualification and pipeline rule tests
- lucide-react icons

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

Recommended quality gate before commit:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## Routes

- `/` — Landing page
- `/intake` — Qualification flow
- `/admin` — Admin dashboard
- `/admin/cases/[id]` — Case detail with client pipeline and state updates
- `/pipeline` — Kanban-style pipeline board
- `/status` — Client-facing status/pipeline tracker
- `/admin/workers` — Worker profiles
- `/admin/services` — Post-residency services
- `/admin/b2b` — B2B requests

## Core Product Message

This is not just a qualification bot.
This is not a prettier Google Sheet.

It is a simple operating-system demo for the worker journey from first message to post-residency services:

TikTok/Facebook inquiry → intake qualification → admin case → pipeline stage → cash deposit tracking → worker profile → post-residency services → B2B request.

## Brand Direction

The UI should stay close to the LSR real-world identity:

- Arabic-first and RTL-first
- Dark glass / black base
- Gold/orange premium accents
- Clear, reassuring copy
- “معنا خطوة بخطوة نحو الأمان” as the emotional direction

## Deployment Notes

Deployment-connected fork:

`abdoai-cloud-git/eqama-libyan-safe-demo`

Original/source repo:

`abdoaiagency-source/eqama-libyan-safe-demo`

In this working copy:

- `origin` points to the original/source repo.
- `deploy` points to the deployment-connected fork.

Push shipped demo changes to `deploy main` first.
