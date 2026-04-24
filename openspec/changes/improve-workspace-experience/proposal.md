## Why

The current seal generator workspace exposes the core editing capability, but it still feels like an MVP form beside a preview instead of a professional tool. Improving the workspace now increases confidence in the core product loop before adding accounts, cloud templates, or paid features.

## What Changes

- Rework the workspace into a professional tool layout with a stable preview canvas, clear template context, fixed primary actions, and a right-side inspector.
- Improve parameter editing density and scanability while preserving all existing seal configuration capabilities.
- Add a small editor UI metadata layer so parameter groups can be rendered consistently without duplicating form markup.
- Add a minimum Vitest baseline for configuration defaults, cache migration, and SVG rendering behavior.
- No backend, authentication, paid membership, or cloud template changes are included.

## Capabilities

### New Capabilities

- `workspace-experience`: Professional seal editing workspace, inspector behavior, and minimum regression verification for workspace-critical configuration.

### Modified Capabilities

- None.

## Impact

- Affected UI: home workspace, preview panel, editor form, common input/button/select controls.
- Affected state: seal config defaults and local cache migration remain compatible through default merging.
- Affected tooling: add Vitest and an `npm run test` script.
- No public API or backend contract changes.
