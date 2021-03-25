import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entity/users.entity';
import { Role } from '../roles/interface/roles.interface';
import * as bcrypt from 'bcrypt';
import { User } from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async findOne(firstName: string): Promise<User | null> {
    return await this.usersRepository.findOne({ firstName });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ email });
  }

  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOne(id, { relations: ['role'] });
  }

  async findAll(): Promise<User[]> {
    const allUsers: User[] = await this.usersRepository.find({
      relations: ['role'],
    });
    allUsers.forEach((user) => {
      delete user.password;
    });
    return allUsers;
  }

  async saveUser(user: User): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await this.usersRepository.save(user);
  }
}
