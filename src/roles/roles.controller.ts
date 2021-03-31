import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { IRolesService, ROLES_SERVICE } from './roles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from './interface/roles.interface';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateRolesDto } from './dto/createRoles.dto';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(ROLES_SERVICE) private readonly rolesService: IRolesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Roles('admin', 'trainer')
  async findAll(): Promise<Role[]> {
    return await this.rolesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles('admin')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return await this.rolesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @Roles('admin')
  async create(@Body() role: CreateRolesDto): Promise<Role> {
    return await this.rolesService.saveRole(role);
  }
}
