import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import { makeAccount, expectValid, expectInvalid } from './test-fixtures.js';

describe('account schema', () => {
  test('valid account', () => {
    const account = makeAccount();
    expectValid(validate, 'account', account);
  });

  test('missing type is invalid', () => {
    const account = makeAccount();
    delete account.type;
    expectInvalid(validate, 'account', account);
  });
});
