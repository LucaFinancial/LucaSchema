// Core validator interface
export interface LucaValidator {
  getSchema(schemaName: string): (data: any) => boolean;
  validateSchema(schema: object): boolean;
  errors: any[];
}

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
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  startDate: string;
  endDate: string | null;
  isActive: boolean;
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
export declare const lucaValidator: LucaValidator;
export declare const schemas: Record<string, object>;
export declare const enums: Record<string, Record<string, string>>;
