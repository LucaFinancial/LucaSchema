/**
 * Category enumeration definitions
 * Runtime enums for category-related constants
 */

// Import types for satisfies constraints
import type { CategoryType } from '../types';

/**
 * Category type enumeration for categorizing transaction categories
 */
export const CategoryTypeEnum = {
  /** Default system-provided category */
  DEFAULT: 'DEFAULT',
  /** Modified version of a default category */
  MODIFIED: 'MODIFIED',
  /** Custom user-created category */
  CUSTOM: 'CUSTOM'
} as const satisfies Record<string, CategoryType>;
