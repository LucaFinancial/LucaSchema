import { AnySchema, ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import Ajv2020 from 'ajv/dist/2020';

import { LucaErrorHandler } from './errorHandling';
import schemas from './schemas';
import type { Transaction } from './types';

/**
 * Schema validation errors extending AJV's ErrorObject with required properties
 *
 * @interface ValidationError
 * @extends {ErrorObject}
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * const error: ValidationError = {
 *   keyword: 'type',
 *   instancePath: '/amount',
 *   schemaPath: '#/properties/amount/type',
 *   params: { type: 'integer' },
 *   message: 'must be integer'
 * };
 * ```
 */
export interface ValidationError extends ErrorObject {
  /** Human-readable error message */
  message: string;
  /** Parameters specific to the validation keyword */
  params: Record<string, unknown>;
}

/**
 * Validation result containing success status and optional data/errors
 *
 * @template T - The expected type of validated data
 * @interface ValidationResult
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * const result: ValidationResult<Transaction> = {
 *   valid: true,
 *   data: validTransaction,
 *   errors: null
 * };
 * ```
 */
export interface ValidationResult<T> {
  /** Whether the validation succeeded */
  valid: boolean;
  /** The validated data if validation succeeded */
  data?: T;
  /** Validation errors if validation failed */
  errors?: ValidationError[];
}

/**
 * Function that validates data against a schema with type guards
 *
 * @template T - The expected type after successful validation
 * @interface ValidateFunction
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * const validator = lucaValidator.getSchema<Transaction>('transaction');
 * if (validator && validator(data)) {
 *   // data is now typed as Transaction
 *   console.log(data.amount); // TypeScript knows this exists
 * }
 * ```
 */
export interface ValidateFunction<T> {
  /**
   * Validates data and provides type guard functionality
   * @param data - Data to validate
   * @returns True if data matches schema, false otherwise
   */
  (data: unknown): data is T;
  /** Validation errors from the last validation attempt */
  errors: ValidationError[] | null;
}

/**
 * Main validator interface for Luca Schema validation system
 *
 * Provides a unified interface for validating financial data against JSON schemas
 * with enhanced error reporting and TypeScript type safety.
 *
 * @interface LucaValidator
 * @since 2.0.0
 *
 * @example Basic validation
 * ```typescript
 * import { lucaValidator } from '@luca/schema';
 *
 * const transaction = {
 *   id: 'tx-123',
 *   amount: 10050, // Integer cents (100.50 dollars)
 *   payorId: 'user-1',
 *   payeeId: 'user-2',
 *   date: '2024-01-01',
 *   description: 'Payment'
 * };
 *
 * try {
 *   lucaValidator.validateOrThrow('transaction', transaction);
 *   console.log('Transaction is valid');
 * } catch (error) {
 *   console.error('Validation failed:', error.message);
 * }
 * ```
 *
 * @example Type-safe validation
 * ```typescript
 * const validator = lucaValidator.getSchema<Transaction>('transaction');
 * if (validator && validator(data)) {
 *   // data is now typed as Transaction
 *   console.log(`Amount: ${data.amount} cents`);
 * }
 * ```
 */
export interface LucaValidator {
  /**
   * Retrieves a compiled schema validator by key
   *
   * @template T - The expected type after successful validation
   * @param key - Schema identifier (e.g., 'transaction', 'entity')
   * @returns A validation function with type guards, or undefined if schema not found
   *
   * @example
   * ```typescript
   * const validator = lucaValidator.getSchema<Transaction>('transaction');
   * if (validator) {
   *   const isValid = validator(someData);
   *   if (!isValid) {
   *     console.log('Errors:', validator.errors);
   *   }
   * }
   * ```
   */
  getSchema<T>(key: keyof typeof schemas): ValidateFunction<T> | undefined;

  /**
   * Validates data against a raw JSON schema
   *
   * @template T - The expected type after successful validation
   * @param schema - Raw JSON schema object
   * @param data - Data to validate
   * @returns True if data matches schema, false otherwise
   *
   * @example
   * ```typescript
   * const customSchema = { type: 'object', properties: { name: { type: 'string' } } };
   * const isValid = lucaValidator.validate(customSchema, { name: 'John' });
   * ```
   */
  validate<T>(schema: AnySchema, data: unknown): data is T;

  /**
   * Validates data and throws a structured error on failure
   *
   * Provides enhanced error reporting with contextual information and
   * helpful suggestions for fixing validation issues.
   *
   * @template T - The expected type after successful validation
   * @param key - Schema identifier to validate against
   * @param data - Data to validate
   * @param context - Additional context for error reporting (e.g., userId, requestId)
   * @throws {LucaValidationError} When validation fails with detailed error information
   * @throws {LucaError} When schema is not found
   *
   * @example With context
   * ```typescript
   * try {
   *   lucaValidator.validateOrThrow('transaction', transactionData, {
   *     userId: 'user-123',
   *     operation: 'create'
   *   });
   * } catch (error) {
   *   if (LucaErrorHandler.isValidationError(error)) {
   *     console.log(`Field: ${error.field}`);
   *     console.log(`Suggestion: ${error.suggestion}`);
   *     console.log(`Context: ${JSON.stringify(error.context)}`);
   *   }
   * }
   * ```
   */
  validateOrThrow<T>(
    key: keyof typeof schemas,
    data: unknown,
    context?: Record<string, unknown>
  ): asserts data is T;

  /**
   * Last validation errors from the most recent validation attempt
   *
   * @readonly
   * @example
   * ```typescript
   * const isValid = lucaValidator.validate(schema, data);
   * if (!isValid) {
   *   console.log('Validation errors:', lucaValidator.errors);
   * }
   * ```
   */
  errors: ValidationError[] | null;
}

/**
 * AJV instance configured for JSON Schema Draft 2020-12 with format validation
 *
 * @internal
 * @since 2.0.0
 */
const ajvInstance = new Ajv2020();
addFormats(ajvInstance);

// Validate and add schemas to the AJV instance
Object.entries(schemas).forEach(([key, schema]) => {
  if (!ajvInstance.validateSchema(schema as AnySchema)) {
    throw LucaErrorHandler.createSchemaError(`Invalid schema: ${key}`, key, {
      schema: schema
    });
  }
  ajvInstance.addSchema(schema as AnySchema, key);
});

/**
 * Default Luca Schema validator instance
 *
 * Pre-configured validator with all Luca financial schemas loaded and ready for use.
 * Supports validation of transactions, entities, categories, and recurring transactions.
 *
 * @implements {LucaValidator}
 * @since 2.0.0
 *
 * @example Basic usage
 * ```typescript
 * import lucaValidator from '@luca/schema/validator';
 *
 * // Validate a transaction
 * const transaction = { /* transaction data *\/ };
 * const validator = lucaValidator.getSchema('transaction');
 *
 * if (validator && validator(transaction)) {
 *   console.log('Valid transaction');
 * } else {
 *   console.log('Invalid:', validator?.errors);
 * }
 * ```
 */
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

/**
 * Creates a test transaction with sensible defaults for testing purposes
 *
 * Generates a valid transaction object with all required fields populated.
 * Useful for unit tests, integration tests, and development scenarios.
 *
 * @param overrides - Optional property overrides to customize the transaction
 * @returns A complete Transaction object with test data
 *
 * @example Basic usage
 * ```typescript
 * const transaction = createTestTransaction();
 * // Returns: { id: 'test-id', amount: 10000, payorId: 'test-payor', ... }
 * ```
 *
 * @example With overrides
 * ```typescript
 * const customTransaction = createTestTransaction({
 *   amount: 25000, // $250.00 in cents
 *   description: 'Custom test payment',
 *   payorId: 'custom-payor-id'
 * });
 * ```
 *
 * @example For decimal validation testing
 * ```typescript
 * const invalidTransaction = createTestTransaction({
 *   amount: 100.5 // This will fail validation (should be 10050)
 * });
 * ```
 *
 * @since 2.0.0
 */
export const createTestTransaction = (overrides = {}): Transaction => ({
  id: 'test-id',
  payorId: 'test-payor',
  payeeId: 'test-payee',
  categoryId: null,
  amount: 10000, // $100.00 in integer cents
  date: '2024-01-01',
  description: 'Test transaction',
  transactionState: 'COMPLETED',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: null,
  ...overrides
});

/**
 * Legacy validation error class for backward compatibility
 *
 * @deprecated Use LucaValidationError from errorHandling module instead
 * @since 1.0.0
 *
 * @example Migration
 * ```typescript
 * // Old way (deprecated)
 * throw new SchemaValidationError(errors);
 *
 * // New way (recommended)
 * throw new LucaValidationError(errors, context);
 * ```
 */
export class SchemaValidationError extends Error {
  /**
   * @param errors - Array of validation errors
   */
  constructor(public errors: ValidationError[]) {
    super('Schema validation failed');
  }
}
