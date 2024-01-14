import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQlResolver } from './graph-ql.resolver';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { FORMATTED_ERROR } from '../common/util/constants/constants.conts';
import { EnvEnum } from '../common/enum/system/env.enum';

/**
 * NestJS module to set up GraphQL using Apollo Server.
 * It configures GraphQL schema, error formatting, and includes a resolver for handling queries.
 */
@Module({
  imports: [
    // GraphQL module configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Specifies Apollo as the driver for GraphQL.
      playground: false, // Disables the GraphQL playground.
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Generates a schema file in the specified path.
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // Adds a default landing page plugin for Apollo Server.

      // Custom function to format GraphQL errors.
      formatError: (formattedError) => {
        // In production environment, remove the stacktrace from errors.
        if (process.env.NODE_ENV === EnvEnum.PRODUCTION) {
          delete formattedError.extensions.stacktrace;
        }

        // If the error code is for a GraphQL validation failure, modify the error message.
        if (
          formattedError.extensions.code ===
          ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
        ) {
          return {
            ...formattedError,
            message: FORMATTED_ERROR, // Custom formatted error message.
          };
        }

        return formattedError; // Return the original or modified error.
      },
    }),
  ],
  providers: [GraphQlResolver], // Registering the GraphQL resolver.
})
export class GraphQlModule {}
