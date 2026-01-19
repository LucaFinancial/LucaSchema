# Luca Schema Example Data

This directory contains example data files for the Luca Schema validation library.

## luca-schema-example.json

A comprehensive, valid example dataset that demonstrates all entity types and relationships defined in Luca Schema. This file is designed for:

- **Development & Testing**: Import realistic test data into Luca Ledger during development
- **Documentation**: Understand the structure and relationships between different entities
- **Validation Testing**: Verify that schema changes don't break existing data structures
- **Integration Testing**: Test data import/export workflows

### Contents

The example file includes:

- **12 Categories**: A hierarchical category structure with parent-child relationships
  - Top-level categories: Income, Housing, Food & Dining, Transportation, Entertainment
  - Sub-categories for better organization (e.g., Salary under Income, Rent under Housing)

- **6 Accounts**: Various account types to demonstrate different use cases
  - Checking account (Main Street Bank Checking)
  - Savings account (High Yield Savings)
  - Credit card (Rewards Credit Card)
  - External accounts (Employer, Utilities)
  - Closed account example (Old Savings Account)

- **3 Statements**: Credit card statements in different statuses
  - Past statement (fully reconciled)
  - Current statement (active)
  - Draft statement (being prepared)

- **5 Recurring Transactions**: Regular transactions with different frequencies
  - Monthly rent payment
  - Monthly subscription (Netflix)
  - Bi-weekly paycheck
  - Monthly electric bill (with occurrence limit)
  - Cancelled gym membership

- **3 Recurring Transaction Events**: Modifications to recurring transaction occurrences
  - Modified occurrence (rent with late fee)
  - Deleted occurrence (skipped subscription payment)
  - Modified occurrence (higher electric bill)

- **20 Transactions**: Diverse transaction examples covering all states
  - Income deposits (salary)
  - Expense payments (rent, utilities, groceries, dining)
  - Different transaction states: COMPLETED, PENDING, SCHEDULED, PLANNED, DISPUTED, REFUNDED, DELETED, ON_DECK
  - Transactions with and without categories
  - Transactions linked to statements
  - Transactions with optional fields (memo, counterparty, currency)

- **3 Transaction Splits**: Demonstration of splitting a transaction across multiple categories
  - Single online shopping purchase split into groceries, entertainment, and utilities
  - Note: Split amounts are always positive values representing portions of the parent transaction's absolute amount
  - The sum of all split amounts (8000 + 5000 + 2000 = 15000) equals the absolute value of the parent transaction amount (-15000)

### Data Characteristics

- **Stable IDs**: Uses deterministic UUIDs for consistent references between imports
- **Realistic Values**: Amounts are in integer minor units (cents), realistic but clearly synthetic
- **Complete Relationships**: All foreign key relationships are valid and resolvable
- **Edge Cases**: Includes optional fields both present and omitted, closed accounts, deleted transactions
- **Temporal Consistency**: Dates and timestamps follow a logical chronological order

### Usage

```javascript
import { validate } from '@luca-financial/luca-schema';
import fs from 'fs';

// Load and validate the example data
const exampleData = JSON.parse(
  fs.readFileSync('./examples/luca-schema-example.json', 'utf8')
);

const result = validate('lucaSchema', exampleData);
console.log('Valid:', result.valid); // true
```

### Validation

The example file is automatically validated in the test suite to ensure it remains valid as the schema evolves. Run tests with:

```bash
pnpm test
```

### Importing into Luca Ledger

This file can be directly imported into Luca Ledger for development and testing. The data will populate:

- A category hierarchy for organizing transactions
- Multiple accounts across different types
- Historical and current statements
- Various transactions in different states
- Examples of recurring transactions and their modifications

The synthetic data is safe for development use and demonstrates common financial scenarios without containing any real personal information.
