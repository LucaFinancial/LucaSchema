# Copilot Rules (always follow)

These directives are authoritative for this repository. If anything conflicts, follow these first. Ask for clarification when unsure.

## Do not add dependencies without approval

- Never add, update, or remove packages unless the user explicitly approves the specific package/action.
- Before proposing a package, state why it is needed, confirm its purpose/safety, and wait for approval.

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
