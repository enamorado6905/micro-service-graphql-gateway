import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CodeDeliveryDetailsInterface {
  @Field(() => String, { nullable: true })
  AttributeName?: string;

  @Field(() => String, { nullable: true })
  DeliveryMedium?: string;

  @Field(() => String, { nullable: true })
  Destination?: string;
}
