import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesEntity } from './entity/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([RolesEntity])],
   controllers: [RolesController],
   providers: [RolesService],
})
export class RolesModule {}
