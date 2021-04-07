import {
  UnprocessableEntityException,
  Injectable,
  HttpException,
  Inject,
} from '@nestjs/common';
import { IUsersService, USERS_SERVICE } from '../users/users.service';
import { User } from '../users/interface/users.interface';
import {
  REFRESH_TOKENS_SERVICE,
  IRefreshTokensService,
} from '../refreshTokens/refreshTokens.service';
import { RefreshToken } from '../refreshTokens/interface/refreshTokens.interface';
import { TokenExpiredError } from 'jsonwebtoken';
import { jwtConstants } from '../config/constantsJWT';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  TokenPayload,
  RefreshTokenPayload,
  TokenResponse,
} from './interface/auth.interface';

export const AUTH_SERVICE = 'AUTH SERVICE';
export interface IAuthService {
  validateUser(email: string, password: string): Promise<User>;
  validateToken(token: string): Promise<void>;
  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(user: User, expiresIn: string): Promise<string>;
  decodeRefreshToken(token: string): Promise<RefreshTokenPayload>;
  getUserFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<User>;
  resolveRefreshToken(encoded: string): Promise<User>;
  createAccessTokenFromRefreshToken(refresh: string): Promise<string>;
  login(user: User): Promise<TokenResponse>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(REFRESH_TOKENS_SERVICE)
    private readonly refreshTokensService: IRefreshTokensService,
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findWithPassword(email);
    if (!user || !user.active) {
      return null;
    }
    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (user && passwordMatch && user.active) {
      const userData: User = await this.usersService.findById(user.id);
      return userData;
    }
    return null;
  }

  public async validateToken(token: string): Promise<void> {
    try {
      await this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new HttpException(`token expired`, 401); //UnauthorizedException();
      } else {
        throw new HttpException(`token not valid`, 401);
      }
    }
  }

  public async generateAccessToken(user: User): Promise<string> {
    const payload: TokenPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.signAsync(payload);
  }

  public async generateRefreshToken(
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

  public async getUserFromRefreshTokenPayload(
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
    await this.validateToken(refresh);

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
