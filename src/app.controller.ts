import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenResponse } from './auth/interface/auth.interface';
import { User } from './users/interface/users.interface';
import { LoginUserDto } from './users/dto/loginUser.dto';
import { RefreshRequestDto } from './auth/dto/refreshRequest.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() body: LoginUserDto,
    @Request() req,
  ): Promise<TokenResponse> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): User {
    console.log('profile:', req);
    return req.user;
  }

  @Post('/refresh')
  async refresh(@Body() body: RefreshRequestDto): Promise<TokenResponse> {
    await this.authService.validateToken(body.refresh_token); //check if not expired and valid
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
