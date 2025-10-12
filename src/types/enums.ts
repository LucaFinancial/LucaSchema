export type SchemaType =
  | 'category'
  | 'entity'
  | 'lucaSchema'
  | 'recurringTransaction'
  | 'recurringTransactionEvent'
  | 'transaction';

export type TransactionState =
  | 'PLANNED'
  | 'SCHEDULED'
  | 'PENDING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'FAILED'
  | 'DISPUTED'
  | 'REFUNDED'
  | 'TENTATIVE'
  | 'UPCOMING'
  | 'DELETED';

export type CategoryType = 'DEFAULT' | 'MODIFIED' | 'CUSTOM';

export type EntityType =
  | 'ACCOUNT'
  | 'RETAILER'
  | 'SERVICE'
  | 'INDIVIDUAL'
  | 'UTILITY'
  | 'GOVERNMENT';

export type EntityStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED'
  | 'DELETED'
  | 'CLOSED';

export type RecurringTransactionFrequency = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export type RecurringTransactionState =
  | 'ACTIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'CANCELLED';

export type RecurringTransactionEventStatus = 'MODIFIED' | 'DELETED';
