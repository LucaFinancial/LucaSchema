import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import { makeCategory, expectValid, expectInvalid } from './test-fixtures.js';

describe('category schema', () => {
  test('valid category', () => {
    const category = makeCategory();
    expectValid(validate, 'category', category);
  });

  test('missing name is invalid', () => {
    const category = makeCategory();
    delete category.name;
    expectInvalid(validate, 'category', category);
  });
});
