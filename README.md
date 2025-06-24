# LucaSchema

Schema validation library for the Luca Ledger application.

## Installation

```bash
npm install @luca-financial/luca-schema
```

## Usage

```javascript
import { lucaValidator, enums } from '@luca-financial/luca-schema';

// Validate a transaction
const validateTransaction = lucaValidator.getSchema('transaction');
const isValid = validateTransaction(transactionData);

if (!isValid) {
  console.error('Validation errors:', validateTransaction.errors);
}

// Access schemas directly
console.log('Available schemas:', Object.keys(schemas));

// Use enums for consistency
const transactionState = enums.TransactionStateEnum.COMPLETED;
```

## Available Schemas

- `transaction` - Financial transactions
- `recurringTransaction` - Recurring transaction templates
- `recurringTransactionEvent` - Recurring transaction events
- `category` - Transaction categories
- `entity` - Financial entities
- `lucaSchema` - Complete schema structure

### More to come

- `account` (derives from entity)
- `savingsAccount` (derives from account)

## Development

```bash
yarn build    # Build the library
yarn test     # Run tests
yarn lint     # Check code style
```
