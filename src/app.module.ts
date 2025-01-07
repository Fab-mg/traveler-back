import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TravelModule } from './travel/travel.module';
import { PlaceModule } from './place/place.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserMetadataModule } from './user-metadata/user-metadata.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.dev.env',
    }),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/traveler'),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // uri: configService.get<string>('DB_URI'),
        uri: configService.get<string>('ATLAS_URI'),
      }),
      inject: [ConfigService],
    }),
    CityModule,
    VehicleModule,
    TravelModule,
    PlaceModule,
    AuthModule,
    UserModule,
    UserMetadataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
