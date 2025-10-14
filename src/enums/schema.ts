/**
 * Schema enumeration definitions
 * Runtime enums for schema-related constants
 */

// Import types for satisfies constraints
import type { SchemaType } from '../types';

/**
 * Schema type enumeration for identifying different schema types
 */
export const SchemasEnum = {
  /** Category schema identifier */
  CATEGORY: 'category',
  /** Entity schema identifier */
  ENTITY: 'entity',
  /** Root Luca schema identifier */
  LUCASCHEMA: 'lucaSchema',
  /** Recurring transaction schema identifier */
  RECURRING_TRANSACTION: 'recurringTransaction',
  /** Recurring transaction event schema identifier */
  RECURRING_TRANSACTION_EVENT: 'recurringTransactionEvent',
  /** Transaction schema identifier */
  TRANSACTION: 'transaction'
} as const satisfies Record<string, SchemaType>;
