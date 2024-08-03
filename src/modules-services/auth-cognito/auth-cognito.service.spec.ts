import { Test, TestingModule } from '@nestjs/testing';
import { AuthCognitoService } from './auth-cognito.service';

describe('AuthCognitoService', () => {
  let service: AuthCognitoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthCognitoService],
    }).compile();

    service = module.get<AuthCognitoService>(AuthCognitoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
