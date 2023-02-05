import { Module } from '@nestjs/common';
import { UserController } from './users.controller';

import { PrismaService } from '@/prisma.service';
import { TokenService } from '@/token/token.service';
import { UsersService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UsersService, PrismaService, TokenService],
  exports: [UsersService],
})
export class UsersModule {}
