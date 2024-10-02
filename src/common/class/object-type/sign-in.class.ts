import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignInObjectType {
  /**
   * @public
   * <p>A valid access token that Amazon Cognito issued to the user who you want to
   *             authenticate.</p>
   */
  @Field()
  AccessToken?: string;
  /**
   * @public
   * <p>The expiration period of the authentication result in seconds.</p>
   */
  @Field()
  ExpiresIn?: number;
  /**
   * @public
   * <p>The token type.</p>
   */
  @Field()
  TokenType?: string;
  /**
   * @public
   * <p>The refresh token.</p>
   */
  @Field()
  RefreshToken?: string;
  /**
   * @public
   * <p>The ID token.</p>
   */
  @Field()
  IdToken?: string;
  /**
   * @public
   * <p>The new device metadata from an authentication result.</p>
   */
  @Field()
  NewDeviceMetadata?: string;
}
