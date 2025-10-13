/**
 * Enhanced error handling utilities for LucaSchema
 */

import type { ValidationError } from './lucaValidator';

/**
 * Categories of errors that can occur in LucaSchema
 */
export enum LucaErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SCHEMA_ERROR = 'SCHEMA_ERROR',
  TYPE_ERROR = 'TYPE_ERROR',
  RUNTIME_ERROR = 'RUNTIME_ERROR'
}

/**
 * Severity levels for errors
 */
export enum LucaErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

/**
 * Enhanced error information
 */
export interface LucaErrorDetails {
  type: LucaErrorType;
  severity: LucaErrorSeverity;
  code: string;
  message: string;
  field?: string;
  value?: unknown;
  suggestion?: string;
  context?: Record<string, unknown>;
}

/**
 * Main error class for LucaSchema
 */
export class LucaError extends Error {
  public readonly type: LucaErrorType;
  public readonly severity: LucaErrorSeverity;
  public readonly code: string;
  public readonly field?: string;
  public readonly value?: unknown;
  public readonly suggestion?: string;
  public readonly context?: Record<string, unknown>;

  constructor(details: LucaErrorDetails) {
    super(details.message);
    this.name = 'LucaError';
    this.type = details.type;
    this.severity = details.severity;
    this.code = details.code;
    this.field = details.field;
    this.value = details.value;
    this.suggestion = details.suggestion;
    this.context = details.context;
  }

  /**
   * Convert to a plain object for serialization
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      severity: this.severity,
      code: this.code,
      field: this.field,
      value: this.value,
      suggestion: this.suggestion,
      context: this.context,
      stack: this.stack
    };
  }
}

/**
 * Validation-specific error class
 */
export class LucaValidationError extends LucaError {
  public readonly validationErrors: ValidationError[];

  constructor(
    validationErrors: ValidationError[],
    context?: Record<string, unknown>
  ) {
    const primaryError = validationErrors[0];
    const field =
      primaryError?.instancePath?.replace(/^\//, '') ||
      primaryError?.schemaPath ||
      'unknown';

    // Extract the actual value from the data using the field path
    let actualValue: unknown = undefined;
    if (context?.data && field && field !== 'unknown') {
      try {
        actualValue = (context.data as any)[field];
      } catch {
        // Ignore errors accessing the field
      }
    }

    super({
      type: LucaErrorType.VALIDATION_ERROR,
      severity: LucaErrorSeverity.MEDIUM,
      code: 'VALIDATION_FAILED',
      message: formatValidationMessage(validationErrors),
      field,
      value: actualValue,
      suggestion: generateSuggestion(primaryError, actualValue),
      context
    });

    this.name = 'LucaValidationError';
    this.validationErrors = validationErrors;
  }
}

/**
 * Format validation errors into user-friendly messages
 */
function formatValidationMessage(errors: ValidationError[]): string {
  if (errors.length === 0) return 'Validation failed';

  if (errors.length === 1) {
    const error = errors[0];
    const field = error.instancePath?.replace(/^\//, '') || 'field';
    return `${field}: ${error.message}`;
  }

  return `Validation failed with ${errors.length} errors: ${errors
    .map(err => {
      const field = err.instancePath?.replace(/^\//, '') || 'field';
      return `${field}: ${err.message}`;
    })
    .join(', ')}`;
}

/**
 * Generate helpful suggestions based on validation errors
 * @internal - Exported for testing purposes
 */
export function generateSuggestion(
  error: ValidationError,
  actualValue?: unknown
): string | undefined {
  if (!error) return undefined;

  switch (error.keyword) {
    case 'type':
      if (error.params?.type === 'integer') {
        if (typeof actualValue === 'number' && !Number.isInteger(actualValue)) {
          return 'Convert decimal amount to integer cents (e.g., 100.50 → 10050)';
        }
        return `Expected integer but received ${typeof actualValue}`;
      }
      return `Expected ${error.params?.type} but received ${typeof actualValue}`;

    case 'format':
      if (error.params?.format === 'uuid') {
        return 'Provide a valid UUID (e.g., "123e4567-e89b-12d3-a456-426614174000")';
      }
      if (error.params?.format === 'date') {
        return 'Provide a valid date in YYYY-MM-DD format (e.g., "2024-01-01")';
      }
      return `Expected format: ${error.params?.format}`;

    case 'required':
      return `The field "${error.params?.missingProperty}" is required`;

    case 'minimum':
      return `Value must be at least ${error.params?.limit}`;

    case 'maximum':
      return `Value must be at most ${error.params?.limit}`;

    case 'enum':
      const allowedValues = (error.params as any)?.allowedValues;
      return `Value must be one of: ${Array.isArray(allowedValues) ? allowedValues.join(', ') : 'specified values'}`;

    default:
      return undefined;
  }
}

/**
 * Error handler utility functions
 */
export class LucaErrorHandler {
  /**
   * Convert AJV validation errors to LucaValidationError
   */
  static fromValidationErrors(
    errors: ValidationError[],
    context?: Record<string, unknown>
  ): LucaValidationError {
    return new LucaValidationError(errors, context);
  }

  /**
   * Create a schema error
   */
  static createSchemaError(
    message: string,
    schemaKey?: string,
    context?: Record<string, unknown>
  ): LucaError {
    return new LucaError({
      type: LucaErrorType.SCHEMA_ERROR,
      severity: LucaErrorSeverity.HIGH,
      code: 'INVALID_SCHEMA',
      message,
      field: schemaKey,
      context
    });
  }

  /**
   * Create a type error
   */
  static createTypeError(
    message: string,
    field?: string,
    expectedType?: string,
    actualValue?: unknown
  ): LucaError {
    return new LucaError({
      type: LucaErrorType.TYPE_ERROR,
      severity: LucaErrorSeverity.MEDIUM,
      code: 'TYPE_MISMATCH',
      message,
      field,
      value: actualValue,
      suggestion: expectedType ? `Expected type: ${expectedType}` : undefined
    });
  }

  /**
   * Create a runtime error
   */
  static createRuntimeError(
    message: string,
    code: string = 'RUNTIME_ERROR',
    context?: Record<string, unknown>
  ): LucaError {
    return new LucaError({
      type: LucaErrorType.RUNTIME_ERROR,
      severity: LucaErrorSeverity.HIGH,
      code,
      message,
      context
    });
  }

  /**
   * Check if an error is a LucaError
   */
  static isLucaError(error: unknown): error is LucaError {
    return error instanceof LucaError;
  }

  /**
   * Check if an error is a validation error
   */
  static isValidationError(error: unknown): error is LucaValidationError {
    return error instanceof LucaValidationError;
  }

  /**
   * Extract meaningful error information for logging/debugging
   */
  static getErrorInfo(error: unknown): Record<string, unknown> {
    if (LucaErrorHandler.isLucaError(error)) {
      return error.toJSON();
    }

    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }

    return {
      error: String(error)
    };
  }
}
