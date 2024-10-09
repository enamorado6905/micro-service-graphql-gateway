import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ResponseMetadataInterface {
  @Field(() => Number, { nullable: true })
  httpStatusCode?: number;

  @Field(() => String, { nullable: true })
  requestId?: string;

  @Field(() => Number, { nullable: true })
  attempts?: number;

  @Field(() => Number, { nullable: true })
  totalRetryDelay?: number;
}
