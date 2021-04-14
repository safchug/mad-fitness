import { Role } from '../../roles/interface/roles.interface';

export interface User {
  id?: number;
  email: string;
  role: Role;
}
