import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');

  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || serverConfig.port;

  // Enable cors only in development mode
  if ((process.env.NODE_ENV = 'development')) app.enableCors();

  await app.listen(port);

  logger.log(`Application is listening on port ${port}`);
}
bootstrap();
