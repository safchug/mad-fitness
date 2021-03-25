import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interface/users.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles('admin', 'trainer')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    try {
      const { password, ...withoutPass } = await this.usersService.findById(id);
      return withoutPass;
    } catch (e) {
      throw new HttpException('Bad userId!', 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() user: User): Promise<User> {
    try {
      const { password, ...withoutPass } = await this.usersService.saveUser(
        user,
      );
      return withoutPass;
    } catch (e) {
      throw new HttpException('User exists!', 400);
    }
  }
}
