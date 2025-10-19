export interface Posting {
  accountId: string;
  amount: number;
  description?: string | null;
  order: number;
}

export interface Transaction {
  id: string;
  postings: Posting[];
  categoryId: string | null;
  date: string;
  description: string;
  transactionState:
    | 'PLANNED'
    | 'SCHEDULED'
    | 'PENDING'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'FAILED'
    | 'DISPUTED'
    | 'REFUNDED'
    | 'TENTATIVE'
    | 'UPCOMING'
    | 'DELETED';
  createdAt: string;
  updatedAt: string | null;
}

export interface Entity {
  id: string;
  name: string;
  description: string | null;
  entityType:
    | 'ACCOUNT'
    | 'RETAILER'
    | 'SERVICE'
    | 'INDIVIDUAL'
    | 'UTILITY'
    | 'GOVERNMENT';
  entityStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'DELETED' | 'CLOSED';
  createdAt: string;
  updatedAt: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  parentId: string | null;
  defaultCategoryId: string | null;
  categoryType: 'DEFAULT' | 'MODIFIED' | 'CUSTOM';
  createdAt: string;
  updatedAt: string | null;
}

export interface RecurringTransaction {
  id: string;
  postings: Posting[];
  categoryId: string | null;
  description: string;
  frequency: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  interval: number;
  occurrences: number | null;
  startOn: string;
  endOn: string | null;
  recurringTransactionState: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
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
  eventState: 'MODIFIED' | 'DELETED';
}

export interface LucaSchema {
  schemaVersion: string;
  entities: Entity[];
  categories: Category[];
  transactions: Transaction[];
  recurringTransactions: RecurringTransaction[];
  recurringTransactionEvents: RecurringTransactionEvent[];
}

// Main exports
export declare const schemas: Record<string, object>;
export declare const enums: Record<string, Record<string, string>>;

// The following types are exported from this file:
// Posting
// Transaction
// Entity
// Category
// RecurringTransaction
// RecurringTransactionEvent
// LucaSchema
