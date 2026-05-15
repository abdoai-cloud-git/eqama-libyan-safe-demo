# Premium Website Plan — Libyan Safe Residency

## Planning source context

Read before this plan:

- `results/ACTIVE_CONTEXT.md`
- `results/current-situation-analysis.md`
- `MEMORY.md`
- `README.md`

Active branch: `results`

The website must respect the current-state diagnosis first: Libyan Safe Residency already has demand from TikTok/Facebook, but intake and follow-up depend too much on inbox handling, informal qualification, spreadsheets, paper processes, cash tracking, and memory.

This plan does not turn the demo into production. It plans the next premium website/demo iteration.

---

## Claude / design skills found and selected

Useful skills found:

- `claude-design` — design process, high-fidelity artifacts, variants, anti-slop rules, verification.
- `popular-web-designs` — real design-system references and exact visual vocabulary.
- `frontend-ux-ui` — polished RTL frontend workflow, dashboards, forms, pipelines, accessibility, visual QA.
- `frontend-first-sales-demo` — frontend-first Next.js demo approach, no backend unless explicitly requested.
- `writing-plans` — implementation plan structure, exact files, verification gates.

Claude/agent coding skills also exist if we later delegate implementation:

- `claude-code`
- `claude-code-autoresearch-loop`
- `claude-code-router-byok`
- `claude-code-router-nvidia-clean`
- `claude-code-router-nvidia-tooluse`

Recommended for this project right now:

- Use `claude-design` principles for the visual planning.
- Use `popular-web-designs` as reference vocabulary.
- Use `frontend-ux-ui` for the actual Next.js implementation and QA.
- Do not use Claude Code yet unless we start a larger implementation loop.

---

## Premium reference systems

The goal is not to copy a brand. The goal is to combine design principles into an original LSR identity.

### 1. Linear-style dark product precision

Useful for:

- admin dashboard
- pipeline board
- status tracker
- internal operation-system feeling

Principles to borrow:

- near-black canvas
- subtle semi-transparent borders
- cards elevated by luminance, not heavy shadows
- precise typography
- restrained single accent
- dark UI that feels native, not just inverted

LSR adaptation:

- keep dark base, but replace Linear violet with LSR gold/orange.
- use dark glass panels for case cards, intake status, and pipeline stages.

### 2. Apple-style cinematic clarity

Useful for:

- landing page hero
- one-message-per-section storytelling
- premium trust impression

Principles to borrow:

- large whitespace
- strong hero hierarchy
- clean section rhythm
- one primary idea per section
- interface gets out of the way

LSR adaptation:

- hero should make one message obvious: social media inquiry becomes a trackable case.
- avoid crowded feature grids above the fold.

### 3. BMW-style premium authority

Useful for:

- legal/residency seriousness
- trust and official-feeling presentation
- strong dark/light contrast

Principles to borrow:

- sharp confidence
- dark hero with premium lighting
- disciplined layout
- very few decorative elements

LSR adaptation:

- use sharp/controlled gold lines and official-feeling sections.
- avoid playful SaaS visuals that weaken the seriousness of residency services.

### 4. Stripe-style systems story

Useful for:

- explaining workflow transformation
- showing the product as an operating layer
- trust in process and data clarity

Principles to borrow:

- clear system diagrams
- elegant cards
- measured copy
- technical workflow shown visually

LSR adaptation:

- show the chain: TikTok inquiry → qualification → review → documents → cash deposit → under process → completed.

### 5. Superhuman-style luxury restraint

Useful for:

- premium homepage polish
- calm confidence
- minimal CTAs

Principles to borrow:

- one dramatic hero gesture
- warm premium CTA
- product screenshots / UI as proof
- restrained copy

LSR adaptation:

- make the website feel like a trusted office, not a noisy marketing landing page.

---

## Latest premium website techniques to use carefully

Based on current web-design trend scan and the design-system references above, these are the techniques worth using for LSR:

### Use

1. **Dark-mode-native premium UI**
   - Build the brand around dark glass, not light cards with dark decoration.
   - Good for LSR because the existing brand direction is gold/orange on dark glass.

2. **Bento sections, but workflow-based**
   - Use bento only when it explains operational reality.
   - Example: one bento block for social inbox, one for qualification, one for case tracking, one for cash deposit, one for documents.
   - Avoid random feature boxes.

3. **Scroll storytelling**
   - The homepage should feel like a guided explanation:
     1. current problem
     2. missed leads risk
     3. structured intake
     4. reviewable cases
     5. team control
   - Each section should answer one question.

4. **Glass surfaces with real contrast**
   - Use translucent dark cards and subtle gold borders.
   - Do not over-blur everything.
   - Text contrast must remain strong, especially Arabic text.

5. **Product UI as hero proof**
   - Use real screenshots/mock panels from the demo: intake, dashboard, pipeline, status.
   - This is stronger than generic illustrations.

