# LucaSchema

Schema validation library for the Luca Ledger application. Provides type-safe validation for financial transactions, entities, and related data structures. Supports TypeScript.

## Installation

```bash
npm install @luca-financial/luca-schema
```

## Usage

```typescript
import {
  lucaValidator,
  enums,
  schemas,
  dollarsToMinorUnits,
  formatMinorUnits
} from '@luca-financial/luca-schema';

// Validate a transaction
const validateTransaction = lucaValidator.getSchema('transaction');
const transactionData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  payorId: '123e4567-e89b-12d3-a456-426614174001',
  payeeId: '123e4567-e89b-12d3-a456-426614174002',
  categoryId: '123e4567-e89b-12d3-a456-426614174003',
  amount: dollarsToMinorUnits(100.5), // 10050 cents
  date: '2024-01-01',
  description: 'Test transaction',
  transactionState: enums.TransactionStateEnum.COMPLETED,
  entryType: enums.EntryTypeEnum.DEBIT,
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

// Format amounts for display
console.log(`Transaction amount: ${formatMinorUnits(transactionData.amount)}`); // $100.50
```

## Available Schemas

### Transaction

Validates financial transactions with properties like amount, date, and state. Supports double-entry accounting with debit/credit classification and transaction grouping for journal entries.

**Important**:

- All monetary amounts are stored as integers in minor units (cents) to avoid floating-point precision issues.
- The `entryType` field indicates whether the transaction is a DEBIT or CREDIT entry for double-entry accounting.
- The `transactionGroupId` field links related debit and credit entries that form a complete journal entry.
- The `id` field is required for all transactions.

```typescript
const transaction = {
  id: string;
  payorId: string;
  payeeId: string;
  categoryId: string | null;
  amount: number; // Amount in cents (e.g., 10050 for $100.50)
  date: string;
  description: string;
  transactionState: TransactionState;
  entryType: 'DEBIT' | 'CREDIT'; // Double-entry accounting entry type
  transactionGroupId: string | null; // Links related debit/credit entries
  createdAt: string;
  updatedAt: string | null;
};
```

### Account

Validates accounts in the chart of accounts with support for hierarchical structure. Follows standard accounting categories (Assets, Liabilities, Equity, Revenue, Expenses) and supports parent/child relationships.

```typescript
const account = {
  id: string;
  name: string;
  description: string | null;
  accountNumber: string; // 4-10 digit account number (e.g., '1000', '1110')
  accountCategory: 'ASSETS' | 'LIABILITIES' | 'EQUITY' | 'REVENUE' | 'EXPENSES';
  normalBalance: 'DEBIT' | 'CREDIT'; // Which side increases the account
  parentAccountId: string | null; // For hierarchical account structure
  accountStatus: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
  createdAt: string;
  updatedAt: string | null;
};
```

**Account Categories and Normal Balances**:

- **ASSETS**: Resources owned (Normal Balance: DEBIT)
- **LIABILITIES**: Obligations owed (Normal Balance: CREDIT)
- **EQUITY**: Owner's interest (Normal Balance: CREDIT)
- **REVENUE**: Income from operations (Normal Balance: CREDIT)
- **EXPENSES**: Costs incurred (Normal Balance: DEBIT)

### RecurringTransaction

Validates recurring transaction templates with frequency and interval settings.

```typescript
const recurringTransaction = {
  id: string;
  payorId: string;
  payeeId: string;
  categoryId: string | null;
  amount: number; // Amount in cents (e.g., 5000 for $50.00)
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

Validates financial entities like personal accounts, retailers, or individuals. For entities of type `ACCOUNT`, you can specify the account type (checking, savings, credit card, etc.).

```typescript
const entity = {
  id: string;
  name: string;
  description: string | null;
  entityType: 'ACCOUNT' | 'RETAILER' | 'SERVICE' | 'INDIVIDUAL' | 'UTILITY' | 'GOVERNMENT';
  entityStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'DELETED' | 'CLOSED';
  accountType?: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'INVESTMENT' | 'LOAN' | 'CASH' | null;
  createdAt: string;
  updatedAt: string | null;
};
```

**Personal Finance Account Types** (when `entityType` is `ACCOUNT`):

- **CHECKING**: Checking account for daily transactions
- **SAVINGS**: Savings account
- **CREDIT_CARD**: Credit card account
- **INVESTMENT**: Investment/brokerage account
- **LOAN**: Loan account (mortgage, car loan, etc.)
- **CASH**: Cash on hand

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

## Monetary Values and Minor Units

All monetary amounts in LucaSchema are stored as integers in minor units (cents) to avoid floating-point precision issues common in financial applications.

### Utility Functions

The library provides helper functions for converting between dollar amounts and minor units:

```typescript
import {
  dollarsToMinorUnits,
  minorUnitsToDollars,
  formatMinorUnits
} from '@luca-financial/luca-schema';

