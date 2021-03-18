import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])]
})
export class UsersModule {}
