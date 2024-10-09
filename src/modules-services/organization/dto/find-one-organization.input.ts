import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

@InputType()
export class FindOneOrganizationInput {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ORGANIZATION_FIND_ONE_ERROR_0001,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ORGANIZATION_FIND_ONE_ERROR_0002,
  })
  search: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ORGANIZATION_FIND_ONE_ERROR_0003,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ORGANIZATION_FIND_ONE_ERROR_0004,
  })
  value: string;
}