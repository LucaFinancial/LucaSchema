import type {
  Transaction,
  Entity,
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
  payorId: '123e4567-e89b-12d3-a456-426614174001',
  payeeId: '123e4567-e89b-12d3-a456-426614174002',
  categoryId: '123e4567-e89b-12d3-a456-426614174003',
  amount: 10050,
  date: '2024-01-01',
  description: 'Test transaction',
  transactionState: 'COMPLETED',
  entryType: 'DEBIT',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null,
  ...overrides
});

/**
 * Creates a test entity with default values
 */
export const createTestEntity = (overrides: Partial<Entity> = {}): Entity => ({
  id: '123e4567-e89b-12d3-a456-426614174001',
  name: 'Test Entity',
  description: 'This is a test entity',
  entityType: 'INDIVIDUAL',
  entityStatus: 'ACTIVE',
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
  name: 'Test Category',
  description: 'This is a test category',
  parentId: null,
  defaultCategoryId: null,
  categoryType: 'CUSTOM',
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
  payorId: '123e4567-e89b-12d3-a456-426614174001',
  payeeId: '123e4567-e89b-12d3-a456-426614174002',
  categoryId: '123e4567-e89b-12d3-a456-426614174003',
  amount: 5000,
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
 * Creates a test Luca schema with default values
 */
export const createTestLucaSchema = (
  overrides: Partial<LucaSchema> = {}
): LucaSchema => ({
  schemaVersion: '2.0.0',
  entities: [createTestEntity()],
  categories: [createTestCategory()],
  transactions: [createTestTransaction()],
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
 * Creates an array of test entities
 */
export const createTestEntities = (
  count: number,
  overrides: Partial<Entity> = {}
): Entity[] => {
  return Array.from({ length: count }, (_, index) =>
    createTestEntity({
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
