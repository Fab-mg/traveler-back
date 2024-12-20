import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger config
  const config = new DocumentBuilder()
    .setTitle('Traveler API')
    .setDescription(
      'API Documentation for the traveler api: Traveler is an app designed to simplify your travel experience. Effortlessly manage and organize every aspect of your journeys, from itineraries to packing lists, all in one place.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port || 3000);
}
bootstrap();
