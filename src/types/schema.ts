// Schema types and utilities

export const SchemasEnum = {
  CATEGORY: 'category',
  ENTITY: 'entity',
  LUCASCHEMA: 'lucaSchema',
  RECURRING_TRANSACTION: 'recurringTransaction',
  RECURRING_TRANSACTION_EVENT: 'recurringTransactionEvent',
  TRANSACTION: 'transaction'
} as const;

// Extract type from runtime enum
export type SchemaType = (typeof SchemasEnum)[keyof typeof SchemasEnum];
