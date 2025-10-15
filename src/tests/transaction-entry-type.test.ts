import { lucaValidator } from '../';
import { createTestTransaction } from './test-utils';

const validateTransaction = lucaValidator.getSchema('transaction');

describe('Transaction entry type (debit/credit) validation', () => {
  test('validates transaction with DEBIT entry type', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction({ entryType: 'DEBIT' });
    const valid = validateTransaction(transaction);
    if (!valid) console.log(validateTransaction.errors);
    expect(valid).toBe(true);
  });

  test('validates transaction with CREDIT entry type', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction({ entryType: 'CREDIT' });
    const valid = validateTransaction(transaction);
    if (!valid) console.log(validateTransaction.errors);
    expect(valid).toBe(true);
  });

  test('rejects transaction without entryType field', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction();
    delete (transaction as any).entryType;

    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
    expect(validateTransaction.errors).toBeDefined();
    expect(
      validateTransaction.errors!.some(
        err =>
          err.keyword === 'required' &&
          err.params?.missingProperty === 'entryType'
      )
    ).toBe(true);
  });

  test('rejects transaction with invalid entry type value', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction({ entryType: 'INVALID' as any });
    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
    expect(validateTransaction.errors).toBeDefined();
    expect(
      validateTransaction.errors!.some(err => err.keyword === 'enum')
    ).toBe(true);
  });

  test('validates double-entry transaction pair (debit and credit)', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    // Debit transaction (e.g., increase in asset)
    const debitTransaction = createTestTransaction({
      id: '10000000-0000-0000-0000-000000000001',
      entryType: 'DEBIT',
      amount: 10000,
      description: 'Purchase office supplies'
    });

    // Credit transaction (e.g., decrease in cash)
    const creditTransaction = createTestTransaction({
      id: '10000000-0000-0000-0000-000000000002',
      entryType: 'CREDIT',
      amount: 10000,
      description: 'Payment for office supplies'
    });

    const debitValid = validateTransaction(debitTransaction);
    const creditValid = validateTransaction(creditTransaction);

    expect(debitValid).toBe(true);
    expect(creditValid).toBe(true);
  });

  test('validates that transaction requires id field', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found in lucaValidator.');
    }

    const transaction = createTestTransaction();
    delete (transaction as any).id;

    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
    expect(validateTransaction.errors).toBeDefined();
    expect(
      validateTransaction.errors!.some(
        err =>
          err.keyword === 'required' && err.params?.missingProperty === 'id'
      )
    ).toBe(true);
  });
});
