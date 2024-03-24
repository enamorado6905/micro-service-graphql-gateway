import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
export class LogoutAuthDto {
  /**
   * The access token of the user.
   *
   * @type {string}
   * @IsNotEmpty() Ensures the surnames is not empty.
   * @MaxLength(255) Ensures the surnames is not longer than 255 characters.
   * @IsString() Ensures the surnames is a string.
   */
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  /**
   * The id token of the user.
   *
   * @type {string}
   * @IsNotEmpty() Ensures the surnames is not empty.
   * @MaxLength(255) Ensures the surnames is not longer than 255 characters.
   * @IsString() Ensures the surnames is a string.
   */
  @IsOptional()
  @IsString()
  idToken: string;

  /**
   * The refresh token of the user.
   *
   * @type {string}
   * @IsNotEmpty() Ensures the surnames is not empty.
   * @MaxLength(255) Ensures the surnames is not longer than 255 characters.
   * @IsString() Ensures the surnames is a string.
   */
  @IsOptional()
  @IsString()
  refreshToken: string;
}
