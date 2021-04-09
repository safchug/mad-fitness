import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './interface/users.interface';
import { USERS_DAO, IUsersDAO } from '../DAO/usersDAO';
import { configApp } from '../config/configApp';
import {
  FITNESS_LOGGER_SERVICE,
  FitnessLoggerService,
} from '../logger/logger.service';

export const USERS_SERVICE = 'USERS SERVICE';
export interface IUsersService {
  findOne(firstName: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findWithPassword(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  saveUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  removeUser(id: number): Promise<User>;
}

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USERS_DAO)
    private readonly usersDAO: IUsersDAO,
    @Inject(FITNESS_LOGGER_SERVICE)
    private readonly logger: FitnessLoggerService,
  ) {
    this.logger.setContext('UsersService');
  }

  async findOne(firstName: string): Promise<User | null> {
    return await this.usersDAO.findByFirstName(firstName);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersDAO.findByEmail(email);
  }

  async findWithPassword(email: string): Promise<User | null> {
    return await this.usersDAO.findWithPassword(email);
  }

  async findById(id: number): Promise<User | null> {
    return await this.usersDAO.findById(id);
  }

  async findAll(): Promise<User[]> {
    const allUsers: User[] = await this.usersDAO.find();
    return allUsers;
  }

  async saveUser(user: User): Promise<User> {
    const foundUser: User = await this.findByEmail(user.email);
    if (foundUser) {
      const errorMessage = 'User exists!';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, 400);
    }
    try {
      const unregisteredUser: User = await this.usersDAO.save(user);
      return unregisteredUser;
    } catch (e) {
      const errorMessage = 'Bad credentials!';
      this.logger.error(errorMessage, e);
      throw new HttpException(errorMessage, 400);
    }
  }

  async updateUser(user: User): Promise<User> {
    const userFound: User = await this.findByEmail(user.email); //then check invite for expire and if exists by user.id from invites repository,
    if (!userFound) {
      const errorMessage = 'User Not Found';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }
    const hashedPassword: string = await bcrypt.hash(
      user.password,
      configApp.saltRounds,
    );
    user.password = hashedPassword;
    try {
      await this.usersDAO.update(userFound.id, user);
    } catch (e) {
      const errorMessage = 'Failed to update user!';
      this.logger.error(errorMessage, e);
      throw new HttpException(errorMessage, 500);
    }
    return await this.findById(userFound.id);
  }

  async removeUser(id: number): Promise<User> {
    const userFound = await this.findById(id);
    if (!userFound || id === 1) {
      const errorMessage = 'User Not Found';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, 400);
    }
    await this.usersDAO.delete(id);
    return userFound;
  }
}
