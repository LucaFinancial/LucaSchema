import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import { makeStatement, expectValid, expectInvalid } from './test-fixtures.js';

describe('statement schema', () => {
  test('valid statement', () => {
    const statement = makeStatement();
    expectValid(validate, 'statement', statement);
  });

  test('missing accountId is invalid', () => {
    const statement = makeStatement();
    delete statement.accountId;
    expectInvalid(validate, 'statement', statement);
  });

  test('missing isLocked is invalid', () => {
    const statement = makeStatement();
    delete statement.isLocked;
    expectInvalid(validate, 'statement', statement);
  });

  test('missing startDate is invalid', () => {
    const statement = makeStatement();
    delete statement.startDate;
    expectInvalid(validate, 'statement', statement);
  });
});
