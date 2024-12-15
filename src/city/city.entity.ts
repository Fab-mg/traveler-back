import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>;

@Schema()
export class City {
  @Prop()
  name: string;

  @Prop()
  postal_code: number;

  @Prop()
  region: string;

  @Prop()
  country: string;

  @Prop()
  continent: string;
}

export const CitySchema = SchemaFactory.createForClass(City);