import { ObjectType, Field } from '@nestjs/graphql';
import {} from '@aws-sdk/client-cognito-identity-provider';
import { CodeDeliveryDetailsInterface } from './code-delivery-details-type.interface';

@ObjectType()
export class InitiateAccountRecoveryInterface {
  @Field(() => CodeDeliveryDetailsInterface, { nullable: true })
  readonly CodeDeliveryDetails?: CodeDeliveryDetailsInterface;
}
