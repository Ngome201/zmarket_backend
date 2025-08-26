import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LabModule } from './lab/lab.module';
import { CategoryModule } from './category/category.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { CompetenceModule } from './competence/competence.module';
import { LearnerModule } from './learner/learner.module';
import { LearnerLabModule } from './learner-lab/learner-lab.module';
import { CommentModule } from './comment/comment.module';
import { CognitoAuthModule } from '@nestjs-cognito/auth';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    expandVariables:true
  }),
  CognitoAuthModule.register({
    jwtVerifier: {
      userPoolId: process.env.AWS_COGNITO_USER_POOL_ID as string,
      clientId: process.env.AWS_COGNITO_CLIENT_ID as string,
      tokenUse: "access",
    },
  }),
    AuthModule,
    LabModule,
    CategoryModule,
    CurriculumModule,
    CompetenceModule,
    LearnerModule,
    LearnerLabModule,
    CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
  
}
