import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const config = new DocumentBuilder()
    .setTitle('Youtube-Clone')
    .setDescription('The youtube-clone API')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const app = await NestFactory.create(AppModule, {
    logger: isDevelopment ? ['warn', 'error'] : false,
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
