import { describe, expect, test } from '@jest/globals';
import {
  getDateFieldPaths,
  getDateFieldPathsByCollection,
  validate
} from '../index.js';
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

  test('slash formatted date is invalid', () => {
    const statement = makeStatement({ startDate: '2024/01/02' });
    const result = validate('statement', statement);

    expect(result.valid).toBe(false);
    expect(
      result.errors.some(error => error.instancePath === '/startDate')
    ).toBe(true);
  });

  test('date path helpers expose statement date fields', () => {
    expect(getDateFieldPaths('statement')).toEqual(['startDate', 'endDate']);
    expect(getDateFieldPathsByCollection().statements).toEqual([
      'startDate',
      'endDate'
    ]);
  });
});
