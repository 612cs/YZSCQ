## Context

The project is a Vue 3 + TypeScript + Vite seal generator. The current home page contains a simple two-column workspace: preview on one side and a large editor form on the other. The core SVG renderer and localStorage-backed Pinia store already exist and should remain the source of truth.

## Goals / Non-Goals

**Goals:**
- Make the core editor feel like a professional SaaS/design tool.
- Preserve all existing seal editing fields and export behavior.
- Reduce duplicated form markup through editor field metadata.
- Add a small regression test baseline around config and rendering.

**Non-Goals:**
- No React migration.
- No backend, login, cloud sync, membership, or payment implementation.
- No deep rewrite of the SVG renderer beyond testable helper boundaries needed for this iteration.

## Decisions

- Use a three-zone workspace: top navigation, preview/work canvas, and right inspector. This matches the intended professional tool feeling and keeps editing efficient.
- Keep `SealConfig` as the only configuration contract. The inspector metadata maps fields to existing keys and emits `Partial<SealConfig>` updates.
- Use Vue props-down/events-up. The store remains in the route-level view, while workspace components remain presentational or narrowly interactive.
- Add Vitest for pure TypeScript tests first. Component/browser testing is deferred because the first safety gap is config/rendering regression.
- Use restrained visual styling: neutral surfaces, teal/red brand accents, compact controls, visible focus states, and stable responsive constraints.

## Risks / Trade-offs

- Larger UI refactor can disturb current editing behavior → keep `SealConfig` unchanged and cover rendering/reset behavior with tests.
- Metadata-driven forms can become too abstract → keep metadata local to the seal editor and limited to current field types.
- New dependency increases install footprint → Vitest is limited to devDependencies and pure unit tests.
- Existing localStorage values may miss new fields → keep default merging and explicit migration tests.

## Migration Plan

1. Keep the existing route and store API stable.
2. Introduce tests and editor metadata alongside current behavior.
3. Replace the workspace layout and form implementation while preserving emitted update payloads.
4. Validate with `npm run test` and `npm run build`.
