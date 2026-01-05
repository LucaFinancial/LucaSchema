import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import {
  makeTransactionSplit,
  expectValid,
  expectInvalid
} from './test-fixtures.js';

describe('transactionSplit schema', () => {
  test('valid transactionSplit', () => {
    const transactionSplit = makeTransactionSplit();
    expectValid(validate, 'transactionSplit', transactionSplit);
  });

  test('missing amount is invalid', () => {
    const transactionSplit = makeTransactionSplit();
    delete transactionSplit.amount;
    expectInvalid(validate, 'transactionSplit', transactionSplit);
  });
});
