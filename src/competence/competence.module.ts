import { Module } from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CompetenceController } from './competence.controller';
import { competenceProviders } from 'src/helper/repository.providers';
import { databaseProviders } from 'src/db/database.providers';

@Module({
  controllers: [CompetenceController],
  providers: [...competenceProviders,...databaseProviders,CompetenceService],
  
})
export class CompetenceModule {}
