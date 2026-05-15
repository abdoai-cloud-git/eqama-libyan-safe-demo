# New Website Direction — Stripe Style for Libyan Safe Residency

## Decision

For the new Libyan Safe Residency website, use a **Stripe-style system-storytelling direction**.

## Content source-of-truth rule

The website content copy must use the user-provided **PDF** as the source of truth once the PDF is available in this workspace.

Until that PDF is attached/extracted, this document should be treated as visual/structural direction only — not final website copy.

The current situation analysis and results-table plan can support strategy, but final public wording, service names, claims, contact details, and business descriptions must be checked against the PDF before implementation.

This does **not** mean copying Stripe branding. It means borrowing the principles that make Stripe feel premium, trustworthy, and system-oriented:

- clear workflow storytelling
- deep navy / white contrast
- elegant cards
- light typography
- process diagrams
- trust through clarity
- refined shadows and spacing
- one confident primary accent

For LSR, the accent becomes **gold/orange**, not Stripe purple.

---

## Why Stripe style fits LSR

Libyan Safe Residency needs to explain a business transformation:

> Social inbox demand → structured qualification → reviewable cases → document/payment clarity → operational follow-up.

Stripe-style design is strong for this because it makes complex systems feel understandable and trustworthy.

The new website should not look like a noisy SaaS template. It should look like a serious operating layer for a real service business.

---

## Visual direction

### Overall feel

- Premium but not flashy.
- Official but not government-heavy.
- Systematic but human.
- Clear enough for non-technical business stakeholders.
- Arabic-first and RTL-first.

### Palette

Stripe-inspired base:

- White / warm off-white page sections.
- Deep navy headings instead of pure black.
- Soft blue-gray borders.
- Blue-tinted / navy-tinted shadows.

LSR adaptation:

- Primary accent: gold/orange.
- Dark sections: deep navy-black, not plain black.
- Trust sections: off-white with deep navy text.
- Status colors: controlled, not rainbow.

Recommended colors:

- Deep Navy: `#061B31`
- Brand Dark: `#0D253D`
- LSR Gold: `#D99A2B`
- LSR Orange: `#EA6A2A`
- Warm Paper: `#FFF8ED`
- White: `#FFFFFF`
- Slate Body: `#64748D`
- Label Navy: `#273951`
- Soft Border: `#E5EDF5`
- Success: `#15BE53`
- Warning: `#D99A2B`
- Danger: `#D94141`

### Typography

Keep Cairo for Arabic support, but apply Stripe-like behavior:

- lighter headings where possible, not always black/heavy
- tight headline tracking/line-height
- generous body line-height
- clear labels and captions

Recommended:

- Hero headline: Cairo 700, large, tight line-height.
- Section headings: Cairo 700 or 800, deep navy.
- Body: Cairo 500/600, slate.
- Labels: Cairo 700, small, label navy.

Avoid overusing `font-black`; premium Stripe-like pages often feel more refined with weight discipline.

---

## Website narrative

The homepage should tell one story:

1. Demand already exists.
2. Social inboxes are not operational systems.
3. LSR needs a structured layer between inquiry and case follow-up.
4. Every serious inquiry should become a case with owner, status, next action, documents, and payment visibility.
5. The team stays in control.
6. Clients get clearer next steps.

---

## Homepage structure

### 1. Hero

Goal: communicate the transformation immediately.

Headline option:

> من رسائل السوشيال إلى حالات منظمة قابلة للمتابعة

Subheadline:

> موقع ونظام عرض يوضح كيف تتحول استفسارات تيك توك وفيسبوك إلى حالات واضحة: تأهيل، مراجعة، مستندات، مقدم كاش، ومتابعة حتى اكتمال الإجراء.

Primary CTA:

> ابدأ تنظيم الاستفسارات

Secondary CTA:

> شاهد نموذج سير العمل

Hero visual:

- Stripe-like floating product cards.
- Cards show:
  - TikTok inquiry
  - qualification result
  - missing documents
  - payment status
  - case owner
  - next follow-up

### 2. Current reality section

Title:

> الطلب موجود — المشكلة في السيطرة على التدفق

Content:

- TikTok/Facebook messages arrive informally.
- Gemini is used manually.
- Sheets/Excel track some cases.
- Papers/passports are handled physically.
- Cash deposit happens later after review.

Design:

- White section.
- 4 elegant Stripe-style cards.
- No fake metrics.

### 3. Workflow transformation section

Title:

> ماذا يتغير عندما يصبح كل استفسار حالة؟

Flow:

رسالة → تأهيل مبدئي → مراجعة الفريق → مستندات → مقدم كاش → تحت الإجراء → مكتمل

Design:

- Stripe-like horizontal process diagram.
- Gold/orange line accents.
- Deep navy labels.

### 4. Qualification categories section

