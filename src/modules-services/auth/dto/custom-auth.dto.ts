import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsUniqueAuthType } from '../../../common/decorator/type-auth.decorator';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
export class CustomAuthDto {
  /**
   * The type of authentication.
   *
   * @type {string}
   * @IsOptional() Allows this field to be omitted.
   * @MaxLength(255) Ensures the type of authentication is not longer than 255 characters.
   * @IsString() Ensures the type of authentication is a string.
   * @IsUniqueAuthType() Ensures the auth type is unique and equals 'AZURE_AD'.
   */
  @IsOptional()
  @MaxLength(255)
  @IsString()
  @IsUniqueAuthType({
    message: 'Auth type must be unique and equal to AZURE_AD',
  })
  typeAuth: string;

  /**
   * The code for confirming sign in.
   *
   * @type {string}
   */
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  token: string;
}
