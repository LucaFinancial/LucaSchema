export type SchemaType =
  | 'account'
  | 'category'
  | 'lucaSchema'
  | 'recurringTransaction'
  | 'recurringTransactionEvent'
  | 'transaction'
  | 'transactionSplit';

export type TransactionState =
  | 'PLANNED'
  | 'ON_DECK'
  | 'SCHEDULED'
  | 'PENDING'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'FAILED'
  | 'DISPUTED'
  | 'REFUNDED'
  | 'DELETED';

export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'EXTERNAL';

export type RecurringTransactionFrequency = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export type RecurringTransactionState =
  | 'ACTIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'CANCELLED';

export type RecurringTransactionEventStatus = 'MODIFIED' | 'DELETED';
