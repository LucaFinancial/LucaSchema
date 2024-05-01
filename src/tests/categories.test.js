import exampleData from '../examples/categories.json';
import { lucaValidator } from '../';

const  validateCategory  = lucaValidator.getSchema('category');

test('examples are valid categories', () => {
  exampleData.forEach(example => {
    const valid = validateCategory(example);
    if (!valid) console.log(validateCategory.errors);
    expect(valid).toBe(true);
  });
});
