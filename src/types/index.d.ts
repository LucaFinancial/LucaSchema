export interface Transaction {
  id: string;
  payorId: string;
  payeeId: string;
  categoryId: string | null;
  amount: number;
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
  description: string;
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
  description: string;
  parentId: string | null;
  defaultCategoryId?: string | null;
  categoryType: 'DEFAULT' | 'MODIFIED' | 'CUSTOM';
  createdAt: string;
  updatedAt: string | null;
}

export interface RecurringTransaction {
  id: string;
  payorId: string;
  payeeId: string;
  categoryId: string | null;
  amount: number;
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
  transactionId?: string | null;
  recurringTransactionId: string;
  expectedDate: string;
  status: 'MODIFIED' | 'DELETED';
  createdAt: string;
  updatedAt: string | null;
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
// Transaction
// Entity
// Category
// RecurringTransaction
// RecurringTransactionEvent
// LucaSchema
