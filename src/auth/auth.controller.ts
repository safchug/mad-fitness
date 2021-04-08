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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Result - access and refresh tokens.',
  })
  @ApiResponse({ status: 401, description: 'You entered incorrect data!' })
  async login(
    @Body() body: LoginUserDto,
    @Request() req,
  ): Promise<TokenResponse> {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 200, description: 'Result - user profile.' })
  @ApiResponse({ status: 401, description: 'You must log in!' })
  getProfile(@Request() req): User {
    return req.user;
  }

  @Post('refresh')
  @ApiResponse({ status: 201, description: 'Result - new access token.' })
  @ApiResponse({ status: 401, description: 'The refresh token is not valid' })
  async refresh(@Body() body: RefreshRequestDto): Promise<TokenResponse> {
    const token: string = await this.authService.createAccessTokenFromRefreshToken(
      body.refresh_token,
    );
    return {
      access_token: token,
    };
  }
}
