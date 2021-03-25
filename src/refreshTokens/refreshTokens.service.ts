import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokensEntity } from './entity/refreshTokens.entity';
import { RefreshToken } from './interface/refreshTokens.interface';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshTokensEntity)
    private refreshTokensRepository: Repository<RefreshTokensEntity>,
  ) {}

  async findByToken(token: string): Promise<RefreshToken | null> {
    return await this.refreshTokensRepository.findOne({ token }); //, {relations: ['userId']}
  }

  async findById(id: number): Promise<RefreshToken | null> {
    return this.refreshTokensRepository.findOne({ id });
  }

  async findByUserId(userId: number): Promise<RefreshToken | null> {
    return this.refreshTokensRepository.findOne({ userId });
  }

  async findAll(): Promise<RefreshToken[]> {
    const allTokens = await this.refreshTokensRepository.find({});
    return allTokens;
  }

  async saveRefreshToken(
    tokenStr: string,
    userId: number,
  ): Promise<RefreshToken> {
    const existToken = await this.findByUserId(userId); //check if token exists for current user, and update it
    if (existToken) {
      await this.refreshTokensRepository.update(existToken.id, {
        token: tokenStr,
      });
      return await this.findByUserId(userId);
    }
    return await this.refreshTokensRepository.save({ token: tokenStr, userId });
  }
}
