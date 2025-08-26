import { Controller,  Post, Body,  BadRequestException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { Authentication, AuthenticationGuard } from '@nestjs-cognito/auth';
import { CognitoProvider } from './cognito.provider';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly cognitoProvider: CognitoProvider
  ) {}

  @Post("/login")
  login(@Body() createAuthDto: CreateAuthDto) {

    try {
      return this.authService.authenticateUser(createAuthDto);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
  @Get("/verify")
  @Authentication()
  verifyToken() {

    try {
      return "You can access protected ressources";
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  } 
  @Get("/users")
  async getUsers() {
    try {
      return await this.cognitoProvider.listCognitoUsers();
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  } 


}
