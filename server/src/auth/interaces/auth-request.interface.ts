import { Request } from 'express';
import { UserPayload } from '@/users/interfaces/user-payload.interface';

export interface AuthUserRequest extends Request {
  user: UserPayload;
}

export interface AuthVisitorRequest extends Request {
  user: UserPayload | null;
}
