import {
  SchemaType,
  TransactionState,
  CategoryType,
  EntityType,
  EntityStatus,
  RecurringTransactionFrequency,
  RecurringTransactionState,
  RecurringTransactionEventStatus
} from './types/enums';

const SchemasEnum: Record<string, SchemaType> = Object.freeze({
  CATEGORY: 'category',
  ENTITY: 'entity',
  LUCASCHEMA: 'lucaSchema',
  RECURRING_TRANSACTION: 'recurringTransaction',
  RECURRING_TRANSACTION_EVENT: 'recurringTransactionEvent',
  TRANSACTION: 'transaction'
});

const TransactionStateEnum: Record<string, TransactionState> = Object.freeze({
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
});

const CategoryTypeEnum: Record<string, CategoryType> = Object.freeze({
  DEFAULT: 'DEFAULT',
  MODIFIED: 'MODIFIED',
  CUSTOM: 'CUSTOM'
});

const EntityTypeEnum: Record<string, EntityType> = Object.freeze({
  ACCOUNT: 'ACCOUNT',
  RETAILER: 'RETAILER',
  SERVICE: 'SERVICE',
  INDIVIDUAL: 'INDIVIDUAL',
  UTILITY: 'UTILITY',
  GOVERNMENT: 'GOVERNMENT'
});

const EntityStatusEnum: Record<string, EntityStatus> = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED',
  CLOSED: 'CLOSED'
});

const RecurringTransactionFrequencyEnum: Record<string, RecurringTransactionFrequency> = Object.freeze({
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR'
});

const RecurringTransactionStateEnum: Record<string, RecurringTransactionState> = Object.freeze({
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
});

const RecurringTransactionEventStatusEnum: Record<string, RecurringTransactionEventStatus> = Object.freeze({
  MODIFIED: 'MODIFIED',
  DELETED: 'DELETED'
});

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