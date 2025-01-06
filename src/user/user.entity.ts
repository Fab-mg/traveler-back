import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: mongoose.Types.ObjectId,
    auto: true,
  })
  _id: mongoose.Types.ObjectId;

  @Prop()
  auth0_id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

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

export const UserSchema = SchemaFactory.createForClass(User);
