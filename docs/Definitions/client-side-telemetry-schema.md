---
aliases: []
date: '2026-09-11'
meeting_id: b67ab027
project: Asteroids Survivor
summary: 'Expert recommendation: Define a tiny JSON event schema (session_id, event_name,
  timestamp, properties) sent via `navigator.sendBeacon()` to a managed analytics
  endpoint (e.g., Plausible, Umami, or a Cloudflare Worker) — zero backend code, w'
tags:
- definition
title: Client-side telemetry schema & transport
type: definition
updated: '2026-09-11T12:48:56.629634'
---

# Client-side telemetry schema & transport

Purpose: Record the agreed schema shape and transport method for client-side telemetry events.

## Schema
Each event is a JSON object with four fields:
- `session_id` — identifier for the current session
- `event_name` — name of the event being recorded
- `timestamp` — event time
- `properties` — arbitrary key/value payload for the event

## Transport
Events are sent with `navigator.sendBeacon()` to a managed analytics endpoint (e.g., Plausible, Umami, or a Cloudflare Worker). This requires zero backend code and works on static hosting.

## Links

- [[Project]]
- [[Index]]
- [[2026-09-11-name-runtime]]
- [[Memory]]
