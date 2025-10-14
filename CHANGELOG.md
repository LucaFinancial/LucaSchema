# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-12

### Added

- Integer minor units (cents) for all monetary amounts to eliminate floating-point precision issues
- Utility functions for converting between dollars and cents:
  - `dollarsToMinorUnits()` - Convert dollars to cents
  - `minorUnitsToDollars()` - Convert cents to dollars
  - `formatMinorUnits()` - Format cents as currency strings
- Comprehensive validation tests for integer monetary amounts
- Migration guide in README for upgrading from decimal to integer amounts

### Changed

- **BREAKING**: All monetary `amount` fields now use integer minor units (cents) instead of decimal dollars
  - Transaction amounts: `100.50` → `10050` (representing $100.50)
  - RecurringTransaction amounts: `50.00` → `5000` (representing $50.00)
- **BREAKING**: Schema validation now rejects decimal amounts and requires integers
- Updated all example data to use integer cents
- Enhanced documentation with minor units conventions and best practices

### Migration Guide

To upgrade from v1.x to v2.0:

1. Convert existing amount data: multiply dollar amounts by 100
2. Update code to use conversion utilities when working with user input
3. Use `formatMinorUnits()` for displaying amounts to users

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
