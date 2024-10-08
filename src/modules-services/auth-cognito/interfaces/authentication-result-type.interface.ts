import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthenticationResultTypeGQL {
  @Field(() => String, { nullable: true })
  AccessToken?: string;

  @Field(() => String, { nullable: true })
  ExpiresIn?: number;

  @Field(() => String, { nullable: true })
  IdToken?: string;

  @Field(() => String, { nullable: true })
  RefreshToken?: string;

  @Field(() => String, { nullable: true })
  TokenType?: string;
}
