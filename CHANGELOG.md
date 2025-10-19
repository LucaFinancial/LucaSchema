# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - Unreleased

### Added

- **BREAKING**: Double-entry accounting support with Posting entity
- New `Posting` interface representing individual debit/credit entries
- Custom validation keyword `balancedPostings` for sum-zero validation
- Comprehensive double-entry validation tests
- Double-entry examples in documentation and example files
- Support for split transactions (3+ postings)
- Signed integer amounts for proper debit/credit representation

### Changed

- **BREAKING**: Transaction schema now uses `postings` array instead of `payorId`, `payeeId`, and `amount`
- **BREAKING**: RecurringTransaction schema now uses `postings` array
- **BREAKING**: Amount fields changed from decimal numbers to signed integers (minor units)
- Updated all test utilities to generate balanced postings
- Updated example JSON files with double-entry transactions
- Enhanced README with double-entry accounting examples and concepts

### Removed

- **BREAKING**: `payorId` field from Transaction interface
- **BREAKING**: `payeeId` field from Transaction interface
- **BREAKING**: `amount` field from Transaction interface (replaced by postings)
- **BREAKING**: `payorId`, `payeeId`, and `amount` from RecurringTransaction interface

### Migration Guide

To migrate from v1.x to v2.0:

1. Replace `payorId`, `payeeId`, and `amount` with `postings` array
2. Convert amounts from decimal to integer (multiply by 100 for cents)
3. Create at least 2 postings per transaction (debit and credit)
4. Ensure posting amounts sum to zero
5. Use positive amounts for debits, negative for credits

**Before (v1.x):**

```typescript
{
  payorId: 'checking-account',
  payeeId: 'grocery-store',
  amount: 65.32
}
```

**After (v2.0):**

```typescript
{
  postings: [
    { accountId: 'groceries-expense', amount: 6532, order: 0 },
    { accountId: 'checking-account', amount: -6532, order: 1 }
  ];
}
```

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
