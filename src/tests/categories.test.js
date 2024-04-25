import exampleData from '../examples/categories.json';
import validators from '../validators';

const { validateCategory } = validators;

test('examples are valid categories', () => {
  exampleData.forEach(example => {
    const valid = validateCategory(example);
    if (!valid) console.log(validateCategory.errors);
    expect(valid).toBe(true);
  });
});
