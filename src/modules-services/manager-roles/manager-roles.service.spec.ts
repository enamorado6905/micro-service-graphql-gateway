import { Test, TestingModule } from '@nestjs/testing';
import { ManagerRolesService } from './manager-roles.service';

describe('ManagerRolesService', () => {
  let service: ManagerRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerRolesService],
    }).compile();

    service = module.get<ManagerRolesService>(ManagerRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
