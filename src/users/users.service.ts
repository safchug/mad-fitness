import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { UsersEntity } from './entity/users.entity';
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
      user.password = undefined;
    });
    return allUsers;
  }

  async saveUser(user: User): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await this.usersRepository.save(user);
  }

  async saveUnregisteredUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async updateUser(id: number, user: User): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const result: UpdateResult = await this.usersRepository.update(id, user);
    return await this.findById(id);
  }

  async removeUser(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
