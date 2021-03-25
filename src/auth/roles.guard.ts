import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';
import { User } from '../users/interface/users.interface';
import { AuthService } from './auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token: string = jwtFromRequest(request);
    const user: User = await this.authService.resolveRefreshToken(token);
    if (!roles.includes(user.role.role)) {
      return false;
    }
    return true;
  }
}
