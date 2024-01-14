import { Query, Resolver } from '@nestjs/graphql';

/**
 * GraphQL resolver for handling queries.
 * This is a basic resolver class in a NestJS application using GraphQL.
 */
@Resolver()
export class GraphQlResolver {
  /**
   * A GraphQL query that returns a simple greeting message.
   * When called, it returns the string 'Hello World!'.
   *
   * @returns A string greeting.
   */
  @Query(() => String) // GraphQL decorator to define a query. The return type is specified as String.
  sayHello(): string {
    return 'Hello World!'; // The query returns the greeting 'Hello World!'.
  }
}
