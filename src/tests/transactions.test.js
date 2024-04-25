import exampleData from '../examples/transactions.json';
import validators from '../validators';

const { validateTransaction } = validators;

test('examples are valid transactions', () => {
  exampleData.forEach(example => {
    const valid = validateTransaction(example);
    if (!valid) console.log(validateTransaction.errors);
    expect(valid).toBe(true);
  });
});
