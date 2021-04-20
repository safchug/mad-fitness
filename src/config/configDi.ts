import { UsersService, USERS_SERVICE } from '../users/users.service';
import { RolesService, ROLES_SERVICE } from '../roles/roles.service';
import { AuthService, AUTH_SERVICE } from '../auth/auth.service';
import {
  RefreshTokensService,
  REFRESH_TOKENS_SERVICE,
} from '../refreshTokens/refreshTokens.service';
import { CLASSES_SERVICE, ClassesService } from '../classes/classes.service';
import {
  SCHEDULE_SERVICE,
  ScheduleService,
} from '../schedule/schedule.service';
import { RolesDAO, ROLES_DAO } from '../DAO/rolesDAO';
import { REFRESH_TOKENS_DAO, RefreshTokensDAO } from '../DAO/refreshTokensDAO';
import { USERS_DAO, UsersDAO } from '../DAO/usersDAO';
import {
  FitnessLoggerService,
  FITNESS_LOGGER_SERVICE,
} from '../logger/logger.service';
import { CLASSES_DAO, ClassesDAO } from '../DAO/classesDAO';
import { MAIL_SERVICE, MailService } from '../mail/mail.service';
import {
  USERS_INVITES_SERVICE,
  UsersInvitesService,
} from '../usersInvites/usersInvites.service';
import { INVITES_SERVICE, InvitesService } from '../invites/invites.service';
import { INVITES_DAO, InvitesDAO } from '../DAO/invitesDAO';
import { UserInvitesDAO, USERS_INVITES_DAO } from '../DAO/usersInvitesDAO';
import { SCHEDULE_DAO, ScheduleDAO } from '../DAO/scheduleDAO';

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

export const scheduleService = {
  useClass: ScheduleService,
  provide: SCHEDULE_SERVICE,
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

export const fitnessLoggerService = {
  useClass: FitnessLoggerService,
  provide: FITNESS_LOGGER_SERVICE,
};

export const classesDAO = {
  useClass: ClassesDAO,
  provide: CLASSES_DAO,
};

export const mailService = {
  provide: MAIL_SERVICE,
  useClass: MailService,
};

export const usersInvitesService = {
  provide: USERS_INVITES_SERVICE,
  useClass: UsersInvitesService,
};

export const invitesService = {
  useClass: InvitesService,
  provide: INVITES_SERVICE,
};

export const invitesDAO = {
  useClass: InvitesDAO,
  provide: INVITES_DAO,
};

export const userInvitesDAO = {
  useClass: UserInvitesDAO,
  provide: USERS_INVITES_DAO,
};

export const scheduleDAO = {
  useClass: ScheduleDAO,
  provide: SCHEDULE_DAO,
};
