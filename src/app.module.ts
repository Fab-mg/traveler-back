import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/traveler'),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    CityModule,
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
