import exampleData from '../examples/recurringTransactions.json';
import { lucaValidator } from '../';
import type { RecurringTransaction } from '../types';

const validateRecurringTransaction = lucaValidator.getSchema<RecurringTransaction>('recurringTransaction');

test('examples are valid recurring transactions', () => {
  if (!validateRecurringTransaction) {
    throw new Error('Recurring Transaction schema not found in lucaValidator.');
  }

  for (const example of exampleData) {
    const valid = validateRecurringTransaction(example);
    if (!valid) console.log(validateRecurringTransaction.errors);
    expect(valid).toBe(true);
  }
}); 