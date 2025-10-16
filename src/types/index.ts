// Import all types for controlled re-export
import type { Entity, EntityType, EntityStatus, AccountType } from './entity';
import type { Transaction, TransactionState, EntryType } from './transaction';
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
  AccountType,
  EntityType,
  EntityStatus,
  TransactionState,
  EntryType,
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
