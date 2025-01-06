import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { auth } from 'express-oauth2-jwt-bearer';

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
  // auth0 config
  const auth0Audience = configService.get<string>('AUTH0_AUDIENCE');
  const auth0Issuer = configService.get<string>('AUTH0_ISSUER');
  const auth0Alg = configService.get<string>('AUTH0_ALG');
  const jwtCheck = auth({
    audience: auth0Audience,
    issuerBaseURL: auth0Issuer,
    tokenSigningAlg: auth0Alg,
  });
  app.use(jwtCheck);
  await app.listen(port || 3000);
}
bootstrap();
