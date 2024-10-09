import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

@InputType()
export class ConfirmAccountRecoveryDto {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_ACCOUNT_RECOVERY_ERROR_0001,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_ACCOUNT_RECOVERY_ERROR_0002,
  })
  readonly userName: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_ACCOUNT_RECOVERY_ERROR_0003,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_ACCOUNT_RECOVERY_ERROR_0004,
  })
  readonly verificationCode: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_ACCOUNT_RECOVERY_ERROR_0005,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_CONFIRM_ACCOUNT_RECOVERY_ERROR_0006,
  })
  readonly newPassword: string;
}
