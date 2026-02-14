import { describe, expect, test } from '@jest/globals';
import {
  getDateFieldPaths,
  getDateFieldPathsByCollection,
  isDateStringFixable,
  normalizeDateString,
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

  test('slash formatted date returns fixable format metadata', () => {
    const statement = makeStatement({ startDate: '2024/01/02' });
    const result = validate('statement', statement);

    expect(result.valid).toBe(false);
    expect(result.metadata.dateFormatIssues).toHaveLength(1);
    expect(result.metadata.dateFormatIssues[0]).toMatchObject({
      instancePath: '/startDate',
      format: 'date',
      fixable: true,
      normalizedValue: '2024-01-02'
    });
    expect(result.metadata.hasFixableDateFormatIssues).toBe(true);
  });

  test('ambiguous date string is non-fixable', () => {
    const statement = makeStatement({ startDate: '01/02/2024' });
    const result = validate('statement', statement);

    expect(result.valid).toBe(false);
    expect(result.metadata.dateFormatIssues).toHaveLength(1);
    expect(result.metadata.dateFormatIssues[0]).toMatchObject({
      instancePath: '/startDate',
      format: 'date',
      fixable: false,
      normalizedValue: null
    });
    expect(result.metadata.hasFixableDateFormatIssues).toBe(false);
  });

  test('date path helpers expose statement date fields', () => {
    expect(getDateFieldPaths('statement')).toEqual(['startDate', 'endDate']);
    expect(getDateFieldPathsByCollection().statements).toEqual([
      'startDate',
      'endDate'
    ]);
  });

  test('date utility normalizes only unambiguous slash dates', () => {
    expect(normalizeDateString('2024/12/05')).toBe('2024-12-05');
    expect(normalizeDateString('12/05/2024')).toBeNull();
    expect(isDateStringFixable('2024/12/05')).toBe(true);
    expect(isDateStringFixable('2024-12-05')).toBe(false);
  });
});
