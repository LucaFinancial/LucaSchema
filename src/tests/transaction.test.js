import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import {
  makeTransaction,
  expectValid,
  expectInvalid
} from './test-fixtures.js';

describe('transaction schema', () => {
  test('valid transaction', () => {
    const transaction = makeTransaction();
    expectValid(validate, 'transaction', transaction);
  });

  test('missing transactionState is invalid', () => {
    const transaction = makeTransaction();
    delete transaction.transactionState;
    expectInvalid(validate, 'transaction', transaction);
  });
});
