import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object for creating authentication data.
 *
 * @class
 */
@InputType()
export class ConfigSigUpDto {
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  userName: string;

  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  code: string;
}
