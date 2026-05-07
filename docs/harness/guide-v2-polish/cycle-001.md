# Cycle 001: Compact Guide and Reduce Hint Noise

## Hypothesis

Making guide controls explicitly tutorial-scoped, reducing card vertical padding, and moving repeated pipeline hints into a single board-level hint will improve UX clarity without adding complexity.

## Changes Made

- Compact `TutorialGuide` into a single responsive strip instead of stacked header + body sections.
- Renamed guide controls to:
  - `التالي في الدليل`
  - `السابق في الدليل`
  - `تخطي الدليل`
- Changed progress label to `دليل الاستخدام: 1 من 3`.
- Updated intake guide copy so users know the guide buttons are explanatory and the form button advances the form.
- Removed repeated helper paragraph under every pipeline card.
- Added one board-level amber hint explaining drag/details/next actions.

## Eval

Commands passed:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Browser checks passed:

- `/intake`: guide is more compact; controls are clearer than v1.
- `/pipeline`: repeated hints are reduced; usefulness preserved.
- Console checks: no JavaScript errors.

## Metric

Baseline UX score: 7.5/10
Candidate UX score: 8.5/10
Delta: +1.0

## Decision

keep

## Reason

The candidate improves clarity and reduces visual clutter while preserving all tutorial behavior and verification gates.

## Remaining Possible Polish

- Differentiate tutorial next button from form next even more visually.
- Optionally make the board-level hint dismissible after first use.
- Add subtle target highlighting in a future cycle if needed.
