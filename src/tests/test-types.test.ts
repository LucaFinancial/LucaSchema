import type { Transaction } from '../types/index.d.ts';
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
