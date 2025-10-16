/**
 * Transaction grouping and validation utilities
 *
 * Functions for working with grouped transactions in double-entry accounting,
 * including validation of journal entries and transaction grouping.
 *
 * @fileoverview Transaction grouping utilities
 * @version 2.0.0
 * @since 2.0.0
 */

import type { Transaction } from './types';

/**
 * Result of validating a journal entry
 */
export interface JournalEntryValidationResult {
  /** Whether the journal entry is valid (debits equal credits) */
  isValid: boolean;
  /** Total debit amount in minor units */
  totalDebits: number;
  /** Total credit amount in minor units */
  totalCredits: number;
  /** Difference between debits and credits (should be 0 for valid entry) */
  difference: number;
  /** Number of debit entries */
  debitCount: number;
  /** Number of credit entries */
  creditCount: number;
  /** Error message if validation fails */
  error?: string;
}

/**
 * Validates that a group of transactions forms a complete journal entry
 *
 * In double-entry accounting, every transaction must have equal debits and credits.
 * This function validates that the sum of debit entries equals the sum of credit entries
 * in a transaction group.
 *
 * @param transactions - Array of transactions that should form a complete journal entry
 * @returns Validation result with details about the journal entry
 *
 * @example Basic validation
 * ```typescript
 * const transactions = [
 *   { id: '1', entryType: 'DEBIT', amount: 10000, ... },  // $100 debit
 *   { id: '2', entryType: 'CREDIT', amount: 10000, ... }  // $100 credit
 * ];
 *
 * const result = validateJournalEntry(transactions);
 * console.log(result.isValid); // true
 * console.log(result.totalDebits); // 10000
 * console.log(result.totalCredits); // 10000
 * ```
 *
 * @example Complex journal entry
 * ```typescript
 * // Split transaction: $150 payment split between two expense accounts
 * const transactions = [
 *   { id: '1', entryType: 'DEBIT', amount: 10000, ... },  // Office supplies $100
 *   { id: '2', entryType: 'DEBIT', amount: 5000, ... },   // Utilities $50
 *   { id: '3', entryType: 'CREDIT', amount: 15000, ... }  // Cash $150
 * ];
 *
 * const result = validateJournalEntry(transactions);
 * console.log(result.isValid); // true
 * console.log(result.totalDebits); // 15000
 * console.log(result.totalCredits); // 15000
 * ```
 *
 * @since 2.0.0
 */
export function validateJournalEntry(
  transactions: Transaction[]
): JournalEntryValidationResult {
  if (!transactions || transactions.length === 0) {
    return {
      isValid: false,
      totalDebits: 0,
      totalCredits: 0,
      difference: 0,
      debitCount: 0,
      creditCount: 0,
      error: 'No transactions provided'
    };
  }

  let totalDebits = 0;
  let totalCredits = 0;
  let debitCount = 0;
  let creditCount = 0;

  for (const transaction of transactions) {
    if (transaction.entryType === 'DEBIT') {
      totalDebits += transaction.amount;
      debitCount++;
    } else if (transaction.entryType === 'CREDIT') {
      totalCredits += transaction.amount;
      creditCount++;
    }
  }

  const difference = totalDebits - totalCredits;
  const isValid = difference === 0 && debitCount > 0 && creditCount > 0;

  let error: string | undefined;
  if (!isValid) {
    if (debitCount === 0) {
      error = 'No debit entries found';
    } else if (creditCount === 0) {
      error = 'No credit entries found';
    } else {
      error = `Debits (${totalDebits}) do not equal credits (${totalCredits}). Difference: ${difference}`;
    }
  }

  return {
    isValid,
    totalDebits,
    totalCredits,
    difference,
    debitCount,
    creditCount,
    error
  };
}

/**
 * Groups transactions by their transactionGroupId
 *
 * Organizes transactions into groups based on their transactionGroupId.
 * Useful for analyzing journal entries or displaying related transactions together.
 *
 * @param transactions - Array of transactions to group
 * @returns Map of transactionGroupId to array of transactions
 *
 * @example
 * ```typescript
 * const transactions = [
 *   { id: '1', transactionGroupId: 'group-1', entryType: 'DEBIT', ... },
 *   { id: '2', transactionGroupId: 'group-1', entryType: 'CREDIT', ... },
 *   { id: '3', transactionGroupId: 'group-2', entryType: 'DEBIT', ... },
 *   { id: '4', transactionGroupId: null, entryType: 'DEBIT', ... }
 * ];
 *
 * const groups = groupTransactionsByGroupId(transactions);
 * // Map {
 * //   'group-1' => [{ id: '1', ... }, { id: '2', ... }],
 * //   'group-2' => [{ id: '3', ... }],
 * //   null => [{ id: '4', ... }]
 * // }
 * ```
 *
 * @since 2.0.0
 */
export function groupTransactionsByGroupId(
  transactions: Transaction[]
): Map<string | null, Transaction[]> {
  const groups = new Map<string | null, Transaction[]>();

  for (const transaction of transactions) {
    const groupId = transaction.transactionGroupId;
    const group = groups.get(groupId) || [];
    group.push(transaction);
    groups.set(groupId, group);
  }

  return groups;
}

/**
 * Validates all transaction groups in a set of transactions
 *
 * Checks that each transaction group forms a valid journal entry.
 * Returns a map of group IDs to their validation results.
 *
 * @param transactions - Array of transactions to validate
 * @returns Map of transactionGroupId to validation result
 *
 * @example
 * ```typescript
 * const transactions = [
 *   { id: '1', transactionGroupId: 'group-1', entryType: 'DEBIT', amount: 10000 },
 *   { id: '2', transactionGroupId: 'group-1', entryType: 'CREDIT', amount: 10000 },
 *   { id: '3', transactionGroupId: 'group-2', entryType: 'DEBIT', amount: 5000 },
 *   { id: '4', transactionGroupId: 'group-2', entryType: 'CREDIT', amount: 6000 }
 * ];
 *
 * const results = validateAllJournalEntries(transactions);
 * console.log(results.get('group-1').isValid); // true
 * console.log(results.get('group-2').isValid); // false (imbalanced)
 * ```
 *
 * @since 2.0.0
 */
export function validateAllJournalEntries(
  transactions: Transaction[]
): Map<string | null, JournalEntryValidationResult> {
  const groups = groupTransactionsByGroupId(transactions);
  const results = new Map<string | null, JournalEntryValidationResult>();

  for (const [groupId, groupTransactions] of groups) {
    results.set(groupId, validateJournalEntry(groupTransactions));
  }

  return results;
}
