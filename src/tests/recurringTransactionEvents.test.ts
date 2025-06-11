import exampleData from '../examples/recurringTransactionEvents.json';
import { lucaValidator } from '../';
import type { RecurringTransactionEvent } from '../types';

const validateRecurringTransactionEvent = lucaValidator.getSchema<RecurringTransactionEvent>('recurringTransactionEvent');

test('examples are valid recurring transaction events', () => {
  if (!validateRecurringTransactionEvent) {
    throw new Error('Recurring Transaction Event schema not found in lucaValidator.');
  }

  for (const example of exampleData) {
    const valid = validateRecurringTransactionEvent(example);
    if (!valid) console.log(validateRecurringTransactionEvent.errors);
    expect(valid).toBe(true);
  }
}); 