import exampleData from '../examples/entities.json';
import { lucaValidator } from '../';
import type { Entity } from '../types';

const validateEntity = lucaValidator.getSchema<Entity>('entity');

test('examples are valid entities', () => {
  if (!validateEntity) {
    throw new Error('Entity schema not found in lucaValidator.');
  }

  for (const example of exampleData) {
    const valid = validateEntity(example);
    if (!valid) console.log(validateEntity.errors);
    expect(valid).toBe(true);
  }
});
