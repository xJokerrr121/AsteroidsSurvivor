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

Expert recommendation: Define a tiny JSON event schema (session_id, event_name, timestamp, properties) sent via `navigator.sendBeacon()` to a managed analytics endpoint (e.g., Plausible, Umami, or a Cloudflare Worker) — zero backend code, works on static hosting.
