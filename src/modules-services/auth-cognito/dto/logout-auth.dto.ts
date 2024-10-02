import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
@InputType()
export class LogoutAuthDto {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_LOGOUT_ERROR_0001,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_LOGOUT_ERROR_0002,
  })
  readonly accessToken: string;

  @Field(() => String, { nullable: true })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_LOGOUT_ERROR_0003,
  })
  @IsOptional()
  readonly idToken?: string;

  @Field(() => String, { nullable: true })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_LOGOUT_ERROR_0004,
  })
  @IsOptional()
  readonly refreshToken?: string;
}
