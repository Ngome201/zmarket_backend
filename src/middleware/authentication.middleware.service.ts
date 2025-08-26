import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddlewareService implements NestMiddleware{
    //verifiy the token with cognito API
    use(req: Request, res: Response, next: NextFunction) {

        throw new Error('Method not implemented.');
    }
}
