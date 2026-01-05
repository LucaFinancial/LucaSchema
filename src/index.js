import * as schemaIndex from './schemas/index.js';
import { enums, LucaSchemas } from './enums.js';
import { validate } from './lucaValidator.js';

const schemas = { ...schemaIndex, enums: schemaIndex.enums };

export const accountSchema = schemas.account;
export const categorySchema = schemas.category;
export const lucaSchema = schemas.lucaSchema;
export const recurringTransactionSchema = schemas.recurringTransaction;
export const recurringTransactionEventSchema =
  schemas.recurringTransactionEvent;
export const transactionSchema = schemas.transaction;
export const transactionSplitSchema = schemas.transactionSplit;

export { enums, LucaSchemas, schemas, validate };
export default schemas;
