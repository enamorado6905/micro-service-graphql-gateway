import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExceptionErrorMessageEnum } from '../../../common/enum/error/exception-error-message.enum';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
@InputType()
export class LoginAuthDto {
  /**
   * The surnames of the user.
   *
   * @type {string}
   * @IsNotEmpty() Ensures the surnames is not empty.
   * @MaxLength(255) Ensures the surnames is not longer than 255 characters.
   * @IsString() Ensures the surnames is a string.
   */
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_AUTH_DTO_ERROR_0001,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_AUTH_DTO_ERROR_0002,
  })
  userName: string;

  /**
   * The password of the user.
   *
   * @type {string}
   * @IsNotEmpty() Ensures the password is not empty.
   * @MaxLength(255) Ensures the password is not longer than 255 characters.
   * @IsString() Ensures the password is a string.
   */
  @Field(() => String)
  @IsNotEmpty({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_AUTH_DTO_ERROR_0003,
  })
  @IsString({
    message:
      ExceptionErrorMessageEnum.GATEWAY_MANAGER_ACCESS_CONTROL_AUTH_DTO_ERROR_0004,
  })
  password: string;
}
