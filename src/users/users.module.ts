import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService, USERS_SERVICE } from './users.service';
import { UsersEntity } from './entity/users.entity';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { usersService, usersDAO } from '../config/configDi';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    forwardRef(() => AuthModule), //circular module dependency forwardRef(() => AuthModule)
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UsersController],
  providers: [usersService, usersDAO],
  exports: [USERS_SERVICE],
})
export class UsersModule {}
