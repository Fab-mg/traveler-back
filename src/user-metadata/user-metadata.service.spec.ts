import { Test, TestingModule } from '@nestjs/testing';
import { UserMetadataService } from './user-metadata.service';

describe('UserMetadataService', () => {
  let service: UserMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMetadataService],
    }).compile();

    service = module.get<UserMetadataService>(UserMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
