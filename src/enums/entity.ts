/**
 * Entity enumeration definitions
 * Runtime enums for entity-related constants
 */

// Import types for satisfies constraints
import type { EntityType, EntityStatus, AccountType } from '../types';

/**
 * Entity type enumeration for categorizing different kinds of entities
 */
export const EntityTypeEnum = {
  /** Bank account or financial institution account */
  ACCOUNT: 'ACCOUNT',
  /** Retail business or merchant */
  RETAILER: 'RETAILER',
  /** Service provider (utilities, subscriptions, etc.) */
  SERVICE: 'SERVICE',
  /** Individual person or sole proprietor */
  INDIVIDUAL: 'INDIVIDUAL',
  /** Utility company (electricity, water, gas, etc.) */
  UTILITY: 'UTILITY',
  /** Government agency or tax authority */
  GOVERNMENT: 'GOVERNMENT'
} as const satisfies Record<string, EntityType>;

/**
 * Entity status enumeration for tracking entity lifecycle states
 */
export const EntityStatusEnum = {
  /** Entity is active and operational */
  ACTIVE: 'ACTIVE',
  /** Entity is inactive but can be reactivated */
  INACTIVE: 'INACTIVE',
  /** Entity is temporarily suspended */
  SUSPENDED: 'SUSPENDED',
  /** Entity is marked for deletion */
  DELETED: 'DELETED',
  /** Entity is permanently closed */
  CLOSED: 'CLOSED'
} as const satisfies Record<string, EntityStatus>;

/**
 * Account type enumeration for personal financial accounts
 *
 * Used when entityType is ACCOUNT to specify the type of financial account
 */
export const AccountTypeEnum = {
  /** Checking account for daily transactions */
  CHECKING: 'CHECKING',
  /** Savings account for saving money */
  SAVINGS: 'SAVINGS',
  /** Credit card account */
  CREDIT_CARD: 'CREDIT_CARD',
  /** Investment account (brokerage, retirement, etc.) */
  INVESTMENT: 'INVESTMENT',
  /** Loan account (mortgage, car loan, etc.) */
  LOAN: 'LOAN',
  /** Cash on hand */
  CASH: 'CASH'
} as const satisfies Record<string, AccountType>;
