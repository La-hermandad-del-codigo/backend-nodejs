import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

/**
 * Application bootstrap function.
 *
 * Configures:
 * - **ValidationPipe** (global) — whitelist, forbidNonWhitelisted, transform
 * - **ClassSerializerInterceptor** (global) — honours @Expose / @Exclude
 * - **Swagger** — available at `/api/docs`
 * - **Port** — 3000
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // ─── Global validation ───────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ─── Global serialisation (class-transformer) ────────────────────
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // ─── Swagger documentation ───────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Employee Management API')
    .setDescription('CRUD para gestión de empleados')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // ─── Start server ────────────────────────────────────────────────
  await app.listen(3000);
}

bootstrap();
