import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

@InputType()
export class RemoveUserAuthDto {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_REMOVE_USER_ERROR_0001,
  })
  @IsEmail(
    {},
    {
      message:
        ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_AUTH_REMOVE_USER_ERROR_0002,
    },
  )
  userName: string;
}
