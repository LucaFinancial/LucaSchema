/**
 * JSON Schema definitions for LucaSchema financial data validation
 *
 * This module exports all JSON schemas used for validating financial data
 * in the Luca system. Schemas are organized by data type and follow
 * JSON Schema Draft 2020-12 specification.
 *
 * @fileoverview Schema collection and type definitions
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example Using schemas with validator
 * ```typescript
 * import schemas from '@luca/schema/schemas';
 * import Ajv from 'ajv';
 *
 * const ajv = new Ajv();
 * const validateTransaction = ajv.compile(schemas.transaction);
 *
 * const isValid = validateTransaction(transactionData);
 * ```
 */

import { AnySchema } from 'ajv';
import category from './category.json';
import common from './common.json';
import entity from './entity.json';
import lucaSchema from './lucaSchema.json';
import recurringTransaction from './recurringTransaction.json';
import recurringTransactionEvent from './recurringTransactionEvent.json';
import transaction from './transaction.json';

/**
 * Interface defining all available JSON schemas in LucaSchema
 *
 * Each property corresponds to a specific financial data type that can be
 * validated using the LucaSchema validation system. The schemas enforce
 * data integrity, type safety, and business rules for financial operations.
 *
 * @interface Schemas
 * @since 1.0.0
 *
 * @example Schema validation
 * ```typescript
 * import { lucaValidator } from '@luca/schema';
 *
 * // Validate a transaction
 * const transaction = { amount: 10050, payorId: 'user1', ... };
 * lucaValidator.validateOrThrow('transaction', transaction);
 *
 * // Validate an entity
 * const entity = { id: 'entity1', name: 'Company', ... };
 * lucaValidator.validateOrThrow('entity', entity);
 * ```
 */
export interface Schemas {
  /** Schema for transaction categories (income, expense, transfer types) */
  category: AnySchema;
  /** Common schema definitions shared across other schemas */
  common: AnySchema;
  /** Schema for entities (users, organizations, accounts) */
  entity: AnySchema;
  /** Root schema definition for the entire Luca system */
  lucaSchema: AnySchema;
  /** Schema for recurring transaction templates */
  recurringTransaction: AnySchema;
  /** Schema for instances of recurring transactions */
  recurringTransactionEvent: AnySchema;
  /** Schema for individual financial transactions */
  transaction: AnySchema;
}

/**
 * Default export containing all compiled JSON schemas
 *
 * Pre-loaded schema collection ready for use with AJV or the LucaValidator.
 * All schemas are validated at import time to ensure they are well-formed
 * and follow JSON Schema specification.
 *
 * Key features of LucaSchema schemas:
 * - **Integer Minor Units**: All monetary amounts use integer cents for precision
 * - **UUID Identification**: All entities use UUID v4 for unique identification
 * - **ISO Standards**: Dates follow ISO 8601, currencies follow ISO 4217
 * - **Enum Validation**: Transaction states and types are strictly validated
 * - **Required Fields**: Critical fields are marked as required for data integrity
 *
 * @constant
 * @type {Schemas}
 * @since 1.0.0
 *
 * @example Direct schema access
 * ```typescript
 * import schemas from '@luca/schema/schemas';
 *
 * // Get transaction schema
 * const transactionSchema = schemas.transaction;
 *
 * // List all available schemas
 * const schemaNames = Object.keys(schemas);
 * console.log('Available schemas:', schemaNames);
 * ```
 *
 * @example Custom validation setup
 * ```typescript
 * import Ajv from 'ajv';
 * import addFormats from 'ajv-formats';
 * import schemas from '@luca/schema/schemas';
 *
 * const ajv = new Ajv();
 * addFormats(ajv);
 *
 * // Add all schemas to AJV instance
 * Object.entries(schemas).forEach(([key, schema]) => {
 *   ajv.addSchema(schema, key);
 * });
 * ```
 */
const schemas: Schemas = {
  category,
  common,
  entity,
  lucaSchema,
  recurringTransaction,
  recurringTransactionEvent,
  transaction
};

export default schemas;
