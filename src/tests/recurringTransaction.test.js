import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import {
  makeRecurringTransaction,
  expectValid,
  expectInvalid
} from './test-fixtures.js';

describe('recurringTransaction schema', () => {
  test('valid recurringTransaction', () => {
    const recurringTransaction = makeRecurringTransaction();
    expectValid(validate, 'recurringTransaction', recurringTransaction);
  });

  test('missing frequency is invalid', () => {
    const recurringTransaction = makeRecurringTransaction();
    delete recurringTransaction.frequency;
    expectInvalid(validate, 'recurringTransaction', recurringTransaction);
  });
});
