import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  IUsersInvitesService,
  USERS_INVITES_SERVICE,
} from './usersInvites.service';
import { UserResponseDto } from './dto/userResponse.dto';
import { UserDataDto } from './dto/userData.dto';

@Controller('users-invites')
export class UsersInvitesController {
  constructor(
    @Inject(USERS_INVITES_SERVICE)
    private userIviteService: IUsersInvitesService,
  ) {}

  @Post()
  createAndSendInvate(@Body() user: UserDataDto): Promise<UserResponseDto> {
    return this.userIviteService.sendInvite(user);
  }
}
