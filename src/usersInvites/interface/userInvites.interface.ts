import { Role } from '../../roles/interface/roles.interface';

export interface UserInvites {
  id?: number;
  inviteId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
