import {
  account,
  category,
  common,
  enums as enumsSchema,
  lucaSchema as lucaSchemaJson,
  recurringTransaction,
  recurringTransactionEvent,
  recurringTransactionLink,
  statement,
  transaction,
  transactionLink,
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
  recurringTransactionLink,
  transaction,
  transactionLink,
  transactionSplit,
  enums: enumsSchema
};

export const accountSchema = schemas.account;
export const categorySchema = schemas.category;
export const lucaSchema = schemas.lucaSchema;
export const SCHEMA_VERSION = lucaSchemaJson.properties.schemaVersion.const;
export const statementSchema = schemas.statement;
export const recurringTransactionSchema = schemas.recurringTransaction;
export const recurringTransactionEventSchema =
  schemas.recurringTransactionEvent;
export const recurringTransactionLinkSchema = schemas.recurringTransactionLink;
export const transactionSchema = schemas.transaction;
export const transactionLinkSchema = schemas.transactionLink;
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
