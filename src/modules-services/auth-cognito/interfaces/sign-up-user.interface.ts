import { ObjectType, Field } from '@nestjs/graphql';
import { SignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { ResponseMetadataInterface } from '../../../common/interfaces/operation/responde-metadata.interface';
import { CodeDeliveryDetailsTypeInterface } from '../../../common/interfaces/operation/code-delivery-details-type.interface';

@ObjectType()
export class SignUpAuthInterface implements SignUpCommandOutput {
  @Field(() => Boolean, { nullable: true, name: 'userConfirmed' })
  readonly UserConfirmed: boolean;

  @Field(() => CodeDeliveryDetailsTypeInterface, {
    nullable: true,
    name: 'codeDeliveryDetails',
  })
  readonly CodeDeliveryDetails?: CodeDeliveryDetailsTypeInterface;

  @Field(() => String, { nullable: true, name: 'userNameCognito' })
  readonly UserSub: string;

  @Field(() => ResponseMetadataInterface, { nullable: true, name: 'metadata' })
  readonly $metadata: ResponseMetadataInterface;
}
