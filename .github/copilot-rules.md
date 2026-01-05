# Copilot Rules (always follow)

These directives are authoritative for this repository. If anything conflicts, follow these first. Ask for clarification when unsure.

## Do not add dependencies without approval

- Never add, update, or remove packages unless the user explicitly approves the specific package/action.
- Before proposing a package, state why it is needed, confirm its purpose/safety, and wait for approval.
- When adding an approved package, use the package manager (e.g., pnpm add / pnpm add -D) instead of editing package.json directly.

## Single source of truth: schemas

- `src/schemas/` is the source of truth for contracts/enums. Do not hand-author duplicate types or enums.
- Any generated types/enums must be derived from the JSON Schemas, not manually maintained.

## No redundant TypeScript artifacts

- Do not create or use hand-written `.d.ts` or manual enums. If types are needed, generate them from schemas only.

## Tests and examples

- Keep tests/examples aligned with the schemas. Remove or fix any fixtures that reference fields not defined in the schemas.

## Ask before structural changes

- For build, tooling, or config changes, describe the change and get user approval before applying.

## Communication

- Be concise. If blocked by these rules, say so and ask for guidance.
- When the user asks a question (especially "why"), answer it first before making any code or file changes. Do not modify files until the question is answered and the user confirms you should change something.
- When the user asks ANY question, always answer the question first before making any code or file changes. Do not modify files until the question is answered and the user confirms you should change something. Do not request to run commands until the user confirms you should do so.

## Single Responsibility Principle (SRP)

- Keep concerns separated: definitions, enums, utilities, and logic belong in their own files/modules with one clear purpose.
- Do not add unrelated responsibilities to existing files; create dedicated files when needed and update references accordingly.
