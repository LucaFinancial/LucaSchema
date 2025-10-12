# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-10-11

### Added

- Full TypeScript support with comprehensive type definitions
- Modern CI/CD pipeline with Node.js 20.x and 22.x support
- Comprehensive test suite with 95% code coverage
- Pre-commit hooks with lint-staged for code quality
- Test utilities for creating mock data objects
- Enhanced error handling and validation interfaces
- Dual ESM/CJS build support
- Professional package metadata and documentation

### Changed

- **BREAKING**: Migrated from JavaScript to TypeScript
- Updated minimum Node.js requirement to >=20.0.0
- Replaced console.error statements with proper error throwing
- Enhanced README with TypeScript examples and better documentation
- Improved build system with TypeScript compilation
- Updated dependencies to latest secure versions

### Removed

- **BREAKING**: Removed Node.js 18.x support
- Removed deprecated Husky installation scripts
- Removed console pollution from library code

### Fixed

- CI/CD pipeline compatibility with modern Node.js versions
- Husky pre-commit hooks updated to v9 format
- ESLint configuration optimized for TypeScript projects

## [1.2.3] - Previous releases

- Legacy JavaScript implementation
- Basic schema validation functionality
