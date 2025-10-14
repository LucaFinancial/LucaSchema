import type {
  Transaction,
  Entity,
  Category,
  RecurringTransaction,
  RecurringTransactionEvent,
  LucaSchema
} from '../types';
import lucaValidator from '../lucaValidator';

test('Transaction validation', () => {
  const transaction: Transaction = {
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
    updatedAt: null
  };

  const validateTransaction = lucaValidator.getSchema('transaction');
  if (validateTransaction) {
    const isValid = validateTransaction(transaction);
    console.log(`Transaction is valid: ${isValid}`);
    if (!isValid) {
      console.error(
        'Transaction validation failed:',
        validateTransaction.errors
      );
    }
    expect(validateTransaction.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Transaction schema not found in lucaValidator.');
  }
});

test('Entity validation', () => {
  const entity: Entity = {
    id: '123e4567-e89b-12d3-a456-426614174001',
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
    if (!isValid) {
      console.error('Entity validation failed:', validateEntity.errors);
    }
    expect(isValid).toBe(true);
    expect(validateEntity.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Entity schema not found in lucaValidator.');
  }
});

test('Category validation', () => {
  const category: Category = {
    id: '123e4567-e89b-12d3-a456-426614174003',
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
    if (!isValid) {
      console.error('Category validation failed:', validateCategory.errors);
    }
    expect(isValid).toBe(true);
    expect(validateCategory.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Category schema not found in lucaValidator.');
  }
});

test('RecurringTransaction validation', () => {
  const recurringTransaction: RecurringTransaction = {
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
    updatedAt: null
  };

  const validateRecurringTransaction = lucaValidator.getSchema(
    'recurringTransaction'
  );
  if (validateRecurringTransaction) {
    const isValid = validateRecurringTransaction(recurringTransaction);
    if (!isValid) {
      console.error(
        'Recurring Transaction validation failed:',
        validateRecurringTransaction.errors
      );
    }
    expect(isValid).toBe(true);
    expect(validateRecurringTransaction.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Recurring Transaction schema not found in lucaValidator.');
  }
});

test('RecurringTransactionEvent validation', () => {
  const recurringTransactionEvent: RecurringTransactionEvent = {
    id: '123e4567-e89b-12d3-a456-426614174005',
    transactionId: '123e4567-e89b-12d3-a456-426614174000',
    recurringTransactionId: '123e4567-e89b-12d3-a456-426614174004',
    expectedDate: '2024-01-15',
    eventState: 'MODIFIED',
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
    if (!isValid) {
      console.error(
        'Recurring Transaction Event validation failed:',
        validateRecurringTransactionEvent.errors
      );
    }
    expect(isValid).toBe(true);
    expect(validateRecurringTransactionEvent.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error(
      'Recurring Transaction Event schema not found in lucaValidator.'
    );
  }
});

test('LucaSchema validation', () => {
  const lucaSchema: LucaSchema = {
    schemaVersion: '2.0.0',
    accounts: [],
    entities: [],
    categories: [],
    transactions: [],
    recurringTransactions: [],
    recurringTransactionEvents: []
  };

  const validateLucaSchema = lucaValidator.getSchema('lucaSchema');
  if (validateLucaSchema) {
    const isValid = validateLucaSchema(lucaSchema);
    if (!isValid) {
      console.error(
        'Luca Schema validation failed:',
        validateLucaSchema.errors
      );
    }
    expect(isValid).toBe(true);
    expect(validateLucaSchema.errors?.length ?? 0).toBe(0);
  } else {
    throw new Error('Luca Schema not found in lucaValidator.');
  }
});
