import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { City } from 'src/city/city.entity';
import { Place } from 'src/place/place.entity';

export type TravelDocument = HydratedDocument<Travel>;

@Schema()
export class Travel {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: City,
  })
  departCity: City;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: City,
  })
  arrivalCity: City;

  @Prop({
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: Place,
      },
    ],
  })
  places: Place[];
}

export const TravelSchema = SchemaFactory.createForClass(Travel);
