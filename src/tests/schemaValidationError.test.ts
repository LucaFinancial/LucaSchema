import { SchemaValidationError } from '../lucaValidator';

test('SchemaValidationError class works correctly', () => {
  const mockErrors = [
    {
      message: 'Test error 1',
      params: {},
      instancePath: '',
      schemaPath: '',
      keyword: 'test'
    },
    {
      message: 'Test error 2',
      params: {},
      instancePath: '',
      schemaPath: '',
      keyword: 'test'
    }
  ];

  const error = new SchemaValidationError(mockErrors);
  expect(error).toBeInstanceOf(Error);
  expect(error.message).toBe('Schema validation failed');
  expect(error.errors).toEqual(mockErrors);
});

test('SchemaValidationError extends Error properly', () => {
  const mockErrors = [
    {
      message: 'Test error',
      params: {},
      instancePath: '',
      schemaPath: '',
      keyword: 'test'
    }
  ];

  const error = new SchemaValidationError(mockErrors);
  expect(error.name).toBe('Error');
  expect(error.stack).toBeDefined();
});
