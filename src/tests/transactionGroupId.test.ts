import { lucaValidator } from '../';
import { createTestTransaction } from './test-utils';

const validateTransaction = lucaValidator.getSchema('transaction');

describe('Transaction GroupId Validation', () => {
  test('validates transaction with transactionGroupId', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction({
      transactionGroupId: '123e4567-e89b-12d3-a456-426614174999'
    });
    const valid = validateTransaction(transaction);
    if (!valid) console.log(validateTransaction.errors);
    expect(valid).toBe(true);
  });

  test('validates transaction with null transactionGroupId', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction({
      transactionGroupId: null
    });
    const valid = validateTransaction(transaction);
    if (!valid) console.log(validateTransaction.errors);
    expect(valid).toBe(true);
  });

  test('validates paired debit and credit transactions with same groupId', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const groupId = '123e4567-e89b-12d3-a456-426614175000';

    const debitTransaction = createTestTransaction({
      id: '123e4567-e89b-12d3-a456-426614175001',
      entryType: 'DEBIT',
      amount: 10000,
      transactionGroupId: groupId
    });

    const creditTransaction = createTestTransaction({
      id: '123e4567-e89b-12d3-a456-426614175002',
      entryType: 'CREDIT',
      amount: 10000,
      transactionGroupId: groupId
    });

    expect(validateTransaction(debitTransaction)).toBe(true);
    expect(validateTransaction(creditTransaction)).toBe(true);
    expect(debitTransaction.transactionGroupId).toBe(
      creditTransaction.transactionGroupId
    );
  });

  test('rejects transaction with invalid UUID format for transactionGroupId', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction({
      transactionGroupId: 'invalid-uuid' as any
    });
    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
  });
});
