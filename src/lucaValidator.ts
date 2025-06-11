import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import { AnySchema } from 'ajv';

import schemas from './schemas';

const lucaValidator = new Ajv2020();
addFormats(lucaValidator);

Object.entries(schemas).forEach(([key, schema]) => {
  if (!lucaValidator.validateSchema(schema as AnySchema)) {
    console.error(`Invalid schema: ${key}`);
    console.error(lucaValidator.errors);
  } else {
    lucaValidator.addSchema(schema as AnySchema, key);
  }
});

export interface ValidateFunction<T> {
  (data: unknown): data is T;
  errors: any[] | null;
}

export interface LucaValidator {
  getSchema<T>(key: string): ValidateFunction<T> | undefined;
  validate<T>(schema: AnySchema, data: unknown): data is T;
  errors: any[] | null;
}

export default lucaValidator as LucaValidator; 