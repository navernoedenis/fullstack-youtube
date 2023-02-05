import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { TokenType } from './interaces/token.interface';
import { UserPayload } from '@/users/interfaces/user-payload.interface';

const {
  JWT_ACCESS_EXPIRESIN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRESIN,
  JWT_REFRESH_SECRET,
} = process.env;

const jwtOptions: Record<TokenType, string[]> = {
  access: [JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRESIN],
  refresh: [JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRESIN],
};

@Injectable()
export class TokenService {
  createToken(type: TokenType, payload: UserPayload) {
    const [secret, expiresIn] = jwtOptions[type];

    return jwt.sign(payload, secret, {
      algorithm: 'HS512',
      expiresIn,
      noTimestamp: true,
    });
  }

  createTokens(payload: UserPayload) {
    return {
      accessToken: this.createToken('access', payload),
      refreshToken: this.createToken('refresh', payload),
    };
  }

  verifyToken(type: TokenType, token: string): UserPayload | false {
    try {
      const [secret] = jwtOptions[type];
      return <UserPayload>jwt.verify(token, secret);
    } catch (error) {
      return false;
    }
  }
}
