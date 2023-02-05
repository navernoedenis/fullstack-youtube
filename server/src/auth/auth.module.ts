import { Module } from '@nestjs/common';

import { TokenService } from '@/token/token.service';
import { UsersModule } from '@/users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
