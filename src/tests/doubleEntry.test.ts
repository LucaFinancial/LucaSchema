import { lucaValidator } from '../';
import { createTestTransaction } from './test-utils';

const validateTransaction = lucaValidator.getSchema('transaction');

describe('Double-Entry Validation', () => {
  test('validates transaction with balanced postings', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction();
    const valid = validateTransaction(transaction);
    expect(valid).toBe(true);
  });

  test('rejects transaction with unbalanced postings', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          amount: 10000,
          description: null,
          order: 0
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          amount: -5000, // Unbalanced: sum is 5000, not 0
          description: null,
          order: 1
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
    expect(validateTransaction.errors).toBeDefined();
    expect(
      validateTransaction.errors?.some(
        error => error.keyword === 'balancedPostings'
      )
    ).toBe(true);
    // Check that error message includes the sum
    const balanceError = validateTransaction.errors?.find(
      error => error.keyword === 'balancedPostings'
    );
    expect(balanceError?.message).toContain('5000');
  });

  test('rejects transaction with less than 2 postings', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          amount: 10000, // Non-zero amount
          description: null,
          order: 0
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
    expect(validateTransaction.errors).toBeDefined();
    expect(
      validateTransaction.errors?.some(error => error.keyword === 'minItems')
    ).toBe(true);
  });

  test('rejects posting with zero amount', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          amount: 0,
          description: null,
          order: 0
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          amount: 0,
          description: null,
          order: 1
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
    expect(validateTransaction.errors).toBeDefined();
    // Zero amounts are disallowed via "not" constraint
    expect(
      validateTransaction.errors?.some(error => error.keyword === 'not')
    ).toBe(true);
  });

  test('accepts transaction with multiple postings (split transaction)', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          amount: 10000,
          description: 'Groceries',
          order: 0
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          amount: 5000,
          description: 'Household items',
          order: 1
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174003',
          amount: -15000,
          description: 'Payment from checking',
          order: 2
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(true);
  });

  test('accepts transaction with positive and negative amounts', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          amount: 100000, // Positive (debit)
          description: null,
          order: 0
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          amount: -100000, // Negative (credit)
          description: null,
          order: 1
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(true);
  });

  test('validates posting amount is integer', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          amount: 100.5, // Not an integer
          description: null,
          order: 0
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          amount: -100.5,
          description: null,
          order: 1
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
    expect(validateTransaction.errors).toBeDefined();
    expect(
      validateTransaction.errors?.some(error => error.keyword === 'type')
    ).toBe(true);
  });

  test('validates posting accountId is UUID', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: 'invalid-uuid',
          amount: 10000,
          description: null,
          order: 0
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          amount: -10000,
          description: null,
          order: 1
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
    expect(validateTransaction.errors).toBeDefined();
    expect(
      validateTransaction.errors?.some(error => error.keyword === 'format')
    ).toBe(true);
  });

  test('validates posting order is non-negative integer', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          amount: 10000,
          description: null,
          order: -1 // Negative order not allowed
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          amount: -10000,
          description: null,
          order: 1
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(false);
    expect(validateTransaction.errors).toBeDefined();
    expect(
      validateTransaction.errors?.some(error => error.keyword === 'minimum')
    ).toBe(true);
  });

  test('accepts posting with null description', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          amount: 10000,
          description: null,
          order: 0
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          amount: -10000,
          description: null,
          order: 1
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(true);
  });

  test('accepts posting with string description', () => {
    if (!validateTransaction) {
      throw new Error('Transaction schema not found');
    }

    const transaction = createTestTransaction({
      postings: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          amount: 10000,
          description: 'Payment for services',
          order: 0
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          amount: -10000,
          description: 'Received from client',
          order: 1
        }
      ]
    });

    const valid = validateTransaction(transaction);
    expect(valid).toBe(true);
  });
});
