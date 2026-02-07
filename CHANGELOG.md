# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.3] - 2026-02-06

### Changed

- Update release workflow to use npm trusted publisher (OIDC) instead of an access token.

## [2.3.2] - 2026-02-06

### Changed

- Update README schema documentation and validator utilities.
- Update changelog entries for recent releases.
- Add pull request template with changelog checklist item.

## [v2.3.1] - 2026-02-01

### Changed

- Remove `applyDefaults` helper and update schemas.

## [v2.3.0] - 2026-02-01

### Changed

- Remove `deletedAt` field and refactor validation logic.

## [v2.2.0] - 2026-02-01

### Changed

- Replace statement `status` with boolean `isLocked` and remove `StatementStatus` enum.
- Breaking change from 2.1.5 to 2.2.0.

## [2.1.5] - 2026-01-19

### Added

- Add comprehensive example JSON dataset for development and testing.

## [2.1.4] - 2026-01-19

### Changed

- Rename copilot-rules.md to copilot-instructions.md and restructure content.

## [2.1.3] - 2026-01-18

### Fixed

- Use resolvable Ajv 2020 entrypoint for ESM consumers.

## [2.1.2] - 2026-01-17

### Changed

- Refactor code structure and update package version to 2.1.2.

## [2.1.1] - 2026-01-17

### Changed

- Switch development scripts to pnpm and update package version to 2.1.1.

## [2.1.0] - 2026-01-17

### Added

- Add statement schema and update related files for improved transaction handling.

## [2.0.0] - 2026-01-04

### Changed

- Refactor for Luca Ledger schema release.
