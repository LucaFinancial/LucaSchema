# LucaSchema

Schema validation library for the Luca Ledger application. Provides type-safe validation for financial transactions, entities, and related data structures. Supports TypeScript.

## Installation

```bash
npm install @luca-financial/luca-schema
```

## Usage

```typescript
import { lucaValidator, enums, schemas } from '@luca-financial/luca-schema';

// Validate a transaction with double-entry postings
const validateTransaction = lucaValidator.getSchema('transaction');
const transactionData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  postings: [
    {
      accountId: '123e4567-e89b-12d3-a456-426614174001', // Groceries expense account
      amount: 6532, // $65.32 in cents (debit)
      description: 'Weekly groceries',
      order: 0
    },
    {
      accountId: '123e4567-e89b-12d3-a456-426614174002', // Checking account
      amount: -6532, // $65.32 in cents (credit)
      description: 'Payment from checking',
      order: 1
    }
  ],
  categoryId: '123e4567-e89b-12d3-a456-426614174003',
  date: '2024-01-01',
  description: 'Grocery shopping at market',
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

## Double-Entry Accounting

LucaSchema uses double-entry accounting principles where every transaction consists of multiple postings (debits and credits) that must balance to zero.

### Key Concepts

- **Postings**: Individual debit or credit entries that make up a transaction
- **Signed Amounts**: Positive values represent debits, negative values represent credits
- **Balance Rule**: The sum of all posting amounts in a transaction must equal zero
- **Minor Units**: All amounts are stored as integers in minor units (e.g., cents for USD)

### Example Transactions

#### Simple Expense

```typescript
// Expense: Groceries $65.32
{
  postings: [
    { accountId: 'groceries-expense', amount: 6532, order: 0 }, // Dr Groceries
    { accountId: 'checking-account', amount: -6532, order: 1 } // Cr Checking
  ];
}
```

#### Income

```typescript
// Income: Salary $2000
{
  postings: [
    { accountId: 'checking-account', amount: 200000, order: 0 }, // Dr Checking
    { accountId: 'salary-income', amount: -200000, order: 1 } // Cr Salary
  ];
}
```

#### Transfer

```typescript
// Transfer: $500 from Checking to Savings
{
  postings: [
    { accountId: 'savings-account', amount: 50000, order: 0 }, // Dr Savings
    { accountId: 'checking-account', amount: -50000, order: 1 } // Cr Checking
  ];
}
```

#### Split Transaction

```typescript
// Split: Shopping with multiple categories
{
  postings: [
    { accountId: 'groceries', amount: 5000, order: 0 }, // Dr Groceries $50
    { accountId: 'household', amount: 3000, order: 1 }, // Dr Household $30
    { accountId: 'checking-account', amount: -8000, order: 2 } // Cr Checking $80
  ];
}
```

## Available Schemas

### Transaction

Validates financial transactions with double-entry postings.

```typescript
const transaction = {
  id: string;
  postings: Posting[];  // Array of debits and credits that balance to zero
  categoryId: string | null;
  date: string;
  description: string;
  transactionState: TransactionState;
  createdAt: string;
  updatedAt: string | null;
};
```

### Posting

Represents an individual debit or credit entry in a transaction.

```typescript
const posting = {
  accountId: string;      // Reference to account entity
  amount: number;         // Signed integer (positive=debit, negative=credit)
  description?: string | null;
  order: number;         // Zero-based ordering index
};
```

### RecurringTransaction

Validates recurring transaction templates with double-entry postings.

```typescript
const recurringTransaction = {
  id: string;
  postings: Posting[];  // Array of posting templates
  categoryId: string | null;
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
