import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * A DTO for confirming sign up.
 *
 * @description
 * The class works as follows:
 * 1. It defines a `username` property that is a non-empty string with a maximum length of 255.
 * 2. It defines a `phoneNumber` property that is a non-empty string with a maximum length of 255.
 * 3. It defines a `code` property that is a non-empty string with a maximum length of 255.
 *
 * @example
 * const configSigUpDto = new ConfigSigUpDto();
 * configSigUpDto.username = 'JohnDoe';
 * configSigUpDto.phoneNumber = '1234567890';
 * configSigUpDto.code = 'ABCDEFG';
 */
export class ConfigSigUpDto {
  /**
   * The username of the user.
   *
   * @type {string}
   */
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  username: string;

  /**
   * The phone number of the user.
   *
   * @type {string}
   */
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  phoneNumber: string;

  /**
   * The code for confirming sign up.
   *
   * @type {string}
   */
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  code: string;
}
