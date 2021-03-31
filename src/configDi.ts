import { UsersService, USERS_SERVICE } from './users/users.service';
import { RolesService, ROLES_SERVICE } from './roles/roles.service';
import { AuthService, AUTH_SERVICE } from './auth/auth.service';

export const usersService = {
  useClass: UsersService,
  provide: USERS_SERVICE,
};

export const rolesService = {
  useClass: RolesService,
  provide: ROLES_SERVICE,
};

export const authService = {
  useClass: AuthService,
  provide: AUTH_SERVICE,
};
