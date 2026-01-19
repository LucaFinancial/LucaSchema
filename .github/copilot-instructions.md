# GitHub Copilot Instructions

This file provides instructions for GitHub Copilot when working with this repository.

## Project Overview

LucaSchema is a schema validation library for the Luca Ledger application. It provides type-safe validation for financial transactions, entities, and related data structures using JSON Schema and AJV validator. The package is written in JavaScript with TypeScript type definitions generated from JSON Schemas.

## Technology Stack

- **Language**: JavaScript (ESM modules)
- **Build System**: Custom build script (`scripts/build.js`)
- **Type Generation**: `json-schema-to-typescript` from JSON Schemas
- **Testing**: Jest with Babel
- **Linting**: ESLint + Prettier
- **Package Manager**: pnpm (v10.27.0)
- **Node Version**: >=22.0.0

## Architecture and Conventions

### Schema-First Approach

- `src/schemas/` contains JSON Schema definitions and is the **single source of truth**
- All TypeScript types and enums are **generated** from JSON Schemas via `pnpm generate:types`
- Never hand-author duplicate types, enums, or `.d.ts` files
- Any changes to data structures must be made in the JSON Schemas first

### Code Style

- Use ESM module syntax (`import`/`export`)
- Follow existing patterns in the codebase
- Run `pnpm lint:fix` to automatically format code
- Adhere to the Single Responsibility Principle (SRP)

### File Organization

- `/src/schemas/` - JSON Schema definitions (source of truth)
- `/src/index.js` - Main entry point with validator instance
- `/src/lucaValidator.js` - Core validator logic
- `/src/enums.js` - Enum exports (generated)
- `/src/tests/` - Jest test files
- `/src/examples/` - Example data for testing
- `/scripts/` - Build and code generation scripts

## Development Workflow

### Making Changes

1. **For schema changes**: Edit JSON Schema files in `src/schemas/`
2. **For logic changes**: Edit the relevant JavaScript files
3. **For type changes**: Never edit types directly - modify JSON Schemas and regenerate

### Commands

- `pnpm build` - Clean, generate types, and build the library
- `pnpm test` - Run Jest tests
- `pnpm lint` - Check code style with Prettier and ESLint
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm type-check` - Verify TypeScript types
- `pnpm generate:types` - Generate TypeScript definitions from schemas

### Testing

- Write tests in `src/tests/` with `.test.js` extension
- Keep test fixtures aligned with current schemas
- Maintain 80% code coverage threshold
- Run `pnpm test` before committing

## Rules and Constraints

### Dependency Management

- **Never** add, update, or remove packages without explicit user approval
- Before proposing a package change:
  1. Explain why it's needed
  2. Confirm its purpose and safety
  3. Wait for approval
- Use `pnpm add` or `pnpm add -D` for approved packages (don't edit `package.json` manually)

### Code Modifications

- Make minimal, surgical changes to address the specific issue
- Don't refactor unrelated code
- Don't fix unrelated bugs or broken tests
- Ask before making structural changes to build, tooling, or configuration

### Communication

- Answer user questions **before** making any file changes
- Be concise and clear
- If blocked by these rules, ask for guidance
- Don't run commands until the user confirms you should proceed

## Common Tasks

### Adding a New Schema

1. Create JSON Schema file in `src/schemas/`
2. Run `pnpm generate:types` to create TypeScript types
3. Export the schema from `src/index.js`
4. Add validation tests in `src/tests/`
5. Update documentation if needed

### Updating an Existing Schema

1. Modify the JSON Schema file in `src/schemas/`
2. Run `pnpm generate:types` to update types
3. Update affected tests and examples
4. Run `pnpm test` to verify changes

### Fixing Validation Issues

1. Check the schema definition for correctness
2. Verify test fixtures match schema requirements
3. Update examples to reflect current schema state
4. Don't modify generated type files

## Important Notes

- This is a **published npm package** - breaking changes require version updates
- All exports are defined in `src/index.js`
- The build process creates both ESM and TypeScript declaration files
- Types are automatically generated - manual `.d.ts` files are prohibited
