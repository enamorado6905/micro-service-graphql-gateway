import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
export class LoginAuthDto {
  /**
   * The username of the user.
   *
   * @type {string}
   * @IsNotEmpty() Ensures the username is not empty.
   * @MaxLength(255) Ensures the username is not longer than 255 characters.
   * @IsString() Ensures the username is a string.
   */
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  username: string;

  /**
   * The password of the user.
   *
   * @type {string}
   * @IsNotEmpty() Ensures the password is not empty.
   * @MaxLength(255) Ensures the password is not longer than 255 characters.
   * @IsString() Ensures the password is a string.
   */
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  password: string;
}
