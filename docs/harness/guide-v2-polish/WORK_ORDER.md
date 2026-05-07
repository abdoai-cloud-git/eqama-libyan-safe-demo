# Work Order: Guide v2 Polish

## Goal

Improve the on-screen tutorial guide from useful-but-heavy to compact, clear, and less confusing while preserving dismiss/restart/localStorage behavior.

## Context

Live UX evaluation rated the guide around 7.5/10. It works technically, but:

- guide card is too large and visually dominant
- intake page has two generic `التالي` buttons: guide next and form next
- guide progress `الخطوة 1 من 3` conflicts with form progress `الخطوة 1 من 13`
- pipeline repeats the same explanatory hint under every client card

## Scope

Allowed files:

- `src/components/tutorial-guide.tsx`
- `src/lib/tutorials.ts`
- `src/app/intake/page.tsx`
- `src/app/pipeline/page.tsx`
- `docs/harness/guide-v2-polish/*`

## Out of Scope

- Do not add a modal/spotlight/tour library.
- Do not remove close/skip/restart behavior.
- Do not remove localStorage persistence.
- Do not change unrelated pages or business logic.
- Do not change tests/evals to hide failures.

## Acceptance Criteria

- [ ] Tutorial guide is more compact vertically.
- [ ] Tutorial controls are clearly labeled as guide controls:
  - `التالي في الدليل`
  - `السابق في الدليل`
- [ ] Tutorial progress label is clearly separate from form progress:
  - `دليل الاستخدام: 1 من 3`
- [ ] Intake copy tells the user to use the form button, not the guide button.
- [ ] Repeated pipeline hint under every card is removed.
- [ ] A single board-level hint explains drag/details/next actions.
- [ ] Guide remains dismissible and restartable.
- [ ] No console JavaScript errors on checked pages.

## Verification Commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Browser Verification

- Open `/intake` and confirm guide controls do not confuse form flow.
- Open `/pipeline` and confirm hints are less noisy.
- Complete a guide with `تم` and confirm `إظهار التعليمات` appears.
- Check browser console after interactions.

## Expected Report

Return:

- Summary
- Files changed
- Verification results
- UX before/after assessment
- Any remaining issues
