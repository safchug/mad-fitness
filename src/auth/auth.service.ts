import { UnprocessableEntityException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/interface/users.interface';
import { RefreshTokensService } from '../refreshTokens/refreshTokens.service';
import { RefreshToken } from '../refreshTokens/interface/refreshTokens.interface';
import { TokenExpiredError } from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/interface/roles.interface';
import {
  TokenPayload,
  RefreshTokenPayload,
  TokenResponse,
} from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private refreshTokensService: RefreshTokensService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findByEmail(email);
    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (user && passwordMatch && user.active) {
      const userData: User = await this.usersService.findById(user.id);
      const { password, ...result } = userData;
      return result;
    }
    return null;
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload: TokenPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.signAsync(payload);
  }

  private async generateRefreshToken(
    user: User,
    expiresIn: string,
  ): Promise<string> {
    const payload: RefreshTokenPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      expiresIn,
    };
    const refreshToken: string = await this.jwtService.signAsync(payload, {
      expiresIn,
    });
    await this.refreshTokensService.saveRefreshToken(refreshToken, user.id);
    return refreshToken;
  }

  public async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId: number = payload.sub;
    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    return this.usersService.findById(subId);
  }

  public async resolveRefreshToken(encoded: string): Promise<User> {
    const payload: RefreshTokenPayload = await this.decodeRefreshToken(encoded);
    const user: User = await this.getUserFromRefreshTokenPayload(payload);
    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    return user;
  }

  public async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<string> {
    const user: User = await this.resolveRefreshToken(refresh);
    const foundInDb: RefreshToken = await this.refreshTokensService.findByToken(
      refresh,
    );
    if (!user || !foundInDb) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    const token: string = await this.generateAccessToken(user);
    return token;
  }

  public async login(user: User): Promise<TokenResponse> {
    return {
      access_token: await this.generateAccessToken(user),
      refresh_token: await this.generateRefreshToken(
        user,
        jwtConstants.expiresIn,
      ),
    };
  }
}
