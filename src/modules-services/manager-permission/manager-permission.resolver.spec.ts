import { Test, TestingModule } from '@nestjs/testing';
import { ManagerPermissionResolver } from './manager-permission.resolver';
import { ManagerPermissionService } from './manager-permission.service';

describe('ManagerPermissionResolver', () => {
  let resolver: ManagerPermissionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerPermissionResolver, ManagerPermissionService],
    }).compile();

    resolver = module.get<ManagerPermissionResolver>(ManagerPermissionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
