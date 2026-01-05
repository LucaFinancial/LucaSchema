import { describe, test } from '@jest/globals';
import { validate } from '../index.js';
import {
  makeLucaSchemaDoc,
  makeAccount,
  makeCategory,
  makeRecurringTransaction,
  makeRecurringTransactionEvent,
  makeTransaction,
  makeTransactionSplit,
  expectValid,
  expectInvalid
} from './test-fixtures.js';

describe('lucaSchema aggregate', () => {
  test('valid lucaSchema document', () => {
    const lucaSchemaDoc = makeLucaSchemaDoc();
    expectValid(validate, 'lucaSchema', lucaSchemaDoc);
  });

  test('missing accounts is invalid', () => {
    const lucaSchemaDoc = makeLucaSchemaDoc();
    delete lucaSchemaDoc.accounts;
    expectInvalid(validate, 'lucaSchema', lucaSchemaDoc);
  });

  test('propagates invalid nested entity', () => {
    const badAccount = makeAccount({ type: undefined });
    const doc = makeLucaSchemaDoc({
      accounts: [badAccount],
      categories: [makeCategory()],
      recurringTransactions: [makeRecurringTransaction()],
      recurringTransactionEvents: [makeRecurringTransactionEvent()],
      transactions: [makeTransaction()],
      transactionSplits: [makeTransactionSplit()]
    });
    expectInvalid(validate, 'lucaSchema', doc);
  });
});
