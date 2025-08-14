import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // to not recieve extra properties
      transform: true, // convert request body to an instance of DTO classes
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API documentation for the Todo app')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // avaialbe at http://localhost:3000/docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
