import { Body, Controller, Post } from '@nestjs/common';
import { UsersInvitesService } from './users-invites.service';

@Controller('users-invites')
export class UsersInvitesController {
  constructor(private userIviteService: UsersInvitesService) {}

  @Post()
  createAndSendInvate(@Body() user: any): Promise<any> {
    return this.userIviteService.createAndSendInvate(user);
  }
}
