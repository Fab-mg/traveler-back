import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop()
  type: string;

  @Prop()
  model: string;

  @Prop({ required: true })
  number: string;

  @Prop()
  max_capacity: number;

  @Prop()
  max_load: number;

  @Prop({ default: new Date() })
  registered_at: Date;

  @Prop()
  deleted_at: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
