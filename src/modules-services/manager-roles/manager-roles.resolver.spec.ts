import { Test, TestingModule } from '@nestjs/testing';
import { ManagerRolesResolver } from './manager-roles.resolver';
import { ManagerRolesService } from './manager-roles.service';

describe('ManagerRolesResolver', () => {
  let resolver: ManagerRolesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerRolesResolver, ManagerRolesService],
    }).compile();

    resolver = module.get<ManagerRolesResolver>(ManagerRolesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
