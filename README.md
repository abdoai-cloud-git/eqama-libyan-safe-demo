# الإقامة الليبية الآمنة للخدمات العمالية — Demo

Interactive demo for a residency/workforce-services operating system.

The goal is to show the difference between:

- a simple qualification chat, and
- a case-management system that tracks intake, eligibility, cash deposit status, worker profiles, post-residency services, and B2B worker requests.

## Demo Scope

Built:

- Arabic RTL landing page
- Interactive intake/qualification chat
- Rule-based qualification engine, no AI decision-making
- Result screen with guidance for non-startable cases
- Admin dashboard with 20 dummy residency cases
- Case detail page with status, payment, notes, and convert-to-worker actions
- Workers page with 8 dummy worker profiles
- Post-residency services page with 10 dummy service requests
- B2B requests page with 5 dummy company requests

Not built intentionally:

- No real backend
- No real payment
- No document uploads
- No WhatsApp/TikTok API integration
- No AI eligibility decision
- No legal final approval promises

## Stack

- Next.js 16 / React 19
- TypeScript
- Tailwind CSS
- Zustand demo store
- Zod-ready data model
- Vitest for qualification rule tests
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

## Routes

- `/` — Landing page
- `/intake` — Qualification chat
- `/admin` — Admin dashboard
- `/admin/cases/[id]` — Case detail
- `/admin/workers` — Worker profiles
- `/admin/services` — Post-residency services
- `/admin/b2b` — B2B requests

## Core Message

This is not just a qualification bot.
This is not a prettier Google Sheet.
It is a simple operating system for the worker journey from first message to post-residency services.
