import { Role } from '../../roles/interface/roles.interface';

export interface User {
  id?: number;
  firstName?: string;
  email: string;
  password?: string;
  role: Role;
  active?: boolean;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
