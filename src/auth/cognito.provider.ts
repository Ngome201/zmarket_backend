import { Injectable } from "@nestjs/common";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import {  ListUsersCommand,  CognitoIdentityProviderClient} from "@aws-sdk/client-cognito-identity-provider";

@Injectable()
export class CognitoProvider{
    private userPool : CognitoUserPool;
    constructor(){
        this.userPool = new CognitoUserPool({
            UserPoolId: String(process.env.AWS_COGNITO_USER_POOL_ID),
            ClientId: String(process.env.AWS_COGNITO_CLIENT_ID),
        });
    }
    getUserPool(): CognitoUserPool {
        return this.userPool;
    }
    /**
     * List all users in the Cognito User Pool
     * @returns Promise containing the list of users
     */
    listCognitoUsers = async () => {
      
      const client = new CognitoIdentityProviderClient({
        region: String(process.env.AWS_REGION),
        credentials:{
          accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
          secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
        }
      });

      const command = new ListUsersCommand({
        UserPoolId: String(process.env.AWS_COGNITO_USER_POOL_ID),
        
      });
      const response = await client.send(command);

      return response.Users?.map(user => ({
        username: user.Username,
        sub : user.Attributes?.find(attr => attr.Name === 'sub')?.Value,
        email: user.Attributes?.find(attr => attr.Name === 'email')?.Value,
        phone_number: user.Attributes?.find(attr => attr.Name === 'phone_number')?.Value,
        userStatus: user.UserStatus,
        enabled: user.Enabled || false
      }))
    };


}