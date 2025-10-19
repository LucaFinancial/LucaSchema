import { lucaValidator } from '../';
import { createTestTransaction } from './test-utils';

const validateTransaction = lucaValidator.getSchema('transaction');

describe('Transaction GroupId Validation', () => {
  test('validates transaction with journalEntryId', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction({
      journalEntryId: '123e4567-e89b-12d3-a456-426614174999'
    });
    const valid = validateTransaction(transaction);
    if (!valid) console.log(validateTransaction.errors);
    expect(valid).toBe(true);
  });

  test('validates transaction with null journalEntryId', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction({
      journalEntryId: null
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
      journalEntryId: groupId
    });

    const creditTransaction = createTestTransaction({
      id: '123e4567-e89b-12d3-a456-426614175002',
      entryType: 'CREDIT',
      amount: 10000,
      journalEntryId: groupId
    });

    expect(validateTransaction(debitTransaction)).toBe(true);
    expect(validateTransaction(creditTransaction)).toBe(true);
    expect(debitTransaction.journalEntryId).toBe(
      creditTransaction.journalEntryId
    );
  });

  test('rejects transaction with invalid UUID format for journalEntryId', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction({
      journalEntryId: 'invalid-uuid' as any
    });
    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
  });
});
