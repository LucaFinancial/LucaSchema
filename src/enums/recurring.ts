/**
 * Recurring transaction enumeration definitions
 * Runtime enums for recurring transaction-related constants
 */

// Import types for satisfies constraints
import type {
  RecurringTransactionFrequency,
  RecurringTransactionState,
  RecurringTransactionEventStatus
} from '../types';

/**
 * Recurring transaction frequency enumeration for scheduling repeated transactions
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
 */
export const RecurringTransactionEventStatusEnum = {
  /** Event has been modified from the original template */
  MODIFIED: 'MODIFIED',
  /** Event has been deleted (skipped) */
  DELETED: 'DELETED'
} as const satisfies Record<string, RecurringTransactionEventStatus>;
