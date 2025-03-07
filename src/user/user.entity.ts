import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/config/constants';
import { UserMetadata } from 'src/user-metadata/user-metadata.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: mongoose.Types.ObjectId,
    auto: true,
  })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  auth0_id: string;

  @Prop()
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: Role.TRAVELLER })
  role: string;

  @Prop({
    type: {
      type: mongoose.Types.ObjectId,
      ref: () => UserMetadata,
    },
  })
  user_metadata?: UserMetadata;

  @Prop({ default: false })
  registeredViaBackend: boolean;

  @Prop({ default: true })
  isEmailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
