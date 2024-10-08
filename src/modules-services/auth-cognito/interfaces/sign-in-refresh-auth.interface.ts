import { ObjectType, Field } from '@nestjs/graphql';
import {
  AuthenticationResultType,
  ChallengeNameType,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { AuthenticationResultTypeGQL } from './authentication-result-type.interface';
import { ResponseMetadata } from '@smithy/types';

@ObjectType()
export class SignInRefreshAuthInterface implements InitiateAuthCommandOutput {
  @Field(() => String, { nullable: true }) // Explicitly declare type for GraphQL
  readonly ChallengeName?: ChallengeNameType;

  @Field(() => String, { nullable: true }) // Explicitly declare string type
  readonly Session?: string;

  // Keep ChallengeParameters as Record<string, string> for TypeScript compatibility
  readonly ChallengeParameters?: Record<string, string>;

  @Field(() => AuthenticationResultTypeGQL, { nullable: true }) // Declare type for AuthenticationResult
  readonly AuthenticationResult?: AuthenticationResultType;

  readonly $metadata: ResponseMetadata;
}
