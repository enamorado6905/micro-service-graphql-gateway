import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PopulateInput {
  @Field(() => String)
  path: string;

  @Field(() => String, { nullable: true })
  select?: string;

  @Field(() => String, { nullable: true })
  model?: string;
}
