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

// Entity enums (includes AccountTypeEnum for personal finance accounts)
export { EntityTypeEnum, EntityStatusEnum, AccountTypeEnum } from './entity';

// Transaction enums
export { TransactionStateEnum, EntryTypeEnum } from './transaction';

// Recurring transaction enums
export {
  RecurringTransactionFrequencyEnum,
  RecurringTransactionStateEnum,
  RecurringTransactionEventStatusEnum
} from './recurring';

// Schema enums
export { SchemasEnum } from './schema';

// Account enums (for chart of accounts)
export {
  AccountCategoryEnum,
  NormalBalanceEnum,
  AccountStatusEnum
} from './account';

// Import all for backward compatibility object
import { CategoryTypeEnum } from './category';
import { EntityTypeEnum, EntityStatusEnum, AccountTypeEnum } from './entity';
import { TransactionStateEnum, EntryTypeEnum } from './transaction';
import {
  RecurringTransactionFrequencyEnum,
  RecurringTransactionStateEnum,
  RecurringTransactionEventStatusEnum
} from './recurring';
import { SchemasEnum } from './schema';
import {
  AccountCategoryEnum,
  NormalBalanceEnum,
  AccountStatusEnum
} from './account';

// Backward compatibility - single object export
const enums = {
  AccountTypeEnum,
  CategoryTypeEnum,
  EntityTypeEnum,
  EntityStatusEnum,
  TransactionStateEnum,
  EntryTypeEnum,
  RecurringTransactionFrequencyEnum,
  RecurringTransactionStateEnum,
  RecurringTransactionEventStatusEnum,
  SchemasEnum,
  AccountCategoryEnum,
  NormalBalanceEnum,
  AccountStatusEnum
} as const;

export default enums;
