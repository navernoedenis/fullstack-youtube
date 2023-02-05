import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';

import { PrismaService } from '@/prisma.service';
import { TokenService } from '@/token/token.service';
import { UsersService } from '@/users/users.service';
import { VideosService } from './videos.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService, PrismaService, TokenService, UsersService],
  exports: [VideosService],
})
export class VideosModule {}
