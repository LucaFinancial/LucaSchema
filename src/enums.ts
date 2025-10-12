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
 * @deprecated Use EntityType string literals directly instead of EntityTypeEnum
 * @example
 * // Instead of: enums.EntityTypeEnum.ACCOUNT
 * // Use: 'ACCOUNT' or import { EntityType } from '@luca-financial/luca-schema/types'
 */
export const EntityTypeEnum = {
  ACCOUNT: 'ACCOUNT',
  RETAILER: 'RETAILER',
  SERVICE: 'SERVICE',
  INDIVIDUAL: 'INDIVIDUAL',
  UTILITY: 'UTILITY',
  GOVERNMENT: 'GOVERNMENT'
} as const satisfies Record<string, EntityType>;

/**
 * @deprecated Use EntityStatus string literals directly instead of EntityStatusEnum
 */
export const EntityStatusEnum = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED',
  CLOSED: 'CLOSED'
} as const satisfies Record<string, EntityStatus>;

/**
 * @deprecated Use TransactionState string literals directly instead of TransactionStateEnum
 */
export const TransactionStateEnum = {
  PLANNED: 'PLANNED',
  SCHEDULED: 'SCHEDULED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED',
  DISPUTED: 'DISPUTED',
  REFUNDED: 'REFUNDED',
  TENTATIVE: 'TENTATIVE',
  UPCOMING: 'UPCOMING',
  DELETED: 'DELETED'
} as const satisfies Record<string, TransactionState>;

/**
 * @deprecated Use CategoryType string literals directly instead of CategoryTypeEnum
 */
export const CategoryTypeEnum = {
  DEFAULT: 'DEFAULT',
  MODIFIED: 'MODIFIED',
  CUSTOM: 'CUSTOM'
} as const satisfies Record<string, CategoryType>;

/**
 * @deprecated Use RecurringTransactionFrequency string literals directly instead of RecurringTransactionFrequencyEnum
 */
export const RecurringTransactionFrequencyEnum = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR'
} as const satisfies Record<string, RecurringTransactionFrequency>;

/**
 * @deprecated Use RecurringTransactionState string literals directly instead of RecurringTransactionStateEnum
 */
export const RecurringTransactionStateEnum = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const satisfies Record<string, RecurringTransactionState>;

/**
 * @deprecated Use RecurringTransactionEventStatus string literals directly instead of RecurringTransactionEventStatusEnum
 */
export const RecurringTransactionEventStatusEnum = {
  MODIFIED: 'MODIFIED',
  DELETED: 'DELETED'
} as const satisfies Record<string, RecurringTransactionEventStatus>;

/**
 * @deprecated Use SchemaType string literals directly instead of SchemasEnum
 */
export const SchemasEnum = {
  CATEGORY: 'category',
  ENTITY: 'entity',
  LUCASCHEMA: 'lucaSchema',
  RECURRING_TRANSACTION: 'recurringTransaction',
  RECURRING_TRANSACTION_EVENT: 'recurringTransactionEvent',
  TRANSACTION: 'transaction'
} as const satisfies Record<string, SchemaType>;

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
