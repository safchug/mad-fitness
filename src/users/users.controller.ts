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
} from '@nestjs/common';
import { IUsersService, USERS_SERVICE } from './users.service';
import { User } from './interface/users.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Result - all users.' })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @Roles('admin', 'trainer')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Result - fined user by id.' })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @ApiResponse({ status: 400, description: 'Such user does not exist.' })
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
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @Roles('admin', 'trainer')
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.saveUser(user);
  }

  //@UseGuards(JwtAuthGuard)
  @Put(':invite')
  @ApiBearerAuth('access-token')
  async registerUser(
    @Body() user: UpdateUserDto,
    @Param('invite') invite: string,
  ): Promise<User> {
    //not done yet!!!!
    return await this.usersService.updateUser(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Such user does not exist.' })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  @Roles('admin')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.removeUser(id);
  }
}
