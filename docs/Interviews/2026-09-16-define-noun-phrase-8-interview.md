---
aliases: []
attendees:
- Security Engineer
date: '2026-09-16'
meeting_id: 6df782ee
project: Asteroids Survivor
summary: 'Operator interview session on Define: (noun phrase <=8 words) or.'
tags:
- interview
- asteroids-survivor
- grill
- operator-qa
title: 'Interview — Define: (noun phrase <=8 words) or'
type: interview
---

# Interview — Define: (noun phrase <=8 words) or

**Date:** 2026-09-16  
**Kind:** Interview (Grill)  
**Project:** [[Project]]  
**Session:** `6df782ee`  

## Interviewers

- Security Engineer

## Transcript & Deliberation

[You] Source meeting: Discuss new features for this increment, (7fd59e2c).
That room halted because the seats below cannot proceed on something nobody has defined.
Settle exactly these, in this order, and nothing else. Do not reopen the source meeting's plan,
do not widen the scope, and do not ask about anything the source room can decide on its own.

--- to define ---
1. (noun phrase <=8 words) or - demanded by Security Engineer.

--- where it came up ---
- Product Manager: XP drops on shatter, fixed thresholds, in-world picker with Rex plugin — that's the slice. Security signs off currentBuild schema today so TEM can wire the picker; meta-progression stays out.
- Technical Engineering Manager: Security signs off currentBuild schema today; Lead Engineer starts picker scene with Rex plugin once unblocked; Data Analyst confirms session_id persistence in storage.ts.
- Lead Engineer: This slice is already authorized and sequenced — XP drops on `shatter()`, fixed thresholds, in-world picker with Rex plugin, `currentBuild` key in IndexedDB for this run only. Meta-progression explicitly out. Two things …
- Tech Researcher: Slice is locked. Unblock Security sign-off and session_id confirmation so Lead Engineer can start the picker scene.
- Security Engineer: Security will approve currentBuild after local-only check; session_id can be a local UUID.
- Security Engineer: @engineer correct claim=who-could-abuse-lets-start-a-new-feature because=who-could-abuse-lets-start-a-new-feature
- UX/UI Designer: @engineer correct claim=feature-already-authorized-and-sequenced-slice-is-locked because=feature-already-authorized-and-sequenced-slice-is-locked
- Lead Engineer: @designer correct claim=the-simplest-version-of-lets-start-a-new because=the-simplest-version-of-lets-start-a-new

[Security Engineer] It is a noun phrase that contains eight words or fewer. If no such phrase is provided, the value is treated as empty.

[Security Engineer] Asked Q1 — Noun phrase length enforcement.

[You] Cheap budget: Define the phrase as a hard‑coded const string and rely on code‑review and a lint rule that flags any string literal longer than eight words (using eslint-plugin-todo with custom rule).

[Security Engineer] ## Topic Recap  
Define the technical rule for the optional noun phrase (≤ 8 words) that gates the new‑feature slice.

## Settled Technical Decisions  

- **Noun phrase length enforcement**  
  - **Expert recommendation** – Introduce a TypeScript `const` holding the phrase, validate its word count at build time with a custom ESLint rule (`eslint-plugin-todo`‑based) that fails on > 8 words, and treat an undefined/missing constant as an empty string at runtime.  
  - **Cheap / budget** – Hard‑code the phrase as a `const` string and rely on code‑review plus the same ESLint rule to catch violations; no runtime check needed because the value is baked into the bundle.  
  - **Expensive / premium** – Add a runtime guard in the persistence layer (`storage.ts`) that throws if the stored `currentBuild` key exceeds eight words, paired with a unit test and a CI step that lint‑checks the constant.  

*The team has selected the **Cheap / budget** option as the settled decision* (see [[2026-09-15-define-term-noun-phrase-interview]] and the Findings note [[Findings/2026-09-15-define-term-noun-phrase]]).

## Remaining Technical Risks  
_None — frontier is empty._  

## What This Means for Implementation  
- Add a file `src/constants/featureTag.ts` exporting `export const FEATURE_TAG = "XP drops on shatter"` (or whatever the agreed phrase is, ≤ 8 words).  
- Extend the project’s ESLint configuration with a custom rule that walks string literals and flags any that contain more than eight space‑separated tokens.  
- In `src/persistence/storage.ts`, when reading/writing the `currentBuild` key, simply use `FEATURE_TAG`; treat an empty string as “no phrase”.  
- No changes to IndexedDB schema or telemetry are required; the phrase is purely client‑side metadata for the picker scene.  
- Unit test in `storage.test.ts` should verify that storing/retrieving `FEATURE_TAG` preserves the exact string and that the lint rule would reject a longer literal.  

All other aspects of the increment (XP drops on shatter, fixed thresholds, Rex‑plugin picker, session_id UUID) remain as previously agreed and are out of scope for this decision.

Council LOG (hard review, not spoken):
- Security Engineer: It is a noun phrase that contains eight words or fewer. If no such phrase is provided, the value is treated as empty.
- Security Engineer: proposed 1 frontier question(s)
- Security Engineer: review addendum

---

## Links

- [[Project]]
