import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import {
  makeRecurringTransactionEvent,
  expectValid,
  expectInvalid
} from './test-fixtures.js';

describe('recurringTransactionEvent schema', () => {
  test('valid deleted event', () => {
    const recurringTransactionEvent = makeRecurringTransactionEvent();
    expectValid(
      validate,
      'recurringTransactionEvent',
      recurringTransactionEvent
    );
  });

  test('missing eventState is invalid', () => {
    const recurringTransactionEvent = makeRecurringTransactionEvent();
    delete recurringTransactionEvent.eventState;
    expectInvalid(
      validate,
      'recurringTransactionEvent',
      recurringTransactionEvent
    );
  });
});
