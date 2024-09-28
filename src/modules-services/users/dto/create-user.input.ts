import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { AbstractStatusInput } from '../../../common/abstract/abstract-dto';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

@InputType()
export class CreateUserInput extends AbstractStatusInput {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0001,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0002,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0003,
  })
  readonly name: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0004,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0005,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0006,
  })
  readonly surnames: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0007,
  })
  @IsEmail(
    {},
    {
      message:
        ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0008,
    },
  )
  readonly email: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0009,
  })
  @IsString()
  readonly password: string;

  @Field(() => String, { nullable: true })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0010,
  })
  @IsOptional()
  readonly address?: string;

  @Field(() => String, { nullable: true })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_VALIDATOR_DTO_USER_CREATED_ERROR_0011,
  })
  @IsOptional()
  readonly language?: string;
}
