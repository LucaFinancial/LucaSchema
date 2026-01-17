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

### Transaction

Validates financial transactions with properties like amount, date, and state.

```typescript
const transaction = {
  id: string;
  accountId: string;
  categoryId: string | null;
  statementId: string | null;
  amount: number;
  date: string;
  description: string;
  transactionState: TransactionState;
  createdAt: string;
  updatedAt: string | null;
};
```

### RecurringTransaction

Validates recurring transaction templates with frequency and interval settings.

```typescript
const recurringTransaction = {
  id: string;
  accountId: string;
  categoryId: string | null;
  amount: number;
  description: string;
  frequency: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  interval: number;
  occurrences: number | null;
  startOn: string;
  endOn: string | null;
  recurringTransactionState: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string | null;
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
};
```

### RecurringTransactionEvent

Validates events that track changes to recurring transactions.

```typescript
const recurringTransactionEvent = {
  id: string;
  transactionId: string;
  recurringTransactionId: string;
  expectedDate: string;
  eventState: 'MODIFIED' | 'DELETED';
  createdAt: string;
  updatedAt: string | null;
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
  startingBalance: number;
  endingBalance: number;
  totalCharges: number;
  totalPayments: number;
  status: 'draft' | 'current' | 'past' | 'locked';
  createdAt: string;
  updatedAt: string | null;
};
```

## Development

```bash
yarn build    # Build the library
yarn test     # Run tests
yarn lint     # Check code style
yarn type-check # Check TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
