import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';
import { AbstractStatusInput } from '../../../common/dto/abstract-dto';

@InputType()
export class CreatePermissionInput extends AbstractStatusInput {
  @Field(() => String, {})
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_PERMISSION_CREATED_ERROR_0001,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_PERMISSION_CREATED_ERROR_0002,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_PERMISSION_CREATED_ERROR_0003,
  })
  readonly name: string;

  @Field(() => String, {})
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_PERMISSION_CREATED_ERROR_0004,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_PERMISSION_CREATED_ERROR_0005,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_PERMISSION_CREATED_ERROR_0006,
  })
  readonly resourcePath: string;

  @Field(() => String, { nullable: true })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_PERMISSION_CREATED_ERROR_0007,
  })
  @MaxLength(500, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_PERMISSION_CREATED_ERROR_0008,
  })
  @IsOptional()
  readonly description: string;
}
