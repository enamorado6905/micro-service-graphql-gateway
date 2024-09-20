import { CreatePermissionInput } from './create-permission.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {}
