import { HttpException } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Closeable,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { RmqUrl } from '@nestjs/microservices/external/rmq-url.interface';
import { firstValueFrom } from 'rxjs';
import { extractErrorDetails } from '../../helpers/cast.helper';

/**
 * The `ProxyRabbitMQ` class is a utility class for creating and managing a RabbitMQ client proxy.
 *
 * This class uses the `ClientProxyFactory` from the `@nestjs/microservices` module to create a client proxy
 * for RabbitMQ. The client proxy can be used to send and receive messages through RabbitMQ.
 *
 * The class constructor takes a `rabbitMQ` parameter, which is the name of the RabbitMQ queue to use.
 * It also initializes the `config` property with the URL for the RabbitMQ server, which is taken from
 * the `AMQP_URL` environment variable.
 *
 * The class provides a `proxyRabbitMQ` method that creates and returns the RabbitMQ client proxy.
 * The client proxy is configured to use the RabbitMQ queue and server URL specified in the `rabbitMQ` and `config`
 * properties of the class.
 *
 * The `proxyRabbitMQ` method returns a `ClientProxy & Closeable` object, which means that the returned object
 * is both a `ClientProxy` (so it can be used to send and receive messages) and `Closeable` (so it can be closed
 * to clean up resources when it's no longer needed).
 */
export class ProxyRabbitMQ {
  /**
   * The `rabbitMQ` property is a string that represents the name of the RabbitMQ queue to use.
   * This property is set in the constructor of the class and is used when creating the RabbitMQ client proxy.
   */
  private readonly rabbitMQ: string;

  /**
   * The `config` property is an array of strings or `RmqUrl` objects that represents the URLs for the RabbitMQ servers.
   * This property is set in the constructor of the class and is used when creating the RabbitMQ client proxy.
   * The URLs are taken from the `AMQP_URL` environment variable.
   */
  private readonly config: string[] | RmqUrl[];

  constructor(rabbitMQ: string) {
    this.rabbitMQ = rabbitMQ;
    this.config = [process.env.AMQP_URL];
  }

  /**
   * Creates and returns a RabbitMQ client proxy.
   *
   * This function uses the `ClientProxyFactory.create` method from the `@nestjs/microservices` module
   * to create a client proxy for RabbitMQ. The client proxy can be used to send and receive messages
   * through RabbitMQ.
   *
   * The RabbitMQ connection is configured using the `transport` and `options` parameters of the `create` method.
   * The `transport` parameter is set to `Transport.RMQ` to indicate that the client proxy should use RabbitMQ.
   * The `options` parameter is an object that contains the `urls` and `queue` options:
   * - `urls`: An array of URLs for the RabbitMQ servers. This is taken from the `this.config` property of the class.
   * - `queue`: The name of the RabbitMQ queue to use. This is taken from the `this.rabbitMQ` property of the class.
   *
   * The function returns the created client proxy. The return type is `ClientProxy & Closeable`, which means that
   * the returned object is both a `ClientProxy` (so it can be used to send and receive messages) and `Closeable`
   * (so it can be closed to clean up resources when it's no longer needed).
   *
   * @returns A RabbitMQ client proxy.
   */
  private proxyRabbitMQ(): ClientProxy & Closeable {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config,
        queue: this.rabbitMQ,
      },
    });
  }

  /**
   * The `operations` method is an asynchronous method that sends a message to the RabbitMQ server and returns the
   * First response.
   *
   * This method creates a RabbitMQ client proxy by calling the `proxyRabbitMQ` method. It then sends a message to
   * The RabbitMQ server using the `send` method of the client proxy. The `send` method takes two parameters: `msg`
   * And `data`.
   * - `msg`: A string that represents the message to send. This is passed to the `send` method as the first parameter.
   * - `data`: The data to send with the message. This is passed to the `send` method as the second parameter.
   *
   * The method uses the `firstValueFrom` function from the `rxjs` library to return a `Promise` that resolves to the
   * First value emitted by the `send` method.
   *
   * If an error occurs while sending the message or waiting for the response, the method catches the error and throws
   * A new `Error` with the same message.
   *
   * @param msg - The message to send to the RabbitMQ server.
   * @param data - The data to send with the message.
   * @returns A `Promise` that resolves to the first response from the RabbitMQ server.
   * @throws An `Error` if an error occurs while sending the message or waiting for the response.
   */
  public async operations(msg: string, data: object): Promise<any> {
    const clientProxy = this.proxyRabbitMQ();

    try {
      const value = await firstValueFrom(clientProxy.send(msg, data));
      await clientProxy.close();

      return value.data ? value.data : value;
    } catch (error: any) {
      const { message, code, codeMessage } = extractErrorDetails(error.message);

      await clientProxy.close();

      if (error instanceof RpcException) {
        throw new RpcException({ message, code });
      } else {
        throw new HttpException({ message, code, codeMessage }, code);
      }
    }
  }

  /**
   * The `operations` method is an asynchronous method that sends a message to the RabbitMQ server and returns the
   * First response.
   *
   * This method creates a RabbitMQ client proxy by calling the `proxyRabbitMQ` method. It then sends a message to
   * The RabbitMQ server using the `send` method of the client proxy. The `send` method takes two parameters: `msg`
   * And `data`.
   * - `msg`: A string that represents the message to send. This is passed to the `send` method as the first parameter.
   * - `data`: The data to send with the message. This is passed to the `send` method as the second parameter.
   *
   * The method uses the `firstValueFrom` function from the `rxjs` library to return a `Promise` that resolves to the
   * First value emitted by the `send` method.
   *
   * If an error occurs while sending the message or waiting for the response, the method catches the error and throws
   * A new `Error` with the same message.
   *
   * @param msg - The message to send to the RabbitMQ server.
   * @param data - The data to send with the message.
   * @returns A `Promise` that resolves to the first response from the RabbitMQ server.
   * @throws An `Error` if an error occurs while sending the message or waiting for the response.
   */
  public async operationsMutation(msg: string, data: object): Promise<any> {
    try {
      const clientProxy = this.proxyRabbitMQ();
      return (await firstValueFrom(clientProxy.send(msg, data))).data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
