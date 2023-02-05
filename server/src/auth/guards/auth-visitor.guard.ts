import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { AuthVisitorRequest } from '@/auth/interaces/auth-request.interface';
import { TokenService } from '@/token/token.service';

@Injectable()
export class AuthVisitorGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<AuthVisitorRequest>();
    const { authorization } = req.headers;
    req.user = null;

    if (!authorization) {
      return true;
    }

    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return true;
    }

    const jwtPayload = this.tokenService.verifyToken('access', token);
    if (!jwtPayload) {
      return true;
    }

    req.user = jwtPayload;
    return true;
  }
}
