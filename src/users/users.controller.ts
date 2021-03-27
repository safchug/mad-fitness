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
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './interface/users.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  //@Roles('admin', 'trainer')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles('admin', 'trainer')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    try {
      const { password, ...withoutPass } = await this.usersService.findById(id);
      return withoutPass;
    } catch (e) {
      throw new HttpException('Bad userId!', 400);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @Roles('admin', 'trainer')
  async create(@Body() user: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.saveUnregisteredUser(user);
    } catch (e) {
      throw new HttpException('User exists!', 400);
    }
  }

  //@UseGuards(JwtAuthGuard)
  @Put(':invite')
  async registerUser(
    @Body() user: UpdateUserDto,
    @Param('invite') invite: string,
  ): Promise<User> {
    //not done yet!!!!
    const userFound: User = await this.usersService.findByEmail(user.email); //then check invite for expire and if exists by user.id from invites repository,
    if (!userFound) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return await this.usersService.updateUser(userFound.id, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin')
  async removeUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.usersService.removeUser(id);
  }
}
