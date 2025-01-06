import { Module } from '@nestjs/common';
import { UserMetadataService } from './user-metadata.service';
import { UserMetadataController } from './user-metadata.controller';

@Module({
  providers: [UserMetadataService],
  controllers: [UserMetadataController]
})
export class UserMetadataModule {}
