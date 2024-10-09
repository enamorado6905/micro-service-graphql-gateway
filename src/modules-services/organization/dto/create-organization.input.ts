import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

@InputType()
export class CreateOrganizationInput {
  @Field(() => String, {})
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ORGANIZATION_CREATED_ERROR_0001,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ORGANIZATION_CREATED_ERROR_0002,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_ORGANIZATION_CREATED_ERROR_0003,
  })
  readonly name: string;
}
