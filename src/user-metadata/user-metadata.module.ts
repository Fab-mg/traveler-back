import { Module } from '@nestjs/common';
import { UserMetadataService } from './user-metadata.service';
import { UserMetadataController } from './user-metadata.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMetadata, UserMetadataSchema } from './user-metadata.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserMetadata.name, schema: UserMetadataSchema },
    ]),
  ],
  providers: [UserMetadataService],
  controllers: [UserMetadataController],
})
export class UserMetadataModule {}
