/**
 * Runtime enums for LucaSchema
 *
 * This module exports all runtime enumeration objects used throughout the
 * LucaSchema library. These provide actual values that can be used at runtime
 * for validation, UI dropdowns, iteration, etc.
 *
 * @fileoverview Runtime enum exports
 */

// Category enums
export { CategoryTypeEnum } from './category';

// Entity enums
export { EntityTypeEnum, EntityStatusEnum } from './entity';

// Transaction enums
export { TransactionStateEnum } from './transaction';

// Recurring transaction enums
export {
  RecurringTransactionFrequencyEnum,
  RecurringTransactionStateEnum,
  RecurringTransactionEventStatusEnum
} from './recurring';

// Schema enums
export { SchemasEnum } from './schema';

// Import all for backward compatibility object
import { CategoryTypeEnum } from './category';
import { EntityTypeEnum, EntityStatusEnum } from './entity';
import { TransactionStateEnum } from './transaction';
import {
  RecurringTransactionFrequencyEnum,
  RecurringTransactionStateEnum,
  RecurringTransactionEventStatusEnum
} from './recurring';
import { SchemasEnum } from './schema';

// Backward compatibility - single object export
const enums = {
  CategoryTypeEnum,
  EntityTypeEnum,
  EntityStatusEnum,
  TransactionStateEnum,
  RecurringTransactionFrequencyEnum,
  RecurringTransactionStateEnum,
  RecurringTransactionEventStatusEnum,
  SchemasEnum
} as const;

export default enums;
