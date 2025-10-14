import { lucaValidator } from '../';
import { createTestAccount, createTestAccounts } from './test-utils';

const validateAccount = lucaValidator.getSchema('account');

describe('Account validation', () => {
  test('validates a single account', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const account = createTestAccount();
    const valid = validateAccount(account);
    if (!valid) console.log(validateAccount.errors);
    expect(valid).toBe(true);
  });

  test('validates multiple accounts', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const accounts = createTestAccounts(5);
    for (const account of accounts) {
      const valid = validateAccount(account);
      if (!valid) console.log(validateAccount.errors);
      expect(valid).toBe(true);
    }
  });

  test('validates account with custom overrides', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const account = createTestAccount({
      name: 'Savings Account',
      accountNumber: '1020',
      accountType: 'ASSET',
      description: 'High-yield savings account'
    });
    const valid = validateAccount(account);
    if (!valid) console.log(validateAccount.errors);
    expect(valid).toBe(true);
  });

  test('validates all account types', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const accountTypes = ['ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'];

    for (const accountType of accountTypes) {
      const account = createTestAccount({ accountType: accountType as any });
      const valid = validateAccount(account);
      if (!valid) {
        console.log(
          `Failed for account type: ${accountType}`,
          validateAccount.errors
        );
      }
      expect(valid).toBe(true);
    }
  });

  test('validates account with parent account', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const account = createTestAccount({
      name: 'Petty Cash',
      accountNumber: '1001',
      parentAccountId: '30000000-0000-0000-0000-000000000001'
    });
    const valid = validateAccount(account);
    if (!valid) console.log(validateAccount.errors);
    expect(valid).toBe(true);
  });

  test('validates inactive account', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const account = createTestAccount({ isActive: false });
    const valid = validateAccount(account);
    if (!valid) console.log(validateAccount.errors);
    expect(valid).toBe(true);
  });

  test('rejects account without required fields', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const invalidAccount = {
      id: '30000000-0000-0000-0000-000000000001',
      name: 'Test Account',
      // missing accountNumber, accountType, isActive
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: null
    };

    const valid = validateAccount(invalidAccount);
    expect(valid).toBe(false);
    expect(validateAccount.errors).toBeDefined();
    expect(validateAccount.errors!.length).toBeGreaterThan(0);
  });

  test('rejects account with invalid account type', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const invalidAccount = createTestAccount({ accountType: 'INVALID' as any });
    const valid = validateAccount(invalidAccount);
    expect(valid).toBe(false);
    expect(validateAccount.errors).toBeDefined();
    expect(validateAccount.errors!.some(err => err.keyword === 'enum')).toBe(
      true
    );
  });

  test('rejects account with invalid account number format', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const invalidAccount = createTestAccount({ accountNumber: 'ABC123' });
    const valid = validateAccount(invalidAccount);
    expect(valid).toBe(false);
    expect(validateAccount.errors).toBeDefined();
  });

  test('rejects account with invalid UUID format for parentAccountId', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const invalidAccount = createTestAccount({ parentAccountId: 'not-a-uuid' });
    const valid = validateAccount(invalidAccount);
    expect(valid).toBe(false);
    expect(validateAccount.errors).toBeDefined();
    expect(validateAccount.errors!.some(err => err.keyword === 'format')).toBe(
      true
    );
  });
});
