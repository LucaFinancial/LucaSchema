import type {
  Transaction,
  TransactionSplit,
  Account,
  Category,
  RecurringTransaction,
  RecurringTransactionEvent,
  LucaSchema
} from '../types';

/**
 * Creates a test transaction with default values
 */
export const createTestTransaction = (
  overrides: Partial<Transaction> = {}
): Transaction => ({
  id: '123e4567-e89b-12d3-a456-426614174000',
  accountId: '123e4567-e89b-12d3-a456-426614174001',
  categoryId: '123e4567-e89b-12d3-a456-426614174003',
  amount: 100.5,
  date: '2024-01-01',
  description: 'Test transaction',
  transactionState: 'COMPLETED',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null,
  ...overrides
});

/**
 * Creates a test account with default values
 */
export const createTestAccount = (
  overrides: Partial<Account> = {}
): Account => ({
  id: '123e4567-e89b-12d3-a456-426614174001',
  name: 'Test Account',
  type: 'CHECKING',
  statementClosingDay: null,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null,
  ...overrides
});

/**
 * Creates a test category with default values
 */
export const createTestCategory = (
  overrides: Partial<Category> = {}
): Category => ({
  id: '123e4567-e89b-12d3-a456-426614174003',
  slug: 'test-category',
  name: 'Test Category',
  parentId: null,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null,
  ...overrides
});

/**
 * Creates a test recurring transaction with default values
 */
export const createTestRecurringTransaction = (
  overrides: Partial<RecurringTransaction> = {}
): RecurringTransaction => ({
  id: '123e4567-e89b-12d3-a456-426614174004',
  accountId: '123e4567-e89b-12d3-a456-426614174001',
  categoryId: '123e4567-e89b-12d3-a456-426614174003',
  amount: 50.0,
  description: 'Monthly subscription',
  frequency: 'MONTH',
  interval: 1,
  occurrences: null,
  startOn: '2024-01-01',
  endOn: null,
  recurringTransactionState: 'ACTIVE',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null,
  ...overrides
});

/**
 * Creates a test recurring transaction event with default values
 */
export const createTestRecurringTransactionEvent = (
  overrides: Partial<RecurringTransactionEvent> = {}
): RecurringTransactionEvent => ({
  id: '123e4567-e89b-12d3-a456-426614174005',
  transactionId: '123e4567-e89b-12d3-a456-426614174000',
  recurringTransactionId: '123e4567-e89b-12d3-a456-426614174004',
  expectedDate: '2024-01-15',
  eventState: 'MODIFIED',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null,
  ...overrides
});

/**
 * Creates a test transaction split with default values
 */
export const createTestTransactionSplit = (
  overrides: Partial<TransactionSplit> = {}
): TransactionSplit => ({
  id: '123e4567-e89b-12d3-a456-426614174006',
  transactionId: '123e4567-e89b-12d3-a456-426614174000',
  amount: 50.25,
  categoryId: '123e4567-e89b-12d3-a456-426614174003',
  description: 'Test split',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null,
  ...overrides
});

/**
 * Creates a test Luca schema with default values
 */
export const createTestLucaSchema = (
  overrides: Partial<LucaSchema> = {}
): LucaSchema => ({
  schemaVersion: '2.0.0',
  accounts: [createTestAccount()],
  categories: [createTestCategory()],
  transactions: [createTestTransaction()],
  transactionSplits: [createTestTransactionSplit()],
  recurringTransactions: [createTestRecurringTransaction()],
  recurringTransactionEvents: [createTestRecurringTransactionEvent()],
  ...overrides
});

/**
 * Creates an array of test transactions
 */
export const createTestTransactions = (
  count: number,
  overrides: Partial<Transaction> = {}
): Transaction[] => {
  return Array.from({ length: count }, (_, index) =>
    createTestTransaction({
      id: `123e4567-e89b-12d3-a456-${index.toString().padStart(12, '0')}`,
      ...overrides
    })
  );
};

/**
 * Creates an array of test accounts
 */
export const createTestAccounts = (
  count: number,
  overrides: Partial<Account> = {}
): Account[] => {
  return Array.from({ length: count }, (_, index) =>
    createTestAccount({
      id: `123e4567-e89b-12d3-a456-${index.toString().padStart(12, '0')}`,
      ...overrides
    })
  );
};

/**
 * Creates an array of test categories
 */
export const createTestCategories = (
  count: number,
  overrides: Partial<Category> = {}
): Category[] => {
  return Array.from({ length: count }, (_, index) =>
    createTestCategory({
      id: `123e4567-e89b-12d3-a456-${index.toString().padStart(12, '0')}`,
      ...overrides
    })
  );
};
