import { Injectable, Inject } from '@nestjs/common';
import { RefreshToken } from './interface/refreshTokens.interface';
import { REFRESH_TOKENS_DAO, IRefreshTokensDAO } from '../DAO/refreshTokensDAO';

export const REFRESH_TOKENS_SERVICE = 'REFRESH TOKENS SERVICE';
export interface IRefreshTokensService {
  findByToken(token: string): Promise<RefreshToken | null>;
  findById(id: number): Promise<RefreshToken | null>;
  findByUserId(userId: number): Promise<RefreshToken | null>;
  findAll(): Promise<RefreshToken[]>;
  saveRefreshToken(tokenStr: string, userId: number): Promise<RefreshToken>;
}

@Injectable()
export class RefreshTokensService implements IRefreshTokensService {
  constructor(
    @Inject(REFRESH_TOKENS_DAO)
    private readonly refreshTokensDAO: IRefreshTokensDAO,
  ) {}

  async findByToken(token: string): Promise<RefreshToken | null> {
    return await this.refreshTokensDAO.findOne(token);
  }

  async findById(id: number): Promise<RefreshToken | null> {
    return await this.refreshTokensDAO.findById(id);
  }

  async findByUserId(userId: number): Promise<RefreshToken | null> {
    return await this.refreshTokensDAO.findByUserId(userId);
  }

  async findAll(): Promise<RefreshToken[]> {
    const allTokens = await this.refreshTokensDAO.find();
    return allTokens;
  }

  async saveRefreshToken(
    tokenStr: string,
    userId: number,
  ): Promise<RefreshToken> {
    const existToken = await this.findByUserId(userId); //check if token exists for current user, and update it
    if (existToken) {
      await this.refreshTokensDAO.update(existToken.id, tokenStr);
      return await this.findByUserId(userId);
    }
    return await this.refreshTokensDAO.save({ token: tokenStr, userId });
  }
}
