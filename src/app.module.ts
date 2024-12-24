import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TravelModule } from './travel/travel.module';
import { PlaceModule } from './place/place.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
