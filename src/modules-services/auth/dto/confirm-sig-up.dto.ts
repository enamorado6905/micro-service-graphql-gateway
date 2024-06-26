import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
export class ConfigSigUpDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  userName: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  code: string;
}
