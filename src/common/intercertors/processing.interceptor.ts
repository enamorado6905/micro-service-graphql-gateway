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
export class ProcessingInterceptor implements NestInterceptor {
  private readonly proxyRabbitMQ = new ProxyRabbitMQ(
    RabbitMqEnum.orderProcessorServiceQueue,
  );
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log('Processing phase started');
    await this.proxyRabbitMQ.operationsEmit('ORDER_LIFE_CYCLE', {
      status: 'processing',
      orgData: {},
    });
    return next
      .handle()
      .pipe(tap(() => console.log('Processing phase complete')));
  }
}