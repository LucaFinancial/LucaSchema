import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import {
  makeTransactionLink,
  expectValid,
  expectInvalid
} from './test-fixtures.js';

describe('transactionLink schema', () => {
  test('valid transaction link', () => {
    const transactionLink = makeTransactionLink();
    expectValid(validate, 'transactionLink', transactionLink);
  });

  test('missing sourceTransactionId is invalid', () => {
    const transactionLink = makeTransactionLink();
    delete transactionLink.sourceTransactionId;
    expectInvalid(validate, 'transactionLink', transactionLink);
  });

  test('unknown fields are invalid', () => {
    const transactionLink = makeTransactionLink({ unexpectedField: 'x' });
    expectInvalid(validate, 'transactionLink', transactionLink);
  });
});
