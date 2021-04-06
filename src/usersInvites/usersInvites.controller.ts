import { Body, Controller, Post } from '@nestjs/common';
import { UsersInvitesService } from './usersInvites.service';
import { UserResponseDto } from './dto/userResponse.dto';
import { UserDataDto } from './dto/userData.dto';

@Controller('users-invites')
export class UsersInvitesController {
  constructor(private userIviteService: UsersInvitesService) {}

  @Post()
  createAndSendInvate(@Body() user: UserDataDto): Promise<UserResponseDto> {
    return this.userIviteService.createAndSendInvate(user);
  }
}
