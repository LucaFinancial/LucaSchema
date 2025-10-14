// Import all types for controlled re-export
import type { Account, AccountType } from './account';
import type { Entity, EntityType, EntityStatus } from './entity';
import type {
  Transaction,
  TransactionState,
  TransactionSide
} from './transaction';
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
  Account,
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
  TransactionSide,
  CategoryType,
  RecurringTransactionFrequency,
  RecurringTransactionState,
  RecurringTransactionEventStatus,
  SchemaType
};

// Main schema interface
export interface LucaSchema {
  schemaVersion: string;
  accounts: Account[];
  entities: Entity[];
  categories: Category[];
  transactions: Transaction[];
  recurringTransactions: RecurringTransaction[];
  recurringTransactionEvents: RecurringTransactionEvent[];
}
