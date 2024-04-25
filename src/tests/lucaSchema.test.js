import exampleData from '../examples/lucaSchema.json';
import validators from '../validators';

const { validateLucaSchema } = validators;

test('full luca schema object is valid', () => {
  const valid = validateLucaSchema(exampleData);
  if (!valid) console.log(validateLucaSchema.errors);
  expect(valid).toBe(true);
});
