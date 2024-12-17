import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './city.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
