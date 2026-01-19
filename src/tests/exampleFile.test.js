import { describe, test, expect } from '@jest/globals';
import { validate } from '../index.js';
import exampleData from '../../examples/luca-schema-example.json' with { type: 'json' };

describe('luca-schema-example.json', () => {
  test('example file validates correctly', () => {
    const result = validate('lucaSchema', exampleData);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test('example file contains all entity types', () => {
    // Verify all required arrays are present and non-empty
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

    expect(exampleData.transactions).toBeDefined();
    expect(exampleData.transactions.length).toBeGreaterThan(0);

    expect(exampleData.transactionSplits).toBeDefined();
    expect(exampleData.transactionSplits.length).toBeGreaterThan(0);
  });

  test('example file has valid cross-entity references', () => {
    // Collect all IDs
    const accountIds = new Set(exampleData.accounts.map(a => a.id));
    const categoryIds = new Set(exampleData.categories.map(c => c.id));
    const transactionIds = new Set(exampleData.transactions.map(t => t.id));
    const statementIds = new Set(exampleData.statements.map(s => s.id));
    const recurringTransactionIds = new Set(
      exampleData.recurringTransactions.map(r => r.id)
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
