import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { CognitoProvider } from './cognito.provider';

@Injectable()
export class AuthService {

  constructor(private readonly cognitoProvider : CognitoProvider) {}

  async authenticateUser(createAuthDto: CreateAuthDto) {
    const {username, password} = createAuthDto;
        

    const authenticationDetails = new AuthenticationDetails({
      Username : username,
      Password : password
    })
    const userCognito = new CognitoUser({Username: username, Pool: this.cognitoProvider.getUserPool()});

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result:CognitoUserSession) => {
          resolve({
            session : result,
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

}
