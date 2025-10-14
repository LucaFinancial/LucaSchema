/**
 * Account-related enums for LucaSchema
 *
 * @fileoverview Runtime enums for account types and related constants
 */

/**
 * Account type enumeration
 *
 * Represents the fundamental account types in double-entry bookkeeping
 * according to the accounting equation: Assets = Liabilities + Equity
 *
 * @enum {string}
 * @readonly
 *
 * @example
 * ```typescript
 * import { AccountTypeEnum } from '@luca-financial/luca-schema';
 *
 * const account = {
 *   accountType: AccountTypeEnum.ASSET
 * };
 * ```
 */
export const AccountTypeEnum = {
  /** Asset accounts - Resources owned (normal debit balance) */
  ASSET: 'ASSET',
  /** Liability accounts - Obligations owed (normal credit balance) */
  LIABILITY: 'LIABILITY',
  /** Equity accounts - Owner's interest (normal credit balance) */
  EQUITY: 'EQUITY',
  /** Revenue accounts - Income earned (normal credit balance) */
  REVENUE: 'REVENUE',
  /** Expense accounts - Costs incurred (normal debit balance) */
  EXPENSE: 'EXPENSE'
} as const;

/**
 * Entry type enumeration
 *
 * Represents the debit or credit classification of a transaction entry in double-entry accounting
 *
 * @enum {string}
 * @readonly
 *
 * @example
 * ```typescript
 * import { EntryTypeEnum } from '@luca-financial/luca-schema';
 *
 * const transaction = {
 *   entryType: EntryTypeEnum.DEBIT
 * };
 * ```
 */
export const EntryTypeEnum = {
  /** Debit entry - Increases assets and expenses, decreases liabilities, equity, and revenue */
  DEBIT: 'DEBIT',
  /** Credit entry - Increases liabilities, equity, and revenue, decreases assets and expenses */
  CREDIT: 'CREDIT'
} as const;
