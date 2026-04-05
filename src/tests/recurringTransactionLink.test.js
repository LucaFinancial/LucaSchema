import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import {
  makeRecurringTransactionLink,
  expectValid,
  expectInvalid
} from './test-fixtures.js';

describe('recurringTransactionLink schema', () => {
  test('valid recurringTransactionLink', () => {
    const recurringTransactionLink = makeRecurringTransactionLink();
    expectValid(validate, 'recurringTransactionLink', recurringTransactionLink);
  });

  test('missing sourceRecurringTransactionId is invalid', () => {
    const recurringTransactionLink = makeRecurringTransactionLink();
    delete recurringTransactionLink.sourceRecurringTransactionId;
    expectInvalid(
      validate,
      'recurringTransactionLink',
      recurringTransactionLink
    );
  });

  test('missing isSameSign is invalid', () => {
    const recurringTransactionLink = makeRecurringTransactionLink();
    delete recurringTransactionLink.isSameSign;
    expectInvalid(
      validate,
      'recurringTransactionLink',
      recurringTransactionLink
    );
  });

  test('non-boolean isSameSign is invalid', () => {
    const recurringTransactionLink = makeRecurringTransactionLink({
      isSameSign: 'false'
    });
    expectInvalid(
      validate,
      'recurringTransactionLink',
      recurringTransactionLink
    );
  });

  test('unknown fields are invalid', () => {
    const recurringTransactionLink = makeRecurringTransactionLink({
      unexpectedField: 'x'
    });
    expectInvalid(
      validate,
      'recurringTransactionLink',
      recurringTransactionLink
    );
  });
});
