import { CreateOrganizationInput } from './create-organization.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizationInput extends PartialType(
  CreateOrganizationInput,
) {}
