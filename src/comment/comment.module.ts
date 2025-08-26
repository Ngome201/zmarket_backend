import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { commentProviders } from 'src/helper/repository.providers';
import { databaseProviders } from 'src/db/database.providers';

@Module({
  controllers: [CommentController],
  providers: [...commentProviders,...databaseProviders,CommentService],
})
export class CommentModule {}
