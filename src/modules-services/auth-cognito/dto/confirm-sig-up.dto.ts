import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
@InputType()
export class ConfigSigUpDto {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_SIG_UP_ERROR_0001,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_SIG_UP_ERROR_0002,
  })
  @IsEmail(
    {},
    {
      message:
        ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_SIG_UP_ERROR_0003,
    },
  )
  readonly userName: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_SIG_UP_ERROR_0004,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_SIG_UP_ERROR_0005,
  })
  @Matches(/^\d+$/, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_SIG_UP_ERROR_0006,
  })
  @Length(6, 6, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_SIG_UP_ERROR_0007,
  })
  readonly code: string;
}
