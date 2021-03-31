import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { UsersEntity } from './entity/users.entity';
import * as bcrypt from 'bcrypt';
import { User } from './interface/users.interface';

export const USERS_SERVICE = 'USERS SERVICE';
export interface IUsersService {
  findOne(firstName: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  saveUser(user: User): Promise<User>;
  saveUnregisteredUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  removeUser(id: number): Promise<DeleteResult>;
}

@Injectable()
export class UsersService implements IUsersService {
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
    const foundUser: User = await this.findByEmail(user.email);
    if (foundUser) {
      throw new HttpException('User exists!', 400);
    }
    try {
      const unregisteredUser: User = await this.usersRepository.save(user);
      return unregisteredUser;
    } catch (e) {
      throw new HttpException('Bad credentials!', 400);
    }
  }

  async updateUser(user: User): Promise<User> {
    const userFound: User = await this.findByEmail(user.email); //then check invite for expire and if exists by user.id from invites repository,
    if (!userFound) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const hashedPassword: string = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const result: UpdateResult = await this.usersRepository.update(
      userFound.id,
      user,
    );
    return await this.findById(userFound.id);
  }

  async removeUser(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
