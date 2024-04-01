import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ManagerRole {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
