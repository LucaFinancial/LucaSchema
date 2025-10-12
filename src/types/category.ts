// Category types and enums

export const CategoryTypeEnum = {
  DEFAULT: 'DEFAULT',
  MODIFIED: 'MODIFIED',
  CUSTOM: 'CUSTOM'
} as const;

// Extract type from the runtime enum
export type CategoryType =
  (typeof CategoryTypeEnum)[keyof typeof CategoryTypeEnum];

// Category interface
export interface Category {
  id: string;
  name: string;
  description: string | null;
  parentId: string | null;
  defaultCategoryId: string | null;
  categoryType: CategoryType;
  createdAt: string;
  updatedAt: string | null;
}
