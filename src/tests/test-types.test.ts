import { Transaction, LucaValidator } from './dist/cjs/index.d.ts';

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

  const validateTransaction = LucaValidator.getSchema('transaction');
  const isValid = validateTransaction(transaction);
  console.log(`Transaction is valid: ${isValid}`);
  expect(isValid).toBe(true);
  expect(LucaValidator.errors.length).toBe(0);
});
