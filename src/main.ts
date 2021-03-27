import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0');
  console.log(`mad-fitness is running on: ${await app.getUrl()}`);
}
bootstrap();
