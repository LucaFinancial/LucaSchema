import {
  account,
  category,
  common,
  enums as enumsSchema,
  lucaSchema as lucaSchemaJson,
  recurringTransaction,
  recurringTransactionEvent,
  statement,
  transaction,
  transactionSplit
} from './schemas/index.js';
import { enums, LucaSchemas } from './enums.js';
import {
  getDateFieldPaths,
  getDateFieldPathsByCollection,
  getRequiredFields,
  getValidFields,
  stripInvalidFields,
  validate,
  validateCollection
} from './lucaValidator.js';

const schemas = {
  account,
  category,
  common,
  lucaSchema: lucaSchemaJson,
  statement,
  recurringTransaction,
  recurringTransactionEvent,
  transaction,
  transactionSplit,
  enums: enumsSchema
};

export const accountSchema = schemas.account;
export const categorySchema = schemas.category;
export const lucaSchema = schemas.lucaSchema;
export const statementSchema = schemas.statement;
export const recurringTransactionSchema = schemas.recurringTransaction;
export const recurringTransactionEventSchema =
  schemas.recurringTransactionEvent;
export const transactionSchema = schemas.transaction;
export const transactionSplitSchema = schemas.transactionSplit;

export {
  enums,
  LucaSchemas,
  schemas,
  validate,
  validateCollection,
  getDateFieldPaths,
  getDateFieldPathsByCollection,
  getValidFields,
  getRequiredFields,
  stripInvalidFields
};
export default schemas;
