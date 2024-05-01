import exampleData from '../examples/recurringTransactionEvents.json';
import { lucaValidator } from '../';

const validateRecurringTransactionEvent = lucaValidator.getSchema('recurringTransactionEvent');

test('examples are valid recurringTransactionEvents', () => {
  exampleData.forEach(example => {
    const valid = validateRecurringTransactionEvent(example);
    if (!valid) console.log(validateRecurringTransactionEvent.errors);
    expect(valid).toBe(true);
  });
});
