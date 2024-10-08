import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class KeyValuePair {
  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}