Title:

> خمس نتائج واضحة بدل محادثات مفتوحة

Cards:

- مؤهل مبدئيًا
- يحتاج معلومات
- يحتاج مستندات
- غير قابل للبدء حاليًا
- يحتاج مراجعة يدوية

Design:

- Dense but elegant bento grid.
- Each card has meaning + next action.

### 5. Operations visibility section

Title:

> لوحة واحدة للفريق: من ينتظر ماذا؟

Show:

- owner
- status
- next action
- document status
- payment status
- last follow-up

Design:

- Dark navy Stripe-style product preview.
- White/glass cards inside.
- Blue-tinted shadow adapted to navy/gold.

### 6. Trust and privacy section

Title:

> بيانات حساسة تحتاج وضوحًا ومسؤولية

Messages:

- Passport and residency data are sensitive.
- Do not collect everything at first contact.
- No payment request before preliminary review.
- Client-facing status must not expose internal notes.

Design:

- calm off-white section.
- trust copy, no scare language.

### 7. Results section

Title:

> النتائج التي يجب وضعها على الطاولة أسبوعيًا

Five numbers:

1. عدد استفسارات السوشيال الجديدة
2. عدد الاستفسارات المسجلة خارج الإنبوكس
3. عدد المؤهلين مبدئيًا
4. عدد من ينتظرون معلومات أو مستندات
5. عدد من تمت متابعتهم خلال 24 ساعة

Design:

- Stripe-style metrics cards, but label them as operational measurements, not success claims.

### 8. Final CTA

Title:

> الخطوة الأولى ليست تطبيقًا كبيرًا — بل سيطرة واضحة على الاستفسارات الجادة

CTA:

> ابدأ بخطة الأسبوعين

---

## Components needed

### Public site components

- `StripeHero`
- `FloatingCasePreview`
- `CurrentRealityCards`
- `WorkflowDiagram`
- `QualificationGrid`
- `OperationsPreview`
- `TrustPrivacyBlock`
- `WeeklyResultsCards`
- `FinalCTA`

### Shared visual primitives

- `WebsiteShell`
- `WebsiteNav`
- `WebsiteSection`
- `StripeCard`
- `AccentButton`
- `GhostButton`
- `ProcessStep`
- `MetricCard`
- `StatusPill`

---

## New website routes

Because the old demo is done, the new website should not depend on the demo routes as its main story.

Recommended route approach:

- `/` — new public website homepage.
- `/results` — results-on-the-table package / weekly measurement story.
- `/workflow` — process explanation page.
- `/decision-sheet` — stakeholder decision sheet.

Keep old demo routes available only if needed internally, but do not lead with them.

---

## Implementation approach

### Phase 1 — Stripe-style homepage only

Goal:

Create the new homepage direction first.

Files likely touched:

- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/ui.tsx` or new `src/components/website/*`

Acceptance:

- Homepage no longer feels like the old demo entry page.
- It tells the business result story.
- It uses Stripe-like clarity: white/off-white sections, deep navy text, refined cards, gold/orange accent.
- No fake metrics.
- No legal/payment overpromise.

### Phase 2 — Results page

Goal:

Create a page that supports the stakeholder meeting.

Files:

- `src/app/results/page.tsx`

Content:

- first five metrics
- operating rules
- measurement plan
- weekly review structure

### Phase 3 — Workflow page

Goal:

Explain the current-to-future operating flow.

Files:

- `src/app/workflow/page.tsx`

Content:

- current flow pain points
- structured case flow
- qualification categories
- payment/document separation

### Phase 4 — Decision sheet page

Goal:

Turn the business conversation into decisions.

Files:

- `src/app/decision-sheet/page.tsx`

Content:

- who owns inquiry capture
- who reviews cases
- statuses
- documents
- deposit rules
- client messages
- 2-week target

---

## Design rules

Do:

- Use deep navy headings, not pure black.
- Use gold/orange only as a controlled accent.
- Use elegant shadows with navy tint.
- Use clear cards and process diagrams.
- Keep Arabic copy precise and calm.
- Give each section one job.
- Make the website feel like an operating system for a serious service business.

Do not:

- Copy Stripe purple.
- Use playful SaaS icons everywhere.
- Invent fake customer numbers.
- Promise legal approval.
- Ask for payment too early.
- Add AI automation claims unless actually scoped.
- Make it look like a payment/fintech product.

---

## Stripe-style translation for LSR

Stripe says visually:

> Complex infrastructure can be clear, trusted, and elegant.

LSR website should say:

> Complex residency-service intake can be clear, trusted, and organized.

---

## Final design sentence

**A Stripe-inspired Arabic website that turns Libyan Safe Residency from a social-inbox service into a clear, trusted operational system — without overpromising, without fake automation, and without losing the human review that the business needs.**
