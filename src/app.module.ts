import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [CityModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
