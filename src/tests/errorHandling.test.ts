import {
  LucaError,
  LucaValidationError,
  LucaErrorHandler,
  LucaErrorType,
  LucaErrorSeverity,
  lucaValidator,
  generateSuggestion
} from '../';
import { createTestTransaction } from './test-utils';

describe('Enhanced Error Handling', () => {
  describe('LucaError', () => {
    test('creates error with all properties', () => {
      const error = new LucaError({
        type: LucaErrorType.VALIDATION_ERROR,
        severity: LucaErrorSeverity.HIGH,
        code: 'TEST_ERROR',
        message: 'Test error message',
        field: 'testField',
        value: 'testValue',
        suggestion: 'Try something else',
        context: { test: true }
      });

      expect(error.name).toBe('LucaError');
      expect(error.message).toBe('Test error message');
      expect(error.type).toBe(LucaErrorType.VALIDATION_ERROR);
      expect(error.severity).toBe(LucaErrorSeverity.HIGH);
      expect(error.code).toBe('TEST_ERROR');
      expect(error.field).toBe('testField');
      expect(error.value).toBe('testValue');
      expect(error.suggestion).toBe('Try something else');
      expect(error.context).toEqual({ test: true });
    });

    test('serializes to JSON correctly', () => {
      const error = new LucaError({
        type: LucaErrorType.TYPE_ERROR,
        severity: LucaErrorSeverity.MEDIUM,
        code: 'TYPE_MISMATCH',
        message: 'Type error'
      });

      const json = error.toJSON();
      expect(json.name).toBe('LucaError');
      expect(json.message).toBe('Type error');
      expect(json.type).toBe(LucaErrorType.TYPE_ERROR);
      expect(json.severity).toBe(LucaErrorSeverity.MEDIUM);
      expect(json.code).toBe('TYPE_MISMATCH');
    });
  });

  describe('LucaValidationError', () => {
    test('creates validation error from AJV errors', () => {
      const ajvErrors = [
        {
          keyword: 'type',
          instancePath: '/amount',
          schemaPath: '#/properties/amount/type',
          params: { type: 'integer' },
          message: 'must be integer'
        }
      ] as any[];

      // Include the actual data in context so the suggestion can be generated correctly
      const context = {
        data: { amount: 100.5 }
      };

      const error = new LucaValidationError(ajvErrors, context);

      expect(error.name).toBe('LucaValidationError');
      expect(error.type).toBe(LucaErrorType.VALIDATION_ERROR);
      expect(error.severity).toBe(LucaErrorSeverity.MEDIUM);
      expect(error.field).toBe('amount');
      expect(error.message).toBe('amount: must be integer');
      expect(error.suggestion).toContain(
        'Convert decimal amount to integer cents'
      );
      expect(error.validationErrors).toEqual(ajvErrors);
    });

    test('handles multiple validation errors', () => {
      const ajvErrors = [
        {
          keyword: 'required',
          instancePath: '',
          schemaPath: '#/required',
          params: { missingProperty: 'id' },
          message: 'must have required property "id"'
        },
        {
          keyword: 'type',
          instancePath: '/amount',
          schemaPath: '#/properties/amount/type',
          params: { type: 'integer' },
          message: 'must be integer'
        }
      ] as any[];

      const error = new LucaValidationError(ajvErrors);

      expect(error.message).toContain('Validation failed with 2 errors');
      expect(error.message).toContain('must have required property "id"');
      expect(error.message).toContain('amount: must be integer');
    });
  });

  describe('LucaErrorHandler', () => {
    test('creates schema error', () => {
      const error = LucaErrorHandler.createSchemaError(
        'Invalid schema',
        'testSchema'
      );

      expect(error.type).toBe(LucaErrorType.SCHEMA_ERROR);
      expect(error.severity).toBe(LucaErrorSeverity.HIGH);
      expect(error.code).toBe('INVALID_SCHEMA');
      expect(error.message).toBe('Invalid schema');
      expect(error.field).toBe('testSchema');
    });

    test('creates type error', () => {
      const error = LucaErrorHandler.createTypeError(
        'Type mismatch',
        'amount',
        'number',
        'string'
      );

      expect(error.type).toBe(LucaErrorType.TYPE_ERROR);
      expect(error.severity).toBe(LucaErrorSeverity.MEDIUM);
      expect(error.code).toBe('TYPE_MISMATCH');
      expect(error.field).toBe('amount');
      expect(error.value).toBe('string');
      expect(error.suggestion).toBe('Expected type: number');
    });

    test('creates runtime error', () => {
      const error = LucaErrorHandler.createRuntimeError(
        'Runtime failure',
        'CUSTOM_CODE'
      );

      expect(error.type).toBe(LucaErrorType.RUNTIME_ERROR);
      expect(error.severity).toBe(LucaErrorSeverity.HIGH);
      expect(error.code).toBe('CUSTOM_CODE');
      expect(error.message).toBe('Runtime failure');
    });

    test('identifies LucaError instances', () => {
      const lucaError = new LucaError({
        type: LucaErrorType.VALIDATION_ERROR,
        severity: LucaErrorSeverity.LOW,
        code: 'TEST',
        message: 'Test'
      });
      const regularError = new Error('Regular error');

      expect(LucaErrorHandler.isLucaError(lucaError)).toBe(true);
      expect(LucaErrorHandler.isLucaError(regularError)).toBe(false);
    });

    test('identifies validation errors', () => {
      const validationError = new LucaValidationError([]);
      const regularError = new Error('Regular error');

      expect(LucaErrorHandler.isValidationError(validationError)).toBe(true);
      expect(LucaErrorHandler.isValidationError(regularError)).toBe(false);
    });

    test('extracts error info for logging', () => {
      const lucaError = new LucaError({
        type: LucaErrorType.VALIDATION_ERROR,
        severity: LucaErrorSeverity.LOW,
        code: 'TEST',
        message: 'Test error'
      });

      const info = LucaErrorHandler.getErrorInfo(lucaError);
      expect(info.name).toBe('LucaError');
      expect(info.message).toBe('Test error');
      expect(info.type).toBe(LucaErrorType.VALIDATION_ERROR);
      expect(info.code).toBe('TEST');
    });
  });

  describe('Validator integration', () => {
    test('validateOrThrow succeeds with valid data', () => {
      const transaction = createTestTransaction();

      expect(() => {
        lucaValidator.validateOrThrow('transaction', transaction);
      }).not.toThrow();
    });

    test('validateOrThrow throws LucaValidationError with invalid data', () => {
      const invalidTransaction = createTestTransaction({ amount: 100.5 }); // decimal not allowed

      expect(() => {
        lucaValidator.validateOrThrow('transaction', invalidTransaction, {
          userId: '123'
        });
      }).toThrow(LucaValidationError);

      try {
        lucaValidator.validateOrThrow('transaction', invalidTransaction, {
          userId: '123'
        });
      } catch (error) {
        expect(LucaErrorHandler.isValidationError(error)).toBe(true);
        if (LucaErrorHandler.isValidationError(error)) {
          expect(error.field).toBe('amount');
          expect(error.suggestion).toContain(
            'Convert decimal amount to integer cents'
          );
          expect(error.context?.schema).toBe('transaction');
          expect(error.context?.userId).toBe('123');
        }
      }
    });

    test('validateOrThrow throws error for non-existent schema', () => {
      expect(() => {
        lucaValidator.validateOrThrow('nonExistentSchema' as any, {});
      }).toThrow();

      try {
        lucaValidator.validateOrThrow('nonExistentSchema' as any, {});
      } catch (error) {
        expect(LucaErrorHandler.isLucaError(error)).toBe(true);
        if (LucaErrorHandler.isLucaError(error)) {
          expect(error.type).toBe(LucaErrorType.SCHEMA_ERROR);
          expect(error.code).toBe('INVALID_SCHEMA');
        }
      }
    });
  });

  describe('Error suggestions', () => {
    test('provides helpful suggestion for decimal amount error', () => {
      const transaction = createTestTransaction({ amount: 100.5 });

      try {
        lucaValidator.validateOrThrow('transaction', transaction);
      } catch (error) {
        if (LucaErrorHandler.isValidationError(error)) {
          expect(error.suggestion).toBe(
            'Convert decimal amount to integer cents (e.g., 100.50 → 10050)'
          );
        }
      }
    });

    test('provides helpful suggestion for UUID format error', () => {
      const transaction = createTestTransaction({ id: 'invalid-uuid' });

      try {
        lucaValidator.validateOrThrow('transaction', transaction);
      } catch (error) {
        if (LucaErrorHandler.isValidationError(error)) {
          expect(error.suggestion).toBe(
            'Provide a valid UUID (e.g., "123e4567-e89b-12d3-a456-426614174000")'
          );
        }
      }
    });

    test('provides helpful suggestion for missing required field', () => {
      const invalidData = { ...createTestTransaction() };
      delete (invalidData as any).amount;

      try {
        lucaValidator.validateOrThrow('transaction', invalidData);
      } catch (error) {
        if (LucaErrorHandler.isValidationError(error)) {
          expect(error.suggestion).toBe('The field "amount" is required');
        }
      }
    });

    test('provides helpful suggestion for minimum value error', () => {
      const mockError = {
        keyword: 'minimum',
        params: { limit: 0 }
      } as any;
      const suggestion = generateSuggestion(mockError, -100);
      expect(suggestion).toBe('Value must be at least 0');
    });

    test('provides helpful suggestion for maximum value error', () => {
      const mockError = {
        keyword: 'maximum',
        params: { limit: 1000000 }
      } as any;
      const suggestion = generateSuggestion(mockError, 2000000);
      expect(suggestion).toBe('Value must be at most 1000000');
    });

    test('provides helpful suggestion for enum error', () => {
      const mockError = {
        keyword: 'enum',
        params: { allowedValues: ['PENDING', 'COMPLETED', 'CANCELLED'] }
      } as any;
      const suggestion = generateSuggestion(mockError, 'INVALID');
      expect(suggestion).toBe(
        'Value must be one of: PENDING, COMPLETED, CANCELLED'
      );
    });

    test('handles unknown error types gracefully', () => {
      const mockError = {
        keyword: 'unknown',
        params: {}
      } as any;
      const suggestion = generateSuggestion(mockError, 'value');
      expect(suggestion).toBeUndefined();
    });

    test('handles missing error object', () => {
      const suggestion = generateSuggestion(null as any, 'value');
      expect(suggestion).toBeUndefined();
    });

    test('handles type error with non-integer type', () => {
      const mockError = {
        keyword: 'type',
        params: { type: 'string' }
      } as any;
      const suggestion = generateSuggestion(mockError, 123);
      expect(suggestion).toBe('Expected string but received number');
    });

    test('handles date format error', () => {
      const mockError = {
        keyword: 'format',
        params: { format: 'date' }
      } as any;
      const suggestion = generateSuggestion(mockError, 'invalid-date');
      expect(suggestion).toBe(
        'Provide a valid date in YYYY-MM-DD format (e.g., "2024-01-01")'
      );
    });

    test('handles format error with unknown format', () => {
      const mockError = {
        keyword: 'format',
        params: { format: 'email' }
      } as any;
      const suggestion = generateSuggestion(mockError, 'invalid');
      expect(suggestion).toBe('Expected format: email');
    });

    test('handles integer type with integer value', () => {
      const mockError = {
        keyword: 'type',
        params: { type: 'integer' }
      } as any;
      const suggestion = generateSuggestion(mockError, 100);
      expect(suggestion).toBe('Expected integer but received number');
    });

    test('handles enum error with non-array allowedValues', () => {
      const mockError = {
        keyword: 'enum',
        params: { allowedValues: 'not-an-array' }
      } as any;
      const suggestion = generateSuggestion(mockError, 'value');
      expect(suggestion).toBe('Value must be one of: specified values');
    });
  });
});