// Convert dollars to cents
const amountInCents = dollarsToMinorUnits(100.5); // 10050

// Convert cents to dollars
const amountInDollars = minorUnitsToDollars(10050); // 100.50

// Format for display
const formatted = formatMinorUnits(10050); // '$100.50'
const formattedEuro = formatMinorUnits(10050, 'EUR', 'de-DE'); // '100,50 €'
```

## Transaction Grouping and Double-Entry Accounting

LucaSchema supports proper double-entry accounting through transaction grouping. Each financial transaction should have corresponding debit and credit entries that balance.

### Journal Entry Validation

```typescript
import { validateJournalEntry } from '@luca-financial/luca-schema';

// Create linked debit and credit entries
const transactions = [
  {
    id: 'txn-1',
    entryType: 'DEBIT',
    amount: 10000, // $100 debit to Cash
    transactionGroupId: 'group-123'
    // ... other fields
  },
  {
    id: 'txn-2',
    entryType: 'CREDIT',
    amount: 10000, // $100 credit to Revenue
    transactionGroupId: 'group-123'
    // ... other fields
  }
];

// Validate that debits equal credits
const result = validateJournalEntry(transactions);
console.log(result.isValid); // true
console.log(result.totalDebits); // 10000
console.log(result.totalCredits); // 10000
```

### Transaction Grouping Utilities

```typescript
import {
  groupTransactionsByGroupId,
  validateAllJournalEntries
} from '@luca-financial/luca-schema';

// Group transactions by their transactionGroupId
const groups = groupTransactionsByGroupId(allTransactions);

// Validate all groups at once
const validationResults = validateAllJournalEntries(allTransactions);
for (const [groupId, result] of validationResults) {
  if (!result.isValid) {
    console.error(`Group ${groupId} is imbalanced:`, result.error);
  }
}
```

## Chart of Accounts Hierarchy

LucaSchema supports hierarchical chart of accounts with parent/child relationships, enabling multi-level account organization.

### Account Hierarchy Navigation

```typescript
import {
  getAccountAncestors,
  getAccountDescendants,
  getAccountChildren,
  getAccountPath,
  getAccountDepth,
  getRootAccounts,
  isLeafAccount,
  getAccountsByCategory
} from '@luca-financial/luca-schema';

// Navigate up the hierarchy
const ancestors = getAccountAncestors(cashAccountId, allAccounts);
// Returns: [Current Assets, Assets]

// Navigate down the hierarchy
const descendants = getAccountDescendants(assetsAccountId, allAccounts);
// Returns all child accounts at any depth

// Get immediate children only
const children = getAccountChildren(assetsAccountId, allAccounts);

// Get full path from root to account
const path = getAccountPath(checkingAccountId, allAccounts);
// Returns: ['Assets', 'Current Assets', 'Cash', 'Checking Account']

// Get account depth (0 = root level)
const depth = getAccountDepth(cashAccountId, allAccounts);

// Get all root accounts
const roots = getRootAccounts(allAccounts);

// Check if account is a leaf (has no children)
const isLeaf = isLeafAccount(checkingAccountId, allAccounts);

// Get all accounts in a category
const assetAccounts = getAccountsByCategory('ASSETS', allAccounts);
```

### Migration Guide

**Breaking Change**: Monetary amounts are now integers instead of decimals.

If you're upgrading from a previous version:

1. **Update your data**: Convert existing decimal amounts to integer cents

   - `$100.50` becomes `10050`
   - `$0.99` becomes `99`
   - `$1000.00` becomes `100000`

2. **Update your code**: Use the conversion utilities when working with user input

   ```typescript
   // Before
   const transaction = { amount: 100.5 };

   // After
   const transaction = { amount: dollarsToMinorUnits(100.5) };
   ```

3. **Update display logic**: Use `formatMinorUnits()` for user-facing displays

   ```typescript
   // Before
   console.log(`$${amount.toFixed(2)}`);

   // After
   console.log(formatMinorUnits(amount));
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
