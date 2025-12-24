import {
  TransactionState,
  AccountType,
  RecurringTransactionFrequency,
  RecurringTransactionState,
  RecurringTransactionEventStatus
} from './enums';

export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string | null;
  amount: number;
  date: string;
  description: string;
  transactionState: TransactionState;
  createdAt: string;
  updatedAt: string | null;
}

export interface TransactionSplit {
  id: string;
  transactionId: string;
  amount: number;
  categoryId: string;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  statementDay: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface RecurringTransaction {
  id: string;
  accountId: string;
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

export interface RecurringTransactionEvent {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  transactionId: string | null;
  recurringTransactionId: string;
  expectedDate: string;
  eventState: RecurringTransactionEventStatus;
}

export interface LucaSchema {
  schemaVersion: string;
  accounts: Account[];
  categories: Category[];
  transactions: Transaction[];
  transactionSplits: TransactionSplit[];
  recurringTransactions: RecurringTransaction[];
  recurringTransactionEvents: RecurringTransactionEvent[];
}

// Main exports
export declare const schemas: Record<string, object>;
export declare const enums: Record<string, Record<string, string>>;
