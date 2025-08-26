import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { CognitoProvider } from './cognito.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService,CognitoProvider, AuthGuard],
})
export class AuthModule {}
