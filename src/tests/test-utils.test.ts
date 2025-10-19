import {
  createTestTransaction,
  createTestEntity,
  createTestCategory,
  createTestRecurringTransaction,
  createTestRecurringTransactionEvent,
  createTestLucaSchema,
  createTestTransactions,
  createTestEntities,
  createTestCategories,
  createTestPosting
} from './test-utils';

test('createTestPosting creates valid posting', () => {
  const posting = createTestPosting();
  expect(posting).toMatchObject({
    accountId: expect.any(String),
    amount: expect.any(Number),
    order: expect.any(Number)
  });
  expect(posting.description).toBeNull();
});

test('createTestTransaction creates valid transaction', () => {
  const transaction = createTestTransaction();
  expect(transaction).toMatchObject({
    id: expect.any(String),
    postings: expect.any(Array),
    date: expect.any(String),
    description: expect.any(String),
    transactionState: expect.any(String),
    createdAt: expect.any(String)
  });
  expect(transaction.postings).toHaveLength(2);
  expect(transaction.postings[0]).toMatchObject({
    accountId: expect.any(String),
    amount: expect.any(Number),
    order: expect.any(Number)
  });
});

test('createTestEntity creates valid entity', () => {
  const entity = createTestEntity();
  expect(entity).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    entityType: expect.any(String),
    entityStatus: expect.any(String),
    createdAt: expect.any(String)
  });
});

test('createTestCategory creates valid category', () => {
  const category = createTestCategory();
  expect(category).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    categoryType: expect.any(String),
    createdAt: expect.any(String)
  });
});

test('createTestRecurringTransaction creates valid recurring transaction', () => {
  const recurringTransaction = createTestRecurringTransaction();
  expect(recurringTransaction).toMatchObject({
    id: expect.any(String),
    postings: expect.any(Array),
    frequency: expect.any(String),
    interval: expect.any(Number),
    recurringTransactionState: expect.any(String),
    createdAt: expect.any(String)
  });
  expect(recurringTransaction.postings).toHaveLength(2);
});

test('createTestRecurringTransactionEvent creates valid event', () => {
  const event = createTestRecurringTransactionEvent();
  expect(event).toMatchObject({
    id: expect.any(String),
    transactionId: expect.any(String),
    recurringTransactionId: expect.any(String),
    expectedDate: expect.any(String),
    eventState: expect.any(String),
    createdAt: expect.any(String)
  });
});

test('createTestLucaSchema creates valid schema', () => {
  const schema = createTestLucaSchema();
  expect(schema).toMatchObject({
    schemaVersion: expect.any(String),
    entities: expect.any(Array),
    categories: expect.any(Array),
    transactions: expect.any(Array),
    recurringTransactions: expect.any(Array),
    recurringTransactionEvents: expect.any(Array)
  });
});

test('createTestTransactions creates array of transactions', () => {
  const count = 5;
  const transactions = createTestTransactions(count);
  expect(transactions).toHaveLength(count);
  transactions.forEach(transaction => {
    expect(transaction).toMatchObject({
      id: expect.any(String),
      postings: expect.any(Array)
    });
    expect(transaction.postings).toHaveLength(2);
  });
});

test('createTestEntities creates array of entities', () => {
  const count = 3;
  const entities = createTestEntities(count);
  expect(entities).toHaveLength(count);
  entities.forEach(entity => {
    expect(entity).toMatchObject({
      id: expect.any(String),
      name: expect.any(String)
    });
  });
});

test('createTestCategories creates array of categories', () => {
  const count = 4;
  const categories = createTestCategories(count);
  expect(categories).toHaveLength(count);
  categories.forEach(category => {
    expect(category).toMatchObject({
      id: expect.any(String),
      name: expect.any(String)
    });
  });
});
