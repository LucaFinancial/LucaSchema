import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import accountSchemaJson from './schemas/account.json' with { type: 'json' };
import categorySchemaJson from './schemas/category.json' with { type: 'json' };
import commonSchemaJson from './schemas/common.json' with { type: 'json' };
import enumsSchemaJson from './schemas/enums.json' with { type: 'json' };
import lucaSchemaJson from './schemas/lucaSchema.json' with { type: 'json' };
import statementSchemaJson from './schemas/statement.json' with { type: 'json' };
import recurringTransactionSchemaJson from './schemas/recurringTransaction.json' with { type: 'json' };
import recurringTransactionEventSchemaJson from './schemas/recurringTransactionEvent.json' with { type: 'json' };
import transactionSchemaJson from './schemas/transaction.json' with { type: 'json' };
import transactionSplitSchemaJson from './schemas/transactionSplit.json' with { type: 'json' };

const schemas = {
  account: accountSchemaJson,
  category: categorySchemaJson,
  lucaSchema: lucaSchemaJson,
  statement: statementSchemaJson,
  recurringTransaction: recurringTransactionSchemaJson,
  recurringTransactionEvent: recurringTransactionEventSchemaJson,
  transaction: transactionSchemaJson,
  transactionSplit: transactionSplitSchemaJson
};

const supportSchemas = [commonSchemaJson, enumsSchemaJson];

let sharedAjv;
const validFieldsCache = new Map();
const requiredFieldsCache = new Map();
const dateFieldPathsCache = new Map();

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

function getSchema(schemaKey) {
  const schema = schemas[schemaKey];
  if (!schema) {
    throw new Error(`Unknown schema: ${schemaKey}`);
  }
  return schema;
}

function usesCommonSchema(schema) {
  if (!Array.isArray(schema?.allOf)) return false;
  return schema.allOf.some(entry => {
    if (!entry || typeof entry !== 'object') return false;
    if (typeof entry.$ref !== 'string') return false;
    return entry.$ref.includes('common.json');
  });
}

function getSchemaProperties(schema) {
  const properties = schema?.properties ?? {};
  if (!usesCommonSchema(schema)) return properties;
  return {
    ...commonSchemaJson.properties,
    ...properties
  };
}

function getSchemaRequired(schema) {
  const required = Array.isArray(schema?.required) ? schema.required : [];
  if (!usesCommonSchema(schema)) return required;
  const commonRequired = Array.isArray(commonSchemaJson.required)
    ? commonSchemaJson.required
    : [];
  return [...commonRequired, ...required];
}

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function collectDatePathsFromSchemaFragment(schemaFragment, prefix = '') {
  if (!schemaFragment || typeof schemaFragment !== 'object') return [];

  const paths = [];
  const properties = isPlainObject(schemaFragment.properties)
    ? schemaFragment.properties
    : {};

  for (const [fieldName, fieldSchema] of Object.entries(properties)) {
    const path = prefix ? `${prefix}.${fieldName}` : fieldName;
    if (!fieldSchema || typeof fieldSchema !== 'object') continue;

    if (fieldSchema.format === 'date') {
      paths.push(path);
    }

    paths.push(...collectDatePathsFromSchemaFragment(fieldSchema, path));

    if (fieldSchema.items && typeof fieldSchema.items === 'object') {
      const itemPath = `${path}[]`;
      paths.push(
        ...collectDatePathsFromSchemaFragment(fieldSchema.items, itemPath)
      );
    }
  }

  return paths;
}

export function validate(schemaKey, data) {
  const ajv = getValidator();
  const schema = getSchema(schemaKey);
  const isValid = ajv.validate(schema, data);
  const errors = ajv.errors ?? [];
  return {
    valid: isValid,
    errors
  };
}

/**
 * Returns a cached Set of valid field names for the given schema key.
 * Treat the returned Set as read-only.
 * @param {string} schemaKey
 * @returns {Set<string>}
 */
