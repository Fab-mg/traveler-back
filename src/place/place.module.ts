import { forwardRef, Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './place.entity';
import { Travel } from 'src/travel/travel.entity';
import { TravelModule } from 'src/travel/travel.module';

@Module({
  imports: [
    forwardRef(() => Travel),
    forwardRef(() => TravelModule),
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
