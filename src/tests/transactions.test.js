import exampleData from '../examples/transactions.json';
import { lucaValidator } from '../';

const validateTransaction = lucaValidator.getSchema('transaction');

test('examples are valid transactions', () => {
  exampleData.forEach(example => {
    const valid = validateTransaction(example);
    if (!valid) console.log(validateTransaction.errors);
    expect(valid).toBe(true);
  });
});
