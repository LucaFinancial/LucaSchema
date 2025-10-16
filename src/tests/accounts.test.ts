import { lucaValidator } from '../';
import { createTestAccount, createTestAccounts } from './test-utils';

const validateAccount = lucaValidator.getSchema('account');

describe('Account Schema Validation', () => {
  test('validates a valid account', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const account = createTestAccount();
    const valid = validateAccount(account);
    if (!valid) console.log(validateAccount.errors);
    expect(valid).toBe(true);
  });

  test('validates account with all categories', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const categories = [
      'ASSETS',
      'LIABILITIES',
      'EQUITY',
      'REVENUE',
      'EXPENSES'
    ];

    for (const category of categories) {
      const account = createTestAccount({
        accountCategory: category as any,
        normalBalance:
          category === 'ASSETS' || category === 'EXPENSES' ? 'DEBIT' : 'CREDIT'
      });
      const valid = validateAccount(account);
      if (!valid) console.log(category, validateAccount.errors);
      expect(valid).toBe(true);
    }
  });

  test('validates account with parent relationship', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const account = createTestAccount({
      parentAccountId: '123e4567-e89b-12d3-a456-426614174007'
    });
    const valid = validateAccount(account);
    if (!valid) console.log(validateAccount.errors);
    expect(valid).toBe(true);
  });

  test('validates account number pattern', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const validNumbers = ['1000', '12345', '1234567890'];

    for (const number of validNumbers) {
      const account = createTestAccount({ accountNumber: number });
      const valid = validateAccount(account);
      if (!valid) console.log(number, validateAccount.errors);
      expect(valid).toBe(true);
    }
  });

  test('rejects invalid account number pattern', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const invalidNumbers = ['123', '12345678901', 'ABC1', ''];

    for (const number of invalidNumbers) {
      const account = createTestAccount({ accountNumber: number });
      const valid = validateAccount(account);
      expect(valid).toBe(false);
    }
  });

  test('validates all account statuses', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const statuses = ['ACTIVE', 'INACTIVE', 'CLOSED'];

    for (const status of statuses) {
      const account = createTestAccount({ accountStatus: status as any });
      const valid = validateAccount(account);
      if (!valid) console.log(status, validateAccount.errors);
      expect(valid).toBe(true);
    }
  });

  test('validates normal balance types', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const balances = ['DEBIT', 'CREDIT'];

    for (const balance of balances) {
      const account = createTestAccount({ normalBalance: balance as any });
      const valid = validateAccount(account);
      if (!valid) console.log(balance, validateAccount.errors);
      expect(valid).toBe(true);
    }
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

  test('rejects account with missing required fields', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const invalidAccount = {
      id: '123e4567-e89b-12d3-a456-426614174006',
      name: 'Test Account'
      // Missing required fields
    };

    const valid = validateAccount(invalidAccount);
    expect(valid).toBe(false);
  });

  test('rejects account with invalid category', () => {
    if (!validateAccount) {
      throw new Error('Account schema not found in lucaValidator.');
    }

    const account = createTestAccount({
      accountCategory: 'INVALID_CATEGORY' as any
    });

    const valid = validateAccount(account);
    expect(valid).toBe(false);
  });
});
