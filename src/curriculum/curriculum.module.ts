import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { curriculumProviders } from 'src/helper/repository.providers';
import { databaseProviders } from 'src/db/database.providers';

@Module({
  controllers: [CurriculumController],
  providers: [...curriculumProviders,...databaseProviders,CurriculumService],

})
export class CurriculumModule {}
