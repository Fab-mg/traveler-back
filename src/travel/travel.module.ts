import { Module } from '@nestjs/common';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Travel, TravelSchema } from './travel.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Travel.name, schema: TravelSchema }]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
