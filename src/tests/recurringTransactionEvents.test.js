import exampleData from '../examples/recurringTransactionEvents.json';
import validators from '../validators';

const { validateRecurringTransactionEvent } = validators;

test('examples are valid recurringTransactionEvents', () => {
  exampleData.forEach(example => {
    const valid = validateRecurringTransactionEvent(example);
    if (!valid) console.log(validateRecurringTransactionEvent.errors);
    expect(valid).toBe(true);
  });
});
