# 0001 — Tagged ECS with classified component kinds

**Status:** Accepted
**Date:** 2026-05-09

## Context

motion-runner is a sandbox prototype whose explicit goal is to explore tag-driven ECS architecture. Miniplex's default model treats all components equally — a flat bag of `{ name → data }`. That works, but doesn't capture intent: some components are filter labels, some are mutually-exclusive states, some are payloads, some are entity references.

## Decision

Components are classified into kinds. The kind is not encoded in Miniplex itself (Miniplex remains a flat store) but is a **convention** all systems and authors follow:

- **tag** — boolean-valued labels. Multiple per entity. Used for query filtering.
- **state** — exactly one active per entity. FSM slot. Switched by removing-then-adding.
- **data** — typed payload. One per type per entity.
- **relation** — typed reference to another entity.

Systems are written generically against component queries. No system contains a switch on "what kind of entity is this".

The Matter collision listener mutates only `state` components. Logic lives in systems that query for state values.

## Consequences

**Positive**
- New behaviors = new systems, not edits to existing ones.
- Tag-set + state combo gives expressive entity definition without proliferation of types.
- Listener stays thin → physics-tick reentrancy concerns stay out of business logic.

**Negative**
- Discipline-only. TypeScript can't enforce "exactly one state component" without extra wrapping.
- Tag explosion possible without naming convention.
- State transitions split between listener (sets) and system (reads + acts) — must trace both sides to debug.

## Alternatives rejected

- **Flat untagged Miniplex** — works but loses architectural intent. Future readers can't tell which component is a label vs a state.
- **Class-based entity hierarchy** — defeats whole point of prototype.
- **Pure event-queue** instead of listener-mutates-state — rejected because state-as-bridge is preferred: physics events flip state, systems react.
- **bitECS** — strong perf at scale (5k+ entities), but maps poorly to this prototype's component-kind model:
  - `state`-kind components want string FSM values; bitECS forces `u8`+enum table.
  - `relation`-kind components want direct entity refs; bitECS forces eid-with-validation due to eid recycling.
  - Config-driven entity creation is one-line in Miniplex (`world.add({...})`); bitECS requires explicit `addEntity` + per-component plumbing.
  - At v0 entity count (~30), bitECS perf advantage is irrelevant.
  - Re-evaluate if entity count crosses ~2k. Systems are query-shaped → portable.
