import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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
export class SigUpDto {
  /**
   * The surnames of the user.
   *
   * @type {string}
   */
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  readonly user: string;

  /**
   * The phone number of the user.
   *
   * @type {string}
   */
  @IsOptional()
  @MaxLength(255)
  @IsString()
  readonly phoneNumber?: string;

  /**
   * The password for confirming sign up.
   *
   * @type {string}
   */
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
