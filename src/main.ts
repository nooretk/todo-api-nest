import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // to not recieve extra properties
      transform: true, // convert request body to an instance of DTO classes
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