export function getValidFields(schemaKey) {
  if (validFieldsCache.has(schemaKey)) {
    return validFieldsCache.get(schemaKey);
  }
  const schema = getSchema(schemaKey);
  const properties = getSchemaProperties(schema);
  const fields = new Set(Object.keys(properties));
  validFieldsCache.set(schemaKey, fields);
  return fields;
}

/**
 * Returns a cached Set of required field names for the given schema key.
 * Treat the returned Set as read-only.
 * @param {string} schemaKey
 * @returns {Set<string>}
 */
export function getRequiredFields(schemaKey) {
  if (requiredFieldsCache.has(schemaKey)) {
    return requiredFieldsCache.get(schemaKey);
  }
  const schema = getSchema(schemaKey);
  const required = getSchemaRequired(schema);
  const fields = new Set(required);
  requiredFieldsCache.set(schemaKey, fields);
  return fields;
}

/**
 * Returns cached date-format field paths for a schema key.
 * Paths are dot-delimited and include [] for array item traversal.
 * @param {string} schemaKey
 * @returns {Array<string>}
 */
export function getDateFieldPaths(schemaKey) {
  if (dateFieldPathsCache.has(schemaKey)) {
    return dateFieldPathsCache.get(schemaKey);
  }

  const schema = getSchema(schemaKey);
  const paths = collectDatePathsFromSchemaFragment({
    properties: getSchemaProperties(schema)
  });
  const deduped = [...new Set(paths)];
  dateFieldPathsCache.set(schemaKey, deduped);
  return deduped;
}

/**
 * Returns date-format field paths keyed by collection name.
 * @returns {{
 *   accounts: Array<string>,
 *   categories: Array<string>,
 *   statements: Array<string>,
 *   recurringTransactions: Array<string>,
 *   recurringTransactionEvents: Array<string>,
 *   transactions: Array<string>,
 *   transactionSplits: Array<string>
 * }}
 */
export function getDateFieldPathsByCollection() {
  return {
    accounts: getDateFieldPaths('account'),
    categories: getDateFieldPaths('category'),
    statements: getDateFieldPaths('statement'),
    recurringTransactions: getDateFieldPaths('recurringTransaction'),
    recurringTransactionEvents: getDateFieldPaths('recurringTransactionEvent'),
    transactions: getDateFieldPaths('transaction'),
    transactionSplits: getDateFieldPaths('transactionSplit')
  };
}

/**
 * Returns a new object containing only fields defined in the schema.
 * @param {string} schemaKey
 * @param {object | null | undefined} data
 * @returns {object}
 */
export function stripInvalidFields(schemaKey, data) {
  if (data === null || data === undefined) return {};
  if (!isPlainObject(data)) {
    throw new TypeError('Expected a plain object for data');
  }
  const validFields = getValidFields(schemaKey);
  const cleaned = {};
  for (const [key, value] of Object.entries(data)) {
    if (validFields.has(key)) cleaned[key] = value;
  }
  return cleaned;
}

/**
 * Validates an array of entities efficiently and returns structured errors.
 * @param {string} schemaKey
 * @param {Array<any>} arrayOfEntities
 * @returns {{ valid: boolean, errors: Array<{ index: number, entity: any, errors: Array<any> }> }}
 */
export function validateCollection(schemaKey, arrayOfEntities) {
  if (!Array.isArray(arrayOfEntities)) {
    throw new TypeError('Expected an array of entities');
  }
  const ajv = getValidator();
  const schema = getSchema(schemaKey);
  const validateFn = ajv.getSchema(schema.$id) ?? ajv.compile(schema);
  const errors = [];

  arrayOfEntities.forEach((entity, index) => {
    const isValid = validateFn(entity);
    if (!isValid) {
      const entityErrors = validateFn.errors ?? [];
      errors.push({
        index,
        entity,
        errors: entityErrors
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

export { schemas };
