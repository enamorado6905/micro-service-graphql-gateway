import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

/**
 * The `CreateManagerPermissionInput` class is a data transfer object (DTO) that is used to define
 * the input parameters for the `createManagerPermission` mutation.
 * It is used to create a new `ManagerPermission` entity.
 */
@InputType()
export class CreateManagerPermissionInput {
  /**
   * The name of the permission to filter by.
   * It is requerid.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => String)
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  readonly name: string;

  /**
   * The description of the permission to filter by.
   * It is requerid.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly description: string;

  /**
   * The path of the permission to filter by.
   * It is requerid.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => String)
  @IsNotEmpty()
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
