import exampleData from '../examples/recurringTransactions.json';
import { lucaValidator } from '../';

const validateRecurringTransaction = lucaValidator.getSchema('recurringTransaction');

test('examples are valid recurringTransactions', () => {
  exampleData.forEach(example => {
    const valid = validateRecurringTransaction(example);
    if (!valid) console.log(validateRecurringTransaction.errors);
    expect(valid).toBe(true);
  });
});
