import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import accountSchemaJson from './schemas/account.json' assert { type: 'json' };
import categorySchemaJson from './schemas/category.json' assert { type: 'json' };
import commonSchemaJson from './schemas/common.json' assert { type: 'json' };
import enumsSchemaJson from './schemas/enums.json' assert { type: 'json' };
import lucaSchemaJson from './schemas/lucaSchema.json' assert { type: 'json' };
import recurringTransactionSchemaJson from './schemas/recurringTransaction.json' assert { type: 'json' };
import recurringTransactionEventSchemaJson from './schemas/recurringTransactionEvent.json' assert { type: 'json' };
import transactionSchemaJson from './schemas/transaction.json' assert { type: 'json' };
import transactionSplitSchemaJson from './schemas/transactionSplit.json' assert { type: 'json' };

const schemas = {
  account: accountSchemaJson,
  category: categorySchemaJson,
  lucaSchema: lucaSchemaJson,
  recurringTransaction: recurringTransactionSchemaJson,
  recurringTransactionEvent: recurringTransactionEventSchemaJson,
  transaction: transactionSchemaJson,
  transactionSplit: transactionSplitSchemaJson
};

const supportSchemas = [commonSchemaJson, enumsSchemaJson];

let sharedAjv;

function getValidator() {
  if (sharedAjv) return sharedAjv;
  const ajv = new Ajv2020({
    strict: true,
    strictRequired: false,
    allErrors: true
  });
  ajv.addKeyword({
    keyword: 'LucaSchemas',
    schemaType: 'object',
    validate: () => true
  });
  addFormats(ajv);
  for (const schema of [...supportSchemas, ...Object.values(schemas)]) {
    ajv.addSchema(schema);
  }
  sharedAjv = ajv;
  return sharedAjv;
}

export function validate(schemaKey, data) {
  const ajv = getValidator();
  const schema = schemas[schemaKey];
  if (!schema) {
    throw new Error(`Unknown schema: ${schemaKey}`);
  }
  const isValid = ajv.validate(schema, data);
  return { valid: isValid, errors: ajv.errors ?? [] };
}

export { schemas };
