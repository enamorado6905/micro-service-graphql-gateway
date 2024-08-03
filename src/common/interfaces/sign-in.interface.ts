import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignInInterface {
  @Field({})
  AccessToken: string;

  @Field({})
  ExpiresIn: number;

  @Field({})
  TokenType: string;

  @Field({})
  RefreshToken: string;

  @Field({})
  IdToken: string;
}
