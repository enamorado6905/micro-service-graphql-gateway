import { OrderProcessorMsgEnum } from '../../enum/msg/order-processor.enum';
import { RabbitMqEnum } from '../../enum/msg/rabbit-mq.enum';
import { ProxyRabbitMQ } from '../connection/proxy-rabbit-mq.class';

export class OperationClass {
  private readonly rabbitMQL: RabbitMqEnum;
  private readonly proxyRabbitMQ: ProxyRabbitMQ;

  constructor(proxyRabbitMQL: RabbitMqEnum) {
    this.rabbitMQL = proxyRabbitMQL;

    this.proxyRabbitMQ = new ProxyRabbitMQ(this.rabbitMQL);
  }

  async operations(msg: string, data: object): Promise<any> {
    await this.preProcess(msg, data);

    const operation = await this.proxyRabbitMQ.operations(msg, data);

    await this.postProcess(msg, operation);

    return operation;
  }

  private async preProcess(msg: string, data: any) {
    const preProcessProxyRabbitMQ = new ProxyRabbitMQ(
      RabbitMqEnum.orderProcessorServiceQueue,
    );
    return preProcessProxyRabbitMQ.operationsEmit(
      OrderProcessorMsgEnum.ORDER_LIFE_CYCLE,
      {
        status: 'pre-processing',
        orderData: {
          destination: this.rabbitMQL,
          msg,
          data: data,
        },
      },
    );
  }

  private async postProcess(msg: string, result: any) {
    const postProcessProxyRabbitMQ = new ProxyRabbitMQ(
      RabbitMqEnum.orderProcessorServiceQueue,
    );
    return postProcessProxyRabbitMQ.operationsEmit(
      OrderProcessorMsgEnum.ORDER_LIFE_CYCLE,
      {
        status: 'post-processing',
        orderData: {
          destination: this.rabbitMQL,
          msg,
          data: result,
        },
      },
    );
  }
}
