import { DeliveryMediumType } from '@aws-sdk/client-cognito-identity-provider';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CodeDeliveryDetailsTypeInterface {
  /**
   * <p>The email address or phone number destination where Amazon Cognito sent the code.</p>
   * @public
   */
  @Field(() => String, { nullable: true, name: 'destination' })
  Destination?: string;

  /**
   * <p>The method that Amazon Cognito used to send the code.</p>
   * @public
   */
  @Field(() => String, { nullable: true, name: 'deliveryMedium' })
  DeliveryMedium?: DeliveryMediumType;

  /**
   * <p>The name of the attribute that Amazon Cognito verifies with the code.</p>
   * @public
   */
  @Field(() => String, { nullable: true, name: 'attributeName' })
  AttributeName?: string;
}
