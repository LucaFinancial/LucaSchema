import { lucaValidator } from '../';
import { createTestTransaction } from './test-utils';

test('getSchema returns undefined for non-existent schema', () => {
  const schema = lucaValidator.getSchema('nonExistentSchema' as any);
  expect(schema).toBeUndefined();
});

test('validate returns false for invalid data', () => {
  const transaction = createTestTransaction();
  const invalidTransaction = { ...transaction, amount: 'invalid' };
  const schema = lucaValidator.getSchema('transaction');

  if (!schema) {
    throw new Error('Transaction schema not found');
  }

  const isValid = schema(invalidTransaction);
  expect(isValid).toBe(false);
  expect(schema.errors).toBeDefined();
  expect(schema.errors?.length).toBeGreaterThan(0);
});

test('validate returns true for valid data', () => {
  const transaction = createTestTransaction();
  const schema = lucaValidator.getSchema('transaction');

  if (!schema) {
    throw new Error('Transaction schema not found');
  }

  const isValid = schema(transaction);
  expect(isValid).toBe(true);
  expect(schema.errors).toBeNull();
});

test('validate handles missing required fields', () => {
  const transaction = createTestTransaction();
  const invalidTransaction = { ...transaction };
  delete (invalidTransaction as any).amount;

  const schema = lucaValidator.getSchema('transaction');
  if (!schema) {
    throw new Error('Transaction schema not found');
  }

  const isValid = schema(invalidTransaction);
  expect(isValid).toBe(false);
  expect(schema.errors).toBeDefined();
  expect(schema.errors?.some(error => error.keyword === 'required')).toBe(true);
});

test('validate handles invalid enum values', () => {
  const transaction = createTestTransaction();
  const invalidTransaction = {
    ...transaction,
    transactionState: 'INVALID_STATE'
  };

  const schema = lucaValidator.getSchema('transaction');
  if (!schema) {
    throw new Error('Transaction schema not found');
  }

  const isValid = schema(invalidTransaction);
  expect(isValid).toBe(false);
  expect(schema.errors).toBeDefined();
  expect(schema.errors?.some(error => error.keyword === 'enum')).toBe(true);
});

test('validate handles invalid date format', () => {
  const transaction = createTestTransaction();
  const invalidTransaction = {
    ...transaction,
    date: 'invalid-date'
  };

  const schema = lucaValidator.getSchema('transaction');
  if (!schema) {
    throw new Error('Transaction schema not found');
  }

  const isValid = schema(invalidTransaction);
  expect(isValid).toBe(false);
  expect(schema.errors).toBeDefined();
  expect(schema.errors?.some(error => error.keyword === 'format')).toBe(true);
});

test('validate handles invalid UUID format', () => {
  const transaction = createTestTransaction();
  const invalidTransaction = {
    ...transaction,
    id: 'invalid-uuid'
  };

  const schema = lucaValidator.getSchema('transaction');
  if (!schema) {
    throw new Error('Transaction schema not found');
  }

  const isValid = schema(invalidTransaction);
  expect(isValid).toBe(false);
  expect(schema.errors).toBeDefined();
  expect(schema.errors?.some(error => error.keyword === 'format')).toBe(true);
});

test('direct validate method works correctly', () => {
  const transaction = createTestTransaction();
  const schemas = require('../schemas').default;

  // Test valid data
  const isValid = lucaValidator.validate(schemas.transaction, transaction);
  expect(isValid).toBe(true);
  expect(lucaValidator.errors).toBeNull();

  // Test invalid data
  const invalidTransaction = { ...transaction, amount: 'invalid' };
  const isInvalid = lucaValidator.validate(
    schemas.transaction,
    invalidTransaction
  );
  expect(isInvalid).toBe(false);
  expect(lucaValidator.errors).toBeDefined();
  expect(lucaValidator.errors?.length).toBeGreaterThan(0);
});
