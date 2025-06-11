import exampleData from '../examples/categories.json';
import { lucaValidator } from '../';
import type { Category } from '../types';

const validateCategory = lucaValidator.getSchema<Category>('category');

test('examples are valid categories', () => {
  if (!validateCategory) {
    throw new Error('Category schema not found in lucaValidator.');
  }

  for (const example of exampleData) {
    const valid = validateCategory(example);
    if (!valid) console.log(validateCategory.errors);
    expect(valid).toBe(true);
  }
}); 