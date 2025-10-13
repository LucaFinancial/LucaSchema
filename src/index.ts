/**
 * LucaSchema - JSON Schema validation library for financial data
 *
 * A comprehensive TypeScript library for validating financial data using JSON Schema.
 * Provides type-safe validation, enhanced error handling, and utility functions
 * for working with monetary values in financial applications.
 *
 * ## Key Features
 *
 * - **Integer Minor Units**: All monetary amounts use integer cents for precision
 * - **Type Safety**: Full TypeScript support with type guards and assertions
 * - **Enhanced Errors**: Intelligent error messages with fix suggestions
 * - **JSON Schema**: Standards-compliant validation using AJV
 * - **Utility Functions**: Conversion between dollars and cents
 * - **Financial Standards**: ISO 4217 currencies, ISO 8601 dates, UUID v4 IDs
 *
 * ## Quick Start
 *
 * ```typescript
 * import { lucaValidator, dollarsToMinorUnits } from '@luca-financial/luca-schema';
 *
 * // Create a transaction
 * const transaction = {
 *   id: crypto.randomUUID(),
 *   amount: dollarsToMinorUnits(125.75), // 12575 cents
 *   payorId: 'user-123',
 *   payeeId: 'merchant-456',
 *   date: '2024-01-01',
 *   description: 'Purchase'
 * };
 *
 * // Validate with enhanced error handling
 * try {
 *   lucaValidator.validateOrThrow('transaction', transaction);
 *   console.log('Transaction is valid!');
 * } catch (error) {
 *   console.error(`Validation failed: ${error.message}`);
 *   if (error.suggestion) {
 *     console.log(`Suggestion: ${error.suggestion}`);
 *   }
 * }
 * ```
 *
 * @fileoverview Main entry point for LucaSchema library
 * @version 2.0.0
 * @since 1.0.0
 * @author Luca Financial
 * @license MIT
 *
 * @see {@link https://github.com/LucaFinancial/LucaSchema} GitHub Repository
 * @see {@link https://json-schema.org/} JSON Schema Specification
 */

import enums from './enums';
import lucaValidator from './lucaValidator';
import schemas from './schemas';

/**
 * Core library exports containing the main validator, schemas, and legacy enums
 *
 * @namespace Core
 */
export {
  /** Pre-configured validator instance with all schemas loaded */
  lucaValidator,
  /** Collection of all JSON schemas for financial data validation */
  schemas,
  /** @deprecated Legacy enum objects for backward compatibility */
  enums
};

/**
 * Utility functions for monetary value conversion and formatting
 *
 * These functions handle conversion between human-readable dollar amounts
 * and the integer cent values used internally for precise calculations.
 *
 * @namespace Utilities
 *
 * @example Converting monetary values
 * ```typescript
 * import { dollarsToMinorUnits, minorUnitsToDollars, formatMinorUnits } from '@luca-financial/luca-schema';
 *
 * // Convert user input to storage format
 * const userAmount = 125.75;
 * const storageValue = dollarsToMinorUnits(userAmount); // 12575
 *
 * // Convert back for display
 * const displayValue = minorUnitsToDollars(storageValue); // 125.75
 * const formatted = formatMinorUnits(storageValue); // "$125.75"
 * ```
 */
export {
  /** Converts dollar amounts to integer cents for precise storage */
  dollarsToMinorUnits,
  /** Converts integer cents back to dollar amounts for display */
  minorUnitsToDollars,
  /** Formats integer cents as localized currency strings */
  formatMinorUnits
} from './utils';

/**
 * Enhanced error handling system with structured errors and intelligent suggestions
 *
 * Provides comprehensive error classes, type guards, and utilities for handling
 * validation failures with helpful context and suggestions for resolution.
 *
 * @namespace ErrorHandling
 *
 * @example Error handling workflow
 * ```typescript
 * import {
 *   LucaErrorHandler,
 *   LucaValidationError,
 *   LucaErrorType
 * } from '@luca-financial/luca-schema';
 *
 * try {
 *   // Some validation operation
 * } catch (error) {
 *   if (LucaErrorHandler.isValidationError(error)) {
 *     console.log(`Field: ${error.field}`);
 *     console.log(`Suggestion: ${error.suggestion}`);
 *     console.log(`Severity: ${error.severity}`);
 *   }
 * }
 * ```
 */
export {
  /** Base error class for all LucaSchema errors */
  LucaError,
  /** Specialized error class for validation failures */
  LucaValidationError,
  /** Utility class for creating and managing errors */
  LucaErrorHandler,
  /** Enumeration of error types for classification */
  LucaErrorType,
  /** Enumeration of error severity levels */
  LucaErrorSeverity,
  /** @internal Function for generating error suggestions (testing only) */
  generateSuggestion,
  /** TypeScript interface for error details structure */
  type LucaErrorDetails
} from './errorHandling';

/**
 * TypeScript type definitions for validation system
 *
 * Core type definitions that provide type safety and IntelliSense support
 * for validation functions and error objects.
 *
 * @namespace Types
 *
 * @example Using validation types
 * ```typescript
 * import type { ValidationError, ValidateFunction } from '@luca-financial/luca-schema';
 *
 * function handleValidation<T>(
 *   validator: ValidateFunction<T>,
 *   data: unknown
 * ): T | ValidationError[] {
 *   if (validator(data)) {
 *     return data; // TypeScript knows data is type T
 *   }
 *   return validator.errors || [];
 * }
 * ```
 */
export type {
  /** AJV validation error object with required properties */
  ValidationError,
  /** Function type for schema validators with type guards */
  ValidateFunction
} from './lucaValidator';
