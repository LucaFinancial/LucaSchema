import {
  validateJournalEntry,
  groupTransactionsByGroupId,
  validateAllJournalEntries
} from '../transactionGrouping';
import { createTestTransaction } from './test-utils';

describe('Transaction Grouping Utilities', () => {
  describe('validateJournalEntry', () => {
    test('validates a balanced journal entry with one debit and one credit', () => {
      const transactions = [
        createTestTransaction({
          id: 'txn-1',
          entryType: 'DEBIT',
          amount: 10000,
          transactionGroupId: 'group-1'
        }),
        createTestTransaction({
          id: 'txn-2',
          entryType: 'CREDIT',
          amount: 10000,
          transactionGroupId: 'group-1'
        })
      ];

      const result = validateJournalEntry(transactions);

      expect(result.isValid).toBe(true);
      expect(result.totalDebits).toBe(10000);
      expect(result.totalCredits).toBe(10000);
      expect(result.difference).toBe(0);
      expect(result.debitCount).toBe(1);
      expect(result.creditCount).toBe(1);
      expect(result.error).toBeUndefined();
    });

    test('validates a balanced journal entry with multiple debits and one credit', () => {
      const transactions = [
        createTestTransaction({
          id: 'txn-1',
          entryType: 'DEBIT',
          amount: 7500,
          transactionGroupId: 'group-1'
        }),
        createTestTransaction({
          id: 'txn-2',
          entryType: 'DEBIT',
          amount: 2500,
          transactionGroupId: 'group-1'
        }),
        createTestTransaction({
          id: 'txn-3',
          entryType: 'CREDIT',
          amount: 10000,
          transactionGroupId: 'group-1'
        })
      ];

      const result = validateJournalEntry(transactions);

      expect(result.isValid).toBe(true);
      expect(result.totalDebits).toBe(10000);
      expect(result.totalCredits).toBe(10000);
      expect(result.difference).toBe(0);
      expect(result.debitCount).toBe(2);
      expect(result.creditCount).toBe(1);
    });

    test('invalidates an imbalanced journal entry', () => {
      const transactions = [
        createTestTransaction({
          id: 'txn-1',
          entryType: 'DEBIT',
          amount: 10000,
          transactionGroupId: 'group-1'
        }),
        createTestTransaction({
          id: 'txn-2',
          entryType: 'CREDIT',
          amount: 9000,
          transactionGroupId: 'group-1'
        })
      ];

      const result = validateJournalEntry(transactions);

      expect(result.isValid).toBe(false);
      expect(result.totalDebits).toBe(10000);
      expect(result.totalCredits).toBe(9000);
      expect(result.difference).toBe(1000);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('do not equal');
    });

    test('invalidates a journal entry with only debits', () => {
      const transactions = [
        createTestTransaction({
          id: 'txn-1',
          entryType: 'DEBIT',
          amount: 10000
        }),
        createTestTransaction({
          id: 'txn-2',
          entryType: 'DEBIT',
          amount: 5000
        })
      ];

      const result = validateJournalEntry(transactions);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('No credit entries');
    });

    test('invalidates a journal entry with only credits', () => {
      const transactions = [
        createTestTransaction({
          id: 'txn-1',
          entryType: 'CREDIT',
          amount: 10000
        }),
        createTestTransaction({
          id: 'txn-2',
          entryType: 'CREDIT',
          amount: 5000
        })
      ];

      const result = validateJournalEntry(transactions);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('No debit entries');
    });

    test('invalidates an empty transaction array', () => {
      const result = validateJournalEntry([]);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('No transactions provided');
    });
  });

  describe('groupTransactionsByGroupId', () => {
    test('groups transactions by transactionGroupId', () => {
      const transactions = [
        createTestTransaction({
          id: 'txn-1',
          transactionGroupId: 'group-1'
        }),
        createTestTransaction({
          id: 'txn-2',
          transactionGroupId: 'group-1'
        }),
        createTestTransaction({
          id: 'txn-3',
          transactionGroupId: 'group-2'
        }),
        createTestTransaction({
          id: 'txn-4',
          transactionGroupId: null
        })
      ];

      const groups = groupTransactionsByGroupId(transactions);

      expect(groups.size).toBe(3);
      expect(groups.get('group-1')).toHaveLength(2);
      expect(groups.get('group-2')).toHaveLength(1);
      expect(groups.get(null)).toHaveLength(1);
    });

    test('handles empty transaction array', () => {
      const groups = groupTransactionsByGroupId([]);

      expect(groups.size).toBe(0);
    });
  });

  describe('validateAllJournalEntries', () => {
    test('validates multiple transaction groups', () => {
      const transactions = [
        // Balanced group
        createTestTransaction({
          id: 'txn-1',
          entryType: 'DEBIT',
          amount: 10000,
          transactionGroupId: 'group-1'
        }),
        createTestTransaction({
          id: 'txn-2',
          entryType: 'CREDIT',
          amount: 10000,
          transactionGroupId: 'group-1'
        }),
        // Imbalanced group
        createTestTransaction({
          id: 'txn-3',
          entryType: 'DEBIT',
          amount: 5000,
          transactionGroupId: 'group-2'
        }),
        createTestTransaction({
          id: 'txn-4',
          entryType: 'CREDIT',
          amount: 6000,
          transactionGroupId: 'group-2'
        })
      ];

      const results = validateAllJournalEntries(transactions);

      expect(results.size).toBe(2);
      expect(results.get('group-1')?.isValid).toBe(true);
      expect(results.get('group-2')?.isValid).toBe(false);
    });

    test('handles empty transaction array', () => {
      const results = validateAllJournalEntries([]);

      expect(results.size).toBe(0);
    });
  });
});
