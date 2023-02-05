import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, VideosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
