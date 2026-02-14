import { expect } from '@jest/globals';

export const commonBase = {
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};

export const ids = {
  accountId: '00000000-0000-0000-0000-000000000001',
  categoryId: '00000000-0000-0000-0000-000000000002',
  recurringTransactionId: '00000000-0000-0000-0000-000000000003',
  recurringTransactionEventId: '00000000-0000-0000-0000-000000000004',
  transactionId: '00000000-0000-0000-0000-000000000005',
  transactionSplitId: '00000000-0000-0000-0000-000000000006',
  lucaSchemaId: '00000000-0000-0000-0000-000000000007',
  statementId: '00000000-0000-0000-0000-000000000008'
};

const accountTemplate = {
  id: ids.accountId,
  ...commonBase,
  name: 'Checking',
  type: 'CHECKING'
};

const categoryTemplate = {
  id: ids.categoryId,
  ...commonBase,
  slug: 'food',
  name: 'Food',
  description: null,
  parentId: null
};

const recurringTransactionTemplate = {
  id: ids.recurringTransactionId,
  ...commonBase,
  accountId: ids.accountId,
  categoryId: null,
  amount: 100,
  description: 'Gym membership',
  frequency: 'MONTH',
  interval: 1,
  occurrences: null,
  startOn: '2024-01-01',
  endOn: null,
  recurringTransactionState: 'ACTIVE'
};

const recurringTransactionEventTemplate = {
  id: ids.recurringTransactionEventId,
  ...commonBase,
  transactionId: null,
  recurringTransactionId: ids.recurringTransactionId,
  expectedDate: '2024-02-01',
  eventState: 'DELETED'
};

const transactionTemplate = {
  id: ids.transactionId,
  ...commonBase,
  accountId: ids.accountId,
  date: '2024-02-01',
  amount: -20,
  description: 'Coffee',
  memo: null,
  categoryId: null,
  statementId: null,
  transactionState: 'COMPLETED',
  authorizedAt: null,
  postedAt: null,
  currency: 'USD',
  aggregationServiceId: null,
  deletedAt: null
};

const transactionSplitTemplate = {
  id: ids.transactionSplitId,
  ...commonBase,
  transactionId: ids.transactionId,
  amount: 10,
  categoryId: null,
  description: null,
  memo: null
};

const statementTemplate = {
  id: ids.statementId,
  ...commonBase,
  accountId: ids.accountId,
  startDate: '2024-01-02',
  endDate: '2024-02-01',
  startingBalance: 0,
  endingBalance: 2000,
  totalCharges: 2500,
  totalPayments: 500,
  isLocked: false
};

const lucaSchemaDocTemplate = {
  schemaVersion: '2.2.0'
};

export const makeAccount = (overrides = {}) => ({
  ...structuredClone(accountTemplate),
  ...overrides
});

export const makeCategory = (overrides = {}) => ({
  ...structuredClone(categoryTemplate),
  ...overrides
});

export const makeRecurringTransaction = (overrides = {}) => ({
  ...structuredClone(recurringTransactionTemplate),
  ...overrides
});

export const makeRecurringTransactionEvent = (overrides = {}) => ({
  ...structuredClone(recurringTransactionEventTemplate),
  ...overrides
});

export const makeTransaction = (overrides = {}) => ({
  ...structuredClone(transactionTemplate),
  ...overrides
});

export const makeTransactionSplit = (overrides = {}) => ({
  ...structuredClone(transactionSplitTemplate),
  ...overrides
});

export const makeStatement = (overrides = {}) => ({
  ...structuredClone(statementTemplate),
  ...overrides
});

export const makeLucaSchemaDoc = (overrides = {}) => ({
  ...structuredClone(lucaSchemaDocTemplate),
  ...overrides,
  categories: overrides.categories ?? [makeCategory()],
  accounts: overrides.accounts ?? [makeAccount()],
  recurringTransactions: overrides.recurringTransactions ?? [
    makeRecurringTransaction()
  ],
  recurringTransactionEvents: overrides.recurringTransactionEvents ?? [
    makeRecurringTransactionEvent()
  ],
  statements: overrides.statements ?? [makeStatement()],
  transactions: overrides.transactions ?? [makeTransaction()],
  transactionSplits: overrides.transactionSplits ?? [makeTransactionSplit()]
});

export function expectValid(validate, schemaKey, payload) {
  const result = validate(schemaKey, payload);
  expect(result.valid).toBe(true);
  expect(result.errors).toEqual([]);
}

export function expectInvalid(validate, schemaKey, payload) {
  const result = validate(schemaKey, payload);
  expect(result.valid).toBe(false);
  expect(result.errors.length).toBeGreaterThan(0);
}
