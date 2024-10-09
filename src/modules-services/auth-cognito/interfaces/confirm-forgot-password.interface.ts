import { ObjectType, Field } from '@nestjs/graphql';
import { ResponseMetadataInterface } from '../../../common/interfaces/operation/responde-metadata.interface';

@ObjectType()
export class ConfirmForgotPasswordInterface {
  @Field(() => ResponseMetadataInterface, { nullable: true, name: 'metadata' })
  readonly $metadata: ResponseMetadataInterface;
}
