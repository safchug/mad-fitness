import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesEntity } from './entity/roles.entity';
import { Role } from './interface/roles.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Role[]> {
    return await this.rolesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<Role> {
    return await this.rolesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async create(@Body() role: RolesEntity): Promise<Role> {
    return await this.rolesService.saveRole(role);
  }
}
