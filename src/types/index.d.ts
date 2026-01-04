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
  authorizedAt?: string | null;
  postedAt?: string | null;
  currency?: string | null;
  description: string;
  memo?: string | null;
  counterparty?: string | null;
  aggregationServiceId?: string | null;
  transactionState: TransactionState;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
}

export interface TransactionSplit {
  id: string;
  transactionId: string;
  amount: number;
  categoryId: string | null;
  description?: string | null;
  memo?: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  institution?: string | null;
  aggregationServiceId?: string | null;
  statementClosingDay: number | null;
  paymentDueDate?: string | null;
  creditLimit?: number | null;
  apr?: number | null;
  closedAt?: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
}

export interface RecurringTransaction {
  id: string;
  accountId: string;
  categoryId: string | null;
  amount: number;
  description: string;
  frequency: RecurringTransactionFrequency;
  interval: number;
  occurrences?: number | null;
  startOn: string;
  endOn?: string | null;
  recurringTransactionState: RecurringTransactionState;
  createdAt: string;
  updatedAt: string | null;
  deletedAt?: string | null;
  version?: number;
}

export interface RecurringTransactionEvent {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  transactionId: string | null;
  recurringTransactionId: string;
  expectedDate: string;
  eventState: RecurringTransactionEventStatus;
  deletedAt?: string | null;
  version?: number;
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
