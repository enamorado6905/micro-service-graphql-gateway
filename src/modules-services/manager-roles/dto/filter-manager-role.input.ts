import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ObjectId } from 'typeorm';

/**
 * The `FilterRoleInput` class is a data transfer object (DTO) that is used to define
 * the input parameters for the `filterRole` query.
 * It is used to filter `ManagerRole` entities.
 */
@InputType()
export class FilterRoleInput {
  /**
   * The name of the role to filter by.
   * It is optional.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => String)
  @IsOptional()
  @MaxLength(255)
  @IsString()
  readonly name: string;

  /**
   * The description of the role to filter by.
   * It is optional.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description: string;

  /**
   * The path of the role to filter by.
   * It is optional.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => String)
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsMongoId({ each: true })
  readonly permission: ObjectId[];

  /**
   * A flag indicating whether to filter by whether the role is locked.
   * It is optional.
   * If provided, it must be a boolean.
   */
  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  readonly isLocked?: boolean;

  /**
   * A flag indicating whether to filter by whether the role is disabled.
   * It is optional.
   * If provided, it must be a boolean.
   */
  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  readonly isDisabled: boolean;

  /**
   * A flag indicating whether to filter by whether the role is verified.
   * It is optional.
   * If provided, it must be a boolean.
   */
  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  readonly isVerified: boolean;
}
