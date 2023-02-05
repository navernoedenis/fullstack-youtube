import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

import { TokenService } from '@/token/token.service';
import { UsersService } from '@/users/users.service';

import { AuthLoginDto } from './dto/auth-login.dto';
import { CreateUserDto } from '@/users/dto/create-user.dto';

import { UserPayload } from '@/users/interfaces/user-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
  ) {}

  async login(res: Response, authLoginDto: AuthLoginDto) {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findOne('email', email, {
      notFoundException: true,
      withPassword: true,
    });

    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch) {
      const errorMessage = 'Wrong password';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const { accessToken, refreshToken } = this.tokenService.createTokens({
      id: user.id,
      email: user.email,
      roles: user.roles,
    });

    delete user.password;

    const MILLISECONDS_IN_A_MONTH = 30 * 24 * 60 * 60 * 1000;

    res
      .status(HttpStatus.OK)
      .cookie('refreshToken', refreshToken, {
        expires: new Date(Date.now() + MILLISECONDS_IN_A_MONTH),
        httpOnly: true,
      })
      .json({ accessToken, user });
  }

  async logout(res: Response) {
    res.status(HttpStatus.OK).clearCookie('refreshToken').end();
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async checkAccessToken(me: UserPayload) {
    return this.usersService.findOne('id', me.id);
  }

  async checkRefreshToken(token: string) {
    if (!token) {
      const errorMessage = "Request doesn't have refresh-token";
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const jwtPayload = this.tokenService.verifyToken('refresh', token);
    if (!jwtPayload) {
      const errorMessage = 'Invalid refresh-token';
      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersService.findOne('id', jwtPayload.id);

    const accessToken = this.tokenService.createToken('access', {
      id: user.id,
      email: user.email,
      roles: user.roles,
    });

    return {
      accessToken,
      user,
    };
  }
}
