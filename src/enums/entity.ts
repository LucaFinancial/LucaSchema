/**
 * Entity enumeration definitions
 * Runtime enums for entity-related constants
 */

// Import types for satisfies constraints
import type { EntityType, EntityStatus } from '../types';

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
