import {  ListUsersCommand,  CognitoIdentityProviderClient, UserStatusType,UserType} from "@aws-sdk/client-cognito-identity-provider";

export class userIdentityDto {

    sub: string|undefined;
    email: string|undefined;
    phone_number: string|undefined;
    username: string|undefined;
    userStatus: string|undefined;
    enabled: boolean|undefined;

    constructor(user: UserType) {
        if (!user.Enabled && 
            (user.UserStatus !== UserStatusType.EXTERNAL_PROVIDER && 
             user.UserStatus !== UserStatusType.CONFIRMED && 
             user.UserStatus !== UserStatusType.FORCE_CHANGE_PASSWORD && 
             user.UserStatus !== UserStatusType.RESET_REQUIRED)) {
            throw new Error("User is not enabled or has an invalid status");
            
        }   
        else {
            this.username= user.Username,
            this.sub = user.Attributes?.find(attr => attr.Name === 'sub')?.Value,
            this.email= user.Attributes?.find(attr => attr.Name === 'email')?.Value,
            this.phone_number= user.Attributes?.find(attr => attr.Name === 'phone_number')?.Value,
            this.userStatus= user.UserStatus,
            this.enabled= user.Enabled || false
        }
    }

}


