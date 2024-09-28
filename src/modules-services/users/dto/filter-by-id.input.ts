import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

@InputType()
export class FilterByIdUserInput {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_FIND_ID_ERROR_0001,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_FIND_ID_ERROR_0002,
  })
  @IsMongoId({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_FIND_ID_ERROR_0003,
  })
  readonly id: string;
}
