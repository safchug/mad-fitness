import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersEntity } from './entity/users.entity';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/roles.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UsersEntity]),
  ], //circular module dependency forwardRef(() => AuthModule)
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD, //roles guard registering
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
