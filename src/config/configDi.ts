import { UsersService, USERS_SERVICE } from '../users/users.service';
import { RolesService, ROLES_SERVICE } from '../roles/roles.service';
import { AuthService, AUTH_SERVICE } from '../auth/auth.service';
import {
  RefreshTokensService,
  REFRESH_TOKENS_SERVICE,
} from '../refreshTokens/refreshTokens.service';
import { CLASSES_SERVICE, ClassesService } from '../classes/classes.service';
import { RolesDAO, ROLES_DAO } from '../DAO/rolesDAO';
import { REFRESH_TOKENS_DAO, RefreshTokensDAO } from '../DAO/refreshTokensDAO';
import { USERS_DAO, UsersDAO } from '../DAO/usersDAO';
import { CLASSES_DAO, ClassesDAO } from '../DAO/classesDAO';

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

export const refreshTokensService = {
  useClass: RefreshTokensService,
  provide: REFRESH_TOKENS_SERVICE,
};

export const classesService = {
  useClass: ClassesService,
  provide: CLASSES_SERVICE,
};

export const rolesDAO = {
  useClass: RolesDAO,
  provide: ROLES_DAO,
};

export const refreshTokensDAO = {
  useClass: RefreshTokensDAO,
  provide: REFRESH_TOKENS_DAO,
};

export const usersDAO = {
  useClass: UsersDAO,
  provide: USERS_DAO,
};

export const classesDAO = {
  useClass: ClassesDAO,
  provide: CLASSES_DAO,
};
