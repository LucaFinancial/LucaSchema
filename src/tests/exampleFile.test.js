import { describe, test, expect } from '@jest/globals';
import { validate, SCHEMA_VERSION } from '../index.js';
import exampleData from '../../examples/luca-schema-example.json' with { type: 'json' };

describe('luca-schema-example.json', () => {
  test('example file validates correctly', () => {
    const result = validate('lucaSchema', exampleData);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test('example file schemaVersion matches exported SCHEMA_VERSION', () => {
    expect(exampleData.schemaVersion).toBe(SCHEMA_VERSION);
  });

  test('example file contains all entity types', () => {
    // Verify the example includes all supported collections
    expect(exampleData.categories).toBeDefined();
    expect(exampleData.categories.length).toBeGreaterThan(0);

    expect(exampleData.accounts).toBeDefined();
    expect(exampleData.accounts.length).toBeGreaterThan(0);

    expect(exampleData.statements).toBeDefined();
    expect(exampleData.statements.length).toBeGreaterThan(0);

    expect(exampleData.recurringTransactions).toBeDefined();
    expect(exampleData.recurringTransactions.length).toBeGreaterThan(0);

    expect(exampleData.recurringTransactionEvents).toBeDefined();
    expect(exampleData.recurringTransactionEvents.length).toBeGreaterThan(0);

    expect(exampleData.recurringTransactionLinks).toBeDefined();
    expect(exampleData.recurringTransactionLinks.length).toBeGreaterThan(0);

    expect(exampleData.transactions).toBeDefined();
    expect(exampleData.transactions.length).toBeGreaterThan(0);

    expect(exampleData.transactionLinks).toBeDefined();
    expect(exampleData.transactionLinks.length).toBeGreaterThan(0);

    expect(exampleData.transactionSplits).toBeDefined();
    expect(exampleData.transactionSplits.length).toBeGreaterThan(0);
  });

  test('example file has valid cross-entity references', () => {
    // Collect all IDs
    const accountIds = new Set(exampleData.accounts.map(a => a.id));
    const categoryIds = new Set(exampleData.categories.map(c => c.id));
    const transactionIds = new Set(exampleData.transactions.map(t => t.id));
    const transactionById = new Map(
      exampleData.transactions.map(t => [t.id, t])
    );
    const statementIds = new Set(exampleData.statements.map(s => s.id));
    const recurringTransactionIds = new Set(
      exampleData.recurringTransactions.map(r => r.id)
    );
    const recurringTransactionById = new Map(
      exampleData.recurringTransactions.map(r => [r.id, r])
    );

    // Verify statements reference valid accounts
    exampleData.statements.forEach(stmt => {
      expect(accountIds.has(stmt.accountId)).toBe(true);
    });

    // Verify transactions reference valid accounts
    exampleData.transactions.forEach(txn => {
      expect(accountIds.has(txn.accountId)).toBe(true);
      if (txn.categoryId !== null) {
        expect(categoryIds.has(txn.categoryId)).toBe(true);
      }
      if (txn.statementId !== null) {
        expect(statementIds.has(txn.statementId)).toBe(true);
      }
    });

    // Verify recurring transaction links reference valid recurring transactions
    exampleData.recurringTransactionLinks.forEach(link => {
      expect(
        recurringTransactionIds.has(link.sourceRecurringTransactionId)
      ).toBe(true);
      expect(
        recurringTransactionIds.has(link.destinationRecurringTransactionId)
      ).toBe(true);
      expect(link.sourceRecurringTransactionId).not.toBe(
        link.destinationRecurringTransactionId
      );
      expect(
        recurringTransactionById.get(link.sourceRecurringTransactionId)
          ?.accountId
      ).not.toBe(
        recurringTransactionById.get(link.destinationRecurringTransactionId)
          ?.accountId
      );
    });

    // Verify transaction links reference valid transactions
    exampleData.transactionLinks.forEach(link => {
      expect(transactionIds.has(link.sourceTransactionId)).toBe(true);
      expect(transactionIds.has(link.destinationTransactionId)).toBe(true);
      expect(link.sourceTransactionId).not.toBe(link.destinationTransactionId);
      expect(transactionById.get(link.sourceTransactionId)?.accountId).not.toBe(
        transactionById.get(link.destinationTransactionId)?.accountId
      );
    });

    // Verify transaction splits reference valid transactions and categories
    exampleData.transactionSplits.forEach(split => {
      expect(transactionIds.has(split.transactionId)).toBe(true);
      if (split.categoryId !== null) {
        expect(categoryIds.has(split.categoryId)).toBe(true);
      }
    });

    // Verify recurring transaction events reference valid recurring transactions and transactions
    exampleData.recurringTransactionEvents.forEach(event => {
      expect(recurringTransactionIds.has(event.recurringTransactionId)).toBe(
        true
      );
      if (event.transactionId !== null) {
        expect(transactionIds.has(event.transactionId)).toBe(true);
      }
    });

    // Verify category parent references
    exampleData.categories.forEach(cat => {
      if (cat.parentId !== null) {
        expect(categoryIds.has(cat.parentId)).toBe(true);
      }
    });
  });
});
