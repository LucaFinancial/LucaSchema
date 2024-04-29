import exampleData from '../examples/lucaSchema.json';
import { lucaValidator  } from '../';

const validateLucaSchema = lucaValidator.getSchema('lucaSchema');

test('full luca schema object is valid', () => {
  const valid = validateLucaSchema(exampleData);
  if (!valid) console.log(validateLucaSchema.errors);
  expect(valid).toBe(true);
});
