import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

import schemas from './schemas';

const ajv = new Ajv2020();
addFormats(ajv);

Object.entries(schemas).forEach(([key, schema]) => {
  if (!ajv.validateSchema(schema)) {
    console.error(`Invalid schema: ${key}`);
    console.error(ajv.errors);
  } else {
    ajv.addSchema(schema, key);
  }
});

const validators = {
  validateCategory: ajv.getSchema('category'),
  validateEntity: ajv.getSchema('entity'),
  validateLucaSchema: ajv.getSchema('lucaSchema'),
  validateRecurringTransaction: ajv.getSchema('recurringTransaction'),
  validateRecurringTransactionEvent: ajv.getSchema('recurringTransactionEvent'),
  validateSchema: ajv.getSchema('schema'),
  validateTransaction: ajv.getSchema('transaction')
};

export default validators;
