import exampleData from '../examples/entities.json';
import validators from '../validators';

const { validateEntity } = validators;

test('examples are valid entities', () => {
  exampleData.forEach(example => {
    const valid = validateEntity(example);
    if (!valid) console.log(validateEntity.errors);
    expect(valid).toBe(true);
  });
});
