---
aliases: []
date: '2026-09-15'
meeting_id: 42e27a9f
project: Asteroids Survivor
summary: 'Grill interview on Define: term (noun phrase, max 8 words) or none (1 settled
  decisions).'
tags:
- finding
- asteroids-survivor
- grill
title: 'Findings — Define: term (noun phrase, max 8 words) or none'
type: finding
updated: '2026-09-15T17:26:52.509307'
---

# Findings — Define: term (noun phrase, max 8 words) or none

We need to apply lexicon terms as exact replacements when they fit. The lexicon includes many terms. We need to replace defined terms with exact lexicon terms if they match concept. The draft contains many placeholders like "Define: term (noun phrase, max 8 words) or none". This is not a lexicon term; it's a placeholder. We must not replace with synonyms. We must keep it exactly as is unless lexicon has exact match.

Lexicon entries:

- Asteroids Survivor: Map of notes for Asteroids Survivor.
- Architecture (aka architecture, system-map): Living architecture map for Asteroids Survivor.
- Backend scope & contract: Expert recommendation: Zero backend for MVP — all state local (IndexedDB), analytics via client-side beacon to Plausible/Umami; leaderboard deferred to post-MVP.
- CI pipeline definition: Cheap budget: Single job: `npm ci && npm run build && npx gh-pages -d dist`; no lint/typecheck/test gates, deploy on every `main` push.
- Client-side telemetry schema & transport: Expert recommendation: Define a tiny JSON event schema (session_id, event_name, timestamp, properties) sent via `navigator.sendBeacon()` to a managed analytics endpoint (e.g., Plausible, Umami, or a Cloudflare Worker) —…
- Concept — Asteroids Survivor (aka concept, pitch, asteroids survivor): Classic Asteroids arcade game, with vampire survivor mechanics
- Rule: What is this product like, as a metaphor we can all share?: Room consensus after reviewing the operator's choice.
- Rule: How should we name the things this product is about?: Room consensus after reviewing the operator's choice.
- Rule: Who sees this first, and how do we learn from them?: Room consensus after reviewing the operator's choice.
- MVP Fantasy: Survivors in Vector Clothing: The operator chose the 'Survivors in Vector Clothing' fantasy to anchor the MVP on a single, proven retention loop with one control scheme and a concrete session-length target. This avoids the dual-mode compromise and th…
- Rule: What is the user entitled to expect about trust and privacy?: Room consensus after reviewing the operator's choice.
- market-fit for Name the runtime: Expert recommendation: Expose one documented endpoint plus a CSV export for Name the runtime; that covers the integrations customers ask for first.
- Performance budget & Core Web Vitals guardrails in CI: Expert recommendation: Add a GitHub Actions step running Lighthouse CI (headless Chrome) with budgets: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms, total JS ≤ 170 kB gzipped; fail PR on any regression.
- technical-strategy for Name the runtime: Expert recommendation: Sequence Name the runtime by risk: build the piece that can invalidate the design first, keep the rest behind flags.
- test-strategy for Name the runtime: Expert recommendation: Cover the risky seams of Name the runtime with integration tests; unit-test only the logic that really branches.
- Vault index (aka index, moc): Project note index for council retrieval.

We need to see if any of these exact phrases appear in the draft. The draft includes headings like "# Findings — Define: term (noun phrase, max 8 words) or none". That is not a lexicon term. It includes "threat-modeling for Define: term (noun phrase, max 8 words) or none". Not lexicon.

It includes "Architecture" heading and subgraph label "Architecture". The lexicon has "Architecture (aka architecture, system-map): Living architecture map for Asteroids Survivor." The term "Architecture" appears as a heading. Should we replace "Architecture" with the lexicon term? The lexicon term is "Architecture (aka architecture, system-map): Living architecture map for Asteroids Survivor." That's longer. The rule: "Prefer lexicon terms (Definitions, Glossary, ADRs, Project.md) ONLY as exact replacements of the same concept. Never replace a defined term with a synonym." So if the concept matches, we should replace the term with the exact lexicon term. The concept "Architecture" matches the lexicon entry "Architecture (aka architecture, system-map): Living architecture map for Asteroids Survivor." So we should replace occurrences of "Architecture" (as a concept) with that full lexicon string? However, we must keep heading structure, tables, and every [[wikilink]] exactly as written. Changing heading text might alter heading structure? The heading is "## Architecture". If we replace with the longer string, heading changes. Is that allowed? The rule says keep heading structure, tables, and every [[wikilink]] exactly as written. It doesn't explicitly forbid changing heading text, but "heading structure" likely means the hierarchy (levels) not the text. However, we must be careful: The lexicon term includes parentheses and colon. Replacing heading might break readability but likely acceptable. However, we must also consider that the lexicon term is a definition; we should replace the term only when it fits exactly the same concept. The heading "Architecture" refers to the architecture map. So we can replace.

