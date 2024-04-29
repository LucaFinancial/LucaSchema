import exampleData from '../examples/entities.json';
import { lucaValidator } from '../';

const validateEntity = lucaValidator.getSchema('entity');

test('examples are valid entities', () => {
  exampleData.forEach(example => {
    const valid = validateEntity(example);
    if (!valid) console.log(validateEntity.errors);
    expect(valid).toBe(true);
  });
});
