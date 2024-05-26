import { ExceptionFilter, Catch, HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { ApolloError } from 'apollo-server-express';

@Catch()
export class RpcExceptionsFilter implements ExceptionFilter {
  catch(exception: any) {
    // Parsear el error que está en formato de cadena JSON
    const errorDetails = JSON.parse(exception.message);

    // Extraer código de error, mensaje y dominio de la excepción
    const code = errorDetails.code || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = errorDetails.message || 'An unexpected error occurred';

    // Transformar el error a un ApolloError para la respuesta de GraphQL
    throw new ApolloError(message, status[code]);
  }
}
