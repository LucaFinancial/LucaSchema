// Import all types for controlled re-export
import type { Entity, EntityType, EntityStatus } from './entity';
import type { Transaction, TransactionState } from './transaction';
import type { Category, CategoryType } from './category';
import type {
  RecurringTransaction,
  RecurringTransactionEvent,
  RecurringTransactionFrequency,
  RecurringTransactionState,
  RecurringTransactionEventStatus
} from './recurring';
import type { SchemaType } from './schema';

// Export interfaces
export type {
  Entity,
  Transaction,
  Category,
  RecurringTransaction,
  RecurringTransactionEvent
};

// Export types
export type {
  EntityType,
  EntityStatus,
  TransactionState,
  CategoryType,
  RecurringTransactionFrequency,
  RecurringTransactionState,
  RecurringTransactionEventStatus,
  SchemaType
};

// Main schema interface
export interface LucaSchema {
  schemaVersion: string;
  entities: Entity[];
  categories: Category[];
  transactions: Transaction[];
  recurringTransactions: RecurringTransaction[];
  recurringTransactionEvents: RecurringTransactionEvent[];
}
