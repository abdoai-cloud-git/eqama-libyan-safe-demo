# UI Tutorial Guides Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Add simple on-screen tutorial guides that teach staff and clients how to use the demo UI without making the product feel heavy or technical.

**Architecture:** Build a lightweight client-side tutorial layer using React components and localStorage. Start with page-level guide cards and small contextual coach marks; avoid complex tour libraries unless the UI later needs precise element anchoring. Keep tutorials dismissible, restartable, Arabic-first, and aligned with the LSR dark/gold/orange brand.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, localStorage, existing UI primitives in `src/components/ui.tsx`.

---

## Product Principles

1. Tutorials should be simple, not a long training course.
2. Every tutorial should answer: "What do I do here now?"
3. Use Arabic copy first, with short practical text.
4. Do not block the user from using the UI unless absolutely necessary.
5. Every guide must be dismissible and restartable.
6. Store dismissed/completed state locally for demo realism.
7. Keep the visual style close to the storefront brand: dark panel, gold/orange highlight, rounded cards.

---

## Tutorial Types

### 1. Welcome Guide Card

A small card at the top of important pages explaining the page in 2-3 steps.

Use on:
- `/`
- `/intake`
- `/admin`
- `/pipeline`
- `/status`

Example copy:

- Homepage: "ابدأ من التقييم، ثم شاهد كيف تتحول الحالة إلى مسار متابعة." 
- Intake: "أجب سؤالًا واحدًا في كل مرة. لا يوجد دفع قبل مراجعة الفريق." 
- Pipeline: "اسحب العميل بين المراحل أو افتح التفاصيل لتعديل المستندات والمتابعة." 
- Admin: "تابع كل الحالات، ابحث، افتح ملف العميل، وسجل الدفع كاش عند الحاجة." 

### 2. Contextual Tips

Small inline hints beside key UI actions.

Use on:
- Pipeline drag handle
- “فتح التفاصيل” button
- “نقل للتالي” button
- Intake next button
- Admin search/filter area

Example copy:
- "اسحب من هنا لتغيير المرحلة"
- "افتح الدرج لمراجعة المستندات والسجل"
- "ينقل العميل خطوة واحدة للأمام"

### 3. First-Time Mini Tour

A very simple 3-step modal/popover for each major page. It appears only the first time.

Do not build a complicated guided overlay yet. Use one fixed small card with:
- step title
- short description
- next button
- skip button
- progress text: "الخطوة 1 من 3"

### 4. Restart Tutorials Button

Add a small button in the top nav or page footer:

"إظهار التعليمات"

Clicking it resets the local tutorial state for the current page and shows the guide again.

---

## Suggested Tutorial Content

### Homepage Tutorial

Steps:
1. "ابدأ التقييم" — العميل يجيب على أسئلة بسيطة.
2. "مسار العملاء" — الفريق يرى كل حالة في مرحلة واضحة.
3. "لوحة الإدارة" — متابعة شاملة للحالات والدفع والخدمات.

### Intake Tutorial

Steps:
1. "سؤال واحد في كل مرة" — لتقليل الأخطاء على العميل.
2. "لا دفع قبل القبول" — النظام يحافظ على الثقة.
3. "بعد النتيجة" — يتم فتح الحالة للفريق لمراجعتها.

### Pipeline Tutorial

Steps:
1. "بطاقات العملاء" — كل بطاقة تمثل حالة حقيقية.
2. "السحب بين المراحل" — اسحب من المقبض لتغيير المرحلة.
3. "درج التفاصيل" — افتح التفاصيل لتعديل المستندات ومتابعة السجل.

### Admin Tutorial

Steps:
1. "الأرقام في الأعلى" — ملخص سريع عن العمل اليومي.
2. "البحث والفلاتر" — ابحث بالاسم أو الهاتف أو الجنسية.
3. "ملف الحالة" — افتح الحالة لمراجعة السبب، الدفع، والمسؤول.

### Status Tutorial

Steps:
1. "متابعة العميل" — العميل يرى رسالة آمنة بدون ملاحظات داخلية.
2. "المرحلة الحالية" — توضح أين وصل الملف.
3. "الخطوة القادمة" — تخبر العميل بما يجب فعله الآن.

---

## Implementation Tasks

### Task 1: Create tutorial data model

**Objective:** Add typed tutorial definitions for each page.

**Files:**
- Create: `src/lib/tutorials.ts`

**Implementation:**

