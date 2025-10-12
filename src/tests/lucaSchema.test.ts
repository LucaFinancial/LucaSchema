import exampleData from '../examples/lucaSchema.json';
import { lucaValidator } from '../';
import type { LucaSchema } from '../types';

const validateLucaSchema = lucaValidator.getSchema<LucaSchema>('lucaSchema');

test('example is a valid luca schema', () => {
  if (!validateLucaSchema) {
    throw new Error('Luca Schema not found in lucaValidator.');
  }

  const valid = validateLucaSchema(exampleData);
  if (!valid) console.log(validateLucaSchema.errors);
  expect(valid).toBe(true);
});
