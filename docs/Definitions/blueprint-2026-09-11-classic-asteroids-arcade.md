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

# Incubation blueprint — Classic Asteroids arcade game, with vampire survivor mechanics

> **Date:** 2026-09-11 00:43 UTC  
> **Room:** Project incubator (Virtual Directive)  
> **Project:** [[Asteroids Survivor]]  
> **Authorized decisions:** 5  

## 1. Vision and initial idea

Classic Asteroids arcade game, with vampire survivor mechanics

## 2. Pillar status

- **✅ Value proposition and scope**: Define the core problem, the target user, and the MVP scope superficially, focusing on product ideas, not technical architecture.
- **✅ High-level product metaphor and concept**: Define the basic conceptual metaphor, superficial identity, and product layout, completely avoiding any technical stacks or decisions.
- **✅ User experience definitions and terms**: Define essential superficial terminology, concepts, and high-level glossary of the project without any database or storage decisions.
- **✅ High-level trust guidelines and safety ideas**: Define basic human-centric trust expectations and safety rules, avoiding technical details, crypto, or authentication implementation.
- **✅ Superficial target audience and initial feedback strategy**: Define how we will present the project initially to get feedback, avoiding deployment stacks, pipelines, or technical delivery metrics.

## 3. Rules authorized by the operator

### 3.1 MVP Fantasy: Survivors in Vector Clothing

**Rule:**  
The MVP delivers a Vampire Survivors–style auto-fire survival run (15–20 minutes, move-only controls, exponential build combos, screen-clearing chaos). Asteroids identity is expressed only through vector aesthetics, asteroid-field spawning patterns, and Newtonian drift as a movement characteristic — never through deliberate thrust/rotate/fire inputs.

**Rationale:** The operator chose the 'Survivors in Vector Clothing' fantasy to anchor the MVP on a single, proven retention loop with one control scheme and a concrete session-length target. This avoids the dual-mode compromise and the fundamental tension between reflex-first and build-first designs.

**Trade-offs:**
- **Advantages:** Single coherent loop with known retention mechanics from the Survivors genre, Clear scope boundary: one mode, one control scheme, one progression curve, Visual differentiation in a crowded Survivors-like market via vector aesthetics
- **Drawbacks / constraints:** High content demand: many weapons, evolutions, enemy archetypes needed for exponential combo feel, Newtonian drift in auto-fire context risks feeling like slippery controls rather than a feature, Alienates Asteroids purists who expect deliberate thrust/rotate/fire mastery
- **Risks to watch:** Drift-attributed deaths exceeding enemy deaths in early playtests, turning a 'quirk' into a bug, Balance surface multiplies: enemy HP scaling, XP curves, drop rates, evolution thresholds all interact, Content pipeline may not deliver enough combinatorial depth for 'exponential' feel at MVP scope

### 3.2 Rule: What is this product like, as a metaphor we can all share?

**Rule:**  
The directive for What is this product like, as a metaphor we can all share? follows the operator's preference: A space you inhabit: The product reads as a world you are inside: things move around you and you act in place..

**Rationale:** Room consensus after reviewing the operator's choice.

**Trade-offs:**
- **Advantages:** Aligned with the goals the operator stated., Clear direction for the build team.
- **Drawbacks / constraints:** Constrains the design to the selected option.
- **Risks to watch:** Needs to be validated during the MVP build.

### 3.3 Rule: How should we name the things this product is about?

**Rule:**  
The directive for How should we name the things this product is about? follows the operator's preference: Borrow the vocabulary users already have: Name things the way the user's own field names them, with no invented terms..

**Rationale:** Room consensus after reviewing the operator's choice.

**Trade-offs:**
- **Advantages:** Aligned with the goals the operator stated., Clear direction for the build team.
- **Drawbacks / constraints:** Constrains the design to the selected option.
- **Risks to watch:** Needs to be validated during the MVP build.

### 3.4 Rule: What is the user entitled to expect about trust and privacy?

**Rule:**  
The directive for What is the user entitled to expect about trust and privacy? follows the operator's preference: Nothing leaves without an explicit action: The default is private; sharing is always something the person deliberately does..

**Rationale:** Room consensus after reviewing the operator's choice.

**Trade-offs:**
- **Advantages:** Aligned with the goals the operator stated., Clear direction for the build team.
- **Drawbacks / constraints:** Constrains the design to the selected option.
- **Risks to watch:** Needs to be validated during the MVP build.

### 3.5 Rule: Who sees this first, and how do we learn from them?

**Rule:**  
The directive for Who sees this first, and how do we learn from them? follows the operator's preference: A handful of people we already know: Show it to a small named group and sit with them while they use it..

**Rationale:** Room consensus after reviewing the operator's choice.

**Trade-offs:**
- **Advantages:** Aligned with the goals the operator stated., Clear direction for the build team.
- **Drawbacks / constraints:** Constrains the design to the selected option.
- **Risks to watch:** Needs to be validated during the MVP build.

## 4. Questions asked and answers given

#### Question 1: Which player fantasy defines the MVP's core promise?
- **Asked by:** Product Manager (Product Manager)
- **Reasoning:** The hybrid's tension (reflex vs. build, seconds vs. minutes, deliberate vs. auto-fire) means we must pick one fantasy to prove first. Without that anchor, every later decision becomes a compromise that satisfies no one.
- **Operator's answer:** Survivors in Vector Clothing: Full Vampire Survivors loop: auto-fire, move-only controls, 15–20 minute runs, exponential build combos, screen-clearing chaos. Asteroids contributes only vector aesthetics, asteroid-field spawning, a…

#### Question 2: What is this product like, as a metaphor we can all share?
- **Asked by:** Architect (Technical Architect)
- **Reasoning:** This definition sets the conceptual direction and the boundaries of the product.
- **Operator's answer:** A space you inhabit: The product reads as a world you are inside: things move around you and you act in place.

#### Question 3: How should we name the things this product is about?
- **Asked by:** Data Analyst (Data Analyst)
- **Reasoning:** This definition sets the conceptual direction and the boundaries of the product.
- **Operator's answer:** Borrow the vocabulary users already have: Name things the way the user's own field names them, with no invented terms.

#### Question 4: What is the user entitled to expect about trust and privacy?
- **Asked by:** Product Manager (Product Manager)
- **Reasoning:** This definition sets the conceptual direction and the boundaries of the product.
- **Operator's answer:** Nothing leaves without an explicit action: The default is private; sharing is always something the person deliberately does.

#### Question 5: Who sees this first, and how do we learn from them?
- **Asked by:** Technical Engineering Manager (Technical Engineering Manager)
- **Reasoning:** This definition sets the conceptual direction and the boundaries of the product.
- **Operator's answer:** A handful of people we already know: Show it to a small named group and sit with them while they use it.

## 5. Next steps

The concept is now given. Downstream rooms do not re-open it.

1. Open an **Interview** (grill) and lock the stack issues this concept still needs answered.
2. Hand any issue that needs evidence to **Research**; accept or overrule the recommendation.
3. Open a **Full directive** or **Technical** room for the action plan, then **Refine** for the execution prompt.
4. Read [[Project]] and [[Index]] after each room — new definitions, findings, and ADRs land there.

See [[Architecture]] for the living map. Do not treat this blueprint as a stack decision.
