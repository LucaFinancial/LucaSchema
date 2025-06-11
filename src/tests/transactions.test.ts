import { lucaValidator } from '../';
import { createTestTransaction, createTestTransactions } from './test-utils';

const validateTransaction = lucaValidator.getSchema('transaction');

test('validates a single transaction', () => {
  if (!validateTransaction) {
    throw new Error('Transaction schema not found in lucaValidator.');
  }

  const transaction = createTestTransaction();
  const valid = validateTransaction(transaction);
  if (!valid) console.log(validateTransaction.errors);
  expect(valid).toBe(true);
});

test('validates multiple transactions', () => {
  if (!validateTransaction) {
    throw new Error('Transaction schema not found in lucaValidator.');
  }

  const transactions = createTestTransactions(5);
  for (const transaction of transactions) {
    const valid = validateTransaction(transaction);
    if (!valid) console.log(validateTransaction.errors);
    expect(valid).toBe(true);
  }
});

test('validates transaction with custom overrides', () => {
  if (!validateTransaction) {
    throw new Error('Transaction schema not found in lucaValidator.');
  }

  const transaction = createTestTransaction({
    amount: 999.99,
    description: 'Custom transaction',
    transactionState: 'PENDING'
  });
  const valid = validateTransaction(transaction);
  if (!valid) console.log(validateTransaction.errors);
  expect(valid).toBe(true);
}); 