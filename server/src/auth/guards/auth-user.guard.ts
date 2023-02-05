import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { AuthUserRequest } from '@/auth/interaces/auth-request.interface';
import { TokenService } from '@/token/token.service';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<AuthUserRequest>();
    const { authorization } = req.headers;

    if (!authorization) {
      const errorMessage = "Request doesn't have access-token";
      throw new HttpException(errorMessage, HttpStatus.FORBIDDEN);
    }

    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      const errorMessage = 'Invalid access-token';
      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
    }

    const jwtPayload = this.tokenService.verifyToken('access', token);
    if (!jwtPayload) {
      const errorMessage = 'Invalid access-token';
      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
    }

    req.user = jwtPayload;
    return true;
  }
}
