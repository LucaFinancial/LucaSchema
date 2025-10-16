/**
 * Account hierarchy navigation utilities
 *
 * Functions for working with hierarchical chart of accounts,
 * including navigation, tree operations, and account relationships.
 *
 * @fileoverview Account hierarchy utilities
 * @version 2.0.0
 * @since 2.0.0
 */

import type { Account } from './types';

/**
 * Gets all ancestor accounts for a given account
 *
 * Returns an array of accounts from the immediate parent up to the root account.
 * The array is ordered from parent to root (immediate parent first).
 *
 * @param accountId - The ID of the account to get ancestors for
 * @param accounts - Array of all accounts in the chart of accounts
 * @returns Array of ancestor accounts, ordered from parent to root
 *
 * @example
 * ```typescript
 * // Chart of accounts structure:
 * // 1000 Assets (root)
 * //   1100 Current Assets (child of 1000)
 * //     1110 Cash (child of 1100)
 *
 * const accounts = [
 *   { id: '1', accountNumber: '1000', name: 'Assets', parentAccountId: null },
 *   { id: '2', accountNumber: '1100', name: 'Current Assets', parentAccountId: '1' },
 *   { id: '3', accountNumber: '1110', name: 'Cash', parentAccountId: '2' }
 * ];
 *
 * const ancestors = getAccountAncestors('3', accounts);
 * // Returns: [
 * //   { id: '2', name: 'Current Assets', ... },
 * //   { id: '1', name: 'Assets', ... }
 * // ]
 * ```
 *
 * @since 2.0.0
 */
export function getAccountAncestors(
  accountId: string,
  accounts: Account[]
): Account[] {
  const ancestors: Account[] = [];
  const accountMap = new Map(accounts.map(a => [a.id, a]));

  let current = accountMap.get(accountId);

  while (current?.parentAccountId) {
    const parent = accountMap.get(current.parentAccountId);
    if (!parent) break;
    ancestors.push(parent);
    current = parent;
  }

  return ancestors;
}

/**
 * Gets all descendant accounts for a given account
 *
 * Returns an array of all accounts that are children or grandchildren (any depth)
 * of the specified account.
 *
 * @param accountId - The ID of the account to get descendants for
 * @param accounts - Array of all accounts in the chart of accounts
 * @returns Array of descendant accounts (all levels)
 *
 * @example
 * ```typescript
 * // Chart of accounts structure:
 * // 1000 Assets (root)
 * //   1100 Current Assets (child of 1000)
 * //     1110 Cash (child of 1100)
 * //     1120 Bank Account (child of 1100)
 *
 * const accounts = [
 *   { id: '1', accountNumber: '1000', name: 'Assets', parentAccountId: null },
 *   { id: '2', accountNumber: '1100', name: 'Current Assets', parentAccountId: '1' },
 *   { id: '3', accountNumber: '1110', name: 'Cash', parentAccountId: '2' },
 *   { id: '4', accountNumber: '1120', name: 'Bank Account', parentAccountId: '2' }
 * ];
 *
 * const descendants = getAccountDescendants('1', accounts);
 * // Returns all three child accounts: Current Assets, Cash, and Bank Account
 * ```
 *
 * @since 2.0.0
 */
export function getAccountDescendants(
  accountId: string,
  accounts: Account[]
): Account[] {
  const descendants: Account[] = [];

  // Find all direct children
  const findChildren = (parentId: string) => {
    for (const account of accounts) {
      if (account.parentAccountId === parentId) {
        descendants.push(account);
        findChildren(account.id); // Recursively find children of children
      }
    }
  };

  findChildren(accountId);
  return descendants;
}

/**
 * Gets immediate child accounts for a given account
 *
 * Returns only the direct children, not grandchildren or deeper descendants.
 *
 * @param accountId - The ID of the account to get children for
 * @param accounts - Array of all accounts in the chart of accounts
 * @returns Array of immediate child accounts
 *
 * @example
 * ```typescript
 * const accounts = [
 *   { id: '1', accountNumber: '1000', name: 'Assets', parentAccountId: null },
 *   { id: '2', accountNumber: '1100', name: 'Current Assets', parentAccountId: '1' },
 *   { id: '3', accountNumber: '1200', name: 'Fixed Assets', parentAccountId: '1' }
 * ];
 *
 * const children = getAccountChildren('1', accounts);
 * // Returns: [Current Assets, Fixed Assets]
 * ```
 *
 * @since 2.0.0
 */
export function getAccountChildren(
  accountId: string,
  accounts: Account[]
): Account[] {
  return accounts.filter(account => account.parentAccountId === accountId);
}

