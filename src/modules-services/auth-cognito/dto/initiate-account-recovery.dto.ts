import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InitiateAccountRecoveryDto {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_INITIATE_ACCOUNT_RECOVERY_ERROR_0001,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_INITIATE_ACCOUNT_RECOVERY_ERROR_0002,
  })
  readonly userName: string;
}
