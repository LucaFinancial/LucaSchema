import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

import schemas from './schemas';

const lucaValidator = new Ajv2020();
addFormats(lucaValidator);

Object.entries(schemas).forEach(([key, schema]) => {
  if (!lucaValidator.validateSchema(schema)) {
    console.error(`Invalid schema: ${key}`);
    console.error(lucaValidator.errors);
  } else {
    lucaValidator.addSchema(schema, key);
  }
});

export default lucaValidator;
