import { IRepository, RepositoryDAO } from './repositoryDAO';
import { Injectable } from '@nestjs/common';
import { RefreshTokensEntity } from '../refreshTokens/entity/refreshTokens.entity';
import { RefreshToken } from '../refreshTokens/interface/refreshTokens.interface';
import { UpdateResult } from 'typeorm';

export const REFRESH_TOKENS_DAO = 'REFRESH TOKENS DAO';
export interface IRefreshTokensDAO extends IRepository<RefreshToken> {
  findOne(token: string): Promise<RefreshToken>;
  findByUserId(userId: number): Promise<RefreshToken>;
  save(token: RefreshToken): Promise<RefreshToken>;
  update(id: number, token: string): Promise<UpdateResult>;
}

@Injectable()
export class RefreshTokensDAO
  extends RepositoryDAO<RefreshTokensEntity>
  implements IRefreshTokensDAO {
  async find(): Promise<RefreshToken[]> {
    const refreshTokensRepository = await this._getRepository(
      RefreshTokensEntity,
    );
    return await refreshTokensRepository.find();
  }

  async findOne(token: string): Promise<RefreshToken> {
    const refreshTokensRepository = await this._getRepository(
      RefreshTokensEntity,
    );
    return await refreshTokensRepository.findOne({ token });
  }

  async findById(id: number): Promise<RefreshToken> {
    const refreshTokensRepository = await this._getRepository(
      RefreshTokensEntity,
    );
    return await refreshTokensRepository.findOne({ id });
  }

  async findByUserId(userId: number): Promise<RefreshToken> {
    const refreshTokensRepository = await this._getRepository(
      RefreshTokensEntity,
    );
    return await refreshTokensRepository.findOne({ userId });
  }

  async save(token: RefreshToken): Promise<RefreshToken> {
    const refreshTokensRepository = await this._getRepository(
      RefreshTokensEntity,
    );
    return await refreshTokensRepository.save(token);
  }

  async update(id: number, token: string): Promise<UpdateResult> {
    const refreshTokensRepository = await this._getRepository(
      RefreshTokensEntity,
    );
    return await refreshTokensRepository.update(id, { token });
  }
}
