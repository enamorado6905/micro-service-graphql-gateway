import { Test, TestingModule } from '@nestjs/testing';
import { AuthCognitoResolver } from './auth-cognito.resolver';
import { AuthCognitoService } from './auth-cognito.service';

describe('AuthCognitoResolver', () => {
  let resolver: AuthCognitoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthCognitoResolver, AuthCognitoService],
    }).compile();

    resolver = module.get<AuthCognitoResolver>(AuthCognitoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
