import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

@InputType()
export class FilterByIdRoleInput {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_ROLE_DTO_FIND_ID_ERROR_0001,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_ROLE_DTO_FIND_ID_ERROR_0003,
  })
  @IsMongoId({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_ROLE_DTO_FIND_ID_ERROR_0004,
  })
  readonly id: string;
}
