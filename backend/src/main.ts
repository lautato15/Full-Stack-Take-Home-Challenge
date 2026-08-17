import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Notifications APP')
    .setDescription('The Notifications API description')
    .setVersion('1.0')
    .addTag('Notifications APP')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, documentFactory, {
   customCssUrl:
     'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css',
   customJs: [
     'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js',
     'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-standalone-preset.js',
   ],
 });
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://notifications-appfrontend.vercel.app',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