6. **Microinteractions with purpose**
   - Use small motion for stage changes, selected cards, validation, saved states.
   - Respect `prefers-reduced-motion`.

7. **Trust-first forms**
   - Intake must explain why questions are asked.
   - Payment must clearly say: no payment at first inquiry; deposit only after team review and document handoff.

8. **Privacy-first copy**
   - The website should show care around passport/residency data.
   - Avoid collecting sensitive data in the first public step unless necessary.

9. **Command/search pattern for admin**
   - A premium internal system should let staff quickly find a case by name, phone, case ID, nationality, or stage.

10. **Accessible RTL polish**
   - Arabic-first layout, correct direction, large touch targets, clear focus states, no broken mixed Arabic/English UI.

### Avoid

- AI-looking gradient sludge.
- Fake metrics and fake testimonials.
- Overpromising legal approval.
- Payment-first CTAs.
- Overbuilt integrations that do not exist.
- Making the website look like a generic SaaS product instead of a trusted Libyan residency/workforce services office.

---

## Recommended premium direction

### Name

**LSR Command Center**

Arabic positioning:

**نظام تشغيل مبسّط يحوّل رسائل السوشيال إلى حالات واضحة قابلة للمتابعة**

### Visual style

- Base: deep black / slate-black.
- Accent: LSR gold and orange.
- Surfaces: dark glass panels with thin amber borders.
- Typography: Cairo for Arabic; strong but not too heavy.
- Mood: trusted office + premium operations dashboard.
- Layout: cinematic landing + precise admin system.

### Main promise

Not:

- “AI residency bot”
- “instant approval”
- “pay now”

Yes:

- “Every inquiry becomes a trackable case.”
- “The team sees who is ready, who is missing documents, who needs review, and who is under process.”
- “The client gets clearer next steps without exposing internal notes.”

---

## Website information architecture

### Public website / landing

Route: `/`

Purpose:

- Explain the current problem and transformation.
- Build trust quickly.
- Direct serious leads to intake.
- Direct internal reviewers to admin demo.

Sections:

1. Hero: “من رسائل تيك توك إلى حالات منظمة”
2. Current reality: TikTok/Facebook inbox pressure, manual follow-up, sheets, paper, cash.
3. Transformation: every inquiry becomes a structured case.
4. Qualification preview: ready, missing info, missing documents, not currently able, manual review.
5. Operational visibility: admin can see cases, documents, payment, stage, next action.
6. Client-safe status: client sees next step, not internal notes.
7. Trust/privacy: sensitive documents handled carefully; no payment before review.
8. CTA: start preliminary intake / view admin demo.

### Intake flow

Route: `/intake`

Purpose:

- Capture structured information without pretending to be legal final approval.

Premium improvements:

- Add “why we ask this” microcopy.
- Add progress with Arabic wording.
- Add trust message before sensitive questions.
- Make result screen more official and calmer.
- Emphasize no payment requested now.

### Admin dashboard

Route: `/admin`

Purpose:

- Show that this is an operating layer, not just a website.

Premium improvements:

- New dark command-center shell.
- KPI summary tied to operational states, not vanity metrics.
- Search / quick case finder.
- Priority queue: new TikTok inquiries, ready for review, missing documents, payment pending.
- “Today’s follow-ups” panel.

### Pipeline

Route: `/pipeline`

Purpose:

- Show work moving through stages.

Premium improvements:

- Dark kanban with stronger stage definitions.
- Each card shows next action, payment status, document status, owner, time-in-stage.
- Add visual aging/blocking indicator.
- Keep movement local/demo only.

### Case detail

Route: `/admin/cases/[id]`

Purpose:

- Show operational clarity on one client.

Premium improvements:

- Case timeline.
- Document checklist.
- Cash deposit tracking block.
- Client-safe update preview.
- Internal notes clearly separated.

### Client status

Route: `/status`

Purpose:

- Give the client clarity without exposing internal details.

Premium improvements:

- Strong privacy note.
- Search by case ID + phone, not name alone.
- Clear “what should I do now?” panel.
- Official-looking stage timeline.

---

## Content strategy

### Core narrative

1. Demand already exists.
2. The risk is losing good clients inside social inboxes.
3. The solution is not just AI replies.
4. The real value is a structured operational layer.
5. The team stays in control.
6. Clients receive clearer next steps.

### Tone

- Arabic-first.
- Calm and trustworthy.
- Operational, not flashy.
- Avoid legal guarantees.
- Avoid aggressive sales language.

### Strong hero copy options

Option A:

> من رسائل تيك توك إلى حالات منظمة قابلة للمتابعة

Option B:

> كل استفسار يصبح حالة واضحة — من أول رسالة حتى اكتمال الإجراء

