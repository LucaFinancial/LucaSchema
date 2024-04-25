import exampleData from '../examples/schemas.json';
import validators from '../validators';

const { validateSchema } = validators;

test('examples are valid schema objects', () => {
  exampleData.forEach(example => {
    const valid = validateSchema(example);
    if (!valid) console.log(validateSchema.errors);
    expect(valid).toBe(true);
  });
});
