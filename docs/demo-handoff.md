# Demo Handoff — الإقامة الآمنة

## Status

The demo has been stopped locally for this session: no local `npm run dev` server should remain running.

The public Vercel deployment may still be live unless it is explicitly disabled from the Vercel dashboard/project settings. Do not delete or disable the hosted deployment without explicit user confirmation.

Live demo used during development:

https://eqama-libyan-safe-demo.vercel.app/

Latest shipped feature commit before handoff:

`7eaa4f6 feat: polish tutorial guide harness`

## What This Demo Proves

The demo proves that LSR can be framed as an operating system, not just a chatbot.

It demonstrates:

- Arabic public landing page.
- Step-by-step intake and rule-based qualification.
- Safe guidance for non-startable cases.
- Admin overview of cases, payments, owners, and status.
- Case detail view.
- Pipeline board for moving clients through stages.
- Client-safe status view.
- Worker profiles after residency.
- Post-residency service requests.
- B2B staffing/worker requests.
- Compact tutorial guides for key pages.

## What Is Intentionally Not Built

- No real backend.
- No database persistence.
- No authentication or roles.
- No document upload storage.
- No WhatsApp/TikTok/Facebook API integration.
- No real payment flow.
- No AI legal/eligibility decision.
- No final legal approval workflow.

This is intentional. The demo is for alignment, sales, and discovery.

## Product Narrative

Use this explanation when presenting the app:

"Today, requests come from TikTok and Facebook, then the team manually qualifies them, records pieces in Google Sheets, follows up on paper, and tracks cash separately. This demo shows the future operating system: every inquiry becomes a case, each case has a clear status, cash deposit is tracked only after review, and successful cases can become worker profiles with ongoing services."

## Key User Flows

### 1. Lead / Visitor Flow

Route: `/`

The landing page explains the LSR service and sends the user to intake.

### 2. Intake Qualification Flow

Route: `/intake`

The user answers one question at a time. The app applies deterministic rules, not AI judgment.

Important rule examples:

- Unofficial entry → not startable now.
- No entry stamp → not startable now.
- Current residency without release letter → not startable now.
- Current residency with release letter → preliminarily eligible.
- New arrival with entry stamp → preliminarily eligible.
- Age over 65 → special review.

### 3. Admin Overview

Route: `/admin`

The team sees cases, statuses, owners, payment state, and quick filters/search.

### 4. Case Detail

Route: `/admin/cases/[id]`

The team reviews a specific case with internal state.

### 5. Pipeline Board

Route: `/pipeline`

The team sees cards by workflow stage and can move demo clients between stages.

Pipeline stages:

1. طلب جديد
2. مراجعة المستندات
3. بانتظار دفع المقدم
4. تحت الإجراء
5. مكتمل

### 6. Client Status View

Route: `/status`

A client-safe view showing only status and next action, without internal notes.

### 7. Worker + Services + B2B

Routes:

- `/admin/workers`
- `/admin/services`
- `/admin/b2b`

These show the larger business model after residency: worker profiles, post-residency services, and company requests.

## Guide / Tutorial System

The guide system is intentionally compact and non-blocking.

Files:

- `src/components/tutorial-guide.tsx`
- `src/hooks/use-tutorial-state.ts`
- `src/lib/tutorials.ts`

Rules for future edits:

- Keep Arabic labels explicit.
- Guide controls should say they belong to the guide, not the form.
- Avoid covering important form controls.
- Preserve localStorage persistence.
- Keep guide text short and action-oriented.

## Brand Direction

The current visual direction should remain close to the real LSR shopfront:

- Dark/black glass background.
- Gold/orange logo and accents.
- Premium service feel.
- Arabic-first copy.
- "معنا خطوة بخطوة نحو الأمان" should influence the product feel: guided, staged, reassuring.

## Future Product Direction

If the demo becomes a real product, likely next steps are:

1. Confirm real business/legal rules with LSR.
2. Add authentication and roles.
3. Add database models for leads, cases, workers, services, payments, notes, and documents.
4. Add file/document upload with secure storage.
5. Add WhatsApp handoff or messaging templates.
6. Add audit log for case changes and cash deposit updates.
7. Add reporting dashboard for lead sources and conversion.
8. Add permissions so client-facing status never exposes internal notes.

Do not start these production steps unless the user explicitly asks to move beyond the demo.

## Agent Handoff Checklist

Before editing:

1. Read `MEMORY.md`.
2. Read `AGENTS.md`.
3. Read `README.md`.
4. Check `git status`.
5. Confirm whether changes should target the deployment fork.

Before finalizing:

1. Run lint, typecheck, tests, and build.
2. Dogfood changed UI routes if UI changed.
3. Commit with a conventional commit message.
4. Push to `deploy main` for shipped demo updates.
5. Report clearly what changed and what remains intentionally out of scope.
