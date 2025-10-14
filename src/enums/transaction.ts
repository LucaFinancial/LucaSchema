/**
 * Transaction enumeration definitions
 * Runtime enums for transaction-related constants
 */

// Import types for satisfies constraints
import type { TransactionState } from '../types';

/**
 * Transaction state enumeration for tracking transaction lifecycle
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
