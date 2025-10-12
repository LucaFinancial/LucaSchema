// Entity types and interfaces

export type EntityType =
  | 'ACCOUNT'
  | 'RETAILER'
  | 'SERVICE'
  | 'INDIVIDUAL'
  | 'UTILITY'
  | 'GOVERNMENT';

export type EntityStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED'
  | 'DELETED'
  | 'CLOSED';

// Entity interface
export interface Entity {
  id: string;
  name: string;
  description: string | null;
  entityType: EntityType;
  entityStatus: EntityStatus;
  createdAt: string;
  updatedAt: string | null;
}
