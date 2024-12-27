import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceSchema } from './place.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
