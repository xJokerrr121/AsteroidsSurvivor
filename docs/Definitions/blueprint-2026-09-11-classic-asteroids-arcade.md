---
aliases: []
date: '2026-09-11T00:43:14.894020'
meeting_id: e9fc736f
project: Asteroids Survivor
summary: Incubation blueprint for Classic Asteroids arcade game, with vampire survivor
  mechanics with 5 authorized decisions.
tags:
- incubator
- blueprint
- definition
title: Blueprint — Classic Asteroids arcade game, with vampire survivor mechanics
type: blueprint
---

# Incubation Blueprint — Classic Asteroids Arcade Game with Vampire Survivor Mechanics

**Date:** 2026-09-11 00:43 UTC  
**Room:** Project incubator (Virtual Directive)  
**Project:** [[Asteroids Survivor]]  
**Authorized decisions:** 5  

This note records the incubated concept for [[Asteroids Survivor]], capturing the authorized product vision, metaphor, naming conventions, trust guidelines, and initial feedback strategy. All five pillars are complete and closed; downstream rooms must not re-open them.

---

## Pillar Status

| Pillar | Status |
|--------|--------|
| Value proposition and scope | ✅ Complete |
| High-level product metaphor and concept | ✅ Complete |
| User experience definitions and terms | ✅ Complete |
| High-level trust guidelines and safety ideas | ✅ Complete |
| Superficial target audience and initial feedback strategy | ✅ Complete |

---

## Authorized Rules

### 1. MVP Fantasy: Survivors in Vector Clothing

**Rule**  
The MVP delivers a Vampire Survivors–style auto-fire survival run (15–20 minutes, move-only controls, exponential build combos, screen-clearing chaos). Asteroids identity is expressed only through vector aesthetics, asteroid-field spawning patterns, and Newtonian drift as a movement characteristic — never through deliberate thrust/rotate/fire inputs.

**Rationale**  
Anchors the MVP on a single, proven retention loop with one control scheme and a concrete session-length target, avoiding the dual-mode compromise and the fundamental tension between reflex-first and build-first designs.

**Trade-offs**

| Advantages | Drawbacks / Constraints | Risks to Watch |
|------------|------------------------|----------------|
| Single coherent loop with known retention mechanics from the Survivors genre | High content demand: many weapons, evolutions, enemy archetypes needed for exponential combo feel | Drift-attributed deaths exceeding enemy deaths in early playtests, turning a "quirk" into a bug |
| Clear scope boundary: one mode, one control scheme, one progression curve | Newtonian drift in auto-fire context risks feeling like slippery controls rather than a feature | Balance surface multiplies: enemy HP scaling, XP curves, drop rates, evolution thresholds all interact |
| Visual differentiation in a crowded Survivors-like market via vector aesthetics | Alienates Asteroids purists who expect deliberate thrust/rotate/fire mastery | Content pipeline may not deliver enough combinatorial depth for "exponential" feel at MVP scope |

---

### 2. Product Metaphor

**Rule**  
*A space you inhabit:* The product reads as a world you are inside: things move around you and you act in place.

**Rationale**  
Room consensus after reviewing the operator's choice.

**Trade-offs**

| Advantages | Drawbacks / Constraints | Risks to Watch |
|------------|------------------------|----------------|
| Aligned with the goals the operator stated | Constrains the design to the selected option | Needs to be validated during the MVP build |
| Clear direction for the build team | | |

---

### 3. Naming Convention

**Rule**  
*Borrow the vocabulary users already have:* Name things the way the user's own field names them, with no invented terms.

**Rationale**  
Room consensus after reviewing the operator's choice.

**Trade-offs**

| Advantages | Drawbacks / Constraints | Risks to Watch |
|------------|------------------------|----------------|
| Aligned with the goals the operator stated | Constrains the design to the selected option | Needs to be validated during the MVP build |
| Clear direction for the build team | | |

---

### 4. Trust and Privacy

**Rule**  
*Nothing leaves without an explicit action:* The default is private; sharing is always something the person deliberately does.

**Rationale**  
Room consensus after reviewing the operator's choice.

**Trade-offs**

| Advantages | Drawbacks / Constraints | Risks to Watch |
|------------|------------------------|----------------|
| Aligned with the goals the operator stated | Constrains the design to the selected option | Needs to be validated during the MVP build |
| Clear direction for the build team | | |

---

### 5. Initial Audience and Feedback

**Rule**  
*A handful of people we already know:* Show it to a small named group and sit with them while they use it.

**Rationale**  
Room consensus after reviewing the operator's choice.

**Trade-offs**

| Advantages | Drawbacks / Constraints | Risks to Watch |
|------------|------------------------|----------------|
| Aligned with the goals the operator stated | Constrains the design to the selected option | Needs to be validated during the MVP build |
| Clear direction for the build team | | |

---

## Questions and Operator Answers

| # | Question | Asked By | Operator's Answer |
|---|----------|----------|-------------------|
| 1 | Which player fantasy defines the MVP's core promise? | Product Manager | **Survivors in Vector Clothing:** Full Vampire Survivors loop — auto-fire, move-only controls, 15–20 minute runs, exponential build combos, screen-clearing chaos. Asteroids contributes only vector aesthetics, asteroid-field spawning, and Newtonian drift. |
| 2 | What is this product like, as a metaphor we can all share? | Architect | **A space you inhabit:** The product reads as a world you are inside: things move around you and you act in place. |
| 3 | How should we name the things this product is about? | Data Analyst | **Borrow the vocabulary users already have:** Name things the way the user's own field names them, with no invented terms. |
| 4 | What is the user entitled to expect about trust and privacy? | Product Manager | **Nothing leaves without an explicit action:** The default is private; sharing is always something the person deliberately does. |
| 5 | Who sees this first, and how do we learn from them? | Technical Engineering Manager | **A handful of people we already know:** Show it to a small named group and sit with them while they use it. |

---

## Next Steps

The concept is now given. Downstream rooms do not re-open it.

1. Open an **Interview** (grill) and lock the stack issues this concept still needs answered.
2. Hand any issue that needs evidence to **Research**; accept or overrule the recommendation.
3. Open a **Full directive** or **Technical** room for the action plan, then **Refine** for the execution prompt.
4. Read [[Project]] and [[Index]] after each room — new definitions, findings, and ADRs land there.

See [[Architecture]] for the living map. Do not treat this blueprint as a stack decision.
