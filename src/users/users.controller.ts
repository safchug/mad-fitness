import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Inject,
  Redirect,
} from '@nestjs/common';
import { IUsersService, USERS_SERVICE } from './users.service';
import { User } from './interface/users.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles('admin', 'trainer')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles('admin', 'trainer')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    try {
      const user: User = await this.usersService.findById(id);
      return user;
    } catch (e) {
      throw new HttpException('Bad userId!', 400);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @Roles('admin', 'trainer')
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.saveUser(user);
  }

  //@UseGuards(JwtAuthGuard)
  @Put(':invite')
  async registerUser(
    @Body() user: UpdateUserDto,
    @Param('invite') invite: string,
  ): Promise<User> {
    //not done yet!!!!
    return await this.usersService.updateUser(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.removeUser(id);
  }
}
