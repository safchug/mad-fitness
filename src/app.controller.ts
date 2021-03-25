import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenResponse, RefreshRequest } from './auth/interface/auth.interface';
import { TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/interface/users.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<TokenResponse> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): User {
    return req.user;
  }

  @Post('/refresh')
  async refresh(@Body() body: RefreshRequest): Promise<TokenResponse> {
    //check if not expired and valid
    try {
      await this.jwtService.verifyAsync(body.refresh_token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new HttpException('Refresh token expired', 400);
      } else {
        throw new HttpException('Refresh token not valid', 400);
      }
    }
    const token: string = await this.authService.createAccessTokenFromRefreshToken(
      body.refresh_token,
    );
    return {
      access_token: token,
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
