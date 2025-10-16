import {
  getAccountAncestors,
  getAccountDescendants,
  getAccountChildren,
  getAccountPath,
  getAccountDepth,
  getRootAccounts,
  isLeafAccount,
  getAccountsByCategory
} from '../accountHierarchy';
import { createTestAccount } from './test-utils';

describe('Account Hierarchy Utilities', () => {
  // Test data setup
  const rootAccount = createTestAccount({
    id: 'root-1',
    name: 'Assets',
    accountNumber: '1000',
    parentAccountId: null
  });

  const childAccount = createTestAccount({
    id: 'child-1',
    name: 'Current Assets',
    accountNumber: '1100',
    parentAccountId: 'root-1'
  });

  const grandchildAccount = createTestAccount({
    id: 'grandchild-1',
    name: 'Cash',
    accountNumber: '1110',
    parentAccountId: 'child-1'
  });

  const greatGrandchildAccount = createTestAccount({
    id: 'great-grandchild-1',
    name: 'Checking Account',
    accountNumber: '1111',
    parentAccountId: 'grandchild-1'
  });

  const siblingAccount = createTestAccount({
    id: 'sibling-1',
    name: 'Fixed Assets',
    accountNumber: '1200',
    parentAccountId: 'root-1'
  });

  const liabilityAccount = createTestAccount({
    id: 'liability-1',
    name: 'Liabilities',
    accountNumber: '2000',
    accountCategory: 'LIABILITIES',
    normalBalance: 'CREDIT',
    parentAccountId: null
  });

  const allAccounts = [
    rootAccount,
    childAccount,
    grandchildAccount,
    greatGrandchildAccount,
    siblingAccount,
    liabilityAccount
  ];

  describe('getAccountAncestors', () => {
    test('returns ancestors in order from parent to root', () => {
      const ancestors = getAccountAncestors('great-grandchild-1', allAccounts);

      expect(ancestors).toHaveLength(3);
      expect(ancestors[0].id).toBe('grandchild-1');
      expect(ancestors[1].id).toBe('child-1');
      expect(ancestors[2].id).toBe('root-1');
    });

    test('returns empty array for root account', () => {
      const ancestors = getAccountAncestors('root-1', allAccounts);

      expect(ancestors).toHaveLength(0);
    });

    test('returns single parent for immediate child', () => {
      const ancestors = getAccountAncestors('child-1', allAccounts);

      expect(ancestors).toHaveLength(1);
      expect(ancestors[0].id).toBe('root-1');
    });

    test('handles non-existent account', () => {
      const ancestors = getAccountAncestors('non-existent', allAccounts);

      expect(ancestors).toHaveLength(0);
    });
  });

  describe('getAccountDescendants', () => {
    test('returns all descendants recursively', () => {
      const descendants = getAccountDescendants('root-1', allAccounts);

      expect(descendants).toHaveLength(4);
      expect(descendants.map(a => a.id)).toContain('child-1');
      expect(descendants.map(a => a.id)).toContain('grandchild-1');
      expect(descendants.map(a => a.id)).toContain('great-grandchild-1');
      expect(descendants.map(a => a.id)).toContain('sibling-1');
    });

    test('returns empty array for leaf account', () => {
      const descendants = getAccountDescendants(
        'great-grandchild-1',
        allAccounts
      );

      expect(descendants).toHaveLength(0);
    });

    test('returns all levels of descendants', () => {
      const descendants = getAccountDescendants('child-1', allAccounts);

      expect(descendants).toHaveLength(2);
      expect(descendants.map(a => a.id)).toContain('grandchild-1');
      expect(descendants.map(a => a.id)).toContain('great-grandchild-1');
    });
  });

  describe('getAccountChildren', () => {
    test('returns only immediate children', () => {
      const children = getAccountChildren('root-1', allAccounts);

      expect(children).toHaveLength(2);
      expect(children.map(a => a.id)).toContain('child-1');
      expect(children.map(a => a.id)).toContain('sibling-1');
      expect(children.map(a => a.id)).not.toContain('grandchild-1');
    });

    test('returns empty array for leaf account', () => {
      const children = getAccountChildren('great-grandchild-1', allAccounts);

      expect(children).toHaveLength(0);
    });
  });

  describe('getAccountPath', () => {
    test('returns full path from root to account', () => {
      const path = getAccountPath('great-grandchild-1', allAccounts);

      expect(path).toEqual([
        'Assets',
        'Current Assets',
        'Cash',
        'Checking Account'
      ]);
    });

    test('returns single element for root account', () => {
      const path = getAccountPath('root-1', allAccounts);

      expect(path).toEqual(['Assets']);
    });

    test('returns empty array for non-existent account', () => {
      const path = getAccountPath('non-existent', allAccounts);

      expect(path).toEqual([]);
    });
  });

  describe('getAccountDepth', () => {
    test('returns 0 for root account', () => {
      const depth = getAccountDepth('root-1', allAccounts);

      expect(depth).toBe(0);
    });

    test('returns 1 for immediate child', () => {
      const depth = getAccountDepth('child-1', allAccounts);

      expect(depth).toBe(1);
    });

    test('returns correct depth for deeply nested account', () => {
      const depth = getAccountDepth('great-grandchild-1', allAccounts);

      expect(depth).toBe(3);
    });
  });

  describe('getRootAccounts', () => {
    test('returns all accounts with no parent', () => {
      const roots = getRootAccounts(allAccounts);

      expect(roots).toHaveLength(2);
      expect(roots.map(a => a.id)).toContain('root-1');
      expect(roots.map(a => a.id)).toContain('liability-1');
    });

    test('returns empty array when no accounts have null parent', () => {
      const noRoots = [childAccount, grandchildAccount];
      const roots = getRootAccounts(noRoots);

      expect(roots).toHaveLength(0);
    });
  });

  describe('isLeafAccount', () => {
    test('returns true for account with no children', () => {
      const isLeaf = isLeafAccount('great-grandchild-1', allAccounts);

      expect(isLeaf).toBe(true);
    });

    test('returns false for account with children', () => {
      const isLeaf = isLeafAccount('root-1', allAccounts);

      expect(isLeaf).toBe(false);
    });
  });

  describe('getAccountsByCategory', () => {
    test('returns all accounts in a category', () => {
      const assets = getAccountsByCategory('ASSETS', allAccounts);

      expect(assets).toHaveLength(5);
      expect(assets.every(a => a.accountCategory === 'ASSETS')).toBe(true);
    });

    test('returns accounts in specific category', () => {
      const liabilities = getAccountsByCategory('LIABILITIES', allAccounts);

      expect(liabilities).toHaveLength(1);
      expect(liabilities[0].id).toBe('liability-1');
    });

    test('returns empty array for category with no accounts', () => {
      const revenue = getAccountsByCategory('REVENUE', allAccounts);

      expect(revenue).toHaveLength(0);
    });
  });
});
