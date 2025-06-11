import { AnySchema } from 'ajv';
import category from './category.json';
import common from './common.json';
import entity from './entity.json';
import lucaSchema from './lucaSchema.json';
import recurringTransaction from './recurringTransaction.json';
import recurringTransactionEvent from './recurringTransactionEvent.json';
import transaction from './transaction.json';

export interface Schemas {
  category: AnySchema;
  common: AnySchema;
  entity: AnySchema;
  lucaSchema: AnySchema;
  recurringTransaction: AnySchema;
  recurringTransactionEvent: AnySchema;
  transaction: AnySchema;
}

const schemas: Schemas = {
  category,
  common,
  entity,
  lucaSchema,
  recurringTransaction,
  recurringTransactionEvent,
  transaction
};

export default schemas; 