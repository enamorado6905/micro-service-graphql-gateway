import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
export class ExchangeCodeForTokensDto {
  /**
   * The code for confirming sign in.
   *
   * @type {string}
   */
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  readonly code: string;

  /**
   * The id of clinet.
   *
   * @type {string}
   */
  readonly clinetId: string;
}
