import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { IAuthService, AUTH_SERVICE } from './auth.service';
import { User } from '../users/interface/users.interface';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { TokenResponse } from './interface/auth.interface';
import { RefreshRequestDto } from './dto/refreshRequest.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() body: LoginUserDto,
    @Request() req,
  ): Promise<TokenResponse> {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): User {
    return req.user;
  }

  @Post('refresh')
  async refresh(@Body() body: RefreshRequestDto): Promise<TokenResponse> {
    const token: string = await this.authService.createAccessTokenFromRefreshToken(
      body.refresh_token,
    );
    return {
      access_token: token,
    };
  }
}
