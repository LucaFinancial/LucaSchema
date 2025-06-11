import exampleData from '../examples/transactions.json';
import { lucaValidator } from '../';
import type { Transaction } from '../types';

const validateTransaction = lucaValidator.getSchema<Transaction>('transaction');

test('examples are valid transactions', () => {
  if (!validateTransaction) {
    throw new Error('Transaction schema not found in lucaValidator.');
  }

  for (const example of exampleData) {
    const valid = validateTransaction(example);
    if (!valid) console.log(validateTransaction.errors);
    expect(valid).toBe(true);
  }
}); 