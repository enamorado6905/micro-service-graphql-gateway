import { ObjectType, Field } from '@nestjs/graphql';
import { ResponseMetadataInterface } from '../../../common/interfaces/operation/responde-metadata.interface';
import { ConfirmSignUpCommandOutput } from '@aws-sdk/client-cognito-identity-provider';

@ObjectType()
export class ConfirmSignUpInterface implements ConfirmSignUpCommandOutput {
  @Field(() => ResponseMetadataInterface, { nullable: true, name: 'metadata' })
  readonly $metadata: ResponseMetadataInterface;

  @Field(() => String, { nullable: true })
  readonly userName: string;
}
