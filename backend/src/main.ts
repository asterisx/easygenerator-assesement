import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from 'common/logging.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: JSON.parse(process.env.BACKEND_LOG_LEVEL),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN,
  });
  await app.listen(3000);
}
bootstrap();
