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
 * Transaction side enumeration
 *
 * Represents the debit or credit side of a transaction in double-entry accounting
 *
 * @enum {string}
 * @readonly
 *
 * @example
 * ```typescript
 * import { TransactionSideEnum } from '@luca-financial/luca-schema';
 *
 * const transaction = {
 *   side: TransactionSideEnum.DEBIT
 * };
 * ```
 */
export const TransactionSideEnum = {
  /** Debit side - Increases assets and expenses, decreases liabilities, equity, and revenue */
  DEBIT: 'DEBIT',
  /** Credit side - Increases liabilities, equity, and revenue, decreases assets and expenses */
  CREDIT: 'CREDIT'
} as const;
