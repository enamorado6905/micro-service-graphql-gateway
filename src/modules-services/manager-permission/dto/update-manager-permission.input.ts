import { CreateManagerPermissionInput } from './create-manager-permission.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateManagerPermissionInput extends PartialType(CreateManagerPermissionInput) {
  id: number;
}
