import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ManagerPermissionService } from './manager-permission.service';
import { CreateManagerPermissionInput } from './dto/create-manager-permission.input';
import { UpdateManagerPermissionInput } from './dto/update-manager-permission.input';

@Resolver('ManagerPermission')
export class ManagerPermissionResolver {
  constructor(private readonly managerPermissionService: ManagerPermissionService) {}

  @Mutation('createManagerPermission')
  create(@Args('createManagerPermissionInput') createManagerPermissionInput: CreateManagerPermissionInput) {
    return this.managerPermissionService.create(createManagerPermissionInput);
  }

  @Query('managerPermission')
  findAll() {
    return this.managerPermissionService.findAll();
  }

  @Query('managerPermission')
  findOne(@Args('id') id: number) {
    return this.managerPermissionService.findOne(id);
  }

  @Mutation('updateManagerPermission')
  update(@Args('updateManagerPermissionInput') updateManagerPermissionInput: UpdateManagerPermissionInput) {
    return this.managerPermissionService.update(updateManagerPermissionInput.id, updateManagerPermissionInput);
  }

  @Mutation('removeManagerPermission')
  remove(@Args('id') id: number) {
    return this.managerPermissionService.remove(id);
  }
}
