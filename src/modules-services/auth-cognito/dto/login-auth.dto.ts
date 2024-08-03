import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

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
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
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
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  password: string;
}
