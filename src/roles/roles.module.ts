import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService, ROLES_SERVICE } from './roles.service';
import { RolesEntity } from './entity/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rolesService, rolesDAO } from '../config/configDi';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([RolesEntity])],
  providers: [rolesService, rolesDAO],
  controllers: [RolesController],
  exports: [ROLES_SERVICE],
})
export class RolesModule {}
