/**
 * Enhanced error handling utilities for LucaSchema
 *
 * Provides structured error classes, severity levels, and intelligent suggestion
 * generation for schema validation failures and runtime errors.
 *
 * @fileoverview Error handling system for financial data validation
 * @version 2.0.0
 * @since 2.0.0
 *
 * @example Basic error handling
 * ```typescript
 * import { LucaErrorHandler, LucaErrorType } from '@luca/schema';
 *
 * try {
 *   // Some validation operation
 * } catch (error) {
 *   if (LucaErrorHandler.isValidationError(error)) {
 *     console.log(`Field: ${error.field}`);
 *     console.log(`Suggestion: ${error.suggestion}`);
 *   }
 * }
 * ```
 */

import type { ValidationError } from './lucaValidator';

/**
 * Categories of errors that can occur in LucaSchema operations
 *
 * @enum {string}
 * @readonly
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * switch (error.type) {
 *   case LucaErrorType.VALIDATION_ERROR:
 *     // Handle data validation failures
 *     break;
 *   case LucaErrorType.SCHEMA_ERROR:
 *     // Handle schema definition issues
 *     break;
 * }
 * ```
 */
export enum LucaErrorType {
  /** Data failed schema validation */
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  /** Schema definition or compilation error */
  SCHEMA_ERROR = 'SCHEMA_ERROR',
  /** Type mismatch or casting error */
  TYPE_ERROR = 'TYPE_ERROR',
  /** Runtime execution error */
  RUNTIME_ERROR = 'RUNTIME_ERROR'
}

/**
 * Severity levels for error classification and prioritization
 *
 * @enum {string}
 * @readonly
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * if (error.severity === LucaErrorSeverity.CRITICAL) {
 *   // Alert operations team
 *   alertOps(error);
 * } else if (error.severity === LucaErrorSeverity.HIGH) {
 *   // Log for immediate attention
 *   logger.error(error);
 * }
 * ```
 */
export enum LucaErrorSeverity {
  /** Minor issues that don't affect core functionality */
  LOW = 'LOW',
  /** Issues that may impact user experience */
  MEDIUM = 'MEDIUM',
  /** Issues that significantly impact functionality */
  HIGH = 'HIGH',
  /** Issues that prevent core operations */
  CRITICAL = 'CRITICAL'
}

/**
 * Structure for enhanced error information and context
 *
 * @interface LucaErrorDetails
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * const errorDetails: LucaErrorDetails = {
 *   type: LucaErrorType.VALIDATION_ERROR,
 *   severity: LucaErrorSeverity.MEDIUM,
 *   code: 'INVALID_AMOUNT',
 *   message: 'Amount must be a positive integer',
 *   field: 'amount',
 *   value: -100,
 *   suggestion: 'Provide a positive amount in cents',
 *   context: { userId: '123', operation: 'transfer' }
 * };
 * ```
 */
export interface LucaErrorDetails {
  /** Classification of the error type */
  type: LucaErrorType;
  /** Severity level for prioritization */
  severity: LucaErrorSeverity;
  /** Unique error code for programmatic handling */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Field name that caused the error (for validation errors) */
  field?: string;
  /** The invalid value that caused the error */
  value?: unknown;
  /** Helpful suggestion for fixing the error */
  suggestion?: string;
  /** Additional context information */
  context?: Record<string, unknown>;
}

/**
 * Base error class for all LucaSchema errors with enhanced context and metadata
 *
 * Provides structured error information including severity, error codes, field context,
 * and helpful suggestions for resolution. All LucaSchema errors extend this class.
 *
 * @class LucaError
 * @extends {Error}
 * @since 2.0.0
 *
 * @example Creating a custom error
 * ```typescript
 * const error = new LucaError({
 *   type: LucaErrorType.VALIDATION_ERROR,
 *   severity: LucaErrorSeverity.MEDIUM,
 *   code: 'INVALID_CURRENCY',
 *   message: 'Currency code must be ISO 4217 format',
 *   field: 'currency',
 *   value: 'invalid-currency',
 *   suggestion: 'Use a valid currency code like USD, EUR, or GBP',
 *   context: { requestId: 'req-123' }
 * });
 * ```
 *
 * @example Error serialization
 * ```typescript
 * const error = new LucaError(errorDetails);
 * const json = error.toJSON();
 * // Send to logging service or API response
 * logger.error(json);
 * ```
 */
export class LucaError extends Error {
  /** Error classification type */
  public readonly type: LucaErrorType;
  /** Severity level for prioritization */
  public readonly severity: LucaErrorSeverity;
  /** Unique error code for programmatic handling */
  public readonly code: string;
  /** Field name that caused the error (optional) */
  public readonly field?: string;
  /** The invalid value that caused the error (optional) */
  public readonly value?: unknown;
  /** Helpful suggestion for fixing the error (optional) */
  public readonly suggestion?: string;
  /** Additional context information (optional) */
  public readonly context?: Record<string, unknown>;

