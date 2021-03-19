import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    exports: [TypeOrmModule]
})
export class UsersModule {}
