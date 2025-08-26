import { Module } from '@nestjs/common';
import { LearnerLabService } from './learner-lab.service';
import { LearnerLabController } from './learner-lab.controller';
import { labProviders, learnerLabProviders, learnerProviders } from 'src/helper/repository.providers';
import { databaseProviders } from 'src/db/database.providers';

@Module({
  controllers: [LearnerLabController],
  providers: [...learnerProviders,
              ...databaseProviders,
              ...learnerLabProviders,
              ...labProviders,
              LearnerLabService],
  
})
export class LearnerLabModule {}
