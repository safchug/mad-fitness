import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SheduleUsersModule } from './shedule_users/shedule_users.module';

@Module({
  imports: [UsersModule, SheduleUsersModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
