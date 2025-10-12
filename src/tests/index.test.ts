import { lucaValidator, enums, schemas } from '../index';

test('exports lucaValidator', () => {
  expect(lucaValidator).toBeDefined();
  expect(typeof lucaValidator.getSchema).toBe('function');
  expect(typeof lucaValidator.validate).toBe('function');
});

test('exports enums', () => {
  expect(enums).toBeDefined();
  expect(enums.TransactionStateEnum).toBeDefined();
  expect(enums.EntityTypeEnum).toBeDefined();
  expect(enums.EntityStatusEnum).toBeDefined();
  expect(enums.CategoryTypeEnum).toBeDefined();
  expect(enums.RecurringTransactionStateEnum).toBeDefined();
  expect(enums.RecurringTransactionEventStatusEnum).toBeDefined();
  expect(enums.RecurringTransactionFrequencyEnum).toBeDefined();
});

test('exports schemas', () => {
  expect(schemas).toBeDefined();
  expect(schemas.transaction).toBeDefined();
  expect(schemas.entity).toBeDefined();
  expect(schemas.category).toBeDefined();
  expect(schemas.recurringTransaction).toBeDefined();
  expect(schemas.recurringTransactionEvent).toBeDefined();
  expect(schemas.lucaSchema).toBeDefined();
});
