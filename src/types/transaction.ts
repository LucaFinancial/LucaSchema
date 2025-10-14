// Transaction types and interfaces

export type TransactionState =
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

// Transaction interface
export interface Transaction {
  id: string;
  payorId: string;
  payeeId: string;
  categoryId: string | null;
  amount: number;
  date: string;
  description: string;
  transactionState: TransactionState;
  createdAt: string;
  updatedAt: string | null;
}
