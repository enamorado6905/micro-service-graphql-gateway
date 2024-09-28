import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';
import { Field, InputType } from '@nestjs/graphql';

/**
 * A DTO for confirming sign up.
 *
 * @description
 * The class works as follows:
 * 1. It defines a `surnames` property that is a non-empty string with a maximum length of 255.
 * 2. It defines a `phoneNumber` property that is a non-empty string with a maximum length of 255.
 * 3. It defines a `code` property that is a non-empty string with a maximum length of 255.
 *
 * @example
 * const configSigUpDto = new ConfigSigUpDto();
 * configSigUpDto.surnames = 'JohnDoe';
 * configSigUpDto.phoneNumber = '+11234567890';
 * configSigUpDto.password = 'Assdsd121s';
 */
@InputType()
export class SigUpDto {
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0001,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0002,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0003,
  })
  readonly name: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0004,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0005,
  })
  @MaxLength(255, {
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0006,
  })
  readonly surnames: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0007,
  })
  @IsEmail(
    {},
    {
      message:
        ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0008,
    },
  )
  readonly email: string;

  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0009,
  })
  @IsString()
  readonly password: string;

  @Field(() => String, { nullable: true })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0010,
  })
  @IsOptional()
  readonly address?: string;

  @Field(() => String, { nullable: true })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_USER_DTO_CREATED_ERROR_0011,
  })
  @IsOptional()
  readonly language?: string;
}
