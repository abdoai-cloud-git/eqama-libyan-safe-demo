# Active Context — Libyan Safe Residency

## Current focus

Only **Libyan Safe Residency / الإقامة الآمنة** is active right now.

Other remembered projects are intentionally parked/sleeping unless the user explicitly asks to resume them:

- InstaAudit AI
- AD-OS / AI ads workflows
- Hermes Agent internals beyond keeping the gateway operational
- system-leak-scanner and other utility repos

## Working branch

- Branch: `results`
- Purpose: keep the next iteration focused on collecting/building presentable results for the Libyan Safe Residency demo.

## Project identity

- Product/demo: Libyan Safe Residency / الإقامة الآمنة
- Brand direction: dark glass interface, gold/orange accents, premium trust feel.
- Arabic slogan: “معنا خطوة بخطوة نحو الأمان”
- Deployment fork target: `abdoai-cloud-git/eqama-libyan-safe-demo`

## Current situation analysis

Source file for this branch:

- `results/current-situation-analysis.md`

Core diagnosis:

> Libyan Safe Residency already has demand coming from social media, but the current intake and follow-up process depends too much on manual inbox handling, informal qualification, spreadsheets, and memory, which creates a real risk of missed qualified clients and unclear case status.

Important constraints from the analysis:

- Do not jump straight into solutions before respecting the current-state diagnosis.
- Main lead source is TikTok inbox / direct messages, with Facebook also present.
- Current process is manual: inbox replies, Gemini used manually, sheets/Excel, paper documents, cash deposit, human memory.
- Payment happens later after review and paper/passport delivery, not at first inquiry.
- Documents/passports are sensitive and physically handled.
- Early qualification must separate preliminarily qualified, missing-info, missing-documents, not-currently-able, and manual-review cases.
- Team context: Ayoub and the technical employee are first-stage full-access users.

## Immediate rule for future agents

Before touching other projects, return to this repo and continue from the Libyan Safe Residency context unless the user explicitly changes focus.
