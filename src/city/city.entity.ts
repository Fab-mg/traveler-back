import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';

export type CityDocument = HydratedDocument<City>;

@Schema()
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  postal_code: number;

  @Prop()
  region: string;

  @Prop()
  country: string;

  @Prop()
  continent: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
