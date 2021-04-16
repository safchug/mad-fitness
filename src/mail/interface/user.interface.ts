import { Role } from '../../roles/interface/roles.interface';

export interface UserInvite {
  id?: number;
  email: string;
  role: Role;
}
