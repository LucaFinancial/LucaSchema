# LucaSchema

Schema validation library for the Luca Ledger application. Provides type-safe validation for financial transactions, entities, and related data structures. Supports TypeScript.

## Installation

```bash
npm install @luca-financial/luca-schema
```

## Usage

```typescript
import { validate } from '@luca-financial/luca-schema';

const transactionData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  accountId: '123e4567-e89b-12d3-a456-426614174001',
  categoryId: null,
  statementId: null,
  amount: -2599,
  date: '2024-01-01',
  description: 'Test transaction',
  transactionState: 'COMPLETED',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null
};

const result = validate('transaction', transactionData);
if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

## Available Schemas

### Common Fields

All entity schemas include common fields:

```typescript
const common = {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
};
```

### Account

Validates financial accounts.

```typescript
const account = {
  id: string;
  name: string;
  type: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'EXTERNAL';
  institution: string | null;
  aggregationServiceId: string | null;
  statementClosingDay: number | null;
  paymentDueDate: string | null;
  creditLimit: number | null;
  apr: number | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
};
```

### Transaction

Validates financial transactions with properties like amount, date, and state.

```typescript
const transaction = {
  id: string;
  accountId: string;
  categoryId: string | null;
  statementId: string | null;
  authorizedAt: string | null;
  postedAt: string | null;
  currency: string | null;
  amount: number; // integer minor units
  date: string;
  description: string;
  memo: string | null;
  aggregationServiceId: string | null;
  transactionState:
    | 'PLANNED'
    | 'ON_DECK'
    | 'SCHEDULED'
    | 'PENDING'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'FAILED'
    | 'DISPUTED'
    | 'REFUNDED'
    | 'DELETED';
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
};
```

### RecurringTransaction

Validates recurring transaction templates with frequency and interval settings.

```typescript
const recurringTransaction = {
  id: string;
  accountId: string;
  categoryId: string | null;
  amount: number; // integer minor units
  description: string;
  frequency: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  interval: number;
  occurrences: number | null;
  startOn: string;
  endOn: string | null;
  recurringTransactionState: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
};
```

### Category

Validates transaction categories with optional parent relationships.

```typescript
const category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
};
```

### RecurringTransactionEvent

Validates events that track changes to recurring transactions.

```typescript
const recurringTransactionEvent = {
  id: string;
  transactionId: string | null;
  recurringTransactionId: string;
  expectedDate: string;
  eventState: 'MODIFIED' | 'DELETED';
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
};
```

### Statement

Validates credit card statements with balances in integer minor units.

```typescript
const statement = {
  id: string;
  accountId: string;
  startDate: string;
  endDate: string;
  startingBalance: number; // integer minor units
  endingBalance: number; // integer minor units
  totalCharges: number; // integer minor units
  totalPayments: number; // integer minor units
  isLocked: boolean;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
};
```

### TransactionSplit

Validates splits within a transaction.

```typescript
const transactionSplit = {
  id: string;
  transactionId: string;
  amount: number; // integer minor units
  categoryId: string | null;
  description: string | null;
  memo: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
};
```

### LucaSchema

Validates the full ledger export.

```typescript
const lucaSchema = {
  schemaVersion: '3.0.0';
  categories: Category[];
  accounts: Account[];
  statements: Statement[];
  recurringTransactions: RecurringTransaction[];
  recurringTransactionEvents: RecurringTransactionEvent[];
  transactions: Transaction[];
  transactionSplits: TransactionSplit[];
};
```

## Validator Utilities

This module exports helper utilities to inspect schemas and validate data:

```typescript
import {
  validate,
  validateCollection,
  getDateFieldPaths,
  getDateFieldPathsByCollection,
  getValidFields,
  getRequiredFields,
  stripInvalidFields,
  schemas,
  enums,
  LucaSchemas
} from '@luca-financial/luca-schema';
```

- `validate(schemaKey, data)` → `{ valid: boolean, errors: AjvError[] }`
- `validateCollection(schemaKey, array)` → `{ valid: boolean, errors: [{ index, entity, errors }] }`
- `getDateFieldPaths(schemaKey)` → `string[]` of `format: date` fields for a schema key
- `getDateFieldPathsByCollection()` → `{ accounts, categories, statements, recurringTransactions, recurringTransactionEvents, transactions, transactionSplits }`
- `getValidFields(schemaKey)` → `Set<string>` of all fields (includes common fields when applicable)
- `getRequiredFields(schemaKey)` → `Set<string>` of required fields (includes common required fields)
- `stripInvalidFields(schemaKey, data)` → new object with only schema-defined keys
- `schemas` → map of schema JSON objects
- `enums` → enum definitions (including `LucaSchemas` keys)
- `LucaSchemas` → names for schema keys (e.g., `LucaSchemas.TRANSACTION`)

All entity schemas and the top-level `lucaSchema` reject unknown properties.

## Development

```bash
pnpm build
pnpm test
pnpm lint
pnpm type-check
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