Option C:

> معنا خطوة بخطوة نحو الأمان — بنظام يوضح من جاهز، من يحتاج مستندات، ومن تحت الإجراء

Recommended: Option A for sharp positioning, with slogan below.

---

## Implementation plan — phase 1

Goal: premium website refresh without changing the core demo architecture.

### Task 1: Create design tokens

Files:

- Modify: `src/app/globals.css`
- Modify: `src/components/ui.tsx`

Add/rework tokens:

- `--lsr-bg-deep`
- `--lsr-bg-panel`
- `--lsr-bg-glass`
- `--lsr-gold`
- `--lsr-orange`
- `--lsr-ink`
- `--lsr-muted`
- `--lsr-border-gold`
- `--lsr-success`
- `--lsr-warning`
- `--lsr-danger`

Acceptance:

- Existing pages keep working.
- Buttons/cards/nav share a more premium LSR style.

### Task 2: Upgrade global shell/navigation

Files:

- Modify: `src/components/ui.tsx`

Changes:

- Premium dark glass nav.
- Better mobile behavior if feasible.
- Clear CTA: `ابدأ التقييم`.
- Keep all current route links.

Acceptance:

- RTL nav remains correct.
- No horizontal overflow on mobile.

### Task 3: Rewrite homepage as premium story

Files:

- Modify: `src/app/page.tsx`

Sections:

1. Hero.
2. Current situation.
3. What changes when inquiries become cases.
4. Workflow strip.
5. Product proof panels.
6. Trust/privacy/payment rules.
7. CTA.

Acceptance:

- Homepage can explain the product without opening admin.
- No fake metrics.
- No solution overpromise.

### Task 4: Add current-situation section/page link

Files:

- Possibly create: `src/app/current-situation/page.tsx`
- Or add condensed section to homepage only.

Recommendation:

- Start with condensed homepage section.
- Keep full analysis in `results/current-situation-analysis.md` as planning evidence.

Acceptance:

- Website reflects the real operating reality before selling the solution.

### Task 5: Premium intake polish

Files:

- Modify: `src/app/intake/page.tsx`
- Possibly modify: `src/lib/qualification/rules.ts` only if labels need better mapping.

Changes:

- Trust note before sensitive questions.
- Better progress wording.
- Better result screen hierarchy.
- More official “team review required” language.

Acceptance:

- Intake still deterministic/rule-based.
- No payment request appears before review.

### Task 6: Admin command center polish

Files:

- Modify: `src/app/admin/page.tsx`
- Modify supporting components only if needed.

Changes:

- Priority queue.
- Operational KPIs.
- Clear source/stage/payment/document status.
- Search/filter polish.

Acceptance:

- Admin page becomes the strongest proof page.

### Task 7: Pipeline/card polish

Files:

- Modify: `src/app/pipeline/page.tsx`
- Modify: `src/components/pipeline-stages.tsx`
- Modify: `src/components/client-card.tsx`
- Modify: `src/lib/pipeline-demo.ts` only if needed.

Changes:

- Stage definitions visible.
- Better blocked/aging/payment/document indicators.
- Refined dark kanban look.

Acceptance:

- Pipeline feels like real operational workflow, not a static board.

### Task 8: Client status trust polish

Files:

- Modify: `src/app/status/page.tsx`

Changes:

- Strong privacy/security explanation.
- “What should I do now?” panel.
- Official timeline style.

Acceptance:

- Client-safe status does not expose internal notes.

### Task 9: Visual QA and verification

Commands:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Browser QA:

- `/`
- `/intake`
- `/admin`
- `/pipeline`
- `/status`

Check:

- console errors
- mobile width 360px
- RTL alignment
- no horizontal overflow
- CTA routing
- form validation
- status privacy

### Task 10: Commit and push

Commit message:

```bash
git commit -m "feat: plan premium LSR website refresh"
```

Push target:

- Branch: `results`
- Remote: `deploy`

---

## Design acceptance checklist

Before calling the premium refresh done:

- The homepage explains the business problem in under 10 seconds.
- The visual direction feels premium, serious, and trusted.
- Dark glass/gold identity is consistent across key pages.
- Arabic/RTL is polished.
- No fake integrations are implied.
- No legal guarantee is implied.
- No payment-before-review is implied.
- Intake uses deterministic qualification.
- Admin shows real operational value.
- Pipeline is actionable and understandable.
- Client status is privacy-safe.
- All quality gates pass.
- Browser smoke test passes.
- Changes are committed and pushed to the deployment fork.

---

## Recommended next action

Build one high-fidelity local direction first before touching all routes:

1. Create a homepage premium redesign on the `results` branch.
2. Dogfood it locally.
3. If the direction feels right, propagate the same tokens to intake/admin/pipeline/status.

This prevents repainting the whole app in a direction we may later reject.
