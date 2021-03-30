import { Module, forwardRef } from '@nestjs/common';
import { AuthService, AUTH_SERVICE } from './auth.service';
import { UsersModule } from '../users/users.module';
import { RefreshTokensModule } from '../refreshTokens/refreshTokens.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { RolesGuard } from './roles.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    RefreshTokensModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expAccess }, // ttl for access token
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      useClass: AuthService,
      provide: AUTH_SERVICE,
    },
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
  ],
  exports: [AUTH_SERVICE, JwtModule, RolesGuard],
})
export class AuthModule {}
