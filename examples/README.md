# Luca Schema Example Data

This directory contains example datasets used by Luca Schema for validation and documentation.

## luca-schema-example.json

This file is a complete, valid Luca Schema document. It is intended to:

- provide realistic sample data for development and testing,
- demonstrate relationships across entities,
- act as a validation fixture for schema changes,
- serve as a reference when integrating with Luca Ledger.

### What it includes

- **Categories**: A small hierarchy with top-level and child categories.
- **Accounts**: Checking, savings, credit card, external, and a closed account example.
- **Statements**: Sample statements linked to the credit card account.
- **Recurring transactions**: Multiple frequencies and states.
- **Recurring transaction events**: Modified and deleted occurrences.
- **Transactions**: A mix of states and categories, some linked to statements.
- **Transaction splits**: One split transaction showing sums that match the parent.

### Data characteristics

- **Stable IDs**: Deterministic UUIDs for consistent references.
- **Synthetic values**: Realistic but fictional amounts and dates.
- **Complete relationships**: All foreign keys resolve.
- **Edge cases**: Optional fields both present and omitted.

### Usage

```javascript
import { validate } from '@luca-financial/luca-schema';
import fs from 'fs';

const exampleData = JSON.parse(
  fs.readFileSync('./examples/luca-schema-example.json', 'utf8')
);

const result = validate('lucaSchema', exampleData);
console.log('Valid:', result.valid);
```

### Validation

This file is validated in the test suite. Run tests with:

```bash
pnpm test
```

### Notes

The example data is safe for development use and contains no real personal information.
