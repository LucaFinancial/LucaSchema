/**
 * Journal entry grouping and validation utilities
 *
 * Functions for working with journal entries in double-entry accounting,
 * including validation and grouping of postings (transaction records).
 *
 * Note: In this library, 'Transaction' objects represent individual postings
 * (journal entry lines), and 'journalEntryId' links postings into complete
 * journal entries.
 *
 * @fileoverview Journal entry utilities
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
 * Validates that a group of postings forms a complete journal entry
 *
 * In double-entry accounting, every journal entry must have equal debits and credits.
 * This function validates that the sum of debit postings equals the sum of credit postings.
 *
 * @param postings - Array of transaction records (postings) that should form a complete journal entry
 * @returns Validation result with details about the journal entry
 *
 * @example Basic validation
 * ```typescript
 * const postings = [
 *   { id: '1', entryType: 'DEBIT', amount: 10000, ... },  // $100 debit
 *   { id: '2', entryType: 'CREDIT', amount: 10000, ... }  // $100 credit
 * ];
 *
 * const result = validateJournalEntry(postings);
 * console.log(result.isValid); // true
 * console.log(result.totalDebits); // 10000
 * console.log(result.totalCredits); // 10000
 * ```
 *
 * @example Complex journal entry
 * ```typescript
 * // Split journal entry: $150 payment split between two expense accounts
 * const postings = [
 *   { id: '1', entryType: 'DEBIT', amount: 10000, ... },  // Office supplies $100
 *   { id: '2', entryType: 'DEBIT', amount: 5000, ... },   // Utilities $50
 *   { id: '3', entryType: 'CREDIT', amount: 15000, ... }  // Cash $150
 * ];
 *
 * const result = validateJournalEntry(postings);
 * console.log(result.isValid); // true
 * console.log(result.totalDebits); // 15000
 * console.log(result.totalCredits); // 15000
 * ```
 *
 * @since 2.0.0
 */
export function validateJournalEntry(
  postings: Transaction[]
): JournalEntryValidationResult {
  if (!postings || postings.length === 0) {
    return {
      isValid: false,
      totalDebits: 0,
      totalCredits: 0,
      difference: 0,
      debitCount: 0,
      creditCount: 0,
      error: 'No postings provided'
    };
  }

  let totalDebits = 0;
  let totalCredits = 0;
  let debitCount = 0;
  let creditCount = 0;

  for (const posting of postings) {
    if (posting.entryType === 'DEBIT') {
      totalDebits += posting.amount;
      debitCount++;
    } else if (posting.entryType === 'CREDIT') {
      totalCredits += posting.amount;
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
 * Groups postings by their journalEntryId
 *
 * Organizes transaction records into journal entries based on their journalEntryId.
 * Useful for analyzing journal entries or displaying related postings together.
 *
 * @param postings - Array of transaction records (postings) to group
 * @returns Map of journalEntryId to array of postings
 *
 * @example
 * ```typescript
 * const postings = [
 *   { id: '1', journalEntryId: 'je-1', entryType: 'DEBIT', ... },
 *   { id: '2', journalEntryId: 'je-1', entryType: 'CREDIT', ... },
 *   { id: '3', journalEntryId: 'je-2', entryType: 'DEBIT', ... },
 *   { id: '4', journalEntryId: null, entryType: 'DEBIT', ... }
 * ];
 *
 * const groups = groupTransactionsByJournalEntry(postings);
 * // Map {
 * //   'je-1' => [{ id: '1', ... }, { id: '2', ... }],
 * //   'je-2' => [{ id: '3', ... }],
 * //   null => [{ id: '4', ... }]
 * // }
 * ```
 *
 * @since 2.0.0
 */
export function groupTransactionsByJournalEntry(
  postings: Transaction[]
): Map<string | null, Transaction[]> {
  const groups = new Map<string | null, Transaction[]>();

  for (const posting of postings) {
    const journalEntryId = posting.journalEntryId;
    const group = groups.get(journalEntryId) || [];
    group.push(posting);
    groups.set(journalEntryId, group);
  }

  return groups;
}

/**
 * Validates all journal entries in a set of postings
 *
 * Checks that each journal entry forms a valid balanced entry.
 * Returns a map of journal entry IDs to their validation results.
 *
 * @param postings - Array of transaction records (postings) to validate
 * @returns Map of journalEntryId to validation result
 *
 * @example
 * ```typescript
 * const postings = [
 *   { id: '1', journalEntryId: 'je-1', entryType: 'DEBIT', amount: 10000 },
 *   { id: '2', journalEntryId: 'je-1', entryType: 'CREDIT', amount: 10000 },
 *   { id: '3', journalEntryId: 'je-2', entryType: 'DEBIT', amount: 5000 },
 *   { id: '4', journalEntryId: 'je-2', entryType: 'CREDIT', amount: 6000 }
 * ];
 *
 * const results = validateAllJournalEntries(postings);
 * console.log(results.get('je-1').isValid); // true
 * console.log(results.get('je-2').isValid); // false (imbalanced)
 * ```
 *
 * @since 2.0.0
 */
export function validateAllJournalEntries(
  postings: Transaction[]
): Map<string | null, JournalEntryValidationResult> {
  const groups = groupTransactionsByJournalEntry(postings);
  const results = new Map<string | null, JournalEntryValidationResult>();

  for (const [journalEntryId, entryPostings] of groups) {
    results.set(journalEntryId, validateJournalEntry(entryPostings));
  }

  return results;
}
