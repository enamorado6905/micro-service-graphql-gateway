import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateManagerPermissionInput } from './create-manager-permission.input';
import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';

/**
 * The `UpdateManagerPermissionInput` class is a data transfer object (DTO) that is used to define
 * the input parameters for the `updateManagerPermission` mutation.
 * It is used to update an existing `ManagerPermission` entity.
 */
@InputType()
export class UpdateManagerPermissionInput extends PartialType(
  CreateManagerPermissionInput,
) {
  /**
   * The name of the permission to filter by.
   * It is requerid.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => ID)
  @IsUUID()
  _id: number;
}
