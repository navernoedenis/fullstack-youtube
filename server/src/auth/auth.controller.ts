import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Request, Response } from 'express';

import { AuthLoginDto } from '@/auth/dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthUserGuard } from '@/auth/guards/auth-user.guard';
import { AuthUserRequest } from '@/auth/interaces/auth-request.interface';

import { CreateUserDto } from '@/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login to the system' })
  @ApiOkResponse({ description: 'Return tokens and user credentials' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  // swagger
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() authLoginDto: AuthLoginDto,
  ) {
    return this.authService.login(res, authLoginDto);
  }

  @ApiOperation({ summary: 'Logout from the system' })
  @ApiOkResponse({ description: 'Remove refresh-token' })
  // swagger
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @ApiOperation({ summary: 'Add new user' })
  @ApiCreatedResponse({ description: 'User added to the store' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  // swagger
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Verify access token' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return user credentials' })
  @ApiUnauthorizedResponse({ description: 'Invalid access-token' })
  @ApiForbiddenResponse({ description: "Request doesn't have access-token" })
  // swagger
  @Get('/token/access')
  @UseGuards(AuthUserGuard)
  async checkAccessToken(@Req() req: AuthUserRequest) {
    return this.authService.checkAccessToken(req.user);
  }

  @ApiOperation({ summary: 'Verify refresh token' })
  @ApiOkResponse({ description: 'Return user and new access-token' })
  @ApiBadRequestResponse({ description: "Request doesn't have refresh-token" })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh-token' })
  // swagger
  @Get('/token/refresh')
  async checkRefreshToken(@Req() req: Request) {
    const token: string = req.cookies.refreshToken || '';
    return this.authService.checkRefreshToken(token);
  }
}
