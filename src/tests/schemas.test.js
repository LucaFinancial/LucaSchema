import exampleData from '../examples/schemas.json';
import { lucaValidator } from '../';

const validateSchema = lucaValidator.getSchema('schema');

test('examples are valid schema objects', () => {
  exampleData.forEach(example => {
    const valid = validateSchema(example);
    if (!valid) console.log(validateSchema.errors);
    expect(valid).toBe(true);
  });
});
