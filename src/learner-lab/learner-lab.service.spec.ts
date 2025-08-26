import { Test, TestingModule } from '@nestjs/testing';
import { LearnerLabService } from './learner-lab.service';

describe('LearnerLabService', () => {
  let service: LearnerLabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearnerLabService],
    }).compile();

    service = module.get<LearnerLabService>(LearnerLabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
