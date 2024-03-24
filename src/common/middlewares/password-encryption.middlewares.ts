import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BcryptClass } from '../util/class/bcrypt.class';

@Injectable()
export class PasswordEncryptionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password;
    if (password) {
      const saltRounds = 10; // You can adjust the salt rounds as needed
      req.body.password = await BcryptClass.hashPassword(password, saltRounds);
    }
    next();
  }
}
