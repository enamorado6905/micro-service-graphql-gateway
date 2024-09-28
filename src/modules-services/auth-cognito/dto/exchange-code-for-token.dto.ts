import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
@InputType()
export class ExchangeCodeForTokensDto {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_EXCHANGE_CODE_TOKEN_ERROR_0001,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_EXCHANGE_CODE_TOKEN_ERROR_0002,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_EXCHANGE_CODE_TOKEN_ERROR_0003,
  })
  readonly code: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_EXCHANGE_CODE_TOKEN_ERROR_0004,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_EXCHANGE_CODE_TOKEN_ERROR_0005,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_EXCHANGE_CODE_TOKEN_ERROR_0006,
  })
  readonly clinetId: string;
}
