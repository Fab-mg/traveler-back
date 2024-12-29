import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PlaceState } from 'src/config/constants';
import { Travel } from 'src/travel/travel.entity';
import * as mongoose from 'mongoose';

export type PlaceDocument = HydratedDocument<Place>;

@Schema()
export class Place {
  @Prop({ required: true })
  placeNumber: number;

  @Prop({ required: true, defaultValue: PlaceState.FREE })
  placeState: String;

  @Prop({ required: true })
  placePrice: number;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: () => Travel,
  })
  travel?: Travel[];
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
