import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService, ROLES_SERVICE } from './roles.service';
import { RolesEntity } from './entity/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rolesService } from '../configDi';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  providers: [rolesService],
  controllers: [RolesController],
  exports: [ROLES_SERVICE],
})
export class RolesModule {}
