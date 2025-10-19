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

export type EntryType = 'DEBIT' | 'CREDIT';

// Transaction interface
// Note: In accounting terminology, this represents a "posting" or "journal entry line"
// within a complete journal entry. The journalEntryId links multiple postings together.
export interface Transaction {
  id: string;
  payorId: string;
  payeeId: string;
  categoryId: string | null;
  amount: number;
  date: string;
  description: string;
  transactionState: TransactionState;
  entryType: EntryType;
  journalEntryId: string | null;
  createdAt: string;
  updatedAt: string | null;
}
