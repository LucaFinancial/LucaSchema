import type {
  Transaction,
  Entity,
  Category,
  RecurringTransaction,
  RecurringTransactionEvent,
  LucaSchema
} from '../types/index.d.ts';
import lucaValidator from '../lucaValidator.js';

test('Transaction validation', () => {
  const transaction: Transaction = {
    id: 'tx-001',
    payorId: 'ent-001',
    payeeId: 'ent-002',
    categoryId: 'cat-001',
    amount: 100.5,
    date: '2024-01-01',
    description: 'Test transaction',
    transactionState: 'COMPLETED',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: null
  };

  const validateTransaction = lucaValidator.getSchema('transaction');
  if (validateTransaction) {
    const isValid = validateTransaction(transaction);
    console.log(`Transaction is valid: ${isValid}`);
    expect(isValid).toBe(true);
    expect(lucaValidator.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Transaction schema not found in lucaValidator.');
  }
});

test('Entity validation', () => {
  const entity: Entity = {
    id: 'ent-001',
    name: 'Test Entity',
    description: 'This is a test entity',
    entityType: 'INDIVIDUAL',
    entityStatus: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: null
  };

  const validateEntity = lucaValidator.getSchema('entity');
  if (validateEntity) {
    const isValid = validateEntity(entity);
    console.log(`Entity is valid: ${isValid}`);
    expect(isValid).toBe(true);
    expect(lucaValidator.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Entity schema not found in lucaValidator.');
  }
});

test('Category validation', () => {
  const category: Category = {
    id: 'cat-001',
    name: 'Test Category',
    description: 'This is a test category',
    parentId: null,
    defaultCategoryId: null,
    categoryType: 'CUSTOM',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: null
  };

  const validateCategory = lucaValidator.getSchema('category');
  if (validateCategory) {
    const isValid = validateCategory(category);
    console.log(`Category is valid: ${isValid}`);
    expect(isValid).toBe(true);
    expect(lucaValidator.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Category schema not found in lucaValidator.');
  }
});

test('RecurringTransaction validation', () => {
  const recurringTransaction: RecurringTransaction = {
    id: 'rec-001',
    payorId: 'ent-001',
    payeeId: 'ent-002',
    categoryId: 'cat-001',
    amount: 50.0,
    description: 'Monthly subscription',
    frequency: 'MONTH',
    interval: 1,
    occurrences: null,
    startOn: '2024-01-01',
    endOn: null,
    recurringTransactionState: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: null
  };

  const validateRecurringTransaction = lucaValidator.getSchema(
    'recurringTransaction'
  );
  if (validateRecurringTransaction) {
    const isValid = validateRecurringTransaction(recurringTransaction);
    console.log(`Recurring Transaction is valid: ${isValid}`);
    expect(isValid).toBe(true);
    expect(lucaValidator.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Recurring Transaction schema not found in lucaValidator.');
  }
});

test('RecurringTransactionEvent validation', () => {
  const recurringTransactionEvent: RecurringTransactionEvent = {
    id: 'event-001',
    transactionId: 'tx-001',
    recurringTransactionId: 'rec-001',
    expectedDate: '2024-01-15',
    status: 'MODIFIED',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: null
  };

  const validateRecurringTransactionEvent = lucaValidator.getSchema(
    'recurringTransactionEvent'
  );
  if (validateRecurringTransactionEvent) {
    const isValid = validateRecurringTransactionEvent(
      recurringTransactionEvent
    );
    console.log(`Recurring Transaction Event is valid: ${isValid}`);
    expect(isValid).toBe(true);
    expect(lucaValidator.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error(
      'Recurring Transaction Event schema not found in lucaValidator.'
    );
  }
});

test('LucaSchema validation', () => {
  const lucaSchema: LucaSchema = {
    schemaVersion: '2.0.0',
    entities: [],
    categories: [],
    transactions: [],
    recurringTransactions: [],
    recurringTransactionEvents: []
  };

  const validateLucaSchema = lucaValidator.getSchema('lucaSchema');
  if (validateLucaSchema) {
    const isValid = validateLucaSchema(lucaSchema);
    console.log(`Luca Schema is valid: ${isValid}`);
    expect(isValid).toBe(true);
    expect(lucaValidator.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Luca Schema not found in lucaValidator.');
  }
});
