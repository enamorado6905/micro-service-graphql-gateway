import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class QueryInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  surnames?: number;

  @Field(() => Int, { nullable: true })
  email?: number;

  @Field(() => Boolean, { nullable: true })
  readonly isLocked: boolean;

  @Field(() => Boolean, { nullable: true })
  readonly isDisabled: boolean;

  @Field(() => Boolean, { nullable: true })
  readonly isVerified: boolean;
}
