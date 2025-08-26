import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationMiddlewareService } from './authentication.middleware.service';

describe('AuthenticationMiddlewareService', () => {
  let service: AuthenticationMiddlewareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationMiddlewareService],
    }).compile();

    service = module.get<AuthenticationMiddlewareService>(AuthenticationMiddlewareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
