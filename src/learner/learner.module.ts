import { Module } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { LearnerController } from './learner.controller';
import { learnerProviders } from 'src/helper/repository.providers';
import { databaseProviders } from 'src/db/database.providers';

@Module({
  controllers: [LearnerController],
  providers: [...learnerProviders,...databaseProviders,LearnerService],
  
})
export class LearnerModule {}
