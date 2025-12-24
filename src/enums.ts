import {
  SchemaType,
  TransactionState,
  AccountType,
  RecurringTransactionFrequency,
  RecurringTransactionState,
  RecurringTransactionEventStatus
} from './types/enums';

const SchemasEnum: Record<string, SchemaType> = Object.freeze({
  ACCOUNT: 'account',
  CATEGORY: 'category',
  LUCASCHEMA: 'lucaSchema',
  RECURRING_TRANSACTION: 'recurringTransaction',
  RECURRING_TRANSACTION_EVENT: 'recurringTransactionEvent',
  TRANSACTION: 'transaction',
  TRANSACTION_SPLIT: 'transactionSplit'
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

const AccountTypeEnum: Record<string, AccountType> = Object.freeze({
  CHECKING: 'CHECKING',
  SAVINGS: 'SAVINGS',
  CREDIT_CARD: 'CREDIT_CARD',
  EXTERNAL: 'EXTERNAL'
});

const RecurringTransactionFrequencyEnum: Record<
  string,
  RecurringTransactionFrequency
> = Object.freeze({
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR'
});

const RecurringTransactionStateEnum: Record<string, RecurringTransactionState> =
  Object.freeze({
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
  });

const RecurringTransactionEventStatusEnum: Record<
  string,
  RecurringTransactionEventStatus
> = Object.freeze({
  MODIFIED: 'MODIFIED',
  DELETED: 'DELETED'
});

const enums = {
  AccountTypeEnum,
  RecurringTransactionFrequencyEnum,
  RecurringTransactionStateEnum,
  RecurringTransactionEventStatusEnum,
  SchemasEnum,
  TransactionStateEnum
} as const;

export default enums;
