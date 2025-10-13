import { AnySchema, ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import Ajv2020 from 'ajv/dist/2020';

import { LucaErrorHandler } from './errorHandling';
import schemas from './schemas';
import type { Transaction } from './types';

/**
 * Schema validation errors
 */
export interface ValidationError extends ErrorObject {
  message: string;
  params: Record<string, unknown>;
}

/**
 * Validation result with type information
 */
export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  errors?: ValidationError[];
}

/**
 * Function that validates data against a schema
 */
export interface ValidateFunction<T> {
  (data: unknown): data is T;
  errors: ValidationError[] | null;
}

/**
 * Main validator interface for Luca Schema
 */
export interface LucaValidator {
  /**
   * Get a schema validator by key
   * @param key - Schema key to retrieve
   * @returns A validation function or undefined if schema not found
   */
  getSchema<T>(key: keyof typeof schemas): ValidateFunction<T> | undefined;

  /**
   * Validate data against a schema
   * @param schema - Schema to validate against
   * @param data - Data to validate
   * @returns True if data is valid
   */
  validate<T>(schema: AnySchema, data: unknown): data is T;

  /**
   * Validate data and throw enhanced error on failure
   * @param key - Schema key to validate against
   * @param data - Data to validate
   * @param context - Additional context for error reporting
   * @throws {LucaValidationError} When validation fails
   */
  validateOrThrow<T>(
    key: keyof typeof schemas,
    data: unknown,
    context?: Record<string, unknown>
  ): asserts data is T;

  /**
   * Last validation errors
   */
  errors: ValidationError[] | null;
}

const ajvInstance = new Ajv2020();
addFormats(ajvInstance);

// Validate and add schemas
Object.entries(schemas).forEach(([key, schema]) => {
  if (!ajvInstance.validateSchema(schema as AnySchema)) {
    throw LucaErrorHandler.createSchemaError(`Invalid schema: ${key}`, key, {
      schema: schema
    });
  }
  ajvInstance.addSchema(schema as AnySchema, key);
});

// Create the LucaValidator implementation
const lucaValidator: LucaValidator = {
  getSchema<T>(key: keyof typeof schemas): ValidateFunction<T> | undefined {
    const validate = ajvInstance.getSchema(key);
    if (!validate) return undefined;

    // Wrap AJV validator to match our interface
    const wrappedValidator = (data: unknown): data is T => {
      const result = validate(data);
      const isValid = typeof result === 'boolean' ? result : true; // Handle sync validation
      (wrappedValidator as any).errors = validate.errors as
        | ValidationError[]
        | null;
      return isValid;
    };

    (wrappedValidator as any).errors = null;
    return wrappedValidator as ValidateFunction<T>;
  },

  validate<T>(schema: AnySchema, data: unknown): data is T {
    const result = ajvInstance.validate(schema, data);
    const isValid = typeof result === 'boolean' ? result : true; // Handle sync validation
    this.errors = ajvInstance.errors as ValidationError[] | null;
    return isValid;
  },

  validateOrThrow<T>(
    key: keyof typeof schemas,
    data: unknown,
    context?: Record<string, unknown>
  ): asserts data is T {
    const validator = this.getSchema<T>(key);
    if (!validator) {
      throw LucaErrorHandler.createSchemaError(
        `Schema not found: ${String(key)}`,
        String(key),
        context
      );
    }

    const isValid = validator(data);
    if (!isValid && validator.errors) {
      throw LucaErrorHandler.fromValidationErrors(validator.errors, {
        schema: key,
        data,
        ...context
      });
    }
  },

  errors: null
};

export default lucaValidator;

// Add test utilities
export const createTestTransaction = (overrides = {}): Transaction => ({
  id: 'test-id',
  payorId: 'test-payor',
  payeeId: 'test-payee',
  categoryId: null,
  amount: 10000,
  date: '2024-01-01',
  description: 'Test transaction',
  transactionState: 'COMPLETED',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null,
  ...overrides
});

// Add custom error types
export class SchemaValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super('Schema validation failed');
  }
}
