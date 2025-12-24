import { AnySchema } from 'ajv';
import account from './account.json';
import category from './category.json';
import common from './common.json';
import lucaSchema from './lucaSchema.json';
import recurringTransaction from './recurringTransaction.json';
import recurringTransactionEvent from './recurringTransactionEvent.json';
import transaction from './transaction.json';
import transactionSplit from './transactionSplit.json';

export interface Schemas {
  account: AnySchema;
  category: AnySchema;
  common: AnySchema;
  lucaSchema: AnySchema;
  recurringTransaction: AnySchema;
  recurringTransactionEvent: AnySchema;
  transaction: AnySchema;
  transactionSplit: AnySchema;
}

const schemas: Schemas = {
  account,
  category,
  common,
  lucaSchema,
  recurringTransaction,
  recurringTransactionEvent,
  transaction,
  transactionSplit
};

export default schemas;
