import { describe, expect, test } from '@jest/globals';
import { validate, SCHEMA_VERSION, lucaSchema } from '../index.js';
import {
  makeLucaSchemaDoc,
  makeAccount,
  makeCategory,
  makeRecurringTransaction,
  makeRecurringTransactionEvent,
  makeTransaction,
  makeTransactionLink,
  makeTransactionSplit,
  ids,
  expectValid,
  expectInvalid
} from './test-fixtures.js';

describe('lucaSchema aggregate', () => {
  test('exports SCHEMA_VERSION from lucaSchema contract', () => {
    expect(SCHEMA_VERSION).toBe(lucaSchema.properties.schemaVersion.const);
  });

  test('valid lucaSchema document', () => {
    const lucaSchemaDoc = makeLucaSchemaDoc();
    expectValid(validate, 'lucaSchema', lucaSchemaDoc);
  });

  test('valid lucaSchema document with transaction links', () => {
    const linkedTransaction = makeTransaction({
      id: ids.linkedTransactionId,
      accountId: ids.secondaryAccountId,
      amount: 20,
      description: 'Coffee reimbursement'
    });
    const lucaSchemaDoc = makeLucaSchemaDoc({
      accounts: [
        makeAccount(),
        makeAccount({
          id: ids.secondaryAccountId,
          name: 'Savings',
          type: 'SAVINGS'
        })
      ],
      transactions: [makeTransaction(), linkedTransaction],
      transactionLinks: [makeTransactionLink()]
    });
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

  test('propagates invalid nested transactionLink entity', () => {
    const doc = makeLucaSchemaDoc({
      transactionLinks: [
        makeTransactionLink({ destinationTransactionId: undefined })
      ]
    });
    expectInvalid(validate, 'lucaSchema', doc);
  });

  test('unknown top-level fields are invalid', () => {
    const doc = makeLucaSchemaDoc({ unexpectedField: true });
    expectInvalid(validate, 'lucaSchema', doc);
  });
});
