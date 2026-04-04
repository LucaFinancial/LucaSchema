import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import { makeAccount, expectValid, expectInvalid } from './test-fixtures.js';

describe('account schema', () => {
  test('valid account', () => {
    const account = makeAccount();
    expectValid(validate, 'account', account);
  });

  test('cash account type is valid', () => {
    const account = makeAccount({ type: 'CASH' });
    expectValid(validate, 'account', account);
  });

  test('escrow account type is valid', () => {
    const account = makeAccount({ type: 'ESCROW' });
    expectValid(validate, 'account', account);
  });

  test('missing type is invalid', () => {
    const account = makeAccount();
    delete account.type;
    expectInvalid(validate, 'account', account);
  });
});
