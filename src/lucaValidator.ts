import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import { AnySchema, ErrorObject } from 'ajv';

import schemas from './schemas';

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
   * Last validation errors
   */
  errors: ValidationError[] | null;
}

const lucaValidator = new Ajv2020();
addFormats(lucaValidator);

// Validate and add schemas
Object.entries(schemas).forEach(([key, schema]) => {
  if (!lucaValidator.validateSchema(schema as AnySchema)) {
    console.error(`Invalid schema: ${key}`);
    console.error(lucaValidator.errors);
  } else {
    lucaValidator.addSchema(schema as AnySchema, key);
  }
});

export default lucaValidator as LucaValidator;

// Add test utilities
export const createTestTransaction = (overrides = {}): Transaction => ({
  id: 'test-id',
  payorId: 'test-payor',
  payeeId: 'test-payee',
  amount: 100,
  // ... other defaults
  ...overrides
});

// Add custom error types
export class SchemaValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super('Schema validation failed');
  }
} 