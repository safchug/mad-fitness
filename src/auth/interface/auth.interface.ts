import { Role } from '../../roles/interface/roles.interface';

export interface TokenPayload {
  email: string;
  sub: number;
  role: Role;
}

export interface RefreshTokenPayload extends TokenPayload {
  expiresIn: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
}

// export interface RefreshRequest {
//   refresh_token: string;
// }
