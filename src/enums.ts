/**
 * Legacy enum definitions for LucaSchema data types
 *
 * These runtime enums provide backward compatibility for applications that
 * relied on enum objects rather than string literal types. All enums are
 * deprecated in favor of TypeScript string literal types for better type
 * safety and smaller bundle sizes.
 *
 * @fileoverview Deprecated runtime enums for backward compatibility
 * @version 2.0.0
 * @since 1.0.0
 * @deprecated Use string literal types from './types' instead
 *
 * @example Migration from enums to string literals
 * ```typescript
 * // Old way (deprecated)
 * import { enums } from '@luca-financial/luca-schema';
 * const status = enums.TransactionStateEnum.COMPLETED;
 *
 * // New way (recommended)
 * import type { TransactionState } from '@luca-financial/luca-schema/types';
 * const status: TransactionState = 'COMPLETED';
 * ```
 */

// Runtime enums for backward compatibility
import type {
  EntityType,
  EntityStatus,
  TransactionState,
  CategoryType,
  RecurringTransactionFrequency,
  RecurringTransactionState,
  RecurringTransactionEventStatus,
  SchemaType
} from './types';

/**
 * Entity type enumeration for categorizing different kinds of entities
 *
 * Defines the various types of entities that can exist in the Luca financial system,
 * from individual users to corporate accounts and service providers.
 *
 * @deprecated Use EntityType string literals directly instead of EntityTypeEnum
 * @enum {string}
 * @since 1.0.0
 *
 * @example Migration
 * ```typescript
 * // Old way (deprecated)
 * import { enums } from '@luca-financial/luca-schema';
 * const entityType = enums.EntityTypeEnum.ACCOUNT;
 *
 * // New way (recommended)
 * import type { EntityType } from '@luca-financial/luca-schema/types';
 * const entityType: EntityType = 'ACCOUNT';
 * ```
 */
export const EntityTypeEnum = {
  /** Bank account or financial institution account */
  ACCOUNT: 'ACCOUNT',
  /** Retail business or merchant */
  RETAILER: 'RETAILER',
  /** Service provider (utilities, subscriptions, etc.) */
  SERVICE: 'SERVICE',
  /** Individual person or sole proprietor */
  INDIVIDUAL: 'INDIVIDUAL',
  /** Utility company (electricity, water, gas, etc.) */
  UTILITY: 'UTILITY',
  /** Government agency or tax authority */
  GOVERNMENT: 'GOVERNMENT'
} as const satisfies Record<string, EntityType>;

/**
 * Entity status enumeration for tracking entity lifecycle states
 *
 * Defines the various states an entity can be in throughout its lifecycle,
 * from active operation to deletion and closure.
 *
 * @deprecated Use EntityStatus string literals directly instead of EntityStatusEnum
 * @enum {string}
 * @since 1.0.0
 *
 * @example Status workflow
 * ```typescript
 * // Entity lifecycle
 * let status: EntityStatus = 'ACTIVE';      // Normal operation
 * status = 'SUSPENDED';                      // Temporarily disabled
 * status = 'CLOSED';                         // Permanently closed
 * ```
 */
export const EntityStatusEnum = {
  /** Entity is active and operational */
  ACTIVE: 'ACTIVE',
  /** Entity is inactive but can be reactivated */
  INACTIVE: 'INACTIVE',
  /** Entity is temporarily suspended */
  SUSPENDED: 'SUSPENDED',
  /** Entity is marked for deletion */
  DELETED: 'DELETED',
  /** Entity is permanently closed */
  CLOSED: 'CLOSED'
} as const satisfies Record<string, EntityStatus>;

/**
 * Transaction state enumeration for tracking transaction lifecycle
 *
 * Defines all possible states a transaction can be in throughout its
 * processing lifecycle, from initial planning to final completion or failure.
 *
 * @deprecated Use TransactionState string literals directly instead of TransactionStateEnum
 * @enum {string}
 * @since 1.0.0
 *
 * @example Transaction workflow
 * ```typescript
 * // Typical transaction flow
 * let state: TransactionState = 'PLANNED';   // User creates transaction
 * state = 'PENDING';                         // Processing begins
 * state = 'COMPLETED';                       // Successfully processed
 *
 * // Error flow
 * state = 'FAILED';                          // Processing failed
 * state = 'CANCELLED';                       // User cancelled
 * ```
 */
export const TransactionStateEnum = {
  /** Transaction is planned but not yet initiated */
  PLANNED: 'PLANNED',
  /** Transaction is scheduled for future execution */
  SCHEDULED: 'SCHEDULED',
  /** Transaction is being processed */
  PENDING: 'PENDING',
  /** Transaction has been successfully completed */
  COMPLETED: 'COMPLETED',
  /** Transaction was cancelled by user or system */
  CANCELLED: 'CANCELLED',
  /** Transaction processing failed */
  FAILED: 'FAILED',
  /** Transaction is under dispute */
  DISPUTED: 'DISPUTED',
  /** Transaction was refunded */
  REFUNDED: 'REFUNDED',
  /** Transaction is tentative (not yet confirmed) */
  TENTATIVE: 'TENTATIVE',
  /** Transaction is upcoming (scheduled) */
  UPCOMING: 'UPCOMING',
  /** Transaction was deleted */
  DELETED: 'DELETED'
} as const satisfies Record<string, TransactionState>;

