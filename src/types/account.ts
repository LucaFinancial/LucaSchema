// Account types and interfaces

export type AccountType =
  | 'ASSET'
  | 'LIABILITY'
  | 'EQUITY'
  | 'REVENUE'
  | 'EXPENSE';

// Account interface
export interface Account {
  id: string;
  name: string;
  description: string | null;
  accountNumber: string;
  accountType: AccountType;
  parentAccountId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}
