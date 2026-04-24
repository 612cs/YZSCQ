## 1. OpenSpec And Baseline

- [x] 1.1 Commit the existing security-code rendering fixes as the implementation baseline.
- [x] 1.2 Initialize OpenSpec if missing and create the `improve-workspace-experience` change.
- [x] 1.3 Validate the OpenSpec change artifacts.

## 2. Test Baseline

- [x] 2.1 Add Vitest and an `npm run test` script.
- [x] 2.2 Add tests for default SVG rendering and security-code rendering options.
- [x] 2.3 Add tests for default config merging, old cache migration, and reset defaults.

## 3. Workspace UI

- [x] 3.1 Rework the workspace shell into professional tool zones.
- [x] 3.2 Improve the preview panel with template context, stable canvas treatment, and primary actions.
- [x] 3.3 Add a scannable template picker area using existing template metadata.

## 4. Inspector And Light Architecture

- [x] 4.1 Replace repeated editor form markup with local field group metadata.
- [x] 4.2 Render text, number, select, color, and boolean controls from metadata.
- [x] 4.3 Preserve all existing `SealConfig` update and reset behavior.
- [x] 4.4 Improve common control focus, hover, disabled, and responsive states.

## 5. Verification

- [x] 5.1 Run `npm run test`.
- [x] 5.2 Run `npm run build`.
- [x] 5.3 Review final diff against the OpenSpec requirements.
