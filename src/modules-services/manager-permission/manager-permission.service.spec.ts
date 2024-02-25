import { Test, TestingModule } from '@nestjs/testing';
import { ManagerPermissionService } from './manager-permission.service';

describe('ManagerPermissionService', () => {
  let service: ManagerPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerPermissionService],
    }).compile();

    service = module.get<ManagerPermissionService>(ManagerPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
