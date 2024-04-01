import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * The `FilterPermissionInput` class is a data transfer object (DTO) that is used to define
 * the input parameters for the `filterPermission` query.
 * It is used to filter `ManagerPermission` entities.
 */
@InputType()
export class FilterPermissionInput {
  /**
   * The name of the permission to filter by.
   * It is optional.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => String)
  @IsOptional()
  @MaxLength(255)
  @IsString()
  readonly name: string;

  /**
   * The description of the permission to filter by.
   * It is optional.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly description: string;

  /**
   * The path of the permission to filter by.
   * It is optional.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => String)
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly path: string;

  /**
   * A flag indicating whether to filter by whether the permission is locked.
   * It is optional.
   * If provided, it must be a boolean.
   */
  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  readonly isLocked?: boolean;

  /**
   * A flag indicating whether to filter by whether the permission is disabled.
   * It is optional.
   * If provided, it must be a boolean.
   */
  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  readonly isDisabled: boolean;

  /**
   * A flag indicating whether to filter by whether the permission is verified.
   * It is optional.
   * If provided, it must be a boolean.
   */
  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  readonly isVerified: boolean;
}