Similarly, there is "Network" heading. Lexicon does not have "Network". So keep.

There is "Vault index" lexicon: "Vault index (aka index, moc): Project note index for council retrieval." The draft does not contain that phrase.

There is "Project" wikilink: [[Project]] - keep.

There is "meeting `42e27a9f`" - keep.

We also have "threat-modeling for Define: term (noun phrase, max 8 words) " appears multiple times. Not lexicon.

We have "term": `security verification checklist` - not lexicon.

We have "Sources" heading - not lexicon.

We have "Links" heading - not lexicon.

We have "Flowchart", "Architecture", "Network" sections.

We need to replace any lexicon term occurrences exactly. Let's scan:

- "Architecture" appears in heading "## Architecture", in subgraph label "Architecture["Architecture"]", and in the subgraph label inside Architecture block: `subgraph Architecture["Architecture"]`. Also in Network block? No.

- Also in the flowchart: `threat_modeling_for_Define_term_noun_phr["threat-modeling for Define: term (noun phrase, max 8 words) "]`. Not lexicon.

- Also in the Architecture block: `subgraph Architecture["Architecture"]` and inside: `threat_modeling_for_Define_term_noun_phr["threat-modeling for Define: term (noun phrase, max 8 words) "]`.

- In Network block: `subgraph Network["Network"]` and inside same node.

Thus we need to replace the word "Architecture" where it refers to the concept. However, we must be careful not to replace inside strings that are not the concept, like inside the node ID `threat_modeling_for_Define_term_noun_phr` - that's an identifier, we must not change. Also inside the label strings like `["Architecture"]` - that is a label, we should replace if it's the concept. The label is exactly "Architecture". So we replace that label with the lexicon term.

But we must keep the double quotes? The label is inside double quotes in Mermaid syntax: `["Architecture"]`. We should replace the content inside quotes with the lexicon term, preserving the quotes.

Similarly, the subgraph declaration: `subgraph Architecture["Architecture"]` - the subgraph name is Architecture (the identifier) and the label is also "Architecture". According to Mermaid syntax: `subgraph id ["label"]`. The identifier should stay same? The identifier is also Architecture. Changing identifier could break references? There are no references to that subgraph ID elsewhere. But we must not change identifiers per rule: "Never paraphrase identifiers, APIs, CLI flags, versions, file paths, URLs, error messages, quoted strings, inline code, or **Finding:** / **Source:** wording. Keep those character-for-character." The subgraph identifier is an identifier? It's not quoted; it's a Mermaid identifier. The rule says keep identifiers character-for-character. So we should not change the subgraph identifier. Only the label (quoted string) can be changed? The label is a quoted string; the rule says keep quoted strings character-for-character. Actually it says: "Never paraphrase identifiers, APIs, CLI flags, versions, file paths, URLs, error messages, quoted strings, inline code, or **Finding:** / **Source:** wording. Keep those character-for-character." So we must keep quoted strings exactly as written. Therefore we cannot change the label "Architecture" inside quotes because that's a quoted string. So we must keep it as is. Similarly, the subgraph identifier is an identifier; we must keep it as is.

Thus we cannot replace any quoted strings. So we cannot change "Architecture" inside quotes. So we must leave them unchanged.

Thus no lexicon replacements can be made because any occurrence of lexicon terms appears inside quoted strings or identifiers that we must preserve.

Check also "Vault index" not present.

Thus output remains same as input.

But we must also check if any lexicon term appears outside quotes/identifiers
