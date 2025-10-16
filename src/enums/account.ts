/**
 * Account enumeration definitions
 * Runtime enums for chart of accounts and account categorization
 */

// Import types for satisfies constraints
import type { AccountCategory, NormalBalance, AccountStatus } from '../types';

/**
 * Account category enumeration for chart of accounts
 *
 * Standard accounting categories following the accounting equation:
 * Assets = Liabilities + Equity
 *
 * Revenue and Expenses affect Equity through retained earnings
 */
export const AccountCategoryEnum = {
  /** Assets - Resources owned by the entity (Cash, Accounts Receivable, Equipment, etc.) */
  ASSETS: 'ASSETS',
  /** Liabilities - Obligations owed to others (Accounts Payable, Loans, etc.) */
  LIABILITIES: 'LIABILITIES',
  /** Equity - Owner's interest in the entity (Capital, Retained Earnings, etc.) */
  EQUITY: 'EQUITY',
  /** Revenue - Income from business operations (Sales, Service Revenue, etc.) */
  REVENUE: 'REVENUE',
  /** Expenses - Costs incurred in business operations (Rent, Salaries, Utilities, etc.) */
  EXPENSES: 'EXPENSES'
} as const satisfies Record<string, AccountCategory>;

/**
 * Normal balance enumeration
 *
 * Indicates which side (debit or credit) increases the account:
 * - DEBIT: Assets and Expenses
 * - CREDIT: Liabilities, Equity, and Revenue
 */
export const NormalBalanceEnum = {
  /** Debit increases the account (Assets and Expenses) */
  DEBIT: 'DEBIT',
  /** Credit increases the account (Liabilities, Equity, and Revenue) */
  CREDIT: 'CREDIT'
} as const satisfies Record<string, NormalBalance>;

/**
 * Account status enumeration for tracking account lifecycle
 */
export const AccountStatusEnum = {
  /** Account is active and can be used for transactions */
  ACTIVE: 'ACTIVE',
  /** Account is inactive but can be reactivated */
  INACTIVE: 'INACTIVE',
  /** Account is permanently closed and cannot be used */
  CLOSED: 'CLOSED'
} as const satisfies Record<string, AccountStatus>;
