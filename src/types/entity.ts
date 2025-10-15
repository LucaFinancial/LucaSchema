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

export type AccountType =
  | 'CHECKING'
  | 'SAVINGS'
  | 'CREDIT_CARD'
  | 'INVESTMENT'
  | 'LOAN'
  | 'CASH';

// Entity interface
export interface Entity {
  id: string;
  name: string;
  description: string | null;
  entityType: EntityType;
  entityStatus: EntityStatus;
  accountType?: AccountType | null;
  createdAt: string;
  updatedAt: string | null;
}
