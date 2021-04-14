import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  IUsersInvitesService,
  USERS_INVITES_SERVICE,
} from './usersInvites.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserInvites } from './interface/userInvites.interface';
import { CreateUserDto } from '../users/dto/createUser.dto';

@ApiTags('invite')
@Controller('invite')
export class UsersInvitesController {
  constructor(
    @Inject(USERS_INVITES_SERVICE)
    private userInvitesService: IUsersInvitesService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 201,
    description: 'The invite has been successfully sent.',
  })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @Roles('admin')
  createAndSendInvate(@Body() user: CreateUserDto): Promise<UserInvites> {
    return this.userInvitesService.makeUserInvite(user);
  }
}
