# LucaSchema

Schema validation library for the Luca Ledger application. Provides type-safe validation for financial transactions, entities, and related data structures. Supports TypeScript.

## Installation

```bash
npm install @luca-financial/luca-schema
```

## Usage

```typescript
import { lucaValidator, enums, schemas } from '@luca-financial/luca-schema';

// Validate a transaction
const validateTransaction = lucaValidator.getSchema('transaction');
const transactionData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  payorId: '123e4567-e89b-12d3-a456-426614174001',
  payeeId: '123e4567-e89b-12d3-a456-426614174002',
  categoryId: '123e4567-e89b-12d3-a456-426614174003',
  amount: 100.5,
  date: '2024-01-01',
  description: 'Test transaction',
  transactionState: enums.TransactionStateEnum.COMPLETED,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null
};

const isValid = validateTransaction(transactionData);

if (!isValid) {
  console.error('Validation errors:', validateTransaction.errors);
}

// Alternative: Use schemas directly with the validate method
const isValidDirect = lucaValidator.validate(
  schemas.transaction,
  transactionData
);
```

## Available Schemas

### Transaction

Validates financial transactions with properties like amount, date, and state.

```typescript
const transaction = {
  id: string;
  payorId: string;
  payeeId: string;
  categoryId: string | null;
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
  payorId: string;
  payeeId: string;
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

### Entity

Validates financial entities like accounts, retailers, or individuals.

```typescript
const entity = {
  id: string;
  name: string;
  description: string | null;
  entityType: 'ACCOUNT' | 'RETAILER' | 'SERVICE' | 'INDIVIDUAL' | 'UTILITY' | 'GOVERNMENT';
  entityStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'DELETED' | 'CLOSED';
  createdAt: string;
  updatedAt: string | null;
};
```

### Category

Validates transaction categories with optional parent relationships.

```typescript
const category = {
  id: string;
  name: string;
  description: string | null;
  parentId: string | null;
  defaultCategoryId: string | null;
  categoryType: 'DEFAULT' | 'MODIFIED' | 'CUSTOM';
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