/**
 * Gets the full path of account names from root to the specified account
 *
 * Returns an array of account names representing the path from the root account
 * to the specified account.
 *
 * @param accountId - The ID of the account
 * @param accounts - Array of all accounts in the chart of accounts
 * @returns Array of account names from root to account
 *
 * @example
 * ```typescript
 * const accounts = [
 *   { id: '1', name: 'Assets', parentAccountId: null },
 *   { id: '2', name: 'Current Assets', parentAccountId: '1' },
 *   { id: '3', name: 'Cash', parentAccountId: '2' }
 * ];
 *
 * const path = getAccountPath('3', accounts);
 * // Returns: ['Assets', 'Current Assets', 'Cash']
 * ```
 *
 * @since 2.0.0
 */
export function getAccountPath(
  accountId: string,
  accounts: Account[]
): string[] {
  const accountMap = new Map(accounts.map(a => [a.id, a]));
  const account = accountMap.get(accountId);

  if (!account) return [];

  const ancestors = getAccountAncestors(accountId, accounts);
  const path = [...ancestors.reverse().map(a => a.name), account.name];

  return path;
}

/**
 * Gets the depth level of an account in the hierarchy
 *
 * Returns 0 for root accounts, 1 for their children, 2 for grandchildren, etc.
 *
 * @param accountId - The ID of the account
 * @param accounts - Array of all accounts in the chart of accounts
 * @returns The depth level of the account (0 = root)
 *
 * @example
 * ```typescript
 * const accounts = [
 *   { id: '1', name: 'Assets', parentAccountId: null },
 *   { id: '2', name: 'Current Assets', parentAccountId: '1' },
 *   { id: '3', name: 'Cash', parentAccountId: '2' }
 * ];
 *
 * console.log(getAccountDepth('1', accounts)); // 0 (root)
 * console.log(getAccountDepth('2', accounts)); // 1
 * console.log(getAccountDepth('3', accounts)); // 2
 * ```
 *
 * @since 2.0.0
 */
export function getAccountDepth(
  accountId: string,
  accounts: Account[]
): number {
  const ancestors = getAccountAncestors(accountId, accounts);
  return ancestors.length;
}

/**
 * Gets all root accounts (accounts with no parent)
 *
 * Returns all top-level accounts in the chart of accounts.
 *
 * @param accounts - Array of all accounts in the chart of accounts
 * @returns Array of root accounts
 *
 * @example
 * ```typescript
 * const accounts = [
 *   { id: '1', name: 'Assets', parentAccountId: null },
 *   { id: '2', name: 'Liabilities', parentAccountId: null },
 *   { id: '3', name: 'Current Assets', parentAccountId: '1' }
 * ];
 *
 * const roots = getRootAccounts(accounts);
 * // Returns: [Assets, Liabilities]
 * ```
 *
 * @since 2.0.0
 */
export function getRootAccounts(accounts: Account[]): Account[] {
  return accounts.filter(account => account.parentAccountId === null);
}

/**
 * Checks if an account is a leaf account (has no children)
 *
 * @param accountId - The ID of the account to check
 * @param accounts - Array of all accounts in the chart of accounts
 * @returns True if the account has no children
 *
 * @example
 * ```typescript
 * const accounts = [
 *   { id: '1', name: 'Assets', parentAccountId: null },
 *   { id: '2', name: 'Cash', parentAccountId: '1' }
 * ];
 *
 * console.log(isLeafAccount('1', accounts)); // false (has children)
 * console.log(isLeafAccount('2', accounts)); // true (no children)
 * ```
 *
 * @since 2.0.0
 */
export function isLeafAccount(accountId: string, accounts: Account[]): boolean {
  return !accounts.some(account => account.parentAccountId === accountId);
}

/**
 * Gets accounts by category
 *
 * Returns all accounts that belong to a specific accounting category.
 *
 * @param category - The account category to filter by
 * @param accounts - Array of all accounts in the chart of accounts
 * @returns Array of accounts in the specified category
 *
 * @example
 * ```typescript
 * const accounts = [
 *   { id: '1', name: 'Cash', accountCategory: 'ASSETS' },
 *   { id: '2', name: 'Accounts Payable', accountCategory: 'LIABILITIES' },
 *   { id: '3', name: 'Bank Account', accountCategory: 'ASSETS' }
 * ];
 *
 * const assetAccounts = getAccountsByCategory('ASSETS', accounts);
 * // Returns: [Cash, Bank Account]
 * ```
 *
 * @since 2.0.0
 */
export function getAccountsByCategory(
  category: string,
  accounts: Account[]
): Account[] {
  return accounts.filter(account => account.accountCategory === category);
}
