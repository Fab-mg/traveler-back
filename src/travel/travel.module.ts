import { forwardRef, Module } from '@nestjs/common';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Travel, TravelSchema } from './travel.entity';
import { Place } from 'src/place/place.entity';
import { PlaceModule } from 'src/place/place.module';

@Module({
  imports: [
    forwardRef(() => Place),
    forwardRef(() => PlaceModule),
    MongooseModule.forFeature([{ name: Travel.name, schema: TravelSchema }]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
  exports: [TravelService],
})
export class TravelModule {}
