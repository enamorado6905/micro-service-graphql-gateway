import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProxyRabbitMQ } from '../class/connection/proxy-rabbit-mq.class';
import { RabbitMqEnum } from '../enum/msg/rabbit-mq.enum';

@Injectable()
export class PreProcessingInterceptor implements NestInterceptor {
  private readonly proxyRabbitMQ = new ProxyRabbitMQ(
    RabbitMqEnum.orderProcessorServiceQueue,
  );

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    console.log('Pre-processing phase: ', request.body);
    await this.proxyRabbitMQ.operationsEmit('ORDER_LIFE_CYCLE', {
      status: 'pre-processing',
      orgData: {},
    });

    return next
      .handle()
      .pipe(tap(() => console.log('Pre-processing complete')));
  }
}