```ts
export type TutorialPage = 'home' | 'intake' | 'admin' | 'pipeline' | 'status';

export type TutorialStep = {
  title: string;
  body: string;
  actionLabel?: string;
};

export type TutorialDefinition = {
  page: TutorialPage;
  eyebrow: string;
  title: string;
  summary: string;
  steps: TutorialStep[];
};

export const tutorials: Record<TutorialPage, TutorialDefinition> = {
  home: {
    page: 'home',
    eyebrow: 'دليل سريع',
    title: 'كيف تستخدم الديمو؟',
    summary: 'ابدأ بالتقييم، ثم شاهد كيف تتحول الحالة إلى مسار متابعة واضح.',
    steps: [
      { title: 'ابدأ التقييم', body: 'العميل يجيب على أسئلة بسيطة لمعرفة حالته مبدئيًا.' },
      { title: 'شاهد مسار العملاء', body: 'كل عميل يظهر كبطاقة يمكن نقلها بين مراحل العمل.' },
      { title: 'افتح لوحة الإدارة', body: 'الفريق يتابع الحالة، الدفع، المسؤول، وآخر تحديث.' },
    ],
  },
  intake: {
    page: 'intake',
    eyebrow: 'دليل التأهيل',
    title: 'املأ البيانات خطوة بخطوة',
    summary: 'سؤال واحد في كل مرة، بدون طلب دفع قبل مراجعة الفريق.',
    steps: [
      { title: 'أجب على السؤال الحالي', body: 'اكتب الإجابة أو اختر من الخيارات المعروضة.' },
      { title: 'انتقل للخطوة التالية', body: 'زر التالي لا يسمح بتخطي المعلومات الأساسية.' },
      { title: 'افتح الحالة للفريق', body: 'بعد النتيجة يمكن فتح ملف الحالة في لوحة الإدارة.' },
    ],
  },
  admin: {
    page: 'admin',
    eyebrow: 'دليل الإدارة',
    title: 'تابع الحالات من مكان واحد',
    summary: 'استخدم الأرقام، البحث، والفلاتر لمعرفة أين يحتاج الفريق للتدخل.',
    steps: [
      { title: 'راجع الملخص', body: 'الأرقام في الأعلى تعطي صورة سريعة عن الحالات والدفع والخدمات.' },
      { title: 'ابحث وفلتر', body: 'ابحث بالاسم أو الهاتف أو الجنسية للوصول للحالة بسرعة.' },
      { title: 'افتح ملف الحالة', body: 'زر عرض يفتح التفاصيل الكاملة للحالة.' },
    ],
  },
  pipeline: {
    page: 'pipeline',
    eyebrow: 'دليل المسار',
    title: 'حرّك العملاء بين المراحل',
    summary: 'اسحب البطاقة، افتح التفاصيل، وتابع المستندات والسجل.',
    steps: [
      { title: 'اختر العميل', body: 'اضغط على بطاقة العميل أو زر فتح التفاصيل.' },
      { title: 'اسحب بين المراحل', body: 'استخدم المقبض الصغير لتحريك البطاقة إلى مرحلة أخرى.' },
      { title: 'راجع التفاصيل', body: 'الدرج الجانبي يحتوي المستندات، السجل، والإجراء التالي.' },
    ],
  },
  status: {
    page: 'status',
    eyebrow: 'دليل المتابعة',
    title: 'اعرض حالة العميل بأمان',
    summary: 'هذه الصفحة تعرض للعميل ما يحتاج معرفته بدون الملاحظات الداخلية.',
    steps: [
      { title: 'المرحلة الحالية', body: 'توضح أين وصل ملف العميل الآن.' },
      { title: 'الخطوة القادمة', body: 'تخبر العميل بما يجب توفيره أو انتظاره.' },
      { title: 'رسالة آمنة', body: 'المحتوى مناسب للإرسال للعميل عبر واتساب لاحقًا.' },
    ],
  },
};
```

**Verification:**

Run:
```bash
npm run typecheck
```

Expected: pass.

---

### Task 2: Create localStorage tutorial state hook

**Objective:** Track whether each tutorial was dismissed or completed.

**Files:**
- Create: `src/hooks/use-tutorial-state.ts`

**Implementation:**

```ts
'use client';

import { useEffect, useState } from 'react';
import type { TutorialPage } from '@/lib/tutorials';

const keyFor = (page: TutorialPage) => `lsr-tutorial-${page}`;

export function useTutorialState(page: TutorialPage) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(keyFor(page)) === 'done';
    setOpen(!dismissed);
    setReady(true);
  }, [page]);

  const dismiss = () => {
    window.localStorage.setItem(keyFor(page), 'done');
    setOpen(false);
  };

  const restart = () => {
    window.localStorage.removeItem(keyFor(page));
    setOpen(true);
  };

  return { ready, open, dismiss, restart };
}
```