  /**
   * Creates a new LucaError with the provided details
   *
   * @param details - Complete error information and context
   */
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
   * Converts the error to a plain object for serialization and logging
   *
   * Useful for sending error information to logging services, APIs, or
   * storing in databases while preserving all relevant context.
   *
   * @returns Plain object representation of the error
   *
   * @example
   * ```typescript
   * const error = new LucaError(errorDetails);
   * const errorJson = error.toJSON();
   *
   * // Send to logging service
   * await logService.error(errorJson);
   *
   * // Include in API response
   * res.status(400).json({ error: errorJson });
   * ```
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
 * Specialized error class for schema validation failures with enhanced context
 *
 * Extends LucaError to provide specific handling for JSON schema validation failures.
 * Includes the original AJV validation errors, intelligent suggestion generation,
 * and field-specific context for debugging.
 *
 * @class LucaValidationError
 * @extends {LucaError}
 * @since 2.0.0
 *
 * @example Handling validation errors
 * ```typescript
 * try {
 *   lucaValidator.validateOrThrow('transaction', invalidData);
 * } catch (error) {
 *   if (error instanceof LucaValidationError) {
 *     console.log(`Validation failed for field: ${error.field}`);
 *     console.log(`Suggestion: ${error.suggestion}`);
 *     console.log(`Original errors:`, error.validationErrors);
 *   }
 * }
 * ```
 *
 * @example Manual creation
 * ```typescript
 * const ajvErrors = [
 *   {
 *     keyword: 'type',
 *     instancePath: '/amount',
 *     message: 'must be integer',
 *     params: { type: 'integer' }
 *   }
 * ];
 *
 * const error = new LucaValidationError(ajvErrors, {
 *   data: { amount: 100.5 },
 *   operation: 'create_transaction'
 * });
 * ```
 */
export class LucaValidationError extends LucaError {
  /** Original AJV validation errors that caused this failure */
  public readonly validationErrors: ValidationError[];

  /**
   * Creates a new validation error from AJV validation failures
   *
   * @param validationErrors - Array of AJV validation errors
   * @param context - Additional context including the original data and operation details
   */
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
 * Generates intelligent suggestions for fixing validation errors
 *
 * Analyzes validation errors and the actual invalid values to provide
 * context-aware suggestions for resolving validation failures. Particularly
 * helpful for common issues like decimal amounts that should be integers.
 *
 * @internal - Exported for testing purposes only
 * @param error - The AJV validation error object
 * @param actualValue - The actual invalid value that caused the error
 * @returns A helpful suggestion string, or undefined if no specific suggestion available
 * @since 2.0.0
 *
 * @example Decimal amount detection
 * ```typescript
 * const error = { keyword: 'type', params: { type: 'integer' } };
 * const suggestion = generateSuggestion(error, 100.5);
 * // Returns: "Convert decimal amount to integer cents (e.g., 100.50 → 10050)"
 * ```
 *
 * @example UUID format guidance
 * ```typescript
 * const error = { keyword: 'format', params: { format: 'uuid' } };
 * const suggestion = generateSuggestion(error, 'invalid-uuid');
 * // Returns: "Provide a valid UUID (e.g., "123e4567-e89b-12d3-a456-426614174000")"
 * ```
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
 * Utility class for creating and managing LucaSchema errors
 *
 * Provides static factory methods for creating different types of errors,
 * type guards for error identification, and utilities for error handling
 * and logging. Centralizes error creation logic and ensures consistent
 * error formatting across the library.
 *
 * @class LucaErrorHandler
 * @since 2.0.0
 *
 * @example Creating validation errors
 * ```typescript
 * const ajvErrors = [...]; // AJV validation errors
 * const validationError = LucaErrorHandler.fromValidationErrors(ajvErrors, {
 *   userId: '123',
 *   operation: 'create_transaction'
 * });
 * ```
 *
 * @example Creating schema errors
 * ```typescript
 * const schemaError = LucaErrorHandler.createSchemaError(
 *   'Invalid schema definition',
 *   'transaction',
 *   { version: '2.0.0' }
 * );
 * ```
 *
 * @example Error type checking
 * ```typescript
 * try {
 *   // Some operation
 * } catch (error) {
 *   if (LucaErrorHandler.isValidationError(error)) {
 *     // Handle validation-specific logic
 *   } else if (LucaErrorHandler.isLucaError(error)) {
 *     // Handle other LucaSchema errors
 *   }
 * }
 * ```
 */
export class LucaErrorHandler {
  /**
   * Converts AJV validation errors to a structured LucaValidationError
   *
   * Takes raw AJV validation errors and enhances them with context,
   * field information, and intelligent suggestions for resolution.
   *
   * @param errors - Array of AJV validation errors
   * @param context - Additional context for error enhancement
   * @returns Enhanced validation error with suggestions and context
   *
   * @example
   * ```typescript
   * const ajvErrors = ajv.errors || [];
   * const enhancedError = LucaErrorHandler.fromValidationErrors(ajvErrors, {
   *   schema: 'transaction',
   *   data: originalData,
   *   userId: currentUser.id
   * });
   * ```
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
