import { IsUUID } from 'class-validator';
import { CreateManagerRoleInput } from './create-manager-role.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

/**
 * The `UpdateManagerRoleInput` class is a data transfer object (DTO) that is used to define
 * the input parameters for the `updateManagerRole` mutation.
 * It is used to update an existing `ManagerRole` entity.
 */
@InputType()
export class UpdateManagerRoleInput extends PartialType(
  CreateManagerRoleInput,
) {
  /**
   * The name of the role to filter by.
   * It is requerid.
   * If provided, it must be a string and its maximum length is 255 characters.
   */
  @Field(() => ID)
  @IsUUID()
  _id: number;
}
