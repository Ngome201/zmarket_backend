import { Test, TestingModule } from '@nestjs/testing';
import { LearnerLabController } from './learner-lab.controller';
import { LearnerLabService } from './learner-lab.service';

describe('LearnerLabController', () => {
  let controller: LearnerLabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnerLabController],
      providers: [LearnerLabService],
    }).compile();

    controller = module.get<LearnerLabController>(LearnerLabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
