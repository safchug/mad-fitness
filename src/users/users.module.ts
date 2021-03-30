import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService, USERS_SERVICE } from './users.service';
import { UsersEntity } from './entity/users.entity';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule), //circular module dependency forwardRef(() => AuthModule)
    TypeOrmModule.forFeature([UsersEntity]),
  ],
  controllers: [UsersController],
  providers: [
    {
      useClass: UsersService,
      provide: USERS_SERVICE,
    },
  ],
  exports: [USERS_SERVICE],
})
export class UsersModule {}
