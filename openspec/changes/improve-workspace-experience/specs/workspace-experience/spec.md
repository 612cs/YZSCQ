## ADDED Requirements

### Requirement: Professional Workspace Layout
The system SHALL present the seal editor as a professional tool workspace with distinct navigation, preview, inspector, template context, and primary action areas.

#### Scenario: Desktop workspace opens
- **WHEN** a user opens the home workspace on a desktop viewport
- **THEN** the preview canvas, current template information, inspector controls, and export/reset actions are visible without incoherent overlap or horizontal page scroll

#### Scenario: Template context is visible
- **WHEN** a user is editing a seal
- **THEN** the workspace displays the active template name and available template choices in a scannable area

### Requirement: Inspector Editing
The system SHALL keep existing seal configuration fields editable while organizing them into clear inspector groups.

#### Scenario: User edits a field
- **WHEN** a user changes a seal text, numeric, color, select, or boolean field in the inspector
- **THEN** the seal preview updates from the same `SealConfig` source of truth

#### Scenario: User resets configuration
- **WHEN** a user activates reset
- **THEN** the configuration returns to `DEFAULT_SEAL_CONFIG`

### Requirement: Stable Preview And Export
The system SHALL keep the seal preview centered and exportable while workspace controls change around it.

#### Scenario: Preview renders
- **WHEN** the default configuration is rendered
- **THEN** the SVG output includes the seal circles and configured text content

#### Scenario: Export action remains available
- **WHEN** a user is in the workspace
- **THEN** the download action remains available as the primary export action

### Requirement: Regression Test Baseline
The system SHALL include a minimum automated test baseline for workspace-critical configuration and rendering behavior.

#### Scenario: Tests run
- **WHEN** `npm run test` is executed
- **THEN** tests validate default SVG rendering, cache config migration, security-code rendering options, and reset defaults
