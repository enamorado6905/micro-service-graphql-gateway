import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
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
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_AUTH_CONFIRM_SIG_UP_DTO_ERROR_0001,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_AUTH_CONFIRM_SIG_UP_DTO_ERROR_0002,
  })
  userName: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_AUTH_CONFIRM_SIG_UP_DTO_ERROR_0003,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_AUTH_CONFIRM_SIG_UP_DTO_ERROR_0004,
  })
  code: string;
}
