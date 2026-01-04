const SchemasEnum = Object.freeze({
  ACCOUNT: 'account',
  CATEGORY: 'category',
  LUCASCHEMA: 'lucaSchema',
  RECURRING_TRANSACTION: 'recurringTransaction',
  RECURRING_TRANSACTION_EVENT: 'recurringTransactionEvent',
  TRANSACTION: 'transaction',
  TRANSACTION_SPLIT: 'transactionSplit'
});

const TransactionStateEnum = Object.freeze({
  PLANNED: 'PLANNED',
  ON_DECK: 'ON_DECK',
  SCHEDULED: 'SCHEDULED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED',
  DISPUTED: 'DISPUTED',
  REFUNDED: 'REFUNDED',
  DELETED: 'DELETED'
});

const AccountTypeEnum = Object.freeze({
  CHECKING: 'CHECKING',
  SAVINGS: 'SAVINGS',
  CREDIT_CARD: 'CREDIT_CARD',
  EXTERNAL: 'EXTERNAL'
});

const RecurringTransactionFrequencyEnum = Object.freeze({
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR'
});

const RecurringTransactionStateEnum = Object.freeze({
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
});

const RecurringTransactionEventStatusEnum = Object.freeze({
  MODIFIED: 'MODIFIED',
  DELETED: 'DELETED'
});

export type SchemaType = (typeof SchemasEnum)[keyof typeof SchemasEnum];
export type TransactionState =
  (typeof TransactionStateEnum)[keyof typeof TransactionStateEnum];
export type AccountType =
  (typeof AccountTypeEnum)[keyof typeof AccountTypeEnum];
export type RecurringTransactionFrequency =
  (typeof RecurringTransactionFrequencyEnum)[keyof typeof RecurringTransactionFrequencyEnum];
export type RecurringTransactionState =
  (typeof RecurringTransactionStateEnum)[keyof typeof RecurringTransactionStateEnum];
export type RecurringTransactionEventStatus =
  (typeof RecurringTransactionEventStatusEnum)[keyof typeof RecurringTransactionEventStatusEnum];

const enums = {
  AccountTypeEnum,
  RecurringTransactionFrequencyEnum,
  RecurringTransactionStateEnum,
  RecurringTransactionEventStatusEnum,
  SchemasEnum,
  TransactionStateEnum
} as const;

export default enums;
