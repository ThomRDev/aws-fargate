import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envs } from './config';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import 'newrelic';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = `/${envs.artifactId}/${envs.apiVersion}`;
  app.setGlobalPrefix(globalPrefix);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('MS Skeleton')
    .setDescription('MS Skeleton endpoints')
    .setVersion('1.0')
    .addServer('https://bancamovil.synopsis.cloud', 'Production server')
    .addServer('http://localhost:${{ values.serverPort }}', 'Local development')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Ruta para guardar en src/resources
  const srcDirectoryPath = join(__dirname, 'resources');
  if (!existsSync(srcDirectoryPath)) {
    mkdirSync(srcDirectoryPath, { recursive: true });
  }
  writeFileSync(
    join(srcDirectoryPath, 'openapi.json'),
    JSON.stringify(document, null, 2)
  );

  const baseDirectoryPath = join(__dirname, '..', 'resources');
  if (!existsSync(baseDirectoryPath)) {
    mkdirSync(baseDirectoryPath, { recursive: true });
  }
  writeFileSync(
    join(baseDirectoryPath, 'openapi.json'),
    JSON.stringify(document, null, 2)
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(envs.port);
  await app.startAllMicroservices();
}
bootstrap();