/**
 * Category type enumeration for categorizing transaction categories
 *
 * Defines how transaction categories are created and modified within
 * the system, distinguishing between default system categories and
 * user-customized ones.
 *
 * @deprecated Use CategoryType string literals directly instead of CategoryTypeEnum
 * @enum {string}
 * @since 1.0.0
 *
 * @example Category management
 * ```typescript
 * const categoryType: CategoryType = 'DEFAULT';  // System-provided category
 * const customType: CategoryType = 'CUSTOM';     // User-created category
 * ```
 */
export const CategoryTypeEnum = {
  /** Default system-provided category */
  DEFAULT: 'DEFAULT',
  /** Modified version of a default category */
  MODIFIED: 'MODIFIED',
  /** Custom user-created category */
  CUSTOM: 'CUSTOM'
} as const satisfies Record<string, CategoryType>;

/**
 * Recurring transaction frequency enumeration for scheduling repeated transactions
 *
 * Defines the available frequencies for recurring transactions, supporting
 * common billing and payment cycles from daily to yearly intervals.
 *
 * @deprecated Use RecurringTransactionFrequency string literals directly instead of RecurringTransactionFrequencyEnum
 * @enum {string}
 * @since 1.0.0
 *
 * @example Recurring payment setup
 * ```typescript
 * const frequency: RecurringTransactionFrequency = 'MONTH'; // Monthly subscription
 * const dailyFreq: RecurringTransactionFrequency = 'DAY';   // Daily transaction
 * ```
 */
export const RecurringTransactionFrequencyEnum = {
  /** Daily recurring transaction */
  DAY: 'DAY',
  /** Weekly recurring transaction */
  WEEK: 'WEEK',
  /** Monthly recurring transaction */
  MONTH: 'MONTH',
  /** Yearly recurring transaction */
  YEAR: 'YEAR'
} as const satisfies Record<string, RecurringTransactionFrequency>;

/**
 * Recurring transaction state enumeration for managing recurring transaction lifecycle
 *
 * Defines the states a recurring transaction template can be in, controlling
 * whether future transactions will be generated from the template.
 *
 * @deprecated Use RecurringTransactionState string literals directly instead of RecurringTransactionStateEnum
 * @enum {string}
 * @since 1.0.0
 *
 * @example Recurring transaction management
 * ```typescript
 * let state: RecurringTransactionState = 'ACTIVE';    // Generating transactions
 * state = 'PAUSED';                                   // Temporarily stopped
 * state = 'CANCELLED';                                // Permanently stopped
 * ```
 */
export const RecurringTransactionStateEnum = {
  /** Recurring transaction is active and generating events */
  ACTIVE: 'ACTIVE',
  /** Recurring transaction is temporarily paused */
  PAUSED: 'PAUSED',
  /** Recurring transaction has completed its schedule */
  COMPLETED: 'COMPLETED',
  /** Recurring transaction was cancelled */
  CANCELLED: 'CANCELLED'
} as const satisfies Record<string, RecurringTransactionState>;

/**
 * Recurring transaction event status enumeration for tracking event modifications
 *
 * Defines special statuses for individual recurring transaction events that
 * have been modified or deleted from the original recurring template.
 *
 * @deprecated Use RecurringTransactionEventStatus string literals directly instead of RecurringTransactionEventStatusEnum
 * @enum {string}
 * @since 1.0.0
 *
 * @example Event modifications
 * ```typescript
 * const status: RecurringTransactionEventStatus = 'MODIFIED'; // User changed this instance
 * const deleted: RecurringTransactionEventStatus = 'DELETED'; // User deleted this instance
 * ```
 */
export const RecurringTransactionEventStatusEnum = {
  /** Event has been modified from the original template */
  MODIFIED: 'MODIFIED',
  /** Event has been deleted (skipped) */
  DELETED: 'DELETED'
} as const satisfies Record<string, RecurringTransactionEventStatus>;

/**
 * Schema type enumeration for identifying different schema types
 *
 * Defines the available schema identifiers used with the validation system
 * to specify which schema should be used for validation.
 *
 * @deprecated Use SchemaType string literals directly instead of SchemasEnum
 * @enum {string}
 * @since 1.0.0
 *
 * @example Schema validation
 * ```typescript
 * const schemaType: SchemaType = 'transaction'; // Validate as transaction
 * lucaValidator.validateOrThrow(schemaType, data);
 * ```
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

/**
 * Legacy enum collection for backward compatibility
 *
 * Contains all deprecated enum objects in a single namespace for applications
 * that still rely on the old enum-based API. New applications should use
 * string literal types directly.
 *
 * @constant
 * @deprecated Use string literal types from './types' instead
 * @since 1.0.0
 *
 * @example Legacy usage (deprecated)
 * ```typescript
 * import { enums } from '@luca-financial/luca-schema';
 * const state = enums.TransactionStateEnum.COMPLETED;
 * ```
 *
 * @example Modern usage (recommended)
 * ```typescript
 * import type { TransactionState } from '@luca-financial/luca-schema/types';
 * const state: TransactionState = 'COMPLETED';
 * ```
 */
const enums = {
  CategoryTypeEnum,
  EntityTypeEnum,
  EntityStatusEnum,
  RecurringTransactionFrequencyEnum,
  RecurringTransactionStateEnum,
  RecurringTransactionEventStatusEnum,
  SchemasEnum,
  TransactionStateEnum
} as const;

export default enums;
