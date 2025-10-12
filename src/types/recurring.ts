// Recurring transaction types and enums

export const RecurringTransactionFrequencyEnum = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR'
} as const;

export const RecurringTransactionStateEnum = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const;

export const RecurringTransactionEventStatusEnum = {
  MODIFIED: 'MODIFIED',
  DELETED: 'DELETED'
} as const;

// Extract types from runtime enums
export type RecurringTransactionFrequency =
  (typeof RecurringTransactionFrequencyEnum)[keyof typeof RecurringTransactionFrequencyEnum];
export type RecurringTransactionState =
  (typeof RecurringTransactionStateEnum)[keyof typeof RecurringTransactionStateEnum];
export type RecurringTransactionEventStatus =
  (typeof RecurringTransactionEventStatusEnum)[keyof typeof RecurringTransactionEventStatusEnum];

// Recurring transaction interface
export interface RecurringTransaction {
  id: string;
  payorId: string;
  payeeId: string;
  categoryId: string | null;
  amount: number;
  description: string;
  frequency: RecurringTransactionFrequency;
  interval: number;
  occurrences: number | null;
  startOn: string;
  endOn: string | null;
  recurringTransactionState: RecurringTransactionState;
  createdAt: string;
  updatedAt: string | null;
}

// Recurring transaction event interface
export interface RecurringTransactionEvent {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  transactionId: string | null;
  recurringTransactionId: string;
  expectedDate: string;
  eventState: RecurringTransactionEventStatus;
}
