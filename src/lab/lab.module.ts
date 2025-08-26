import { Module } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { databaseProviders } from 'src/db/database.providers';
import { categoryProviders, competenceProviders, labProviders } from 'src/helper/repository.providers';

@Module({
  controllers: [LabController],
  providers: [...labProviders,...competenceProviders,...databaseProviders,LabService],
})
export class LabModule {}