**Verification:**

Run:
```bash
npm run typecheck
```

Expected: pass.

---

### Task 3: Build reusable TutorialGuide component

**Objective:** Create the branded on-screen tutorial UI.

**Files:**
- Create: `src/components/tutorial-guide.tsx`

**Implementation notes:**

Component props:
- `page: TutorialPage`
- Optional `className`

UI behavior:
- Shows a compact guide card when open.
- Has next/back buttons for steps.
- Has skip/done button.
- Has restart button when closed.

Design:
- Dark card background.
- Gold/orange icon/accent.
- Rounded corners.
- Copy must be short.

**Acceptance criteria:**
- First visit shows the guide.
- Dismiss hides it.
- Restart shows it again.
- State persists after refresh.

**Verification:**

Run:
```bash
npm run lint
npm run typecheck
```

Expected: pass.

---

### Task 4: Add TutorialGuide to main pages

**Objective:** Add page-specific guide cards to the pages users need most.

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/intake/page.tsx`
- Modify: `src/app/admin/page.tsx`
- Modify: `src/app/pipeline/page.tsx`
- Modify: `src/app/status/page.tsx`

**Placement:**
Place below `PageTitle` or near the top of the page content.

Examples:

```tsx
<TutorialGuide page="pipeline" />
```

**Verification:**

Run:
```bash
npm run typecheck
npm run build
```

Expected: pass.

---

### Task 5: Add inline contextual hints

**Objective:** Add tiny helper hints for important UI actions.

**Files:**
- Modify: `src/app/pipeline/page.tsx`
- Modify: `src/app/intake/page.tsx`
- Modify: `src/components/admin-table.tsx`

**Pipeline hints:**
- Near drag handle: "اسحب من هنا"
- Near detail button: "راجع المستندات والسجل"
- Near next-stage button: "ينقل خطوة واحدة"

**Intake hints:**
- Near progress card: "أجب بالترتيب للحصول على نتيجة أوضح"
- Near payment text: "لا يتم طلب الدفع قبل القبول المبدئي"

**Admin hints:**
- Near search field: "ابحث بالاسم أو الهاتف"

**Verification:**

Browser smoke test:
- Open `/pipeline`, confirm hints are visible but not noisy.
- Open `/intake`, confirm hints do not interrupt form flow.
- Open `/admin`, confirm table layout still works.

---

### Task 6: Add tests for tutorial state utilities if extracted

**Objective:** Keep logic testable if localStorage helpers are extracted from the hook.

**Files:**
- Optional create: `src/lib/tutorial-state.ts`
- Optional create: `src/lib/tutorial-state.test.ts`

**Recommendation:**
Only do this if the hook grows. For first version, manual/browser verification is enough because the logic is very small and browser-specific.

---

### Task 7: Full verification and commit

**Objective:** Verify the full app and push safely.

Run:
```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Browser checks:
- `/` guide opens, dismisses, and restarts.
- `/intake` guide opens, does not block form usage.
- `/admin` guide opens, search still works.
- `/pipeline` guide opens, drawer still works, drag handle still exists.
- `/status` guide opens, page remains readable.
- Check browser console for errors after each page.

Commit:
```bash
git add src docs/plans/2026-05-07-ui-tutorial-guides.md
git commit -m "feat: add UI tutorial guides"
git push deploy main
```

Live verification:
```bash
curl -I -L https://eqama-libyan-safe-demo.vercel.app/
```

Then open live site and confirm the tutorial appears.

---

## Definition of Done

- Tutorial guide exists on homepage, intake, admin, pipeline, and status pages.
- Tutorial is Arabic-first and simple.
- User can dismiss it.
- User can restart it.
- Dismissed state persists in localStorage.
- Inline hints exist for drag/drop, details drawer, next-stage, intake progress, and admin search.
- UI remains aligned with LSR gold/orange/dark brand.
- lint, typecheck, tests, and build pass.
- Live deployment is verified.

---

## Future Enhancements, Not for First Version

Do not implement these now unless requested:

1. Precise spotlight overlay around elements.
2. Animated arrows pointing to controls.
3. Role-based tutorials for staff vs client.
4. Video tutorial embeds.
5. Multi-language tutorial toggle.
6. Analytics for tutorial completion.
