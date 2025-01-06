import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserMetadataDocument = HydratedDocument<UserMetadata>;

@Schema()
export class UserMetadata {
  @Prop({
    type: mongoose.Types.ObjectId,
    auto: true,
  })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  auth0_id: string;

  @Prop()
  last_name: number;

  @Prop()
  first_name: string;

  @Prop({ nullable: true })
  username: string;

  @Prop()
  email: string;

  @Prop({ nullable: true })
  birthday: Date;

  @Prop({ nullable: true })
  phone_number: string;

  @Prop({ nullable: true })
  picture_url: string;

  @Prop({ nullable: true })
  gender: string;

  // TODO : change address to full entity with city/country/adress information
  @Prop({ nullable: true })
  address: string;
}

export const UserMetadataSchema = SchemaFactory.createForClass(UserMetadata);
