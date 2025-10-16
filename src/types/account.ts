// Account types and interfaces for chart of accounts

/**
 * Standard accounting categories for chart of accounts
 * Following the accounting equation: Assets = Liabilities + Equity
 * Revenue and Expenses affect Equity through retained earnings
 */
export type AccountCategory =
  | 'ASSETS'
  | 'LIABILITIES'
  | 'EQUITY'
  | 'REVENUE'
  | 'EXPENSES';

/**
 * Normal balance indicates which side (debit or credit) increases the account
 * - Assets and Expenses have a normal DEBIT balance
 * - Liabilities, Equity, and Revenue have a normal CREDIT balance
 */
export type NormalBalance = 'DEBIT' | 'CREDIT';

/**
 * Account status for tracking account lifecycle
 */
export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED';

/**
 * Account interface for chart of accounts
 * Supports hierarchical account structure with parent/child relationships
 */
export interface Account {
  id: string;
  name: string;
  description: string | null;
  accountNumber: string;
  accountCategory: AccountCategory;
  normalBalance: NormalBalance;
  parentAccountId: string | null;
  accountStatus: AccountStatus;
  createdAt: string;
  updatedAt: string | null;
}
