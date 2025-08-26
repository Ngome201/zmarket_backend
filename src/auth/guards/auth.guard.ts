import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate{
    private jwksUrl: string;

    constructor() {
        
        this.jwksUrl = String(process.env.AWS_JWK_URL);
    }

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            return await this.verifyTokenKey(token);
        } 
        catch (error) {
            console.log(error);
            
            throw new UnauthorizedException();
        }
    }

    private extractToken(request: any): string | null {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {            
          return authHeader.split(' ')[1];
        }
        return null;
    }

    private async verifyTokenKey(token: string): Promise<boolean> {
        const decodedToken = jwt.decode(token, { complete: true }) as any;
        const kid = decodedToken.header.kid;
    
        const response = await axios.get(this.jwksUrl);
        
        const keys = response.data.keys;

        const key = keys.find((k) => k.kid === kid);
        console.log("key founded :",key)
        return key?true:false
        
      }
}
    

