import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          data.forEach((user) => {
            delete user.password;
          });
        } else if (data && data.password) {
          delete data.password;
        }
        return data;
      }),
    );
  }
}
