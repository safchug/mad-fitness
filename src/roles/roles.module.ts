import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService, IRolesService, ROLES_SERVICE } from './roles.service';
import { RolesEntity } from './entity/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  //providers: [RolesService],
  //exports: [RolesService],
  providers: [
    {
      useClass: RolesService,
      provide: ROLES_SERVICE,
    },
  ],
  controllers: [RolesController],
})
export class RolesModule {}
