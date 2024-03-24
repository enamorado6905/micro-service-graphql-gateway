import { BcryptClass } from '../util/class/bcrypt.class';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class PasswordEncryptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    if (args.createUserInput.password) {
      const saltRounds = 10;
      args.createUserInput.password = BcryptClass.hashSyncPassword(
        args.createUserInput.password,
        saltRounds,
      );
    }

    return next.handle();
  }
}
