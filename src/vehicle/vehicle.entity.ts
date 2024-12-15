import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop()
  type: string;

  @Prop()
  model: number;

  @Prop()
  number: string;

  @Prop()
  max_capacity: string;

  @Prop()
  max_load: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);