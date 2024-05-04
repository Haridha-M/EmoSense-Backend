import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const express = require("express");
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: true });
 
  // const config = new DocumentBuilder().setTitle('Simple CRUD API').setDescription('CRUD Using NestJS and MySQL').setVersion('1.0').addTag('CRUD').build();
  // const document = SwaggerModule.createDocument(app, config); SwaggerModule.setup('apiDoc',app, document);
  await app.listen(3000);
}
bootstrap();
