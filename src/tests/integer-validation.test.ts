import { lucaValidator } from '../';

describe('Integer minor units validation', () => {
  test('should reject decimal amounts', () => {
    const validateTransaction = lucaValidator.getSchema('transaction');
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transactionWithDecimal = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      payorId: '123e4567-e89b-12d3-a456-426614174001',
      payeeId: '123e4567-e89b-12d3-a456-426614174002',
      categoryId: '123e4567-e89b-12d3-a456-426614174003',
      amount: 100.5, // This should be invalid
      date: '2024-01-01',
      description: 'Test transaction with decimal',
      transactionState: 'COMPLETED',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: null
    };

    const isValid = validateTransaction(transactionWithDecimal);
    expect(isValid).toBe(false);
    expect(validateTransaction.errors).toHaveLength(1);
    expect(validateTransaction.errors![0].keyword).toBe('type');
    expect(validateTransaction.errors![0].message).toBe('must be integer');
  });

  test('should accept integer amounts', () => {
    const validateTransaction = lucaValidator.getSchema('transaction');
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transactionWithInteger = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      payorId: '123e4567-e89b-12d3-a456-426614174001',
      payeeId: '123e4567-e89b-12d3-a456-426614174002',
      categoryId: '123e4567-e89b-12d3-a456-426614174003',
      amount: 10050, // This should be valid
      date: '2024-01-01',
      description: 'Test transaction with integer',
      transactionState: 'COMPLETED',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: null
    };

    const isValid = validateTransaction(transactionWithInteger);
    expect(isValid).toBe(true);
    expect(validateTransaction.errors || []).toHaveLength(0);
  });
});
